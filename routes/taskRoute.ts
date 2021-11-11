import express from "express";
import { ITask,CustomRequest, ITodo, ITodoModel } from "../customTypes";
import taskController from "../controllers/taskController";
import todoController from "../controllers/todoController";
const taskRoute=express.Router();

// GET ALL TASKS FROM A USER
taskRoute.get("/",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      const tasks=await taskController.getAllTasksFromUser(req.user);
      res.status(200).json(tasks);
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// GET 1 TASK
taskRoute.get("/:id",async(req,res)=>{
  try{
    const task=await taskController.getTask(req.params.id);
    res.status(200).json(task);
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// CREATE A TASK
taskRoute.post("/",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      const task:Omit<ITask,"owner"|"todos"|"date">=req.body;
      const newUser=await taskController.createNewTask(task,req.user);
      const finalUser=await taskController.getTask(newUser._id);
      res.status(202).json(finalUser);
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch(e){
    console.log(e);
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// DELETE A TASK
taskRoute.delete("/:id",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      await taskController.deleteTask(req.params.id);
      res.status(200).json({
        "message":"Success"
      })
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// GET TODOS FOR TASK
taskRoute.get("/:id/todos",async(req,res)=>{
  try{
    const todos=todoController.getAllForTask(req.params.id);
    res.status(200).json(todos);
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// CREATE TODO
taskRoute.post("/:id/todos",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      const todo:Omit<ITodo,"task"|"done">=req.body;
      const newTodo=await todoController.createTodo(todo,req.params.id,req.user);
      if(newTodo){
        const task=await taskController.getTask(req.params.id);
        res.status(200).json(task);
      }
      else{
        throw new Error("Invalid user");
      }
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// DELETE TODO
taskRoute.delete("/:taskId/todos/:todoId",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      await todoController.deleteTodo(req.params.todoId);
      const task=await taskController.getTask(req.params.taskId);
      res.status(200).json(task);
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});
// CHECK TODO
taskRoute.patch("/:taskId/todos/:todoId",async(req:CustomRequest,res)=>{
  try{
    if(req.user){
      const myTodo=await todoController.editTodo(req.params.todoId);
      const task=await taskController.getTask(req.params.taskId);
      res.status(200).json(task);
    }
    else{
      res.status(401).json({
        "message":"Not logged in"
      })
    }
  }
  catch{
    res.status(500).json({
      "message":"There was an error"
    })
  }
});

module.exports=taskRoute;