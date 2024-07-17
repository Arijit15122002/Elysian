import { Schema, mongoose } from 'mongoose'

const chatSchema = new Schema({

    avatar : {
        type : String,
    },

    name : {
        type : String,
        required : true
    }, 

    groupChat : {
        type : Boolean,
        default : false
    },

    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    
    members : [
        {
            type : Schema.Types.ObjectId,
            ref : 'User',
        },
    ]

}, {
    timestamps : true
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat