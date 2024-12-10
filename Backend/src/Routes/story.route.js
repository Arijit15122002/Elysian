import express from 'express'

import { createStory, getUserStories, getFollowingsLastUploadedStories, getAllFollowingStories } from '../Controllers/story.controller.js'

const storyRouter = express.Router()


storyRouter.post('/post', createStory)

storyRouter.get('/userStories/:userId', getUserStories)

storyRouter.get('/followings/:userId/last-stories', getFollowingsLastUploadedStories)

storyRouter.post('/allFollowingStories/:userId/all-stories', getAllFollowingStories)

export default storyRouter