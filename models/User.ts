import mongoose from "mongoose";
import { IUserModel } from "../customTypes";
const userSchema=new mongoose.Schema({
  username:String,
  fullName:String,
  password:String,
  tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"Task"}]
})

module.exports=mongoose.model<IUserModel>("User",userSchema);