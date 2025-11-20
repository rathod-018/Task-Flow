import { Router } from "express";
import { verifyUser } from "../middleware/userAuth.middleware.js"
import { createBoard, getCreatedBoards } from "../controllers/board.controller.js";

const router = Router()

router.use(verifyUser)

router.route("/create").post(createBoard)

router.route("/created").get(getCreatedBoards)




export default router;