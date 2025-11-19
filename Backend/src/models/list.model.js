import mongoose, { Schema } from "mongoose";

const listSchema = new Schema(
    {
        name: {
            type: String,
            enum: ["todo", "in_progress", "done"],
            default: "todo"
        },
        position: {
            type: Number,
            default: 0
        },
        ProjectId: {
            type: mongoose.Types.ObjectId,
            ref: "Project",
            required: true
        }
    },
    {
        timestamps: true
    })


export const List = mongoose.model("List", listSchema)