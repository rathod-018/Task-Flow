import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Task } from "../models/task.model.js"
import { Project } from "../models/project.model.js"
import { User } from "../models/user.model.js"
import { isValidObjectId } from "mongoose"


export const createTask = asyncHandler(async (req, res) => {
    const { title, description, date, projectId, assigneeId } = req.body

    if ([title, description].some((item) => !item || item.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }

    if (!projectId || !isValidObjectId(projectId)) {
        throw new ApiError(400, "projectId is required")
    }

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(400, "Invalid projectId")
    }

    if (assigneeId) {
        const assignee = await User.findById(assigneeId)
        if (!assignee) {
            throw new ApiError(400, "Invalid assigneeId")
        }
    }

    const task = await Task.create(
        {
            title,
            description,
            dueDate: new Date(date) || null,
            projectId: project?._id,
            assigneeId
        })

    res.status(201).json(
        new ApiResponse(201, task, "Task Created successfully")
    )

})