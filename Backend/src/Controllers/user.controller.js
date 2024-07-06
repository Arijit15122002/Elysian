import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'

import User from "../Models/user.model.js"
import Notification from "../Models/notification.model.js"

const getUserProfile = async (req, res) => {

    const { username } = req.params

    try {

        const user = await User.findOne({ username }).select("-password")

        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        return res.status(200).json({
            message : "User found successfully",
            user
        })
        
    } catch (error) {
        
        return res.status(401).json({
            message : "User couldn't be found"
        })

    }

}

const getSuggestedUsers = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        const usersFollowedByCurrentUser = await User.findById(user._id).select("following");

        const users = await User.aggregate([
            { $match: { _id: { $ne: user._id } } },
            { $sample: { size: 10 } }
        ]);

        const filteredUsers = users.filter(u => 
            !usersFollowedByCurrentUser.following.includes(u._id.toString())
        );

        const suggestedUsers = filteredUsers.slice(0, 6);

        suggestedUsers.forEach(u => {
            u.password = null;
        });

        return res.status(201).json({
            message: "Suggested users found successfully",
            suggestedUsers
        });

        
    } catch (error) {
        
        return res.status(401).json({
            message: "Suggested users couldn't be found",
            error: error.message
        });

    }

}

const followOrUnfollowUser = async (req, res) => {

    const { id } = req.params;

    try {

        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if( !userToModify || !currentUser ) {
            return res.status(404).json({
                message : "User-To-Follow OR CurrentUser was not found"
            })
        }

        if( id === currentUser._id.toString() ) {
            return res.status(400).json({
                message : "You can't follow OR unfollow yourself"
            })
        }

        if( userToModify.followers.includes(currentUser._id) ) {
            await userToModify.updateOne({ 
                $pull : { followers : currentUser._id } 
            });

            await currentUser.updateOne({ 
                $pull : { following : userToModify._id } 
            });

            return res.status(201).json({
                message : "Unfollowed successfully"
            })
        } else {
            await userToModify.updateOne({ 
                $push : { followers : currentUser._id } 
            });

            await currentUser.updateOne({ 
                $push : { following : userToModify._id } 
            });

            //Send notification to the UserToModify
            const newNotification = new Notification({
                type : 'follow',
                from : currentUser._id,
                to : userToModify._id
            })

            await newNotification.save()
            
            return res.status(201).json({
                message : "Followed successfully"
            })
        }
        
    } catch (error) {
        
        console.log("Error in followOrUnfollowUser: ", error);
        return res.status(500).json({ 
            message : "Something went wrong while following or unfollowing user" 
        })

    }

}

const updateUserProfilePic = async (req, res) => {

    const { profilePic } = req.body
    const { userId } = req.user._id

    try {

        if( profilePic ) {
            if(user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
        }

        const user = await User.findById(userId)

        const response = await cloudinary.uploader.upload(profilePic)

        const uploadedProfilePicUrl = response.secure.url

        user.profilePic = uploadedProfilePicUrl

        await user.save()

        return res.status(201).json({
            message : "Profile picture uploaded successfully",
            user
        })
        
    } catch (error) {
        
        console.log("Error in updateUserProfilePic: ", error);
        
        return res.status(500).json({
            message : "Something went wrong while uploading profile picture"
        })

    }

}

const updateUserCoverImage = async (req, res) => {

}

export { getUserProfile, getSuggestedUsers, followOrUnfollowUser, updateUserProfilePic, updateUserCoverImage } 