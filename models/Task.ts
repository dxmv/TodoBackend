import mongoose from "mongoose";
import { ITaskModel } from "../customTypes";
const taskSchema=new mongoose.Schema({
  title:String,
  date:String,
  todos:[{type:mongoose.Schema.Types.ObjectId,ref:"Todo"}],
  owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

module.exports=mongoose.model<ITaskModel>("Task",taskSchema);