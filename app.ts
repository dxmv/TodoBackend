require('dotenv').config();
import express from 'express';
import mongoose from "mongoose";
import userExtractor from "./middleware/userExtractor";
import cors from "cors";
mongoose.connect(process.env.MONGO_URL);
const userRoute=require("./routes/userRoute");
const loginRoute=require("./routes/loginRoute");
const taskRoute=require("./routes/taskRoute");
const app=express();

app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(userExtractor);
app.use("/api/users",userRoute);
app.use("/api/login",loginRoute);
app.use("/api/tasks",taskRoute);
app.listen(process.env.PORT,()=>{
  console.log(`Listening on PORT: ${process.env.PORT}`)
})