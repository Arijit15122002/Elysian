import express from 'express'

import { getUserById, getUserProfile, getSuggestedUsers, followOrUnfollowUser, updateUserProfilePic, updateUserCoverImage, searchUsers } from '../Controllers/user.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'



const userRouter = express.Router()

userRouter.get('/profile/:id', getUserById)

userRouter.get('/profile/:username', getUserProfile)

userRouter.get('/suggested', getSuggestedUsers)

userRouter.post('/follow/:id', followOrUnfollowUser)

userRouter.post('/update/profilePic', updateUserProfilePic)

userRouter.post('/update/coverPic', updateUserCoverImage)

userRouter.get('/search/:name', searchUsers)


export default userRouter