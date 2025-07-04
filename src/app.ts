import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import testRoutes from "./routes/testRoutes";
import authRoutes from "./routes/authRoutes";
import passport from "./config/passport";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/api/test", testRoutes);

app.use(passport.initialize());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
