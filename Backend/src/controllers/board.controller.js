import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Board } from "../models/board.model.js"
import { BoardMembership } from "../models/boardMemberships.model.js"
import { Project } from "../models/project.model.js"
import { Task } from "../models/task.model.js"
import { isValidObjectId } from "mongoose"


export const createBoard = asyncHandler(async (req, res) => {
    const ownerId = req.user?._id
    const { name, description } = req.body

    if (!name) {
        throw new ApiError(400, "Board name is required")
    }

    if (!description) {
        throw new ApiError(400, "Board description is required")
    }

    const board = await Board.create({ name, description, ownerId })

    if (!board) {
        throw new ApiError(400, "error while creating board")
    }

    res.status(201).json(
        new ApiResponse(201, board, "Board created successfully")
    )

})

export const updateBoard = asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const { name, description } = req.body

    if (!boardId) {
        throw new ApiError(400, "boardId is required")
    }
    if (!name) {
        throw new ApiError(400, "Board name is required")
    }
    if (!description) {
        throw new ApiError(400, "Board description is required")
    }

    const board = await Board.findByIdAndUpdate(
        boardId,
        {
            name,
            description
        },
        {
            new: true,
            runValidators: true
        }
    )


    if (!board) {
        throw new ApiError(400, "Invalid board Id or board not found")

    }

    res.status(200).json(
        new ApiResponse(200, board, "board updated successfully")
    )
})

export const deleteBoard = asyncHandler(async (req, res) => {
    const { boardId } = req.params

    if (!boardId || !isValidObjectId(boardId)) {
        throw new ApiError(400, "Invalid boardId")
    }

    const projects = await Project.find({ boardId }).select("_id")
    const projectIds = projects.map(p => p._id)

    await Task.deleteMany({ projectId: { $in: projectIds } })
    await Project.deleteMany({ boardId })
    await BoardMembership.deleteMany({ boardId })
    const board = await Board.findByIdAndDelete(boardId)
    if (!board) {
        throw new ApiError(400, "Invalid boardId")
    }

    res.status(200).json(
        new ApiResponse(200, board, "Board deleted")
    )


})



export const getBoardById = asyncHandler(async (req, res) => {
    const { boardId } = req.params

    if (!boardId) {
        throw new ApiError(400, "boardId is required")
    }

    const board = await Board.findById(boardId)

    if (!board) {
        throw new ApiError(400, "Invalid board Id")

    }

    res.status(200).json(
        new ApiResponse(200, board, "board fetched successfully")
    )
})


export const getCreatedBoards = asyncHandler(async (req, res) => {
    const boards = await Board.find({ ownerId: req.user?._id }).sort({ createdAt: -1 })

    res.status(200).json(
        new ApiResponse(200, boards, "Created boards fetched successfully")
    );
});


export const getJoinedBoard = asyncHandler(async (req, res) => {
    const joined = await BoardMembership.find({ userId: req.user?._id, inviteStatus: "accepted" }).select("boardId")

    const joinedIds = joined.map(j => j.boardId)

    const boards = await Board.find({ _id: { $in: joinedIds } })

    res.status(200).json(
        new ApiResponse(200, boards, "Joined boards fetched successfully")
    )
})


