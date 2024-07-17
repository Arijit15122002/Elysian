import { Schema, mongoose } from 'mongoose'

const messageSchema = new Schema({

    chat : {
        type : Schema.Types.ObjectId,
        ref : 'Chat',
        required : true
    },

    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    message : {
        type : String,
    },

    attachments : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ]

}, {
    timestamps : true
})

const Message = mongoose.model('Message', messageSchema)

export default Message