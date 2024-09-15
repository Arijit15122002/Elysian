import React, { useState } from 'react'

function DeleteComment ({
    commentId,
    commentAuthorId,
    postId,
    postAuthorId,
    userId,
    allComments,
    setAllComments,
    fetchAndSetComments
}) {

    const [ deleteDropDownOptions, setDeleteDropDownOptions ] = useState(false)

  return (
    <div className='relative w-full h-full z-30'
        onClick={() => {
            setDeleteDropDownOptions(!deleteDropDownOptions)
        }}
    >
        <svg className='w-[19px] h-[19px]' viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke="#232323" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke="#232323" stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke="#232323" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

        {
            deleteDropDownOptions && <div className='absolute w-[200px] h-auto rounded-xl bg-white shadow-md shadow-black/20 right-0'>
            {
                postAuthorId === userId || commentAuthorId === userId ?
                <div>
                    Yes
                </div> : 
                <div className=''>
                    <div className='flex flex-col w-[200px] h-auto gap-2 p-2 cursor-pointer'>
                        <div className='text-[0.9rem] px-6 py-2 kanit cursor-pointer hover:bg-[#dddddd] duration-200 ease-in-out rounded-lg'>Report Comment</div>
                        <div className='text-[0.9rem] px-6 py-2 kanit cursor-pointer hover:bg-[#dddddd] duration-200 ease-in-out rounded-lg'>Hide Comment</div>
                    </div>
                </div>
            }
            </div>
        }

    </div>
  )
}

export default DeleteComment