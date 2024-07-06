import express from 'express'
import { signup, login, logout, getMe } from '../Controllers/auth.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'


const authRouter = express.Router()


authRouter.get('/me', protectRoute, getMe)
authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/logout', logout)

export default authRouter