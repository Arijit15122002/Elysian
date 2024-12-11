import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({

    type : {
        type : String,
        required : true,
        enum : ['post', 'follow', 'like', 'comment', 'tag']
    },

    read : {
        type : Boolean,
        default : false
    },

    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true,
    },

    to : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User', 
            required : true,
        }
    ],

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required: function () {
            return this.type === 'like' || this.type === 'comment' || this.type === 'tag' || this.type === 'post';
        },
    }, 

    taggedPeople: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: function () {
                return this.type === 'tag';
            },
        },
    ],

}, {

    timestamps : true

})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification