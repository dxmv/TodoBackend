import express from "express";
import userController from "../controllers/userController";
import { IUser } from "../customTypes";
const userRoute=express.Router();

// GET ALL USERS
userRoute.get("/",async(req,res)=>{
  try{
    const users=await userController.getAllUsers();
    res.status(500).json(users);
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});

// GET 1 USER
userRoute.get("/:id",async(req,res)=>{
  try{
    const user=await userController.getSingleUser(req.params.id);
    res.status(200).json(user);
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
})

// CREATE A USER
userRoute.post("/",async(req,res)=>{
  try{
    const user:Omit<IUser,"tasks">=req.body;
    const newUser=await userController.createUser(user);
    const finalUser=await userController.getSingleUser(newUser._id);
    res.status(200).json(finalUser);
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      "message":"There was an error"
    })
  }
})

// DELETE A USER
userRoute.delete("/:id",async(req,res)=>{
  try{
    await userController.deleteUser(req.params.id);
    res.status(200).json({
      "message":"Success"
    })
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      "message":"There was an error"
    })
  }
})
// EDIT A USER
userRoute.patch("/:id",async(req,res)=>{
  try{
    const user:Omit<IUser,"tasks">=req.body;
    const editedUser=await userController.editUser(req.params.id,user);
    if(editedUser){
      const finalUser=await userController.getSingleUser(editedUser._id);
      res.status(200).json(finalUser);
    }
    else{
      res.status(401).json({
        "message":"Invalid password",
      })
    }
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      "message":"There was an error"
    })
  }
})
module.exports=userRoute;