import express from 'express'
import { newGroupChat, getMyChats, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from '../Controllers/chat.controller.js'
import { attachmentsMulter } from '../MiddleWares/multer.js'

const chatRouter = express.Router()


// CHAT BASIC OPERATIONS
chatRouter.post('/new', newGroupChat)
chatRouter.get('/my', getMyChats)
chatRouter.put('/add', addMembers)
chatRouter.put('/remove', removeMember)
chatRouter.delete('/leave/:id', leaveGroup)

//SEDING ATTACHMENTS ON CHATS
chatRouter.post('/transfer', attachmentsMulter, sendAttachments) 

//GET MESSAGES
chatRouter.get('/messages/:id', getMessages)

//GET CHAT DETAILS, RENAME DELETE 
chatRouter.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)



export default chatRouter