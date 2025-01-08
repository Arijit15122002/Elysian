import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    postPrivacy : {

        type : String,
        required : true,
        enum : ['Public', 'Private'],

    },

    postType : {
        type : String,
        required : true,
        enum : ['Own', 'Shared']
    },

    user : {

        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },

    text : {

        type : String,

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

    },

    hashTags : [
        {
            type : String
        }
    ],

    shares : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

    sharedPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post',
        required : function () {
            return this.postType === 'Shared'
        }
    }, 

}, {

    timestamps : true
    
})

const Post = mongoose.model('Post', postSchema)

export default Post