import {Router} from 'express'
import { homePage, loginUser, signupUser } from '../controller/userController'
import { verifyToken } from '../middleware'


const userRouter = Router()


userRouter.post('/signup',signupUser)
userRouter.post('/login',loginUser)
userRouter.get('/',verifyToken,homePage)


export default userRouter
