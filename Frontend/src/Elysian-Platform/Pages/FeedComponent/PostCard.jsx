import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Carousel from '../../Components/Carousel/Carousel' 

import moment from 'moment'
import CommentBox from '../Posts/CommentBox'


function PostCard ({ post }) {

    const user = useSelector(state => state.auth.user)
    const deviceType = useSelector(state => state.device.deviceType)

    const creationDate = moment(post.createdAt)
    let formattedTime = creationDate.fromNow()


    //HANDLING LIKES
    const [ likedPost, setLikedPost ] = useState(false)

    const [ likeCount, setLikeCount ] = useState(0)

    useEffect(() => {
        setLikeCount(post.likes.length)
        if(post.likes.includes(user._id)) {
            setLikedPost(true)
        } else {
            setLikedPost(false)
        }
    }, [post])

    useEffect(() => {
        const fetchAndSetLikes = async () => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/likes/${post._id}`)
            setLikeCount(response?.data?.post?.likes?.length)
            setCommentCount(response?.data?.post?.comments?.length)
        }

        fetchAndSetLikes()
    }, [post, likedPost])

    const handleLike = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/like/${post._id}`, { userId : user._id })
        if( response?.data?.message === 'Post liked successfully' ) {
            setLikedPost(true)
        } else {
            setLikedPost(false)
        }
    }

    //HANDLING COMMENTS
    const [ commentCount, setCommentCount ] = useState(0)
    

    const [ commentBoxOpen, setCommentBoxOpen ] = useState(false)

  return (
    <>
        <div className='w-[90%] max-w-[580px] mx-auto h-auto flex justify-center mb-6'>
            <div className='w-full h-auto rounded-2xl border-[2px] border-[#eeeeee] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden relative pb-[30px]'>
                <div className='flex flex-row px-6 py-4 items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <Link>
                            <img src={post.user.profilePic} alt="" className='w-[40px] h-[40px] rounded-full object-cover object-center'/>
                        </Link>
                        <div className='flex flex-col px-4'>
                            <div className={`${ deviceType === 'mobile' ? 'flex-col' : 'flex-row items-center' } flex`}>
                                <Link className={`${ deviceType === 'mobile' ? 'text-[0.9rem] font-semibold' : 'text-[1.1rem]' } kanit text-[#000000] hover:underline cursor-pointer `}>
                                    {post.user.fullname}
                                </Link>
                                {
                                    post.checkIn ? <div>
                                        <div className={`${ deviceType === 'mobile' ? 'text-[0.7rem]' : 'text-[0.9rem]' } text-[#555555] kanit`}>
                                        {
                                            deviceType === 'mobile' ? 
                                            <div>
                                            at {post.checkIn}
                                            </div> : 
                                            <div>
                                            ,at {post.checkIn}
                                            </div>
                                        }
                                        </div>
                                    </div> : ''
                                }
                            </div>
                            <small className='kanit text-[#777777] text-[0.7rem]'>
                                {formattedTime}
                            </small>
                        </div>
                    </div>
                    <div className='p-2 bg-[#232323] rounded-full cursor-pointer duration-200 ease-in-out shadow-md shadow-[#232323]/50 '>
                        <svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke="#ffffff" stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    </div>
                </div>

                {
                    post.images.length > 0 ? 
                    <div className='text-semibold text-[#111111] kanit px-12 pt-1 pb-3 text-[0.85rem]'>
                        {post.text}
                    </div> : <div className='w-[80%] mx-auto text-semibold text-[#262525] kanit px-6 pt-3 pb-6 text-[1.1rem] bg-[#f7f7f7] rounded-xl'>
                        {post.text}
                    </div>
                }

                <div className='flex items-center justify-center w-full'>
                {
                    post.images?.length > 0 ?
                    post.images?.length === 1 ?
                    <img src={post.images[0]} alt="" className='w-[85%] h-auto rounded-3xl mt-2 m-8 cursor-pointer'/> : 
                    <div className='w-[85%] aspect-[1/1] rounded-3xl mt-2 m-8 cursor-pointer'>
                        <Carousel images={post.images}/>
                    </div> : null
                }
                </div>

                <div className='w-[80%] mx-auto h-auto flex flex-row justify-between items-center bg-[#f7f7f7] my-2 rounded-xl opacity-60'>
                    <div className='flex flex-row items-center gap-1 px-4 py-1.5'>
                        <div className='text-[0.8rem] kanit '>{
                            likeCount > 0 ? likeCount : 'Yet No Likes'
                        }</div>
                        <svg className='w-[12px] h-[12px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#2563eb"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M462.938,198.933c-9.688,0-43.437,0-92.562,0c-39.5,0-47.094-6.656-47.094-17.297 c0-12.156,19.75-33.406,24.313-41.016c4.563-7.594,33.422-33.406,39.5-71.391s-39.5-65.328-54.688-39.5 c-9.016,15.328-31.906,60.766-59.25,80.516c-50.719,36.641-92.672,116.391-145.516,116.391v199.281 c43.547,0,142.203,48.406,177.156,55.406c39.578,7.922,91.297,25.406,118.75-11.875c16.921-22.984,43.437-112.219,63.343-175.5 C537.376,245.448,502.517,198.933,462.938,198.933z"></path> <path class="st0" d="M0.001,265.401v173.203c0,21.406,17.344,38.766,38.75,38.766h22.031c14.266,0,25.844-11.563,25.844-25.844 V226.636H38.751C17.345,226.636,0.001,243.995,0.001,265.401z"></path> </g> </g></svg>
                    </div>
                    <div className='flex flex-row items-center gap-1 px-4 py-1.5'>
                        <div className='text-[0.8rem] kanit '>{commentCount > 0 ? commentCount : 'Yet No Comments'}</div>
                        <svg className='w-[12px] h-[12px]' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm0 2h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v19.0037923l3.74795444-2.8065234c.96378366-.7216954 2.12058137-1.1354383 3.31910214-1.1908624l.2772535-.0064065h14.65568992c3.2383969 0 5.8775718-2.5655749 5.9958615-5.7750617l.0041385-.2249383v-9c0-3.23839694-2.5655749-5.87757176-5.7750617-5.99586153zm-2.571997 8.0964585c.4991418.2363808.7121517.8326397.4757709 1.3317815-1.0147484 2.1427431-3.3743976 3.5719947-5.9072405 3.5719947-2.5295477 0-4.8788249-1.4193527-5.8988448-3.5543444-.23808431-.4983315-.0271123-1.0953145.4712193-1.3333988.4983315-.2380843 1.0953145-.0271123 1.3333988.4712192.6812794 1.4259781 2.3208063 2.416524 4.0942267 2.416524 1.7746853 0 3.4225233-.9981039 4.099688-2.4280053.2363808-.4991419.8326397-.7121518 1.3317816-.4757709z" fill="#000000" fill-rule="nonzero"></path> </g> </g></svg>
                    </div>
                </div>

                <div className='w-full h-auto sm:hidden flex flex-row gap-4 justify-center '>
                    <div 
                        className={`${ likedPost ? 'bg-blue-100' : 'bg-white' } flex flex-row gap-2 px-[5%] py-2.5 rounded-xl cursor-pointer hover:scale-110 duration-200 ease-in-out items-center`}
                        onClick={handleLike}    
                    >
                        {
                            likedPost ?
                            <>
                                <svg className='w-[19px] h-[19px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#2563eb"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M462.938,198.933c-9.688,0-43.437,0-92.562,0c-39.5,0-47.094-6.656-47.094-17.297 c0-12.156,19.75-33.406,24.313-41.016c4.563-7.594,33.422-33.406,39.5-71.391s-39.5-65.328-54.688-39.5 c-9.016,15.328-31.906,60.766-59.25,80.516c-50.719,36.641-92.672,116.391-145.516,116.391v199.281 c43.547,0,142.203,48.406,177.156,55.406c39.578,7.922,91.297,25.406,118.75-11.875c16.921-22.984,43.437-112.219,63.343-175.5 C537.376,245.448,502.517,198.933,462.938,198.933z"></path> <path class="st0" d="M0.001,265.401v173.203c0,21.406,17.344,38.766,38.75,38.766h22.031c14.266,0,25.844-11.563,25.844-25.844 V226.636H38.751C17.345,226.636,0.001,243.995,0.001,265.401z"></path> </g> </g></svg>
                            </> : 
                            <>
                                <svg className='w-[19px] h-[19px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M507.532,223.313c-9.891-24.594-35-41.125-62.469-41.125H365.86c-2.516,0-4.75-0.031-6.75-0.094 c0.641-0.844,1.203-1.594,1.672-2.203c2.719-3.563,4.922-6.406,6.656-9.188c0.688-0.922,1.688-2.047,2.859-3.453 c9.516-11.234,29.328-34.625,34.531-67.109c2.891-18.016-2.359-36.438-14.359-50.516c-11.156-13.094-26.906-20.891-42.109-20.891 c-15.359,0-28.672,7.641-36.516,20.969c-1.156,1.938-2.531,4.406-4.125,7.266c-7.797,13.859-24,42.719-39.672,54.063 c-17.969,12.984-33.875,30.5-49.25,47.453c-21.141,23.313-43.016,47.406-60.656,47.406c-13.797,0-24.969,11.203-24.969,24.984 v170.516c0,13.797,11.172,24.984,24.969,24.984c18.359,0,59.766,15.938,89.984,27.594c23.156,8.922,43.172,16.609,56.703,19.328 c3.984,0.797,8.094,1.719,12.313,2.641c15.484,3.438,33.063,7.328,50.531,7.328c27.766,0,49.234-10.031,63.797-29.828 c14.203-19.266,30.422-69.313,51.813-137.938c1.453-4.703,2.906-9.328,4.297-13.797 C520.017,267.188,512.501,235.641,507.532,223.313z M465.563,288.453c-17.031,54.172-39.719,130.516-54.219,150.188 c-11.031,15-26.672,19.641-43.672,19.641c-19.141,0-40-5.875-57.938-9.484c-29.891-5.984-114.328-47.406-151.594-47.406V230.875 c45.234,0,81.125-68.25,124.531-99.594c23.391-16.922,42.984-55.797,50.688-68.906c3.547-6.031,9.016-8.672,15-8.672 c15.984,0,35.578,18.844,31.797,42.484c-5.203,32.484-29.891,54.594-33.797,61.078c-3.891,6.516-20.797,24.703-20.797,35.094 c0,9.109,6.484,14.813,40.297,14.813c42.031,0,70.922,0,79.203,0C478.923,207.172,508.767,246.969,465.563,288.453z"></path> <path class="st0" d="M0.001,250.734v158.219c0,19.547,15.844,35.406,35.406,35.406h42.234c13.047,0,23.609-10.578,23.609-23.609 V215.328H35.407C15.845,215.328,0.001,231.172,0.001,250.734z M49.798,374.125c8.969,0,16.25,7.266,16.25,16.25 c0,8.969-7.281,16.25-16.25,16.25c-8.984,0-16.266-7.281-16.266-16.25C33.532,381.391,40.813,374.125,49.798,374.125z"></path> </g> </g></svg>
                            </>
                        }

                        <div className=' text-[0.8rem] text-black kanit'>Like</div>
                    </div>
                    
                    <div 
                        className='flex flex-row gap-2 px-[5%] py-2.5 rounded-xl bg-[#eeeeee] cursor-pointer hover:scale-110 duration-200 ease-in-out items-center'
                        onClick={() => setCommentBoxOpen(!commentBoxOpen)}>
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm0 2h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v19.0037923l3.74795444-2.8065234c.96378366-.7216954 2.12058137-1.1354383 3.31910214-1.1908624l.2772535-.0064065h14.65568992c3.2383969 0 5.8775718-2.5655749 5.9958615-5.7750617l.0041385-.2249383v-9c0-3.23839694-2.5655749-5.87757176-5.7750617-5.99586153zm-2.571997 8.0964585c.4991418.2363808.7121517.8326397.4757709 1.3317815-1.0147484 2.1427431-3.3743976 3.5719947-5.9072405 3.5719947-2.5295477 0-4.8788249-1.4193527-5.8988448-3.5543444-.23808431-.4983315-.0271123-1.0953145.4712193-1.3333988.4983315-.2380843 1.0953145-.0271123 1.3333988.4712192.6812794 1.4259781 2.3208063 2.416524 4.0942267 2.416524 1.7746853 0 3.4225233-.9981039 4.099688-2.4280053.2363808-.4991419.8326397-.7121518 1.3317816-.4757709z" fill="#000000" fill-rule="nonzero"></path> </g> </g></svg>
                        <div className=' text-[0.8rem] text-black kanit'>Comment</div>
                    </div>

                    <div className='flex flex-row gap-2 px-[5%] py-2.5 rounded-xl bg-[#eeeeee] cursor-pointer hover:scale-110 duration-200 ease-in-out items-center'>
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.68445 10.6578L13 8.50003M15.3157 16.6578L11 14.5M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>
                        <div className=' text-[0.8rem] text-black kanit'>Share</div>
                    </div>
                </div>

                <div className='w-full h-auto hidden sm:flex flex-row gap-4 justify-center pb-6 pt-4'>
                    <div 
                        onClick={handleLike} 
                        className={`${likedPost ? 'bg-blue-100' : 'bg-[#eeeeee]'} flex flex-row gap-2 px-8 py-2.5 rounded-xl cursor-pointer hover:scale-110 duration-200 ease-in-out items-center`}>
                        {
                            likedPost ?
                            <>
                                <svg className='w-[19px] h-[19px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#2563eb"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M462.938,198.933c-9.688,0-43.437,0-92.562,0c-39.5,0-47.094-6.656-47.094-17.297 c0-12.156,19.75-33.406,24.313-41.016c4.563-7.594,33.422-33.406,39.5-71.391s-39.5-65.328-54.688-39.5 c-9.016,15.328-31.906,60.766-59.25,80.516c-50.719,36.641-92.672,116.391-145.516,116.391v199.281 c43.547,0,142.203,48.406,177.156,55.406c39.578,7.922,91.297,25.406,118.75-11.875c16.921-22.984,43.437-112.219,63.343-175.5 C537.376,245.448,502.517,198.933,462.938,198.933z"></path> <path class="st0" d="M0.001,265.401v173.203c0,21.406,17.344,38.766,38.75,38.766h22.031c14.266,0,25.844-11.563,25.844-25.844 V226.636H38.751C17.345,226.636,0.001,243.995,0.001,265.401z"></path> </g> </g></svg>
                            </> : 
                            <>
                                <svg className='w-[19px] h-[19px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M507.532,223.313c-9.891-24.594-35-41.125-62.469-41.125H365.86c-2.516,0-4.75-0.031-6.75-0.094 c0.641-0.844,1.203-1.594,1.672-2.203c2.719-3.563,4.922-6.406,6.656-9.188c0.688-0.922,1.688-2.047,2.859-3.453 c9.516-11.234,29.328-34.625,34.531-67.109c2.891-18.016-2.359-36.438-14.359-50.516c-11.156-13.094-26.906-20.891-42.109-20.891 c-15.359,0-28.672,7.641-36.516,20.969c-1.156,1.938-2.531,4.406-4.125,7.266c-7.797,13.859-24,42.719-39.672,54.063 c-17.969,12.984-33.875,30.5-49.25,47.453c-21.141,23.313-43.016,47.406-60.656,47.406c-13.797,0-24.969,11.203-24.969,24.984 v170.516c0,13.797,11.172,24.984,24.969,24.984c18.359,0,59.766,15.938,89.984,27.594c23.156,8.922,43.172,16.609,56.703,19.328 c3.984,0.797,8.094,1.719,12.313,2.641c15.484,3.438,33.063,7.328,50.531,7.328c27.766,0,49.234-10.031,63.797-29.828 c14.203-19.266,30.422-69.313,51.813-137.938c1.453-4.703,2.906-9.328,4.297-13.797 C520.017,267.188,512.501,235.641,507.532,223.313z M465.563,288.453c-17.031,54.172-39.719,130.516-54.219,150.188 c-11.031,15-26.672,19.641-43.672,19.641c-19.141,0-40-5.875-57.938-9.484c-29.891-5.984-114.328-47.406-151.594-47.406V230.875 c45.234,0,81.125-68.25,124.531-99.594c23.391-16.922,42.984-55.797,50.688-68.906c3.547-6.031,9.016-8.672,15-8.672 c15.984,0,35.578,18.844,31.797,42.484c-5.203,32.484-29.891,54.594-33.797,61.078c-3.891,6.516-20.797,24.703-20.797,35.094 c0,9.109,6.484,14.813,40.297,14.813c42.031,0,70.922,0,79.203,0C478.923,207.172,508.767,246.969,465.563,288.453z"></path> <path class="st0" d="M0.001,250.734v158.219c0,19.547,15.844,35.406,35.406,35.406h42.234c13.047,0,23.609-10.578,23.609-23.609 V215.328H35.407C15.845,215.328,0.001,231.172,0.001,250.734z M49.798,374.125c8.969,0,16.25,7.266,16.25,16.25 c0,8.969-7.281,16.25-16.25,16.25c-8.984,0-16.266-7.281-16.266-16.25C33.532,381.391,40.813,374.125,49.798,374.125z"></path> </g> </g></svg>
                            </>
                        }
                        <div className={`${ likedPost ? 'text-blue-600' : 'text-black' } text-[0.9rem] kanit`}>Like</div>
                    </div>
                    
                    <div 
                        className='flex flex-row gap-2 px-8 py-2.5 rounded-xl bg-[#eeeeee] cursor-pointer hover:scale-110 duration-200 ease-in-out items-center'
                        onClick={() => setCommentBoxOpen(!commentBoxOpen)}
                    >
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm0 2h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v19.0037923l3.74795444-2.8065234c.96378366-.7216954 2.12058137-1.1354383 3.31910214-1.1908624l.2772535-.0064065h14.65568992c3.2383969 0 5.8775718-2.5655749 5.9958615-5.7750617l.0041385-.2249383v-9c0-3.23839694-2.5655749-5.87757176-5.7750617-5.99586153zm-2.571997 8.0964585c.4991418.2363808.7121517.8326397.4757709 1.3317815-1.0147484 2.1427431-3.3743976 3.5719947-5.9072405 3.5719947-2.5295477 0-4.8788249-1.4193527-5.8988448-3.5543444-.23808431-.4983315-.0271123-1.0953145.4712193-1.3333988.4983315-.2380843 1.0953145-.0271123 1.3333988.4712192.6812794 1.4259781 2.3208063 2.416524 4.0942267 2.416524 1.7746853 0 3.4225233-.9981039 4.099688-2.4280053.2363808-.4991419.8326397-.7121518 1.3317816-.4757709z" fill="#000000" fill-rule="nonzero"></path> </g> </g></svg>
                        <div className='text-black text-[0.9rem] kanit'>Comment</div>
                    </div>

                    <div className='flex flex-row gap-2 px-8 py-2.5 rounded-xl bg-[#eeeeee] cursor-pointer hover:scale-110 duration-200 ease-in-out items-center'>
                        <svg className='w-[19px] h-[19px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.68445 10.6578L13 8.50003M15.3157 16.6578L11 14.5M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>
                        <div className='text-black text-[0.9rem] kanit'>Share</div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`${commentBoxOpen ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-xl opacity-0' } w-[100vw] h-[100vh] top-0 left-0 fixed bg-black/50 backdrop-blur-md duration-300 ease-in-out z-30 flex items-center justify-end`} 
            onClick={() => setCommentBoxOpen(!commentBoxOpen)}
        >
            <div className={`${ deviceType === 'mobile' ? 'w-[100%]' : 'w-[calc(100vw-60px)]' } h-full flex items-center justify-center`}>
                <div className={`min-w-[400px] w-[50%] h-[530px] mt-[50px] bg-white rounded-2xl overflow-hidden `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <CommentBox 
                        post={post} 
                        commentBoxOpen={commentBoxOpen} 
                        setCommentBoxOpen={setCommentBoxOpen} 
                        likeCount={likeCount}
                        setLikeCount={setLikeCount}
                        commentCount={commentCount}
                        setCommentCount={setCommentCount}
                        handleLike={handleLike}
                        likedPost={likedPost}

                    />
                </div>
            </div>
        </div>
    </>
  )
}

export default PostCard