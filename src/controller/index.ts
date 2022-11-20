import { Request, RequestHandler, Response } from 'express'
import mssql from 'mssql'
import sqlConfig from '../Config/config'
import {v4 as uid} from 'uuid'
 interface ExtendedRequest extends Request{
    body:{

        title:string
        description:string
        date:string
    }
 }

export const getEvents = async (req:Request , res:Response)=>{
  try {
      const pool = await  mssql.connect(sqlConfig)
    const events = await (await pool.request().execute('getEvents')).recordset
    if(events.length==0){
        return res.status(404).json({
            message:" No Product Found"
        })
    }else{
        res.status(200).json(events)
    }
  } catch (error:any) {
    res.status(404).json(error.message)
  } 
}

export const getEvent:RequestHandler<{id:string}>= async (req, res)=>{

     try {
    const pool = await  mssql.connect(sqlConfig)
    const events = await (await pool.request().input('id', mssql.VarChar,req.params.id ).execute('getEvent')).recordset
    if(events.length){
      return  res.status(200).json(events)
    }else{
     return res.status(404).json({ message:" No Product Found"})
    }
  } catch (error:any) {
    return res.status(404).json(error.message)
  }

}


export const insertEvent = async (req:ExtendedRequest, res:Response)=>{

    try {
           const pool = await  mssql.connect(sqlConfig)
           const {title,description,date} = req.body
           const id = uid()
           await pool.request()
           .input('id', mssql.VarChar, id)
           .input('title', mssql.VarChar, title)
           .input('description', mssql.VarChar, description)
           .input('date', mssql.VarChar, date)
           .execute('insertEvent')

           return res.status(200).json({message:'Event Added!!'})
    } catch (error:any) {
        return res.status(404).json(error.message)
    }
    
}

export const updateEvent: RequestHandler<{id:string}> = async (req,res)=>{
    try {
        const pool = await  mssql.connect(sqlConfig)  
           const {title,description,date} = req.body
            const event = await (await pool.request().input('id', req.params.id).execute('getEvent')).recordset
            if(event.length !==0){
           await pool.request()
           .input('id', mssql.VarChar, req.params.id)
           .input('title', mssql.VarChar, title)
           .input('description', mssql.VarChar, description)
           .input('date', mssql.VarChar, date)
           .execute('updateEvent')
            return res.json({message:'Event Updated !!'})
            }
            else{
            return res.json({message:'No Event Found'}) 
            }
    } catch (error:any) {
        return res.status(404).json({
            error:error.message
        })
    }
}

export const deleteEvent:RequestHandler<{id:string}> = async (req,res)=>{
    try {
           const pool = await  mssql.connect(sqlConfig)  
           const event = await (await pool.request().input('id', req.params.id).execute('getEvent')).recordset          
           if(event.length !== 0){
            await pool.request()
           .input('id', mssql.VarChar, req.params.id)
           .execute('deleteEvent')
             return res.json({message:'Event Deleted !!'})
           }else{
             return res.json({message:'No Event Found'})
           }

    } catch (error:any) {
         return res.status(404).json({
            error:error.message
        }) 
    }
}


