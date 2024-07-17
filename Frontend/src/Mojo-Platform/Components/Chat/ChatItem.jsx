import React from 'react'
import { Link } from 'react-router-dom'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    lastMessage,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChatOpen,
}) => {
    return (
        <Link to={`/chat/${_id}`}>
            <div className='flex p-1 '>
                
            </div>
        </Link>
    )
}

export default ChatItem