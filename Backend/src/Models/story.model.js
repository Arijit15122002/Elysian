import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }, 

    images : {
        type : String
    },

    caption : {
        type : String,
    },

    text : {
        type : String,
    },

    textBackgroundColor : {
        type : String,
    },

    viewers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ], 

}, {
    timestamps : true
})

storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 })
const Story = mongoose.model('Story', storySchema)

export default Story