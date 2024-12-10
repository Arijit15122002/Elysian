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

        const { user, postType, message, images, hashTags, taggedPeople, checkIn, backgroundColor, feelingActivity } = req.body

        const rightUser = await User.findById(user._id)

        if( !rightUser ) {
            return res.status(404).json({
                message : "User not found"
            })
        }   

        if( !message && !images ) {
            return res.status(400).json({
                message : "Post text or image is required"
            })
        }

        const imageURLs = []

        if( images ) {
            const imagesToUpload = images.map((image) => {
                return limit( async() => {
                    const result = await cloudinary.uploader.upload(image)
                    return result
                })
            })

            let uploads = await Promise.all(imagesToUpload)
            uploads.forEach((upload) => {
                imageURLs.push(upload.secure_url)
            })
        }

        const post = new Post({
            postType,
            user,
            text : message,
            images : imageURLs,
            likes : [],
            comments : [],
            hashTags,
            taggedPeople,
            checkIn,
            backgroundColor,
            feelingActivity
        })

        await post.save()

        await User.findByIdAndUpdate(user._id, {
            $push : { posts : post._id }
        })

        return res.status(201).json({
            message : "Post created successfully",
            post
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while creating post"
        })

    }

}

const deletePost = async (req, res) => {

    try {

        const { id } = req.params
        const post = await Post.findById(id)

        if( !post ) {
            return res.status(404).json({
                message : "Post not found"
            })
        }

        if( post.user.toString() !== req.user._id.toString() ) {
            return res.status(401).json({
                message : "Unauthorized : You can only delete your own posts"
            })
        }

        if( post.image ) {
            const img_id = post.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(img_id)
        }

        await Post.findByIdAndDelete(id)

        return res.status(200).json({
            message : "Post deleted successfully"
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

        const { id : postId } = req.params
        const { userId } = req.body;

        console.log(postId, userId);
        
        const [post, user] = await Promise.all([
            Post.findById(postId),
            User.findById(userId),
        ]);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or user not found' });
        }

        const isAlreadyLiked = post.likes.includes(userId);

        if (isAlreadyLiked) {
            await Post.findByIdAndUpdate(postId, {
                $pull: { likes: userId },
            });
            
            return res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            await Post.findByIdAndUpdate(postId, {
                $push: { likes: userId },
            });

            return res.status(200).json({ message: 'Post liked successfully' });
        }
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while liking post"
        })

    }

}

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

        const posts = await Post.find().sort({ createdAt : -1 }).populate({
            path : "user",
            select : "-password"
        }).populate({ 
            path : "comments.user", 
            select : "-password" 
        }).populate({
            path : "comments.replies.user",
            select : "-password"
        })

        if( posts.length === 0 ) {
            return res.status(404).json([])
        } else {
            return res.status(200).json(posts)
        }
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while fetching posts"
        })

    }

}

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

        const {query} = req.params
        
        const posts = await Post.find({
            $or : [
                {
                    text : { $regex : query, $options : "i" },
                    hashTags : { $regex : query, $options : "i" }
                }
            ]
        })
        
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

export { createPost, deletePost, getPost, getAllPosts, updatePost, likePost, commentPost, commentReplyPost, likeComment, likeCommentReply, savePost, getUserPosts, getFollowingPosts, getProfilePosts, getSearchSuggestions, getPostSearchResults };