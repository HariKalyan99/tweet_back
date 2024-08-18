import express from "express";
import { postLogin, postLogout, postSignup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", postSignup)
router.post("/login", postLogin)
router.post("/logout", postLogout)

export default router;