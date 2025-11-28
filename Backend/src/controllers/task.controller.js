import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Task } from "../models/task.model.js"
import { Project } from "../models/project.model.js"
import { User } from "../models/user.model.js"


const createTask = asyncHandler(async (req, res) => {
    const { title, description, date, projectId, assigneeId } = req.body

    if ([title, description, date, projectId, assigneeId].some((item) => !item || item.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(400, "Invalid projectId")
    }


    if (assigneeId) {
        const assignee = await User.findById(assigneeId)
    }

})