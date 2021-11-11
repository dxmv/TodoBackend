import { JwtPayload } from "jsonwebtoken";
import {Model} from "mongoose";
import { IUserModel,ITaskModel,ITask,ITodoModel } from "../customTypes";
const User:Model<IUserModel>=require("../models/User");
const Task:Model<ITaskModel>=require("../models/Task");
const Todo:Model<ITodoModel>=require("../models/Todo");
type CurrentUser={
  username:string,
  id:string
}

const getAllTasksFromUser=async(user:any)=>{
  return await Task.find({owner:user.id}).populate("todos","title done").populate("owner","username");
}

const getTask=async(id:string)=>{
  return await Task.findById(id).populate("todos","title done").populate("owner","username");
};

const createNewTask=async(task:Omit<ITask,"owner"|"todos"|"date">,user:any)=>{
  const newTask:ITask={
    ...task,
    date:new Date().toISOString(),
    owner:user.id,
    todos:[]
  };
  const finalTask=await new Task(newTask);
  await finalTask.save();
  const dbUser=await User.findById(user.id);
  dbUser.tasks=[...dbUser.tasks,finalTask._id];
  dbUser.save();
  return finalTask;
}

const deleteTask=async(id:string):Promise<void>=>{
  const task=await Task.findById(id);
  for(let i=0;i<task.todos.length;i++){
    await Todo.findByIdAndDelete(task.todos[i]);
  }
  await Task.findByIdAndDelete(id);
}

export default {getAllTasksFromUser,getTask,createNewTask,deleteTask};