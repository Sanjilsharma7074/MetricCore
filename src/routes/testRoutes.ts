import express from "express";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Public route working!" });
});

router.get("/private", protect, (req, res) => {
  const user = (req as any).user; // ✅ local cast to get .user
  res.json({
    message: `Hello, ${
      user?.username || "user"
    }. You accessed a protected route!`,
  });
});

export default router;
