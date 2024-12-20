import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function PostCreation ({ postCreation, setPostCreation }) {

    const [active1, setActive1] = useState(true)
    const [active2, setActive2] = useState(false)

  return (
    <div className={`${postCreation ? 'blur-0 opacity-100 sclae-100' : 'blur-xl opacity-0 scale-0'} duration-300 ease-in-out w-full fixed top-[70px] z-40 bg-black/20 backdrop-blur-sm`}>
        <div 
            className='w-full h-[calc(100vh-70px)] flex items-center justify-center'
            onClick={() => setPostCreation(false)}
        >
            <div className={`w-auto min-w-[330px] min-h-[220px] bg-white flex flex-col gap-4 items-center justify-center rounded-3xl`}>
                <NavLink to={'/post/story'} 
                onClick={() => setPostCreation(false)}
                className={({isActive}) => {
                    isActive ? setActive1(true) : setActive1(false)
                    return `${isActive ? ' bg-[#232323] text-blue-500' : ' text-[#232323] hover:bg-[#efefef] duration-200 ease-in-out '} flex flex-row gap-6 px-8 py-3 rounded-2xl max-w-[300px]`
                }}>
                    <div className='flex items-center'>
                        <svg className='ml-[10px]' xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill={active1 ? "#2875af" : "#232323"} stroke={active1 ? "#2875af" : "#232323"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gallery-horizontal-end"><path d="M2 7v10"/><path d="M6 5v14"/><rect width="12" height="18" x="10" y="3" rx="2"/></svg>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='radio font-semibold '>
                            STORY
                        </div>
                        <div className={`${active1 ? 'text-white' : 'text-[#232323]'} radio text-[0.85rem]`}>
                            Share content that disappears after 24 hours
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/post/create'} 
                onClick={() => setPostCreation(false)}
                className={({isActive}) => {
                    isActive ? setActive2(true) : setActive2(false)
                    return `${isActive ? ' bg-[#232323] text-blue-500' : ' text-[#232323] hover:bg-[#efefef] duration-200 ease-in-out '} flex flex-row gap-6 px-8 py-3 rounded-2xl max-w-[300px]`
                }}>
                    <div className='flex items-center'>
                        <svg className='ml-[10px]' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill={active2 ? "#2875af" : "#232323"} stroke={active2 ? "#2875af" : "#232323"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-milestone"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v8"/><path d="M12 3v3"/></svg>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <div className='radio font-semibold'>
                        POST
                        </div>
                        <div className={`${active2 ? 'text-white' : 'text-[#232323]'} radio text-[0.85rem]`}>
                            Share moment with your followers
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default PostCreation