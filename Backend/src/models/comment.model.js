import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        task_id: {
            type: mongoose.Types.ObjectId,
            ref: "Task",
            required: true
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        }
    },
    {
        timestamps: true
    })

export const Comment = mongoose.model("Comment", commentSchema)