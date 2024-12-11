import express from 'express'

import { getUserById, getUserProfile, getSuggestedUsers, getUsersIdontFollowBack, followOrUnfollowUser, updateUserProfile, updateUserProfilePicture, searchUsers, getBunchOfUsers, getAvailableUserNames } from '../Controllers/user.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'



const userRouter = express.Router()

userRouter.get('/profile/:id', getUserById)

userRouter.get('/profile/:username', getUserProfile)

userRouter.get('/suggested/:userId', getSuggestedUsers)

userRouter.post('/dontFollowBack', getUsersIdontFollowBack)

userRouter.post('/follow/:id', followOrUnfollowUser)

userRouter.post('/update/profile', updateUserProfile)

userRouter.post('/update/profilePicture', updateUserProfilePicture)

userRouter.get('/search/:name', searchUsers)

userRouter.post('/bunchOfUsers', getBunchOfUsers)

userRouter.post('/username/:username', getAvailableUserNames )


export default userRouter