import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateAccessAndRefreshToken } from "../utils/tokenGenerator.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cludinary.js"

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body

    if ([name, username, email, password].some((item) => !item || item?.trim() === "")) {
        throw new ApiError(400, "All fields are reqired")
    }

    const userExist = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userExist) {
        throw new ApiError(400, "User with same username or email alredy exist")
    }

    const avatarLocalPath = req.file?.path

    let avatarResponse = {}

    if (avatarLocalPath) {
        avatarResponse = await uploadOnCloudinary(avatarLocalPath)
    }
    else {
        const firstLetter = username.charAt(0).toUpperCase()
        avatarResponse.url = `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff`
        avatarResponse.public_id = null
    }

    const user = await User.create({
        name,
        username,
        email,
        password,
        avatar: {
            url: avatarResponse?.url,
            public_id: avatarResponse?.public_id
        }
    })



    let createdUser = await User.findById(user._id).select("-password ")

    if (!createdUser) {
        throw new ApiError(400, "Error while creating user")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id)


    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, createdUser, "User registerd successfully")
        )

})

const loginUser = asyncHandler(async (req, res) => { })

const logOutUser = asyncHandler(async (req, res) => { })

export { registerUser }