import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: any; // Custom property we'll attach after verifying JWT
}

export const protect: RequestHandler = (req, res, next) => {
  let token;

  // Look for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
    return; // ensure void return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthRequest).user = decoded;
    next();
    return; // ensure void return
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token invalid" });
    return; // ensure void return
  }
};
