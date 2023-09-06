import express from "express";
import { auth, register, login, google } from "../controllers/auth";
const router = express.Router();

router.get("/", auth);
router.post("/register", register)
router.post("/login", login);
router.post("/google", google);

export default router;