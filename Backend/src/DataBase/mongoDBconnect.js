import mongoose from 'mongoose'
import dotenv from 'dotenv'

const connectMongoDB = async () => {
    try {
        
        const connection = await mongoose.connect(process.env.MONGO_DB_URI)

        console.log("MongoDB connected successfully")

    } catch (error) {
        console.log("Error occured while connecting to Mongo Database: ", error)
    }
}

export default connectMongoDB