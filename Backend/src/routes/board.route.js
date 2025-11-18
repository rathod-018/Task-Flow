import { Router } from "express";
import { verifyUser } from "../middleware/userAuth.middleware.js"
import { createBoard } from "../controllers/board.controller.js";

const router = Router()

router.use(verifyUser)

router.route("/create").post(createBoard)




export default router;