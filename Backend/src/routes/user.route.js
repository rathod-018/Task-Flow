import { Router } from 'express'
import {
    registerUser,
    loginUser,
    verifyOtp,
    logOutUser,
    getCurrentUser,
    updatePageHistory
} from '../controllers/user.controller.js'
import { verifyUser } from '../middleware/userAuth.middleware.js'

const router = Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify-otp").post(verifyOtp)
router.use(verifyUser)
router.route("/logout").patch(logOutUser)


//protected route
router.use(verifyUser)
router.route("/get-user").get(getCurrentUser)
router.route("/page-history").patch(updatePageHistory)


export default router