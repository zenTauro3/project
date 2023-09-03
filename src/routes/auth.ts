import express from "express";
import { auth, register, login } from "../controllers/auth";
const router = express.Router();

router.get("/", auth);
router.post("/register", register)
router.post("/login", login);

export default router;