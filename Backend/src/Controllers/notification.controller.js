import mongoose from "mongoose"

import User from "../Models/user.model.js"
import Post from "../Models/post.model.js";
import Notification from "../Models/notification.model.js"


export const getAllNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate if userId exists and is a valid ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }

        // Fetch notifications for the user
        const notifications = await Notification.find({ to: { $in: [userId] } })
            .sort({ createdAt: -1 })
            .populate({ 
                path: "from", 
                select: "_id fullname profilePic" 
            })

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error.message);
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

export const deleteSingleNotification = async (req, res) => {

    try {

        const { id } = req.params
        const { userId } = req.body

        const user = await User.findById(userId)
        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })  
        }

        const notification = await Notification.findById(id)
        if( !notification ) {
            return res.status(404).json({
                message : "Notification not found"
            })
        }

        
        await Notification.findByIdAndDelete(id)
        return res.status(200).json({
            message : "Notification deleted successfully"
        })
        
    } catch (error) {

        return res.status(500).json({
            message : "Something went wrong while deleting notification"
        })
        
    }

}

export const cleanNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({})

        for(const notification of notifications) {
            
        }
    } catch (error) {
        
    }
}