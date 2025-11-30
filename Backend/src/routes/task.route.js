import Router from "express"
import { verifyUser } from "../middleware/userAuth.middleware.js"
import { createTask, getAllTask, updateTaskStatus } from "../controllers/task.controller.js"

const router = Router()

router.use(verifyUser)

router.route("/create").post(createTask)
router.route("/all/:projectId").get(getAllTask)
router.route("/status").patch(updateTaskStatus)




export default router;