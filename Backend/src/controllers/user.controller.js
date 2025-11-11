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

    const firstLetter = username.charAt(0).toUpperCase()
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
        throw new ApiError("Email is required")
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

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, user, "User registerd successfully")
        )


})


const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user?._id, {
        $unset: {
            refreshToken: 1
        }
    })

    const options = {
        secure: true,
        httpOnly: true
    }

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User Logged out")
        )

})

export {
    registerUser,
    loginUser,
    verifyOtp,
    logOutUser
}
