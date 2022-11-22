import express from 'express'
import router from './routes'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'

dotenv.config()
const app = express()
app.use(express.json())
app.use ('/events',router)
app.use ('/user',userRouter)

app.listen (process.env.PORT, ()=>{
    console.log(` Server Running at ${process.env.PORT}`);
    
})