import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import mssql from 'mssql'
import sqlConfig from '../Config/config'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {ExtendedLBody,ExtendedSUBody,ExtendedRequest} from '../Models/index'
dotenv.config()


export const signupUser= async (req:ExtendedSUBody, res:Response)=>{

try {
    const {username,password,email}= req.body
    const hashedpassword = await bcrypt.hash(password,8)
    const pool =await mssql.connect(sqlConfig)
    await pool.request()
    .input('email',email)
    .input('username', username)
    .input('password', hashedpassword)
    .execute('insertUser') 
    return res.status(200).json({message:'User added Successfully'})
} catch (error:any) {
    return res.status(404).json(error.message)
}

}

export const loginUser= async (req:ExtendedLBody, res:Response)=>{
    try {
         const {password,email}= req.body
        //  check if email exist
        const pool = await mssql.connect(sqlConfig)
        const user= await(
            await pool.request()
        .input('email', email)
        .execute('getEmail')
        ).recordset[0]
        
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