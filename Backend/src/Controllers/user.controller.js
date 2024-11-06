import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'

import User from "../Models/user.model.js"
import Notification from "../Models/notification.model.js"


const getUserById = async (req, res) => {
    const { id } = req.params

    try {

        const user = await User.findById(id).select("-password")
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

        const user = await User.findById(req.params.userId);

        if ( !user ) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const followersOfCurrentUserIds = user.following

        const followersOfCurrentUser = await User.find({ _id: { $in: followersOfCurrentUserIds } }).select(" followers following ");

        // Flatten the nested arrays into a single array of user IDs
        const allUserIds = followersOfCurrentUser.flatMap(user => {
        return [...user.followers, ...user.following];
        });


        const followers = user.followers.map( followerId => followerId.toString() );
        const following = user.following.map( followingId => followingId.toString() );
        const accountsUserDoesntFollowBack = followers.filter( followerId => !following.includes(followerId.toString()) );

        const uniqueUserIds = [...new Set(allUserIds.map(id => JSON.stringify(id)))]
        .map(idString => JSON.parse(idString));

        const filteredUserIds = uniqueUserIds.filter(userId => !user.following.includes(userId));

        const secondFilteredUserIds = filteredUserIds.filter(userId => !accountsUserDoesntFollowBack.includes(userId)); 

        const suggestedUsers = await User.find({ _id: { $in: secondFilteredUserIds, $ne: user._id } }).select("-password");

        return res.status(200).json({   
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

const getUsersIdontFollowBack = async (req, res) => {

    try {
        
        const user = await User.findById(req.body.userId);

        if ( !user ) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const followerIds = user.followers.map( followerId => followerId.toString() );

        const followingIds = user.following.map( followingId => followingId.toString() );

        const accountsUserDoesntFollowBack = followerIds.filter( followerId => !followingIds.includes(followerId) );

        console.log(accountsUserDoesntFollowBack);

        const actualUsersIdontFollowBack = await User.find({ _id: { $in: accountsUserDoesntFollowBack, $ne: user._id } }).select("-password");

        return res.status(200).json({
            message: "Suggested users found successfully",
            actualUsersIdontFollowBack
        });

    } catch (error) {
        return res.status(401).json({
            message: "Suggested users couldn't be found",
            error: error.message
        })
    }

}

const followOrUnfollowUser = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (!userToModify || !currentUser) {
            return res.status(404).json({
                message: "User-To-Follow OR CurrentUser was not found"
            });
        }

        if (id === currentUser._id.toString()) {
            return res.status(400).json({
                message: "You can't follow OR unfollow yourself"
            });
        }

        if (userToModify.followers.includes(currentUser._id)) {
            await userToModify.updateOne({
                $pull: { followers: currentUser._id }
            });

            await currentUser.updateOne({
                $pull: { following: userToModify._id }
            });

            // Re-fetch the updated currentUser
            const updatedCurrentUser = await User.findById(userId);

            return res.status(201).json({
                message: "Unfollowed successfully",
                currentUser: updatedCurrentUser
            });
        } else {
            await userToModify.updateOne({
                $push: { followers: currentUser._id }
            });

            await currentUser.updateOne({
                $push: { following: userToModify._id }
            });

            // Send notification to the UserToModify
            const newNotification = new Notification({
                type: 'follow',
                from: currentUser._id,
                to: userToModify._id
            });

            await newNotification.save();

            // Re-fetch the updated currentUser
            const updatedCurrentUser = await User.findById(userId);

            return res.status(201).json({
                message: "Followed successfully",
                currentUser: updatedCurrentUser
            });
        }

    } catch (error) {
        console.log("Error in followOrUnfollowUser: ", error);
        return res.status(500).json({
            message: "Something went wrong while following or unfollowing user"
        });
    }
};


const updateUserProfilePic = async (req, res) => {

    const { profilePic, userId } = req.body

    const user = await User.findById(userId)

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

const searchUsers = async (req, res) => {

    try {
        
        const { name } = req.params;
        console.log(name);

        const nameRegex = new RegExp(name, 'i');

        const users = await User.find({
            $or :[
                { username : { $regex : nameRegex } },
                { fullname : { $regex : nameRegex } }
            ]
        }).select("-password");

        return res.status(201).json({
            message : "Users found successfully",
            users
        })


    } catch (error) {
        
        console.log("Error in searchUsers: ", error);
        return res.status(500).json({
            message : "Something went wrong while searching users"
        })

    }

}

const getBunchOfUsers = async (req, res) => {

    try {

        const { userIds } = req.body;

        const users = await User.find({ _id : { $in : userIds } }).select("fullname username profilePic _id");

        return res.status(201).json({
            message : "Users found successfully",
            users
        })
        

    } catch (error) {
        console.log("Error in getBunchOfUsers: ", error);
        return res.status(500).json({
            message : "Something went wrong while getting bunch of users"
        })
    }

}

export { getUserById, getUserProfile, getSuggestedUsers, getUsersIdontFollowBack, followOrUnfollowUser, updateUserProfilePic, updateUserCoverImage, searchUsers, getBunchOfUsers } 