import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Connection from'../DatabaseHelper/db'
import {ExtendedLBody,ExtendedSUBody,ExtendedRequest} from '../Models/index'
dotenv.config()

const db= new Connection()
export const signupUser= async (req:ExtendedSUBody, res:Response)=>{

try {
    const {username,password,email}= req.body
    const hashedpassword = await bcrypt.hash(password,8)
    await db.exec('insertUser',{email,username,password:hashedpassword}) 
    return res.status(200).json({message:'User added Successfully'})
} catch (error:any) {
    return res.status(400).json({error:error.message})
}

}

export const loginUser= async (req:ExtendedLBody, res:Response)=>{
    try {
         const {password,email}= req.body
        //  check if email exist
        
        const user= (await db.exec('getEmail',{email})).recordset[0]
        

        if(user){
        const checkPassword =await bcrypt.compare(password,user.password)
        if(checkPassword){
            const {password, ...rest}=user
            const token= jwt.sign(rest,process.env.SECRET as string, {
                expiresIn:'120s'
            })
           return res.status(200).json({message:'User Logged in', token}) 
        }else{
          return res.status(404).json({messsage:'User Not Found'}) 
        }
        }else{
            return res.status(404).json({messsage:'User Not Found'})
        }
    } catch (error) {
        
    }
}

export const homePage= async(req:ExtendedRequest, res:Response)=>{
    try {
            const user =req.info;
            res.status(200).json(`Welcome to Events System ${user.username}`)
    } catch (error) {
        
    }
}