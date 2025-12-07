import mongoose, { Schema } from "mongoose";


const taskShema = new Schema(
    {
        projectId: {
            type: mongoose.Types.ObjectId,
            ref: "Project",
            required: true
        },
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
        status: {
            type: String,
            required: true,
            enum: ["todo", "in_progress", "done"],
            default: "todo"
        },
        dueDate: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= new Date();
                },
                message: "Invalid Due date"
            }
        },
        assigneeId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    })


export const Task = mongoose.model("Task", taskShema)