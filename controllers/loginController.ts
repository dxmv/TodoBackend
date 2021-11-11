import {Model,Document} from "mongoose";
import jwt from "jsonwebtoken";
import { IUserModel,IUser,ITaskModel } from "../customTypes";
const bcrypt=require("bcrypt");
const User:Model<IUserModel>=require("../models/User");

const login=async(user:Omit<IUser,"fullName"|"tasks">)=>{
  const dbUser=await User.findOne({username:user.username});
  if(dbUser){
    const correctPassword=user.password?await bcrypt.compare(user.password,dbUser.password):false;
    if(correctPassword){
      const userToken=JSON.stringify({
        username:user.username,
        id:dbUser._id
      });
      const token=await jwt.sign(userToken,process.env.SECRET);
      return {token,userToken:JSON.parse(userToken)};
    }
    else{
      return null;
    }
  }
  else{
    return null;
  }
};

export default {login};