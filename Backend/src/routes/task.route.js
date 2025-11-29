import Router from "express"
import { verifyUser } from "../middleware/userAuth.middleware.js"
import { createTask } from "../controllers/task.controller.js"

const router = Router()

router.use(verifyUser)

router.route("/create").post(createTask)




export default router;