import {Model} from "mongoose";
import { IUserModel,ITaskModel,ITodo,ITodoModel } from "../customTypes";
const Todo:Model<ITodoModel>=require("../models/Todo");
const Task:Model<ITaskModel>=require("../models/Task");

const getAllForTask=async(id:string):Promise<Model<ITodoModel>[]>=>{
  return await Todo.find({task:id}).populate("task","title");
}

const getTodo=async(id:string):Promise<Model<ITodoModel>>=>{
  return await Todo.findById(id).populate("task","title");
}

const createTodo=async(todo:Omit<ITodo,"task"|"done">,id:string,user:any)=>{
  const newTodo:Omit<ITodo,"task">={
    ...todo,
    done:false,
  }
  const finalTodo=await new Todo(newTodo);
  finalTodo.task=id;
  await finalTodo.save();
  const task=await Task.findById(id);
  if (task.owner==user.id){
    task.todos=[...task.todos,finalTodo._id];
    await task.save();
    return finalTodo;
  }
  else{
    return null;
  }
}

const deleteTodo=async(id:string)=>{
  return await Todo.findByIdAndDelete(id);
}

const editTodo=async(id:string)=>{
  const todo=await Todo.findById(id);
  todo.done=!todo.done;
  todo.save();
  return todo;
}

export default {getAllForTask,getTodo,createTodo,deleteTodo,editTodo};