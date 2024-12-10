import mongoose from 'mongoose';

const singleStorySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['imageStory', 'videoStory', 'textStory'],
            required: true,
        },
        image: {
            type: String,
            required: function () {
                return this.type === 'imageStory';
            },
        },
        video: {
            type: String,
            required: function () {
                return this.type === 'videoStory';
            },
        },
        caption: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            required: function () {
                return this.type === 'textStory';
            }
        },
        fontFamily: {
            type: String,
            required: function () {
                return this.type === 'textStory';
            }
        },
        fontColor: {
            type: String,
            required: function () {
                return this.type === 'textStory';
            }
        },
        fontSize: {
            type: Number,
            required: function () {
                return this.type === 'textStory';
            }
        },
        textAlignment: {
            type: String,
            enum: ['left', 'center', 'right'],
            required: function () {
                return this.type === 'textStory';
            }
        },
        backgroundColor: {
            type: String,
            default: '#ffffff',
        },
        createdAt: {
            type: Date,
            default: () => new Date(),
        },
        // likes : [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User',
        //     },
        // ],
        viewers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        visibility: {
            type: String,
            enum: ['public', 'friends', 'private'],
            default: 'friends',
        },
    },
    {
        timestamps: true,
    },
);

singleStorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });
const Story = mongoose.model('Story', singleStorySchema);

export default Story;

