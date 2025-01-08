import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import ReplyText from './ReplyText'
import { useTheme } from '../../../context/contextAPI'

function ReplyCard ({reply, index, deleteDropdown, setDeleteDropdown, handleCommentReply, commentId, postId, fetchAndSetComments}) {

    const { theme } = useTheme()
    const user = useSelector(state => state.auth.user)

    //Handling Reply Likes
    const [ replyLiked, setReplyLiked ] = useState(false)

    useEffect(() => {
        setReplyLiked(reply.likes.includes(user._id))
    }, [])

    const handleReplyLike = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/comment/reply/like/${postId}`, { userId : user._id, commentId, replyId : reply._id })
        fetchAndSetComments()
    }

  return (
    <>
        <div key={index} className='flex flex-col rounded-xl ml-[10px] relative'>
            <div className='absolute -left-[10px] h-[1.5px] w-[10px] bg-[#cccccc] dark:bg-[#454545] top-[40%]'/>
            <div className='h-auto'
            style={{width : 'fit-content'}}>
                <div className='flex flex-row items-center gap-2 group'>
                    <div className='flex flex-row items-center bg-[#dddddd] dark:bg-[#303030] py-2 rounded-2xl min-w-[190px]' style={{
                        width : 'fit-content',
                    }}>
                        <Link className='w-[70px] h-[40px] flex justify-center rounded-full group ease-in-out'>
                            <img src={reply.userImage} alt="" className='w-[40px] h-[40px] object-cover object-center rounded-full group-hover:ring-2 group-hover:ring-blue-500 duration-200 ease-in-out'/>
                        </Link>
                        <div className='flex flex-col justify-center w-[calc(100%-70px)]'>
                            <Link className='text-[0.95rem] kanit hover:underline decoration-blue-500 dark:text-[#efefef] dark:font-light duration-200 ease-in-out'>{reply.commentedUsername}</Link>
                            <div className='text-[0.85rem] radio pt-1 pr-4 dark:text-white'><ReplyText text={reply.text} /></div>
                        </div>
                    </div>
                    <div className='p-2 rounded-full group-hover:bg-[#dddddd] dark:group-hover:bg-[#303030] duration-200 ease-in-out cursor-pointer'
                        onClick={() => {
                            setDeleteDropdown(!deleteDropdown)
                        }}
                    >
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    </div>
                </div>
                <div className='flex flex-row gap-10 justify-end mr-[50px] text-[0.75rem] radio'>
                    <div className={`${replyLiked ? 'text-blue-500' : 'text-[#232323] dark:text-[#efefef]'} cursor-pointer`}
                        onClick={() => {
                            setReplyLiked(!replyLiked)
                            handleReplyLike()
                        }}
                    ><span>{reply.likes.length}</span> Like</div>
                    <div className='cursor-pointer text-[#232323] dark:text-[#efefef] '
                        onClick={() => {
                            handleCommentReply(commentId, reply.user, )
                        }}
                    >Reply</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ReplyCard