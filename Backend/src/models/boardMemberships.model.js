import mongoose, { Schema } from "mongoose";

const boardMembershipSchema = new Schema(
    {
        boardId: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: true
        },
        role: {
            type: String,
            enum: ["owner", "member"],
            default: "member"
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        invitedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        inviteStatus: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    })


export const BoardMembership = mongoose.model("BoardMembership", boardMembershipSchema)