import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { isValidObjectId } from "mongoose"
import { BoardMembership } from "../models/boardMemberships.model.js"
import { Board } from "../models/board.model.js"
import { User } from "../models/user.model.js"


// get user by username or email and sent
export const searchUser = asyncHandler(async (req, res) => {
    const { q } = req.query

    if (!q || !q.trim()) {
        res.status(200).json(
            new ApiResponse(200, [], "No User found")
        )
    }

    const users = await User.find(
        {
            $or: [
                { username: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } }]
        }
    ).select("name username email avatar")

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched")
    )
})

// create membership board user to user to board
// ---> boardId invitedBy userId role
export const inviteMember = asyncHandler(async (req, res) => {
    const { boardId, userId } = req.body

    if (!boardId || !isValidObjectId(boardId)) {
        throw new ApiError(400, "Invalid boardId")
    }

    const isBoardExist = await Board.findById(boardId)
    if (!isBoardExist) {
        throw new ApiError(400, "Invalid Board")
    }

    if (!userId || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid invited User")
    }
    const isUserExist = await User.findById(userId)
    if (!isUserExist) {
        throw new ApiError(400, "Invalid invited User")
    }


    const invitedMember = await BoardMembership.create({
        boardId,
        userId,
        invitedBy: req.user?._id
    })

    res.status(201).json(
        new ApiResponse(201, invitedMember, "User invited successfully")
    )
})

// get invited board
export const getInvitedBoard = asyncHandler(async (req, res) => {
    const invitedBoard = await BoardMembership.find({
        userId: req.user?._id,
        inviteStatus: "pending"
    })
        .populate({
            path: "boardId",
            select: "name description createdBy createdAt"
        })
        .populate({
            path: "invitedBy",
            select: "name email avatar"
        });

    res.status(200).json(
        new ApiResponse(200, invitedBoard, "Invited board fetched successfully")
    );
});

// delete user from membership board
export const deleteMember = asyncHandler(async (req, res) => {
    const { memberId } = req.params

    if (!memberId || !isValidObjectId(memberId)) {
        throw new ApiError(400, "Invalid memberId")
    }

    const member = await BoardMembership.findByIdAndDelete(memberId)

    if (!member) {
        throw new ApiError(400, "Invalid memberId")
    }

    res.status(200).json(
        new ApiResponse(200, {}, "Member deleted successfully")
    )
})

// accept or reject receved joining request 
export const updateInvitedReq = asyncHandler(async (req, res) => {
    const { memberId, inviteStatus } = req.body

    if (!memberId || !isValidObjectId(memberId)) {
        throw new ApiError(400, "Invalid memberId")
    }
    if (!inviteStatus || !inviteStatus.trim()) {
        throw new ApiError(400, "Invalid memberId")
    }

    const member = await BoardMembership.findByIdAndUpdate(
        memberId,
        { inviteStatus },
        { new: true }
    )

    if (!member) {
        throw new ApiError(400, "Invalid memberId")
    }

    res.status(200).json(200, member, "Invite ststus updated successfully")
})

export const getMemberByStatus = asyncHandler(async (req, res) => {
    const { boardId, status } = req.query

    if (!boardId || !isValidObjectId(boardId)) {
        throw new ApiError(400, "BoardId is required")
    }
    if (!status || !status.trim()) {
        throw new ApiError(400, "Status is required")
    }

    const isBoardExist = await Board.findById(boardId)
    if (!isBoardExist) {
        throw new ApiError(400, "Invalid Board")
    }

    const members = await BoardMembership.find({ boardId, inviteStatus: status })
        .populate({ path: "userId", select: "name email username avatar" })

    res.status(200).json(
        new ApiResponse(200, members, "Members fetched successfully")
    )

})