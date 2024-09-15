import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    postType : {

        type : String,
        required : true,
        enum : ['Public', 'Private'],

    },

    user : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },

    text : {

        type : String,
        required : true

    },

    images : [
        {
            type : String
        }
    ],

    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],

    comments : [
        {
            text : {
                type : String,
                required : true
            }, 

            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },

            userImage : {
                type : String,
                required : true
            }, 

            likes : [
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'User',
                }
            ],

            commentedUsername : {
                type : String,
                required : true
            }, 

            replies : [
                {
                    text : {
                        type : String,
                        required : true
                    }, 

                    user : {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'User',
                        required : true
                    },

                    userImage : {
                        type : String,
                        required : true
                    },

                    likes : [
                        {
                            type : mongoose.Schema.Types.ObjectId,
                            ref : 'User',
                        }
                    ],

                    commentedUsername : {
                        type : String,
                        required : true
                    }, 
                }
            ]

        }
    ],

    taggedPeople : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],

    checkIn : {

        type : String,

    },

    backgroundColor : {
        
        type : String

    },

    feelingActivity : {

        type : String

    }

}, {

    timestamps : true
    
})

const Post = mongoose.model('Post', postSchema)

export default Post