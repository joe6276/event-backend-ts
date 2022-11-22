import { Request } from "express"

export interface ExtendedSUBody extends Request{
 body:{
    username:string
    email:string
    password:string
 }
}

export interface ExtendedLBody extends Request{
  body:{
    email:string
    password:string
  }
}

export interface ExtendedRequest extends Request{
    info:{
        id:number
        username:string
        email:string
        iat:number
        exp:number
    }
}


export interface  Info{
        id:number
        username:string
        email:string
        iat:number
        exp:number
    }