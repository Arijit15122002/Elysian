import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import DeleteComment from './DeleteComment'
import { useSelector } from 'react-redux'

import ReplyText from './ReplyText'
import ReplyCard from './ReplyCard'

function CommentCard ({comment, index, postId, postAuthorId, allComments, setAllComments, fetchAndSetComments, handleCommentReply, deleteDropdown, setDeleteDropdown }) {

    const user = useSelector(state => state.auth.user)

    //Handling Comment Likes
    const [ commentLiked, setCommentLiked ] = useState(false)

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
                    <div className='flex flex-row items-center bg-[#dddddd] py-2 rounded-2xl min-w-[190px]' style={{
                        width : 'fit-content',
                    }}>
                        <Link className='w-[70px] h-[40px] flex justify-center rounded-full group ease-in-out'>
                            <img src={comment.userImage} alt="" className='w-[40px] h-[40px] object-cover object-center rounded-full group-hover:ring-2 group-hover:ring-blue-500 duration-200 ease-in-out'/>
                        </Link>
                        <div className='flex flex-col justify-center w-[calc(100%-70px)]'>
                            <Link className='text-[1rem] kanit hover:underline decoration-blue-500 duration-200 ease-in-out'>{comment.commentedUsername}</Link>
                            <div className='text-[0.85rem] radio pt-1 pr-4'>{comment.text}</div>
                        </div>
                    </div>
                    <div className='p-2 rounded-full group-hover:bg-[#dddddd] duration-200 ease-in-out cursor-pointer'
                    >
                        <DeleteComment 
                            commentId={comment._id}
                            commentAuthorId = {comment.user?._id}
                            postId={postId}
                            postAuthorId = {postAuthorId}
                            userId={user._id}
                            allComments={allComments}
                            setAllComments={setAllComments}
                            fetchAndSetComments={fetchAndSetComments}
                        />
                    </div>
                </div>

                <div className='flex flex-row gap-10 justify-end mr-[50px] text-[0.75rem] radio'>
                    <div className={`${commentLiked ? 'text-blue-600' : 'text-[#232323]'} cursor-pointer`}
                        onClick={() => {
                            setCommentLiked(!commentLiked)
                            handleCommentLike(comment._id, comment.user)
                        }}
                    ><span>{comment.likes.length}</span> Like</div>
                    <div className='cursor-pointer'
                        onClick={() => {
                            handleCommentReply(comment._id, comment.user)
                        }}
                    >Reply</div>
                </div>
            </div>

            {
                comment.replies?.length > 0 ? 
                <div className='flex flex-col pt-2 pl-12 relative mb-[10px]'>
                    <div className='absolute h-[calc(100%)] -mt-[30px] w-[1.5px] rounded-full bg-[#cccccc] -z-10 '/>
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