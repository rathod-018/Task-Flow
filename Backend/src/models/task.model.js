import mongoose, { Schema } from "mongoose";


const taskShema = new Schema(
    {
        list_id: {
            type: mongoose.Types.ObjectId,
            ref: "List",
            required: true
        },
        title: {
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
        due_date: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= new Date();
                },
                message: "Invalid Due date"
            }
        },
        assignee_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null
        }
    }, {
    timestamps: true
})


export const Task = mongoose.model("Task", taskShema)