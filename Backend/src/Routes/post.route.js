import express from 'express'

import { createPost, deletePost, getPost, getAllPosts, updatePost, likePost, commentPost, savePost, getUserPosts, getFollowingPosts } from '../Controllers/post.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'

const postRouter = express.Router()


postRouter.post('/create', createPost)

postRouter.delete('/delete/:id', protectRoute, deletePost)

postRouter.post('/update/:id', protectRoute, updatePost)

postRouter.post('/like/:id', protectRoute, likePost)

postRouter.post('/comment/:id', protectRoute, commentPost)

postRouter.post('/save/:id', protectRoute, savePost)

postRouter.get('/post/:id', protectRoute, getPost)

postRouter.get('/posts', getAllPosts)

postRouter.get('/posts/:id', protectRoute, getUserPosts)

postRouter.get('/posts/following', protectRoute, getFollowingPosts)


export default postRouter