import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({

    type : {
        type : String,
        required : true,
        enum : ['follow', 'like', 'comment', 'tag']
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

    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User', 
        required : true,
    },

}, {

    timestamps : true

})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification