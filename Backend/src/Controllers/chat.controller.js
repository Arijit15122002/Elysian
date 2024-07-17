import Chat from '../Models/chat.model.js'
import User from '../Models/user.model.js'
import Message from '../Models/message.model.js'

import { ALERT, NEW_ATTACHEMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from '../constants/events.js'
import emitEvent from '../Utils/emitEvents.js'
import { deleteFilesFromCloudinary } from '../Utils/deleteFilesFromCloudinary.js'

export const newGroupChat = async (req, res) => {

    try {
        
        const {currentUserId, userIds, name } = req.body

        const avatar = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"

        if( !userIds || !name ) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        if( userIds.length < 2 ) {
            return res.status(400).json({
                message : "Atleast 3 users are required"
            })
        }

        const allUserIds = [...userIds, currentUserId]

        await Chat.create({
            avatar,
            name,
            groupChat: true,
            creator: currentUserId,
            members: allUserIds
        })

        emitEvent(req, ALERT, allUserIds, `Welcome to ${name} group`)

        emitEvent(req, REFETCH_CHATS, userIds, null)

        return res.status(201).json({
            message : "Group chat created successfully",
            success : true
        })

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while creating group chat",
            success : false
        })

    }

}

export const getMyChats = async (req, res) => {

    try {

        const chats = await Chat.find({ members : req.body.currentUserId }).populate({ path : "members", select : "username profilePic" })

        const transformedChats = chats.map(({_id, avatar, name, members, creator, groupChat}) => {

            const otherMember = members.filter((member) => {
                return member.toString() !== req.body.currentUserId
            })

            return {
                _id,
                avatar : groupChat ? avatar : otherMember[0].profilePic,
                name : groupChat ? name : otherMember[0].fullname,
                groupChat,
                creator,
                members 
            }
        })

        return res.status(201).json({
            success : true,
            chats : transformedChats
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Something went wrong while fetching chats",
        })
    }

}

export const addMembers = async (req, res) => {

    try {

        const { chatId, currentUserId, members } = req.body

        const chat = await Chat.findById(chatId)

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        if( !chat.groupChat ) {
            return res.status(400).json({
                message : "Only group chats can have members"
            })
        }

        if( chat.creator.toString() !== currentUserId.toString() ) {
            return res.status(403).json({
                message : "Only the creator of the group can add members"
            })
        }

        if ( !members ) {
            return res.status(400).json({
                message : "Members are required"
            })
        }

        const allNewMembers = await User.find({ _id : { $in : members } })

        chat.members.push(...allNewMembers.map(({ _id }) => _id))

        if ( chat.members.length > 100 ) {
            return res.status(400).json({
                message : "Cannot add more than 100 members"
            })
        }

        await chat.save()

        const allUsersName = allNewMembers.map((member) => member.fullname).join(", ")

        emitEvent(req, ALERT, chat.members, `${allUsersName} has been added in the group`)

        emitEvent(req, REFETCH_CHATS, chat.members, null)

        return res.status(201).json({
            message : "Members added successfully",
            success : true
        })
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while adding members",
            success : false
        })

    }

}

export const removeMember = async (req, res) => {
    
    try {
        
        const { chatId, currentUserId, userIdToRemove } = req.body

        const chat = await Chat.findById(chatId)

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        const userToRemove = await User.findById(userIdToRemove)

        if( !chat.groupChat ) {
            return res.status(400).json({
                message : "Only group chats can have members"
            })
        }

        if( chat.creator.toString() !== currentUserId.toString() ) {
            return res.status(403).json({
                message : "Only the creator of the group can remove members"
            })
        }

        if ( !userToRemove ) {
            return res.status(400).json({
                message : "User to be removed is required"
            })
        }

        if( chat.members.length <= 3 ) {
            return res.status(400).json({
                message : "Group should have atleast 3 members"
            })
        }

        if( !chat.members.includes(userIdToRemove) ) {
            return res.status(400).json({
                message : "User to be removed is not a member of the group"
            })
        }

        chat.members = chat.members.filter((member) => member._id.toString() !== userIdToRemove.toString())

        await chat.save()

        emitEvent(req, ALERT, chat.members, `${userIdToRemove.fullname} has been removed from the group`)

        emitEvent(req, REFETCH_CHATS, chat.members, null)

        return res.status(201).json({
            message : "Member removed successfully",
            success : true
        })

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while removing members",
            success : false
        })

    }

}

export const leaveGroup = async (req, res) => {

    try {

        const chatId = req.params.id
        console.log(chatId);
        
        const { currentUserId } = req.body

        const [chat, currentUser] = await Promise.all([
            Chat.findById(chatId),
            User.findById(currentUserId)
        ]) 

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        if( !chat.groupChat ) {
            return res.status(400).json({
                message : "Only group chats can have members"
            })
        }

        if( chat.creator.toString() !== currentUserId.toString() ) {
            const remainingMembers = chat.members.filter((member) => member.toString() !== currentUserId.toString())

            chat.creator = remainingMembers[0]
        }

        chat.members = chat.members.filter((member) => member._id.toString() !== currentUserId.toString())

        await chat.save()

        emitEvent(req, ALERT, chat.members, `${currentUser.fullname} has left the group`)

        return res.status(201).json({
            message : "Left group successfully",
            success : true
        })

    } catch (error) {

        return res.status(500).json({
            message : "Something went wrong while leaving group",
            success : false
        })
        
    }

}

export const sendAttachments = async (req, res) => {

    try {
        
        const { chatId, currentUserId } = req.body

        const chat = await Chat.findById(chatId)

        const currentUser = await User.findById(currentUserId)

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        const files = req.files || []

        if( files.length === 0 ) {
            return res.status(400).json({
                message : "No files found"
            })
        }

        //UPLOAD ATTACHMENTS TO CLOUDINARY
        const attachments = []

        //MESSAGE FOR DATABASE
        const messageForDB = {
            content : "",
            attachments,
            sender : currentUserId,
            chat : chatId
        }

        const message = await Message.create(messageForDB)

        // REALTIME MESSAGE
        const messageForRealTime = {
            ...messageForDB,
            sender : {
                _id : currentUser._id,
                fullname : currentUser.fullname
            }
        }

        emitEvent(req, NEW_ATTACHEMENT, chat.members, {
            message : messageForRealTime,
            chatId
        })

        emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
            chatId,
        })

        return res.status(201).json({
            message,
            success : true
        })

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while sending attachments",
            success : false
        })
        
    }

}

export const getChatDetails = async (req, res) => {

    try {

        if( req.query.populate ) {

            console.log("populating");

            const chat = await Chat.findById(req.params.id).populate('members', 'fullname profilePic').lean()

            if( !chat ) {
                return res.status(404).json({
                    message : "Chat not found"
                })
            }

            chat.members = chat.members.map(({ _id, fullname, profilePic }) => ({
                _id,
                fullname,
                profilePic
            }))

            return res.status(200).json({
                chat,
                success : true
            })

        } else {

            console.log("not populating");

            const chat = await Chat.findById(req.params.id)

            if( !chat ) {
                return res.status(404).json({
                    message : "Chat not found"
                })
            }

            return res.status(200).json({ 
                chat,
                success : true
            })   

        }
        
    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while getting chat details",
            success : false
        })

    }

}

export const renameGroup = async (req, res) => {

    try {
        
        const chatId = req.params.id
        const { name } = req.body

        const chat = await Chat.findById(chatId)

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }

        if( !name ) {
            return res.status(400).json({   
                message : "Please provide a name"
            })
        }

        if( !chat.groupChat ) {
            return res.status(400).json({
                message : "Only group chats can be renamed"
            })
        }

        if( chat.creator.toString() !== req.body.currentUserId.toString() ) {
            return res.status(403).json({
                message : "Only the creator of the group can rename the group"
            })
        }

        chat.name = name

        await chat.save()

        emitEvent(req, REFETCH_CHATS, chat.members)

        return res.status(200).json({
            message : "Group renamed successfully",
            success : true
        })

    } catch (error) {
      
        return res.status(500).json({
            message : "Something went wrong while renaming group",
            success : false
        })

    }

}

export const deleteChat = async (req, res) => {

    try {
        
        const chatId = req.params.id

        const currentUser = await User.findById(req.body.currentUserId)

        const chat = await Chat.findById(chatId)

        if( !chat ) {
            return res.status(404).json({
                message : "Chat not found"
            })
        }   

        if( !currentUser ) {
            return res.status(404).json({
                message : "User not found"
            })
        }

        const members = chat.members

        if ( chat.groupChat && chat.creator.toString() !== req.body.currentUserId.toString() ) {
            return res.status(403).json({
                message : "Only the creator of the group can delete the group"
            })
        }

        //Here we have to delete all messages as well as the attachments or files from cloudinary
        const messagesWithAttachments = await Message.find({ 
            chat : chatId,
            attachments : {
                $exists : true,
                $ne : []
            }
        })

        const public_ids = []

        messagesWithAttachments.forEach(({attachments}) => {
            attachments.forEach(({public_id}) => {
                public_ids.push(public_id)
            })
        })

        await Promise.all([

            //DELETE files from cloudinary
            deleteFilesFromCloudinary(public_ids),
            chat.deleteOne(),
            Message.deleteMany({ chat : chatId })

        ])

        emitEvent(req, REFETCH_CHATS, members)

        return res.status(200).json({
            message : "Chat deleted successfully",
            success : true
        })
 
    } catch (error) {
     
        return res.status(500).json({
            message : "Something went wrong while deleting chat",
            success : false
        })

    }

}

export const getMessages = async (req, res) => {

    try {
        
        const chatId = req.params.id

        const { page = 1 } = req.query

        const limit = 20

        const skip = (page - 1) * limit

        const [messages, totalMessagesCount] = await Promise.all([
            Message.find({chat : chatId})
                .sort({ createdAt : -1 })
                .skip(skip)
                .limit(limit)
                .populate('sender', 'fullname profilePic')  
                .lean(),
            
            Message.countDocuments({chat : chatId})
        ])

        const totalPages = Math.ceil(totalMessagesCount / limit) || 0

        return res.status(200).json({
            success : true,
            messages : messages.reverse(),
            totalPages
        })

    } catch (error) {
        
        return res.status(500).json({
            message : "Something went wrong while getting messages",
            success : false
        })

    }

}

