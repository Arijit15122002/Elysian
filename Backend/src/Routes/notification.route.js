import express from 'express'

import { getNotifications, deleteNotifications, deleteSingleNotification } from '../Controllers/notification.controller.js'
import protectRoute from '../MiddleWares/protectRoute.js'

const notificationRouter = express.Router()


notificationRouter.get('/', protectRoute, getNotifications)

notificationRouter.delete('/', protectRoute, deleteNotifications)

notificationRouter.delete('/:id', protectRoute, deleteSingleNotification)


export default notificationRouter