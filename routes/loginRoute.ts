import express from "express";
import { IUser } from "../customTypes";
import loginController from "../controllers/loginController";
const loginRouter=express.Router();

type ILoginUser=Omit<IUser,"fullName"|"tasks">

loginRouter.post("/",async(req,res)=>{
  try{
    const user:ILoginUser=req.body;
    const {token,userToken}=await loginController.login(user);
    if(token){
      res.status(200).json({
        "token":token,
        "user":userToken
      })
    }
    else{
      res.status(401).json({
        "message":"Invalid username or password"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});

module.exports=loginRouter;