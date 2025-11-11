import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

const verifyUser = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const playLoad = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(playLoad._id).select("-refreshToken -password")

        if (!user) {
            throw new ApiError(400, "Invalid accessToken")
        }

        req.user = user

        next()

    } catch (error) {
        throw new ApiError(401, error.message || "Invalid accessToken")
    }
}


export { verifyUser }