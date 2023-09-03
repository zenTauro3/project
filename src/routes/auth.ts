import express from "express";
import { auth, login } from "../controllers/auth";
const router = express.Router();

router.get("/", auth);
router.post("/login", login);

export default router;