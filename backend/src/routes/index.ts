import { Router } from "express";
import authRoutes from "./auth.route";
import chatRoutes from "./chat.route";
import userRoutes from "./user.route";
import abuseWordRoutes from "./abuseWord.route";

const router = Router();
router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/user", userRoutes);
router.use("/abuse-words", abuseWordRoutes);

export default router;
