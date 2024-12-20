import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,
        unique : true
    },

    fullname : {
        type : String,
        required : true
    }, 

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            default : []
        }
    ],

    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            default : []
        }
    ],

    profilePic : {
        type : String,
        default : ''
    },

    coverPic : {
        type : String,
        default : ''
    },

    bio : {

        description: {
            type: String,
            default: ''
        },
        dob: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        work: {
            offices: [
                {
                    name: {
                        type: String,
                        default: ''
                    },
                    designation: {
                        type: String,
                        default: ''
                    }
                }
            ]
        },
        education: {
            schools: [
                {
                    type: String,
                    default: ''
                }
            ],
            colleges: [
                {
                    name: {
                        type: String,
                        default: ''
                    }, 
                    degree: {
                        type: String,
                        default: ''
                    }
                }
            ]
        },
        interests: {
            type: [String],
            default: []
        }

    },

    links: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        default: []
    }, 

    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        }
    ],

    savedPosts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Post',
        }
    ],

    stories : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Story'
        }
    ], 

    savedStories : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Story'
        }
    ]

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User