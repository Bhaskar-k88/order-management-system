import express from "express"
import {authLogin, authRegister, userProfile} from "../controllers/authController.js"
import protectRoute from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.get("/profile",protectRoute,userProfile)

export default router