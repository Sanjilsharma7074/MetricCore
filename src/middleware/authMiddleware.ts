import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const protect: RequestHandler = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // ✅ local cast to attach .user
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
