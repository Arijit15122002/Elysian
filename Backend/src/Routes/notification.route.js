import express from 'express'

import { deleteSingleNotification, getAllNotifications } from '../Controllers/notification.controller.js'

const notificationRouter = express.Router()

notificationRouter.post('/:userId', getAllNotifications);

notificationRouter.post('/deleteNotification/:id', deleteSingleNotification);


export default notificationRouter