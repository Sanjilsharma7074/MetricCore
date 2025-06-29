import express from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  (req, res) => {
    // req.user is populated by passport's verify callback
    const user = req.user as any;
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful!", token });
  }
);

router.get("/error", (req, res) => {
  res.status(401).json({ message: "GitHub login failed" });
});

export default router;
