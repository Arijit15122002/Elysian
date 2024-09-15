import express from 'express'

import { createStory, getAllStories } from '../Controllers/story.controller.js'

const storyRouter = express.Router()


storyRouter.post('/post', createStory)

storyRouter.get('/all', getAllStories)

export default storyRouter