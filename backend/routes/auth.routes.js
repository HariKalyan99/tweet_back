import express from "express";
import { getMe, postLogin, postLogout, postSignup } from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.get("/me", protectRoute, getMe)
router.post("/signup", postSignup)
router.post("/login", postLogin)
router.post("/logout", postLogout)

export default router;