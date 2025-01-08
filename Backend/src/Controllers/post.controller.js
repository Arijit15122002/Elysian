import User from "../Models/user.model.js"
import Post from "../Models/post.model.js"
import Notification from "../Models/notification.model.js"

import { v2 as cloudinary } from 'cloudinary'
import pLimit from 'p-limit'


const limit = pLimit(10)
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

const createPost = async (req, res) => {

    try {

        const { userId, postType, postPrivacy, message, images, hashTags, taggedPeople, checkIn, backgroundColor, feelingActivity, sharedPost } = req.body
        console.log(req.body);

        const rightUser = await User.findById(userId);

        if (!rightUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!message && !images) {
            return res.status(400).json({ message: "Post text or image is required" });
        }

        const imageURLs = [];
        if (images) {
            const imagesToUpload = images.map((image) =>
                limit(async () => {
                    const result = await cloudinary.uploader.upload(image);
                    return result;
                })
            );

            const uploads = await Promise.all(imagesToUpload);
            uploads.forEach((upload) => {
                imageURLs.push(upload.secure_url);
            });
        }

        // Create the new post
        const post = new Post({
            postType,
            postPrivacy,
            user: rightUser._id,
            text: message,
            images: imageURLs,
            likes: [],
            comments: [],
            hashTags,
            taggedPeople,
            checkIn,
            backgroundColor,
            feelingActivity,
            sharedPost,
        });

        await post.save();

        // Add post to user's posts array
        await User.findByIdAndUpdate(rightUser._id, {
            $push: { posts: post._id },
        });

        // Determine notification type
        let notificationType = "post";
        let notificationData = {
            type: notificationType,
            from: rightUser._id,
            to: rightUser.followers,
            post: post._id,
        };

        if (sharedPost && postType === "Shared") {
            notificationType = "share";
        } else if (!sharedPost && postType === "Own" && taggedPeople?.length > 0) {
            notificationType = "tag";
            notificationData.taggedPeople = taggedPeople;
        }

        // Update the notification type and send accordingly
        notificationData.type = notificationType;

        const newNotification = new Notification(notificationData);
        await newNotification.save();

        // Emit notifications to followers
        rightUser.followers.forEach((followerId) => {
            const notificationPayload = {
                type: notificationType,
                from: {
                    _id: rightUser._id,
                    fullname: rightUser.name,
                    profilePic: rightUser.profilePic,
                },
                post: post._id,
                ...(notificationType === "tag" && { taggedPeople }),
                date: new Date().toISOString(),
            };

            req.io.to(followerId.toString()).emit("NEW_ELYSIAN_NOTIFICATION", notificationPayload);
        });

        return res.status(201).json({
            message: "Post created successfully",
            post,
            success: true,
        });
    } catch (error) {
        console.error("Error creating post:", error); // Log the error for debugging
        return res.status(500).json({
            message: "Something went wrong while creating post",
            success: false,
        });
    }
};

const deletePost = async (req, res) => {

    try {

        const { postId } = req.params
        const { userId } = req.body
        const post = await Post.findById(postId)
        const user = await User.findById(userId)

        if( !post ) {
            return res.status(404).json({
                message : "Post not found"
            })
        }

        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        if( post.user.toString() !== userId.toString() ) {
            return res.status(401).json({
                message : "Unauthorized : You can only delete your own posts"
            })
        }

        if( post.images ) {
            //delete images from cloudinary
            post.images.forEach((image) => {
                const img_id = image.split("/").pop().split(".")[0]
                cloudinary.uploader.destroy(img_id)
            })
        }

        await Post.findByIdAndDelete(postId)
        await User.findByIdAndUpdate(userId, { $pull : { posts : postId }})

        return res.status(200).json({
            message : "Post deleted successfully & User updated successfully",
            success : true
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while deleting post"
        })

    }

}

const updatePost = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

const likePost = async (req, res) => {
    try {
        const { id: postId } = req.params; // Post ID from route params
        const { userId } = req.body; // User ID from request body

        console.log(postId, userId);

        // Fetch post and user details in parallel
        const [post, user] = await Promise.all([
            Post.findById(postId),
            User.findById(userId),
        ]);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or user not found' });
        }

        const isAlreadyLiked = post.likes.includes(userId);

        if (isAlreadyLiked) {
            // Unlike post
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: userId },
            });

            return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            // Like post
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: userId },
            });

            // Check if the post author is liking the post for creating notification purpose 
            if( post.user.toString() !== userId.toString() ) {
                
                //Create notification here 
                const existingNotification = await Notification.findOne({
                    post: postId,
                    type: 'like',
                    from: userId,
                });
    
                if (existingNotification) {
                    existingNotification.createdAt = new Date();
                    await existingNotification.save();
                } else {
                    // Create a new like notification
                    const newNotification = new Notification({
                        type: 'like',
                        from: user._id, // Use ObjectId for 'from'
                        to: [post.user], // 'to' expects an array of ObjectId(s)
                        post: post._id,
                    });
    
                    await newNotification.save();
                }
    
                // Emit notification via Socket.IO
                req.io.to(post.user.toString()).emit('NEW_ELYSIAN_NOTIFICATION', {
                    type: 'like',
                    from: {
                        _id: user._id,
                        profilePic: user.profilePic,
                        fullname: user.fullname, // Assuming `fullname` exists in the user schema
                    },
                    to: post.user,
                    post: post._id,
                    createdAt: new Date().toISOString(),
                });

            }
            

            return res.status(200).json({ message: 'Post liked successfully' });
        }
    } catch (error) {
        console.error('Error in likePost:', error);

        return res.status(500).json({
            message: 'Something went wrong while liking the post',
        });
    }
};

const commentPost = async (req, res) => {

    try {

        const { text, userId } = req.body
        const { id : postId } = req.params

        if( !text ) {
            return res.status(400).json({
                message : "Comment text is required"
            })
        }

        const post = await Post.findById(postId)

        if( !post ) {
            return res.status(400).json({
                message : "Post not found"
            })
        }

        const user = await User.findById(userId)

        if( !user ) {
            return res.status(400).json({
                message : "User not found"
            })
        }

        const comment = {
            user : userId,
            text,
            userImage : user.profilePic,
            commentedUsername : user.fullname
        }

        post.comments.push(comment)
        await post.save()

        return res.status(201).json({
            message : "Comment created successfully",
            post
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while commenting on post"
        })

    }

}

const commentReplyPost = async (req, res) => {

    try {

        const { id : postId } = req.params
        const { text, userId, commentId } = req.body

        const [ post, user] = await Promise.all([
            Post.findById(postId),
            User.findById(userId)
        ])

        if ( !post || !user ) {

            return res.status(404).json({
                message : "Post or user not found"
            })

        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId)

        if ( !comment ) {

            return res.status(404).json({
                message : "Comment not found"
            }) 

        }

        const reply = {
            text,
            user : userId,  
            userImage : user.profilePic,
            commentedUsername : user.fullname
        }

        comment.replies.push(reply)
        await post.save()

        return res.status(201).json({
            message : "Reply created successfully"
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while replying on a comment of a particular post"
        })

    }

}

const deleteComment = async (req, res) => {
    
    try {
        
        const { id : postId } = req.params
        const { commentId, userId } = req.body

        const post = await Post.findById(postId)

        if( !post ) {
            return res.status(400).json({
                message : "Post not found"
            })
        }

        const user = await User.findById(userId)

        if( !user ) {
            return res.status(400).json({
                message : "User not found"
            })
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId)

        if( !comment ) {
            return res.status(400).json({
                message : "Comment not found"
            })
        }

        if( user._id.toString() !== comment.user.toString() ) {
            return res.status(400).json({
                message : "You are not authorized to delete this comment"
            })
        }

        


    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while deleting comment"
        })

    }

}

const likeComment = async (req, res) => {
    
    try {
        
        const { id : postId } = req.params
        const { commentId, userId } = req.body

        const [ post, user ] = await Promise.all([
            Post.findById(postId),
            User.findById(userId)
        ])

        if( !post || !user ) {
            return res.status(400).json({
                message : "Post or user not found"
            })
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId)

        if( !comment ) {
            return res.status(400).json({
                message : "Comment not found"
            })
        }

        if( comment.likes.includes(user._id) ) {
            comment.likes = comment.likes.filter(like => like.toString() !== user._id.toString())
            await post.save()
            return res.status(200).json({
                message : "Comment unliked successfully"
            })
        } else {
            comment.likes.push(user._id)
            await post.save()
            return res.status(200).json({
                message : "Comment liked successfully"
            })
        }

        

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while liking comment"
        })      

    }

}

const likeCommentReply = async (req, res) => {
    
    try {
        
        const { id : postId } = req.params
        const { commentId, replyId, userId } = req.body 

        const [ post, user ] = await Promise.all([
            Post.findById(postId),
            User.findById(userId)
        ])

        if ( !post || !user ) {
            return res.status(400).json({
                message : "Post or user not found"
            })
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId)

        if ( !comment ) {
            return res.status(400).json({
                message : "Comment not found"
            })
        }

        const reply = comment.replies.find(reply => reply._id.toString() === replyId)

        if ( !reply ) {
            return res.status(400).json({
                message : "Reply not found"
            })
        } 

        if ( reply.likes.includes(user._id) ) {
            reply.likes = reply.likes.filter(like => like.toString() !== user._id.toString())
            await post.save()
            return res.status(200).json({
                message : "Reply unliked successfully",
                post,
            })
        } else {
            reply.likes.push(user._id)
            await post.save()
            return res.status(200).json({
                message : "Reply liked successfully",
                post,
            })
        }

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while liking comment reply"
        })

    }

}

const savePost = async (req, res) => {
    
    try {

        const { id : postId } = req.params
        const post = await Post.findById(postId)
        const user = await User.findById(req.user._id)

        if (!post) {
            return res.status(400).json({
                message: "Post not found",
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        if (user.savedPosts.includes(post._id)) {

            await User.updateOne(
                { _id : user._id },
                { $pull : { savedPosts : post._id }} 
            )

            return res.status(200).json({
                message : "Post unsaved successfully"
            })
    
        } else {

            await User.updateOne(
                { _id : user._id },
                { $push : { savedPosts : post._id } }
            )

            return res.status(200).json({
                message : "Post saved successfully"
            })
        }
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while saving post"
        })

    }

}

const getPost = async (req, res) => {

    try {
        
        const { id } = req.params
        const post = await Post.findById(id).populate({
            path : "user",
            select : "-password"
        })

        if( !post ) {
            return res.status(404).json({
                message : "Post not found"
            })
        } else {
            return res.status(200).json({
                message : "Post found successfully",
                post
            })
        }

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while fetching post"
        })

    }

}

const getAllPosts = async (req, res) => {
    try {
        const { userId } = req.body;
        const { page, limit } = req.query;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Fetch the total number of posts for the current user and their following
        const totalPosts = await Post.countDocuments({
            user: { $in: [user._id, ...user.following] },
        });

        // Fetch posts of the current user and their following
        const posts = await Post.find({ user: { $in: [user._id, ...user.following] } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            })
            .populate({
                path: "comments.replies.user",
                select: "-password",
            })
            .populate({
                path: "sharedPost",
                populate: {
                    path: "user",
                    select: "profilePic fullname createdAt", // Nested population for sharedPost.user
                },
            });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts || [],
            totalPosts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalPosts / limit),
            hasMore: parseInt(page) <= Math.ceil(totalPosts / limit),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong while fetching posts",
        });
    }
};


const getUserPosts = async (req, res) => {

    try {
        
        // const { id } = req.params

        // const user = await User.findById(id)

        // if( !user ) {
        //     return res.status(404).json({
        //         message : "User not found"
        //     })
        // }

        // const posts = await Post.find({ user : id }).sort({ createdAt : -1 }).populate({
        //     path : "user",
        //     select : "-password"
        // }).populate({
        //     path : "comments.user",
        //     select : "-password"
        // })

        // return res.status(200).json({
        //     posts
        // })

    } catch (error) {
        
    }

}

const getFollowingPosts = async (req, res) => {

    try {

        const userId = req.user._id

        const user = await User.findById(userId)

        if( !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        const following = user.following

        const feedPosts = await Post.find({ 
            user : { $in : following } 
        }).sort({ createdAt : -1 })
        .populate({
            path : "user",
            select : "-password"
        })
        .populate({ 
            path : "comments.user", 
            select : "-password" 
        })

        return res.status(200).json(feedPosts)

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while fetching posts"
        })

    }
}

const getProfilePosts = async (req, res) => {

    try {

        const { postIds } = req.body
        console.log(req.body);
        
        const posts = await Post.find({ _id : { $in : postIds } }).sort({ createdAt : -1 })

        return res.status(200).json({
            message : "Posts fetched successfully",
            posts
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong while fetching posts"
        })
    }

}

const getSearchSuggestions = async (req, res) => {

    try {
        
        const {query} = req.params
        const userNames = await User.find({
            $or : [
                { fullname : { $regex : query, $options : "i" } },
                { username : { $regex : query, $options : "i" } }
            ]
        }).select("_id fullname")

        const uniqueUsernames = [...new Set(userNames)];

        return res.status(200).json({
            message : "Users fetched successfully",
            uniqueUsernames
        })

    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong while fetching posts"
        })
    }

}

const getPostSearchResults = async (req, res) => {
    try {
        const { query } = req.params; // Get the query from the request parameters
        console.log(query);

        // Search for posts where the text contains the query or the hashtags array contains the query
        const posts = await Post.find({
            $or: [
                { text: { $regex: query, $options: "i" } }, // Case-insensitive match for the text field
                { hashTags: { $regex: query, $options: "i" } }, // Case-insensitive match within the hashTags array
            ],
        }).populate("user"); // Populate relevant fields if needed

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong while fetching posts",
            error: error.message,
        });
    }
};




export { createPost, deletePost, getPost, getAllPosts, updatePost, likePost, commentPost, commentReplyPost, likeComment, likeCommentReply, savePost, getUserPosts, getFollowingPosts, getProfilePosts, getSearchSuggestions, getPostSearchResults};