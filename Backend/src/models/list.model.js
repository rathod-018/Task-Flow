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
        board_id: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: true
        }
    },
    {
        timestamps: true
    })


export const List = mongoose.model("List", listSchema)