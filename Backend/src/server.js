import express from 'express'
import dotenv from 'dotenv'
dotenv.config({
    path : '.env'
})
import cors from 'cors'

import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

import connectMongoDB from './DataBase/MongoDBconnect.js'


const app = express()

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`)

    connectMongoDB()
})


app.use(cors({
    origin : `${process.env.CORS_ORIGIN}`
}))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))



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
