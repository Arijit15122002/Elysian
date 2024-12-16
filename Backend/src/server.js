import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path : '.env'
})
import startCronJobs from './Utils/cronJobs.js'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'http'

import Message from './Models/message.model.js'

import { NEW_MESSAGE, NEW_ELYSIAN_NOTIFICATION } from './constants/events.js'

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
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow requests from the frontend
        credentials: true, // Allow credentials (e.g., cookies or headers)
    },
    pingTimeout: 60000,
});
const userSocketIDs = new Map()

app.use((req, res, next) => {
    req.io = io // Attach io to req so we can use it in routes
    next()
})

io.use((socket, next) => {
    console.log('Middleware triggered');
    next(); // Always call next() to allow connections
})

io.on( 'connection' , ( socket ) => {

    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (userId) => {
        console.log(`User ${userId} joined their notification room`);
        socket.join(userId);
    });

    socket.on(NEW_ELYSIAN_NOTIFICATION, async ({ recipientId, notification }) => {
        console.log(`Sending notification to user with ID ${recipientId}`);
        io.to(recipientId.toString()).emit(NEW_ELYSIAN_NOTIFICATION, notification);
    });
    
    // temporary user 
    const user = {
        _id : "66846f18ce4a0abebc2ab1ad",
        name : "Mango"
    }

    userSocketIDs.set(user._id.toString(), socket.id)

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
        console.log( 'User disconnected' )
        userSocketIDs.forEach((value, key) => {
            if( value === socket.id ) {
                userSocketIDs.delete(key)
            }
        })
    })
})

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`)

    MongoDBconnect()
})


app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Allow requests from the frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Allow credentials
    })
);
app.use(express.json({ limit : '50mb' }))
app.use(express.urlencoded({ limit : '50mb', extended : true }))


//Starting Cron Jobs here
startCronJobs()


// Authentication Routes
import authRouter from './Routes/auth.route.js'
app.use('/api/auth', authRouter)

// User Routes
import userRouter from './Routes/user.route.js'
app.use('/api/user', userRouter)

// Post Routes
import postRouter from './Routes/post.route.js'
app.use('/api/post', postRouter)

// Story Routes
import storyRouter from './Routes/story.route.js'
app.use('/api/story', storyRouter)

// Notification Routes
import notificationRouter from './Routes/notification.route.js'
app.use('/api/notification', notificationRouter)

// Chat Routes
import chatRouter from './Routes/chat.route.js'
app.use('/api/chat', chatRouter)

