import mongoose from "mongoose";

const storiesContainerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        storyArray: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Story',
            }
        ]
    }, 
    {
        timestamps: true
    }
)

const StoriesContainer = mongoose.model('StoriesContainer', storiesContainerSchema);

export default StoriesContainer  