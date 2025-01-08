import express from 'express'

import { createPost, deletePost, getPost, getAllPosts, updatePost, likePost, commentPost, commentReplyPost, likeCommentReply, likeComment, savePost, getUserPosts, getFollowingPosts, getProfilePosts, getSearchSuggestions, getPostSearchResults } from '../Controllers/post.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'

const postRouter = express.Router()


postRouter.post('/create', createPost)

postRouter.post('/delete/:postId', deletePost)

postRouter.post('/update/:id', updatePost)

postRouter.post('/like/:id', likePost)

postRouter.post('/comment/:id', commentPost)

postRouter.post('/comment/like/:id', likeComment)

postRouter.post('/comment/reply/:id', commentReplyPost)

postRouter.post('/comment/reply/like/:id', likeCommentReply)

postRouter.post('/save/:id', savePost)

postRouter.get('/likes/:id', getPost)

postRouter.post('/posts', getAllPosts)

postRouter.get('/posts/:id', getUserPosts)

postRouter.get('/posts/following', getFollowingPosts)

postRouter.post('/profilePosts', getProfilePosts)

postRouter.get('/searchSuggestions/:query', getSearchSuggestions)

postRouter.get('/search/:query', getPostSearchResults)


export default postRouter