import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Board } from "../models/board.model.js"
import { Project } from "../models/project.model.js"
import { isValidObjectId } from "mongoose"

export const createProject = asyncHandler(async (req, res) => {
    const { boardId } = req.params
    const { name, description } = req.body

    if (!boardId || !isValidObjectId(boardId)) {
        throw new ApiError(400, "Invalid or missing boardId");
    }

    if (!name || !description) {
        throw new ApiError(400, "name and description are required");
    }

    const boardExist = await Board.findById(boardId)

    if (!boardExist) {
        throw new ApiError(400, "Invalid BoardId")
    }

    const project = await Project.create({
        name,
        description,
        boardId
    })

    res.status(201).json(
        new ApiResponse(201, project, "Project created successfully")
    )

})

export const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const { name, description } = req.body

    if (!projectId || !isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid or missing ProjectId");
    }

    if (!name || !description) {
        throw new ApiError(400, "name and description are required");
    }

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description
        },
        {
            new: true
        })

    if (!project) {
        throw new ApiError(400, "Invalid ProjectId")
    }

    res.status(200).json(
        new ApiResponse(200, project, "Project updated successfully")
    )


})

export const deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    if (!projectId || !isValidObjectId(projectId)) {
        throw new ApiError(400, "ProjectId is required")
    }

    const project = await Project.findByIdAndDelete(projectId)

    if (!project) {
        throw new ApiError(400, "Invalid projectId")
    }

    res.status(200).json(
        new ApiResponse(200, project, "Project deleted")
    )

})

export const getProjectById = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    if (!projectId || !isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid project id required")
    }

    const project = await Project.findById(projectId)

    if (!project) {
        throw new ApiError(400, "Invalid project id")
    }

    res.status(200).json(
        new ApiResponse(200, project, "Project fetched successfully")
    )
})

// get all project in a board
export const getAllProject = asyncHandler(async (req, res) => {
    const { boardId } = req.params

    if (!boardId || !isValidObjectId(boardId)) {
        throw new ApiError(400, "Invalid or missing boardId");
    }

    const projects = await Project.find({ boardId })

    res.status(200).json(
        new ApiResponse(200, projects, "projects fetched successfully")
    )
})