import Notification from "../Models/notification.model.js"

export const getAllNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ to: userId })
        .sort({ createdAt: -1 })
        .populate({ 
            path: "from", 
            select: "_id fullname profilePic" 
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
}

const getNotifications = async (req, res) => {

    try {

        const userId = req.user._id

        const notifications = await Notification.find(
            { to : userId }
        ).sort({ createdAt : -1 }).populate(
            { path : "from", select : "username, profilePic" }
        )

        await Notification.updateMany(
            { to : userId },
            { read : true }
        )
        
        return res.status(200).json(notifications)

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while fetching notifications"
        })

    }

}

const deleteNotifications = async (req, res) => {

    try {

        const userId = req.user._id

        await Notification.deleteMany(
            { to : userId }
        )
        
        return res.status(200).json({
            message : "Notifications deleted successfully"
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while deleting notifications"
        })

    }

}

const deleteSingleNotification = async (req, res) => {

    try {

        const { id } = req.params

        const notification = await Notification.findById(id)

        if( !notification ) {
            return res.status(404).json({
                message : "Notification not found"
            })
        }

        if( notification.to.toString() !== req.user._id.toString() ) {
            return res.status(401).json({
                message : "Unauthorized : You can only delete your own notifications"
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