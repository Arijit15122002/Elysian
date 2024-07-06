import express from 'express'

import { getUserProfile, getSuggestedUsers, followOrUnfollowUser, updateUserProfilePic, updateUserCoverImage } from '../Controllers/user.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'



const userRouter = express.Router()


userRouter.get('/profile/:username', protectRoute, getUserProfile)

userRouter.get('/suggested', protectRoute, getSuggestedUsers)

userRouter.post('/follow/:id', protectRoute, followOrUnfollowUser)

userRouter.post('/update/profilePic', protectRoute, updateUserProfilePic)

userRouter.post('/update/coverPic', protectRoute, updateUserCoverImage)


export default userRouter