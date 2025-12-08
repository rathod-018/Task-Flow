import { Router } from "express";
import { verifyUser } from "../middleware/userAuth.middleware.js"
import {
    createBoard,
    deleteBoard,
    getBoardById,
    getCreatedBoards,
    getJoinedBoard,
    updateBoard
} from "../controllers/board.controller.js";

const router = Router()

router.use(verifyUser)
router.route("/create").post(createBoard)
router.route("/created").get(getCreatedBoards)
router.route("/joined").get(getJoinedBoard)
router.route("/:boardId").delete(deleteBoard)
router.route("/:boardId").get(getBoardById)
router.route("/:boardId").patch(updateBoard)

export default router;