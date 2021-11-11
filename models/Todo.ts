import mongoose from "mongoose";
import { ITaskModel } from "../customTypes";
const todoSchema=new mongoose.Schema({
  title:String,
  done:Boolean,
  task:{type:mongoose.Schema.Types.ObjectId,ref:"Task"}
})

module.exports=mongoose.model<ITaskModel>("Todo",todoSchema);