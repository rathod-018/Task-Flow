import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import { TempUser } from "../models/tempUser.model.js"
import { OtpModel } from "../models/otp.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAccessAndRefreshToken } from "../utils/tokenGenerator.js"
import {
    uploadOnCloudinary,
    deleteFromCloudinary
} from "../utils/cludinary.js"
import { otpGenerator } from "../utils/otpGenerator.js"
import { sendOtp } from "../utils/sendOtp.js"
import { isValidObjectId } from "mongoose"

const isProduction = process.env.NODE_ENV === "production";


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body

    if ([name, email, password, username].some((item) => !item || item?.trim() === "")) {
        throw new ApiError(400, "All fields are reqired")
    }
    const tempUserExist = await TempUser.findOne({ email })
    if (tempUserExist) {
        await TempUser.findByIdAndDelete(tempUserExist?._id)
    }

    const userExist = await User.findOne({ $or: [{ email }, { username }] })

    if (userExist) {
        throw new ApiError(400, "User with same username or email alredy exist")
    }

    const firstLetter = name.charAt(0).toUpperCase()
    let avatarResponse = {
        url: `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff`,
        public_id: null
    }

    const hashPass = await bcrypt.hash(password, 10)

    const createdTempUser = await TempUser.create({
        name,
        username,
        email,
        password: hashPass,
        avatar: {
            url: avatarResponse?.url,
            public_id: avatarResponse?.public_id
        }
    })

    if (!createdTempUser) {
        throw new ApiError(400, "Error while creating User")
    }

    const otp = await otpGenerator(email)

    // continue with email sending for otp
    const otpResponse = await sendOtp(email, otp)

    if (!otpResponse) {
        throw new ApiError(400, "Error while sending otp")
    }

    res.status(201).json(
        new ApiResponse(200, [], "OTP sent successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "Invalid Email")
    }

    const validatePass = await bcrypt.compare(password, user.password)
    if (!validatePass) {
        throw new ApiError(400, "Invalid password")
    }

    const otp = await otpGenerator(email)

    const response = await sendOtp(email, otp)

    if (!response) {
        throw new ApiError(400, "Error while sending otp")
    }

    res.status(200).json(
        new ApiResponse(200, [], "Otp sent successfully")
    )

})

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body

    if (!otp) {
        throw new ApiError(400, "Otp is required")
    }
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    const getOtp = await OtpModel.findOne({ email })
    if (getOtp.expiresAt < Date.now()) {
        await OtpModel.deleteOne({ email })
        throw new ApiError(400, "OTP Expired")
    }
    if (getOtp.otp !== otp) {
        throw new ApiError(400, "Invalid OTP")
    }

    let user = await User.findOne({ email })
    if (!user) {
        const tempUser = await TempUser.findOne({ email })

        if (!tempUser) {
            throw new ApiError(400, "Error while verifying OTP")
        }
        user = await User.create({
            name: tempUser.name,
            username: tempUser.username,
            email: tempUser.email,
            password: tempUser.password,
            avatar: {
                url: tempUser.avatar.url,
                public_id: tempUser.avatar.public_id
            }
        })
        await TempUser.deleteOne({ email })
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
    };
    res.status(200)
        .cookie(
            "accessToken",
            accessToken,
            {
                ...options,
                maxAge: 24 * 60 * 60 * 1000
            }
        )
        .cookie(
            "refreshToken",
            refreshToken,
            {
                ...options,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )
        .json(
            new ApiResponse(200, createdUser, "User registerd successfully")
        )
})


// resend otp
const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    const otp = await otpGenerator(email)

    const response = await sendOtp(email, otp)

    if (!response) {
        throw new ApiError(400, "Error while sending otp")
    }

    res.status(200).json(
        new ApiResponse(200, [], "Otp sent successfully")
    )
})


const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: 1
        }
    })
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
    };
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged out")
        )
})

// protected controller
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user?._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    )
})


//update user page history
const updatePageHistory = asyncHandler(async (req, res) => {
    const { boardId, projectId } = req.body

    if (boardId && !isValidObjectId(boardId)) throw new ApiError(400, "Invalid BoardId");

    if (projectId && !isValidObjectId(projectId)) throw new ApiError(400, "Invalid ProjectId")


    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            userPageHistory: {
                boardId: boardId || null,
                projectId: projectId || null
            }
        }, {
        new: true
    })

    if (!user) {
        throw new ApiError(400, "Invalid user Id")
    }

    res.status(200).json(
        new ApiResponse(200, user, "User page history updated successfully")
    )
})


export {
    registerUser,
    loginUser,
    verifyOtp,
    resendOtp,
    logOutUser,
    getCurrentUser,
    updatePageHistory
}
