import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DeleteComment from './DeleteComment'
import { useSelector } from 'react-redux'

import ReplyText from './ReplyText'
import ReplyCard from './ReplyCard'
import { useTheme } from '../../../context/contextAPI'

function CommentCard ({comment, index, postId, postAuthorId, allComments, setAllComments, fetchAndSetComments, handleCommentReply}) {

    const {theme} = useTheme()
    const user = useSelector(state => state.auth.user)
    const deleteComment = useSelector(state => state.deleteComment)

    //Handling Comment Likes
    const [ commentLiked, setCommentLiked ] = useState(false)
    const [ deleteDropdown, setDeleteDropdown ] = useState(false)

    useEffect(() => {
        setCommentLiked(comment.likes.includes(user._id))
    }, []) 

    const handleCommentLike = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/comment/like/${postId}`, { userId : user._id, commentId : comment._id })
        fetchAndSetComments()
    }

  return (
    <>
        <div 
            key={index} 
            className='flex flex-col h-auto rounded-xl relative pl-[6px] z-10'
        >

            <div className='h-auto'
            style={{width : 'fit-content'}}>
                <div className='flex flex-row items-center gap-2 group'>
                    <div className='flex flex-row items-center bg-[#dddddd] dark:bg-[#272727] py-2 rounded-2xl min-w-[190px]' style={{
                        width : 'fit-content',
                    }}>
                        <Link className='w-[70px] h-[40px] flex justify-center rounded-full group ease-in-out'>
                            <img src={comment.userImage} alt="" className='w-[40px] h-[40px] object-cover object-center rounded-full group-hover:ring-2 group-hover:ring-blue-500 duration-200 ease-in-out'/>
                        </Link>
                        <div className='flex flex-col justify-center w-[calc(100%-70px)]'>
                            <Link className='text-[0.95rem] kanit hover:underline decoration-blue-500 dark:text-[#efefef] dark:font-light duration-200 ease-in-out'>{comment.commentedUsername}</Link>
                            <div className='text-[0.85rem] dark:text-white radio pt-1 pr-4'>{comment.text}</div>
                        </div>
                    </div>
                    <div className='p-2 rounded-full group-hover:bg-[#dddddd] dark:group-hover:bg-[#303030] duration-200 ease-in-out cursor-pointer'
                    >
                        {/* <DeleteComment 
                            commentId={comment._id}
                            commentAuthorId={comment.user?._id}
                            postId={postId}
                            postAuthorId={postAuthorId}
                            userId={user._id}
                            allComments={allComments}
                            setAllComments={setAllComments}
                            fetchAndSetComments={fetchAndSetComments}
                            deleteDropdown={deleteDropdown}
                            setDeleteDropdown={setDeleteDropdown}
                        /> */}
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke={theme === 'dark' ? '#ffffff' : '111111'} stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    </div>
                </div>

                <div className='flex flex-row gap-10 justify-end mr-[50px] text-[0.75rem] radio'>
                    <div className={`${commentLiked ? 'text-blue-600' : 'text-[#232323] dark:text-[#efefef]'} cursor-pointer`}
                        onClick={() => {
                            setCommentLiked(!commentLiked)
                            handleCommentLike(comment._id, comment.user)
                        }}
                    ><span>{comment.likes.length}</span> Like</div>
                    <div className='cursor-pointer text-[#232323] dark:text-[#efefef]'
                        onClick={() => {
                            handleCommentReply(comment._id, comment.user)
                        }}
                    >Reply</div>
                </div>
            </div>

            {
                comment.replies?.length > 0 ? 
                <div className='flex flex-col gap-2 pt-2 pl-12 relative mb-[10px]'>
                    <div className='absolute h-[calc(100%)] -mt-[30px] w-[1.5px] rounded-full bg-[#cccccc] dark:bg-[#454545] -z-10 '/>
                    {
                        comment.replies.map((reply, index) => (
                            <ReplyCard 
                                key={index} 
                                reply={reply} 
                                deleteDropdown={deleteDropdown}
                                setDeleteDropdown={setDeleteDropdown}
                                handleCommentReply={handleCommentReply}
                                commentId={comment._id}
                                postId={postId}
                                fetchAndSetComments={fetchAndSetComments}
                            />
                        ))
                    }
                </div>
                : <div className='mb-[10px]'/>
            }
        </div>
    </>
  )
}

export default CommentCard