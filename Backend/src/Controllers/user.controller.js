import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'

import User from "../Models/user.model.js"
import Notification from "../Models/notification.model.js"





cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})


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
    const { id } = req.params; // ID of the user to be followed/unfollowed
    const { userId } = req.body; // ID of the current user making the request

    try {
        // Validate input IDs
        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user IDs." });
        }

        // Fetch the target user and current user
        const [userToModify, currentUser] = await Promise.all([
            User.findById(id),
            User.findById(userId),
        ]);

        if (!userToModify || !currentUser) {
            return res.status(404).json({
                message: "User-To-Follow OR CurrentUser was not found",
            });
        }

        if (id === currentUser._id.toString()) {
            return res.status(400).json({
                message: "You can't follow OR unfollow yourself",
            });
        }

        let message;

        if (userToModify.followers.includes(currentUser._id)) {
            // Unfollow Logic
            await Promise.all([
                userToModify.updateOne({ $pull: { followers: currentUser._id } }),
                currentUser.updateOne({ $pull: { following: userToModify._id } }),
            ]);

            message = "Unfollowed successfully";
        } else {
            // Follow Logic
            await Promise.all([
                userToModify.updateOne({ $push: { followers: currentUser._id } }),
                currentUser.updateOne({ $push: { following: userToModify._id } }),
            ]);

            // Check and handle follow notifications
            const foundNotification = await Notification.findOne({
                type: "follow",
                from: currentUser._id,
                to: userToModify._id,
            });

            if (foundNotification) {
                await Notification.findByIdAndDelete(foundNotification._id);
            }

            await new Notification({
                type: "follow",
                from: currentUser._id,
                to: [userToModify._id],
            }).save();

            // Emit notification via Socket.IO
            const notificationData = {
                type: "follow",
                from: {
                    _id: currentUser._id,
                    name: currentUser.fullname || currentUser.name, // Use fullname if available
                },
                to: [userToModify._id],
                date: new Date().toISOString(),
            };

            req.io.to(userToModify._id.toString()).emit(
                "NEW_ELYSIAN_NOTIFICATION",
                notificationData
            );

            message = "Followed successfully";
        }

        // Fetch and return the updated current user
        const updatedCurrentUser = await User.findById(userId);

        return res.status(200).json({
            message,
            currentUser: updatedCurrentUser,
        });
    } catch (error) {
        console.error("Error in followOrUnfollowUser:", error);

        // Handle specific error cases for debugging
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                message: `Invalid ID format for ${error.path}: ${error.value}`,
            });
        }

        return res.status(500).json({
            message: "Something went wrong while following or unfollowing user",
        });
    }
};

const updateUserProfilePicture = async (req, res) => {
    
    try {
        
        const {userId, profilePic} = req.body

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        try {

            if(user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }

            if( profilePic === '' ) {

                user.profilePic = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                
                await user.save()

            } else {
                const response = await cloudinary.uploader.upload(profilePic)
    
                const uploadedProfilePicUrl = response.secure_url
        
                user.profilePic = uploadedProfilePicUrl
        
                await user.save()
            }
    
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

    } catch (error) {
        
    }

}

const updateUserProfile = async (req, res) => {
    
    try {
        
        const {userId, username, profilePic, coverPic, description, dob, location, offices, schools, colleges, userInterests} = req.body

        const user = await User.findById(userId)

        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        let uploadedProfilePicUrl = user.profilePic; // Default to existing profilePic
        if (profilePic) {
            try {
                // Upload the new profilePic to Cloudinary
                const result = await cloudinary.uploader.upload(profilePic);

                // Save the uploaded image URL
                uploadedProfilePicUrl = result.secure_url;
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to upload profile picture to Cloudinary",
                    error: error.message,
                });
            }
        }

        let uploadedCoverPicUrl = user.coverPic; // Default to existing coverPic
        if (coverPic) {
            try {
                // Upload the new coverPic to Cloudinary
                const result = await cloudinary.uploader.upload(coverPic);

                // Save the uploaded image URL
                uploadedCoverPicUrl = result.secure_url;
            } catch (error) {
                return res.status(500).json({
                    message: "Failed to upload cover picture to Cloudinary",
                    error: error.message,
                });
            }
        }

        if ( username != user.username ) {
            user.username = username
        }

        if ( profilePic ) {
            user.profilePic = uploadedProfilePicUrl
        }

        if( coverPic ) {
            user.coverPic = uploadedCoverPicUrl
        }

        if ( description != user.description && description ) {
            user.bio.description = description
        }

        if ( dob != user.bio.dob && dob ) {
            user.bio.dob = dob
            user.markModified("bio");
        }

        if ( location != user.bio.location && location ) {
            user.bio.location = location
            user.markModified("bio");
        }
        
        user.bio.work.offices = offices
        user.bio.education.schools = schools
        user.bio.education.colleges = colleges
        
        // Update interests and mark `bio` as modified
        user.bio.interests = userInterests;
        user.markModified("bio");

        await user.save()

        return res.status(201).json({
            message : "Profile updated successfully",
            user
        })

    } catch (error) {
        
        console.log("Error in updateUserProfile: ", error);
        return res.status(500).json({
            message : "Something went wrong while updating profile"
        })

    }

}

const searchUsers = async (req, res) => {

    try {
        
        const { name } = req.params;

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

const getAvailableUserNames = async (req, res) => {

    try {
        
        const { username } = req.params;
        const { currentUserName } = req.body

        if( !username || !currentUserName ) {
            return res.status(400).json({
                message : "Username is required",
                available : false
            })
        }

        if( username.toLowerCase() === currentUserName.toLowerCase() ) {
            return res.status(400).json({
                message : "same",
            })
        }

        const existingUsername = await User.findOne({ username: { $regex: `^${username}$`, $options: "i" } });


        return res.status(201).json({
            available : !existingUsername
        })

    } catch (error) {
        
    }

}

export { getUserById, getUserProfile, getSuggestedUsers, getUsersIdontFollowBack, followOrUnfollowUser, updateUserProfile, updateUserProfilePicture, searchUsers, getBunchOfUsers, getAvailableUserNames } 