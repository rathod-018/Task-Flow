import { User } from "../models/user.model.js"
import { ApiError } from "./ApiError.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken = async (userId) => {
    if (!userId) {
        throw new ApiError(400, "UserId is required")
    }

    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const accessToken = jwt.sign(
        {
            _id: user._id,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    const refreshToken = jwt.sign(
        {
            _id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    await user.updateOne({ refreshToken })

    return { accessToken, refreshToken }

}

export { generateAccessAndRefreshToken }