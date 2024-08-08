import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path : '.env'
})
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'

import Message from './Models/message.model.js'

import { NEW_MESSAGE } from './constants/events.js'

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

import MongoDBconnect from './DataBase/mongoDBconnect.js'

import { v4 as uuid } from 'uuid'


const app = express()
const server = createServer(app)
const io = new Server(server, {})
const userSocketIDs = new Map()

io.use((socket, next) => {

})

io.on( 'connection' , ( socket ) => {


    // temporary user 
    const user = {
        _id : "66846f18ce4a0abebc2ab1ad",
        name : "Mango"
    }

    userSocketIDs.set(user._id.toString(), socket.id)

    console.log( `User connected: ${ socket.id }` )

    socket.on(NEW_MESSAGE, async({chatId, members, message}) => {
       
        const messageForRealTime = {
            content : message,
            _id : uuid(),
            sender : {
                _id : user._id,
                name : user.name
            },
            chat : chatId,
            date : new Date().toISOString()
        }

        const messageForDB = {
            content : message,
            sender : user._id,
            chat : chatId
        }

        const usersSocket = getSockets(members)
        io.to(usersSocket).emit(NEW_MESSAGE, {
            chatId,
            message : messageForRealTime
        })
        io.to(memberSocket).emit(NEW_MESSAGE, {
            chatId,
        })

        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.log(error);
        }
    })

    socket.on( 'disconnect' , () => {
        userSocketIDs.delete(user._id.toString())
        console.log( 'User disconnected' )
    })
})

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`)

    MongoDBconnect()
})


app.use(cors({
    origin : `${process.env.CORS_ORIGIN}`
}))
app.use(express.json({ limit : '50mb' }))
app.use(express.urlencoded({ limit : '50mb', extended : true }))



// Authentication Routes
import authRouter from './Routes/auth.route.js'
app.use('/api/auth', authRouter)

// User Routes
import userRouter from './Routes/user.route.js'
app.use('/api/user', userRouter)

// Post Routes
import postRouter from './Routes/post.route.js'
app.use('/api/post', postRouter)

// Notification Routes
import notificationRouter from './Routes/notification.route.js'
app.use('/api/notification', notificationRouter)

// Chat Routes
import chatRouter from './Routes/chat.route.js'
app.use('/api/chat', chatRouter)