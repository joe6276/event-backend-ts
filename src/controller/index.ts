import { Request, RequestHandler, Response } from 'express'
import {v4 as uid} from 'uuid'
import Connection from '../DatabaseHelper/db'

const db= new Connection()
 interface ExtendedRequest extends Request{
    body:{

        title:string
        description:string
        date:string
    }
 }

export const getEvents = async (req:Request , res:Response)=>{
  try {
    const events =await (await db.exec('getEvents')).recordset
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
    const events = (await db.exec('getEvent',{id:req.params.id} )).recordset
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
          
           const {title,description,date} = req.body
           const id = uid()
           db.exec('insertEvent',{id,title,description,date})
           return res.status(200).json({message:'Event Added!!'})
    } catch (error:any) {
        return res.status(404).json(error.message)
    }
    
}

export const updateEvent: RequestHandler<{id:string}> = async (req,res)=>{
    try { 
           const {title,description,date} = req.body
             const event = (await db.exec('getEvent',{id:req.params.id} )).recordset
            if(event.length !==0){
              db.exec('updateEvent',{id:req.params.id, title,description,date})
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
          
            const event = (await db.exec('getEvent',{id:req.params.id} )).recordset          
           if(event.length !== 0){
            db.exec('deleteEvent', {id:req.params.id})
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


