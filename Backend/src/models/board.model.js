import mongoose, { Schema } from "mongoose";

const boardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        ownerId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    })


export const Board = mongoose.model("Board", boardSchema)