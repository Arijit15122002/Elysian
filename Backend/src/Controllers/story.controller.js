import Story from "../Models/story.model.js"
import User from "../Models/user.model.js"

import { v2 as cloudinary } from "cloudinary"

export const createStory = async (req, res) => {

    try {
        
        const { user, image, caption, text, textBackgroundColor, viewers } = req.body

        const rightUser = await User.findById(user._id)
        if( !rightUser ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        if( !text || !image ) {
            return res.status(400).json({
                message : "Text or an Image is required"
            })
        }

        const uploadedImage = ''
        if( image ) {
            const result = await cloudinary.uploader.upload(image)
            uploadedImage = result.url
        }

        const newStory = new Story({
            user,
            image : uploadedImage,
            caption,
            text,
            textBackgroundColor,
            viewers
        })

        await newStory.save()

    } catch (error) {
        console.log("Error in createStory: ", error);
        return res.status(500).json({
            message : "Something went wrong while creating story"
        })
    }

}

export const getAllStories = async (req, res) => {

    try {

        const stories = await Story.find({}).populate('user', 'username profilePic')

        stories.map((story) => {
            
        })
        
    } catch (error) {
        console.log("Error in getAllStories: ", error);
        return res.status(500).json({
            message : "Something went wrong while getting all stories"
        })
    }

}