import {Router} from 'express'
import { loginUser, signupUser } from '../controller/userController'


const userRouter = Router()


userRouter.post('/signup',signupUser)
userRouter.post('/login',loginUser)


export default userRouter
