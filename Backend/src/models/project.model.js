import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        boardId: {
            type: mongoose.Types.ObjectId,
            ref: "Board",
            required: true
        }
    },
    {
        timestamps: true
    })


export const Project = mongoose.model("Project", projectSchema)