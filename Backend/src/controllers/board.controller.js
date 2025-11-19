import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Board } from "../models/board.model.js"


export const createBoard = asyncHandler(async (req, res) => {
    const ownerId = req.user?._id
    const { title, description } = req.body

    if (!title) {
        throw new ApiError(400, "Board title is required")
    }

    if (!description) {
        throw new ApiError(400, "Board description is required")
    }

    const board = await Board.create({ title, description, ownerId })

    if (!board) {
        throw new ApiError(400, "error while creating board")
    }

    res.status(201).json(
        new ApiResponse(201, board, "Board created successfully")
    )

})

export const updateBoard = asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const { title, description } = req.body

    if (!boardId) {
        throw new ApiError(400, "boardId is required")
    }
    if (!title) {
        throw new ApiError(400, "Board title is required")
    }
    if (!description) {
        throw new ApiError(400, "Board description is required")
    }

    const board = await Board.findByIdAndUpdate(
        boardId,
        {
            title,
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

const deleteBoard = asyncHandler(async (req, res) => {
    // have to delete all task and list comment
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


