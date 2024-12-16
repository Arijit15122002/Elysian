import Story from "../Models/story.model.js"
import StoriesContainer from "../Models/storiescontainer.model.js"
import User from "../Models/user.model.js"

import mongoose from "mongoose"
import { v2 as cloudinary } from "cloudinary"
import pLimit from 'p-limit'


const limit = pLimit(10)
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

export const createStory = async (req, res) => {
    try {
        const { userId, type, image, video, caption, text, fontFamily, fontColor, fontSize, textAlignment, backgroundColor } = req.body;

        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Validate story type
        if (!["imageStory", "videoStory", "textStory"].includes(type)) {
            return res.status(400).json({
                message: "Invalid story type. Must be 'imageStory', 'videoStory', or 'textStory'.",
            });
        }

        // Validate required fields based on type
        if (type === "imageStory" && !image) {
            return res.status(400).json({ message: "An image is required for an imageStory." });
        }
        if (type === "videoStory" && !video) {
            return res.status(400).json({ message: "A video is required for a videoStory." });
        }
        if (type === "textStory" && !text) {
            return res.status(400).json({ message: "Text is required for a textStory." });
        }

        // Upload media to Cloudinary if required
        let uploadedMedia = null;
        if (type === "imageStory" && image) {
            const result = await cloudinary.uploader.upload(image);
            uploadedMedia = result.url;
        } else if (type === "videoStory" && video) {
            const result = await cloudinary.uploader.upload(video, { resource_type: "video" });
            uploadedMedia = result.url;
        }

        // Construct the story object
        const storyData = {
            user: userId,
            type,
            image: type === "imageStory" ? uploadedMedia : "",
            video: type === "videoStory" ? uploadedMedia : "",
            caption,
            text,
            fontFamily,
            fontColor,
            textAlignment,
            fontSize,
            backgroundColor: backgroundColor || (type === "textStory" ? "#232323" : ""),
            createdAt: new Date(),
        };

        const story = new Story(storyData);

        // Save the story
        const savedStory = await story.save();

        //Finding the Stories container to add the new Story
        let storyContainer = await StoriesContainer.findOne({ user: userId });
        if (!storyContainer) {
            // Create a new StoriesContainer if it doesn't exist, and then push the new story
            const newStoryContainerData = {
                user: userId,
                storyArray: [savedStory._id],
            }

            storyContainer = new StoriesContainer(newStoryContainerData);
        } else {
            //Find the container and push the story inside it 
            storyContainer.storyArray.push(savedStory._id)
        }

        const savedStoryContainer = await storyContainer.save();

        // Add the story to the user's `stories` attribute
        user.stories.push(savedStory._id);

        user.stories.map((story) => {
            const foundStory = Story.findById(story)
            if (!foundStory) {
                user.stories.pull(story)
            }
        })
        await user.save();

        // Populate the user's stories and return the response
        const userWithStories = await User.findById(userId).populate("stories");

        return res.status(201).json({
            message: "Story created successfully.",
            user: userWithStories,
            story : savedStory,
            success: true
        });
    } catch (error) {
        console.error("Error in createStory: ", error);
        return res.status(500).json({
            message: "Something went wrong while creating the story.",
            error: error.message,
            success: false
        });
    }
};


export const getUserStories = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const userStoriesContainer = await StoriesContainer.findOne({ user: userId }).populate("storyArray user");

        const userStoriesContainerWithUser = [{...userStoriesContainer, user}]

        // Respond with valid stories
        return res.status(200).json({
            message: "User stories fetched successfully.",
            storyContainer: userStoriesContainer,
            success: true
        });

        } catch (error) {
        console.error("Error fetching user stories:", error);
        return res.status(500).json({
            message: "An error occurred while fetching user stories.",
            success: false
        });
    }
};


export const getFollowingsLastUploadedStories = async (req, res) => {
    try {
        const { userId } = req.params;
        const { page, limit } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;

        // Find the user to get the list of followings
        const user = await User.findById(userId).select('following');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const followingIds = user.following.map(id => new mongoose.Types.ObjectId(id));

        // Parallelize the aggregation and total count
        const [followingsLastStories, totalFollowings] = await Promise.all([
            StoriesContainer.aggregate([
                {
                    $match: { user: { $in: followingIds } }
                },
                {
                    $lookup: {
                        from: "stories",
                        localField: "storyArray",
                        foreignField: "_id",
                        as: "stories"
                    }
                },
                { $unwind: "$stories" },
                { $sort: { "stories.createdAt": -1 } }, // Sort stories by date
                {
                    $group: {
                        _id: "$user", // Group by user to get the latest story of each following
                        lastStory: { $first: "$stories" } // Get the latest story per user
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                },
                { $unwind: "$userDetails" },
                {
                    $project: {
                        _id: 0,
                        user: "$userDetails",
                        lastStory: 1
                    }
                },
                { $sort: { "lastStory.createdAt": -1 } }, // Sort by the most recent story globally
                { $skip: skip }, // Pagination skip
                { $limit: limitNumber } // Pagination limit
            ]),

            StoriesContainer.aggregate([
                {
                    $match: { user: { $in: followingIds } }
                },
                {
                    $group: { _id: "$user" } // Count the unique users with at least one story
                },
                { $count: "totalFollowings" } // Count the total unique users
            ])
        ]);

        const totalFollowingsCount = totalFollowings.length ? totalFollowings[0].totalFollowings : 0;
        const totalPages = Math.ceil(totalFollowingsCount / limitNumber);
        const hasMore = pageNumber < totalPages;

        return res.status(200).json({
            message: "Followings stories fetched successfully",
            followingsLastStories,
            currentPage: pageNumber,
            totalPages,
            hasMore
        });
    } catch (error) {
        console.error("Error in getFollowingsLastUploadedStories:", error);
        return res.status(500).json({ message: "Something went wrong while getting followings' stories" });
    }
};


export const getAllFollowingStories = async (req, res) => {

    try {

        const { userId } = req.params;
        const { exceptUserId } = req.body;
        const { page, limit } = req.query;
        console.log(exceptUserId);

        const user = await User.findById(userId)

        if(  !user ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        const followingIds = user.following

        const totalStories = await StoriesContainer.countDocuments({
            user: { $in: followingIds },
        });

        const followingStories = await StoriesContainer.find({
            user : {
                $in : followingIds
            }
        })
        .sort({
            updatedAt: -1, // Sort by container's updatedAt first
            "storyArray.updatedAt": -1  // Then by the last story's updatedAt})
        })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate({
            path : "user",
            select : "_id fullname username profilePic"
        })
        .populate({
            path : "storyArray",
            select : "-user"
        })

        return res.status(200).json({   
            message : "Following stories fetched successfully",
            followingStories,
            totalStories,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalStories / limit),
            hasMore : parseInt(page) <= Math.ceil(totalStories / limit)
        })



        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Something went wrong while getting all following stories"
        })
    }

}


































export const cleanStoriesContainer = async () => {
    try {
        // Find all StoriesContainer documents
        const containers = await StoriesContainer.find();

        for (const container of containers) {
            const validStoryIds = await Story.find({ _id: { $in: container.storyArray } }).select('_id');
            const validIds = validStoryIds.map((story) => story._id.toString());

            // Filter the storyArray to include only valid IDs
            const updatedStoryArray = container.storyArray.filter((storyId) =>
                validIds.includes(storyId.toString())
            );

            if (updatedStoryArray.length === 0) {
                // If no valid stories remain, delete the StoriesContainer
                await StoriesContainer.deleteOne({ _id: container._id });
                console.log(`Deleted empty StoriesContainer: ${container._id}`);
            } else if (updatedStoryArray.length !== container.storyArray.length) {
                // If the storyArray has changed, update the StoriesContainer
                container.storyArray = updatedStoryArray;
                await container.save();
                console.log(`Updated StoriesContainer: ${container._id}`);
            }
        }
    } catch (error) {
        console.error('Error during StoriesContainer cleanup:', error);
    }
};

export const cleanStoryFromUser = async () => {
    try {
        const users = await User.find();

        for (const user of users) {
            const validStoryIds = await Story.find({ _id: { $in: user.stories } }).select('_id');
            const validIds = validStoryIds.map((story) => story._id.toString());

            // Filter the stories to include only valid IDs
            const updatedStories = user.stories.filter((storyId) =>
                validIds.includes(storyId.toString())
            );

            if( updatedStories.length === user.stories.length ) {
                console.log("");
            } else {
                user.stories = updatedStories;
                await user.save();
                console.log(`Updated User: ${user._id}`);
            }
        }
    } catch (error) {
        console.error('Error during Story cleanup from User Objects:', error);
    }
}