import {Request,Response,NextFunction} from "express"
import { CustomRequest } from "../customTypes";
import jwt from "jsonwebtoken";
const userExtractor=async(req:CustomRequest,res:Response,next:NextFunction)=>{
  try{
    const header=req.headers.authorization;
    if(header){
      const token=header.split(" ")[1];
      const decodedToken=await jwt.verify(token,process.env.SECRET);
      req.user=decodedToken;
    }
    next();
  }
  catch{
    console.log("Error");
  }
}
export default userExtractor;