import Router from "express"
import { verifyUser } from "../middleware/userAuth.middleware.js"
import {
    deleteMember,
    getInvitedBoard,
    getMemberByStatus,
    inviteMember,
    searchUser,
    updateInvitedReq
} from "../controllers/boarMembership.controller.js"


const router = Router();

router.use(verifyUser)

router.route("/search").get(searchUser)
router.route("/invite").post(inviteMember)
router.route("/invited").get(getInvitedBoard)
router.route("/:memberId").delete(deleteMember)
router.route("/update").patch(updateInvitedReq)
router.route("/all").get(getMemberByStatus)

export default router