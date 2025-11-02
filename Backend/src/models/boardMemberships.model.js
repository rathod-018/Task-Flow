import mongoose, { Schema } from "mongoose";

const boardMembershipSchema = new Schema(
    {
        board_id: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: true
        },
        role: {
            type: String,
            enum: ["owner", "member"],
            default: "member"
        },
        joined_at: {
            type: Date,
            default: Date.now
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        invited_by: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        invite_status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        }
    },
    {
        timestamps: true
    })


export const BoardMembership = mongoose.model("BoardMembership", boardMembershipSchema)