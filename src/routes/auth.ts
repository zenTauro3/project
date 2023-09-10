import express from "express";
import { auth, register, username, verify, login, google } from "../controllers/auth";
const router = express.Router();

router.get("/", auth);
router.post("/register", register);
router.get("/register/:username", username);
router.put("/verify/:key", verify);
router.post("/login", login);
router.post("/google", google);

export default router;