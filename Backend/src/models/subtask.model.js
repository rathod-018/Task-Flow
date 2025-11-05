import mongoose, { Schema } from "mongoose";


const subtaskShema = new Schema(
    {
        taskId: {
            type: mongoose.Types.ObjectId,
            ref: "Task",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ["todo", "in_progress", "done"],
            default: "todo",
        }
    },
    {
        timestamps: true
    })


export const Subtask = mongoose.model("Subtask", subtaskShema)