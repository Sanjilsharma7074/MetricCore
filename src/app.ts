import express, {Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT||3000;

app.use(express.json());

connectDB();

app.get("/health", (req : Request, res : Response)=> {
  res.status(200).json({status : 'OK', message : "Server is running"});
}) ;


app.listen(PORT, () => {
  console.log(`Server is running on PORT : http://localhost:${PORT}`);
  
})