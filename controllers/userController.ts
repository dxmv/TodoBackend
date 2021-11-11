import {Model} from "mongoose";
import { IUserModel,IUser,ITaskModel } from "../customTypes";
const bcrypt=require("bcrypt");

const User:Model<IUserModel>=require("../models/User");
const Task:Model<ITaskModel>=require("../models/Task");

const getAllUsers=async():Promise<Model<IUserModel>[]>=>{
  return await User.find({}).populate("tasks","title");
};

const getSingleUser=async(id:string):Promise<Model<IUserModel>>=>{
  return await User.findById(id).populate("tasks","title");
}

const createUser=async(user:Omit<IUser,"tasks">)=>{
  const newPassword=await bcrypt.hash(user.password,10);
  user.password=newPassword;
  const newUser:IUser={...user,tasks:[]};
  const finalUser=await new User(newUser);
  await finalUser.save();
  return finalUser;
}

const deleteUser=async(id:string):Promise<void>=>{
  const user=await User.findById(id);
  for(let i=0;i<user.tasks.length;i++){
    const task=await Task.findByIdAndDelete(user.tasks[i]);
  }
  const deleted=await User.findByIdAndDelete(id);
}

const editUser=async(id:string,user:Omit<IUser,"tasks">)=>{
  const dbUser=await User.findById(id);
  const correctPassword=user.password?await bcrypt.compare(user.password,dbUser.password):false;
  if(correctPassword){
    const newUser={...user,tasks:dbUser.tasks,password:dbUser.password};
    const finalUser=await User.findByIdAndUpdate(id,newUser);
    return finalUser;
  }
  return null;
}

export default {getAllUsers,getSingleUser,createUser,deleteUser,editUser}