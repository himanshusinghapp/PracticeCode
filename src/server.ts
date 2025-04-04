import express, { Request,Response } from "express";
import dotenv from 'dotenv';
import connectMongo from "./config/db";
import userRoutes from "./routes/userRoutes"

dotenv.config();

const app=express();


app.use(express.json());

app.use("/api/users", userRoutes);

connectMongo();
app.listen(process.env.PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});