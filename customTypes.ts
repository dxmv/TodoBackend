import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"
export interface IUser{
  username:string,
  fullName:string,
  password:string,
  tasks:string[]
}
export interface IUserModel extends IUser{
  _id:string
}

export interface ITask{
  title:string,
  date:string,
  todos:string[],
  owner:string,
}
export interface ITaskModel extends ITask{
  _id:string
}

export interface CustomRequest extends Request{
  user?:JwtPayload|string
}

export interface ITodo{
  title:string,
  done:boolean,
  task:string,
}
export interface ITodoModel extends ITodo{
  _id:string,
}