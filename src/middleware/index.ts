import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {ExtendedRequest,Info} from '../Models/index'
dotenv.config()

export const verifyToken = (req:ExtendedRequest, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string
        if(!token){
           return res.status(401).json ({message:'You are not allowed to Access this Route'})
        }else{
        const data= jwt.verify(token,process.env.SECRET as string)as Info
          req.info=data
        }
    } catch (error:any) {
      return   res.json({error:error.message})
    }
    next()
}