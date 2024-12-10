import express from 'express'

import { getAllNotifications } from '../Controllers/notification.controller.js'

const notificationRouter = express.Router()

notificationRouter.get('/:userId', getAllNotifications);


export default notificationRouter