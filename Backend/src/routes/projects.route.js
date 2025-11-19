import { Router } from "express"
import { verifyUser } from "../middleware/userAuth.middleware.js"
import { createProject, deleteProject, getAllProject, getProjectById, updateProject } from "../controllers/project.controller.js"


const router = Router();

router.use(verifyUser)
router.route("/create/:boardId").post(createProject)
router.route("/update/:projectId").patch(updateProject)
// router.route("/delete").delete(deleteProject)
router.route("/:projectId").get(getProjectById)
router.route("/all/:boardId").get(getAllProject)

export default router