import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment'
import { current } from '@reduxjs/toolkit'

function StoryView ({storyContainer, page, hasMore, totalStoryContainerLength, storyAuthor, currentStoryContainerIndex, setCurrentStoryContainerIndex, fetchNextStories}) {

    const user = useSelector(state => state.auth.user)
    const deviceType = useSelector(state => state.device.deviceType)
    const stories = storyContainer.storyArray || []

    //handling story changes
    const [ currentStoryIndex, setCurrentStoryIndex ] = useState(stories.length-1)
    const [ rightButtonShow, setRightButtonShow ] = useState(true) 
    console.log(hasMore, currentStoryContainerIndex, totalStoryContainerLength);
    console.log(rightButtonShow);


    const handleRightButtonClick = () => {
        if( currentStoryIndex > 0 ) {
            setCurrentStoryIndex(prevIndex => prevIndex - 1)
        } else {
            if( currentStoryContainerIndex < totalStoryContainerLength - 2 ) {
                setCurrentStoryContainerIndex(prevIndex => prevIndex + 1)
            } else if ( currentStoryContainerIndex === totalStoryContainerLength - 2 ) {
                setCurrentStoryContainerIndex(prevIndex => prevIndex + 1)
                if( hasMore ) {
                    fetchNextStories(page)
                }
            }
        }
    }

    useEffect(() => {
        if( currentStoryIndex === 0 && !hasMore && currentStoryContainerIndex === totalStoryContainerLength - 1 ) {
            setRightButtonShow(false)
        } else {
            setRightButtonShow(true)
        }
    }, [currentStoryContainerIndex, currentStoryIndex, hasMore, totalStoryContainerLength])

    const handleLeftButtonClick = () => {
        if( currentStoryIndex < stories.length-1 ) {
            setCurrentStoryIndex(prevIndex => prevIndex + 1)
        } else if ( currentStoryIndex === stories.length - 1 ) {
            if( storyContainer?.user?._id !== user._id ) {
                setCurrentStoryContainerIndex(prevIndex => prevIndex - 1)
            }
        }
    }

    const [ formattedTime, setFormattedTime ] = useState('')
    useEffect(() => {
        const creationDate = moment(stories[currentStoryIndex].createdAt)
        setFormattedTime(creationDate.fromNow())
    }, [currentStoryContainerIndex, currentStoryIndex, stories])

    //Handling the lke button
    const [ likedStory, setLikedStory ] = useState(false)
    const handleStoryLike = () => {
        
    }

    return (
        <>
        {
            deviceType === 'mobile' ?
            <></> : <>
                <div className='w-full h-[95%] flex flex-col gap-4 items-center justify-center'>
                    <div 
                        className='w-[80%] max-w-[300px] aspect-[9/16] flex flex-row items-center justify-center rounded-3xl relative shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'
                        style={{
                            backgroundColor: stories[currentStoryIndex]?.backgroundColor
                        }}
                    >
                        {
                            stories[currentStoryIndex]?.type === 'textStory' ? 
                            <>
                                <div className='w-full h-full rounded-3xl overflow-hidden relative flex flex-row items-center justify-center'>
                                    <div className='absolute top-0 left-0 w-full h-[70px] bg-black/10 flex flex-row items-center px-4 md:px-5'>
                                        <img src={storyAuthor.profilePic} alt="" className='w-[45px] h-[45px] object-cover object-center rounded-full ring-[2px] ring-blue-600'/>
                                        <div className='flex flex-col px-4'>
                                            <div className=' py-1 bg-b kanit text-white'>
                                                {storyAuthor.fullname}
                                            </div>
                                            <div className='text-[0.8rem] text-[#ffffff] radio'>
                                                {formattedTime}
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className={`${stories[currentStoryIndex].fontFamily} text-white text-story-viewer text-[calc(${stories[currentStoryIndex].fontSize}rem*220/320)] sm:text-[calc(${stories[currentStoryIndex].fontSize}rem*300/320)] md:text-[${stories[currentStoryIndex].fontSize}rem] text-center`}
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            textAlign: `${stories[currentStoryIndex].textAlignment}`,
                                            color: `${stories[currentStoryIndex].fontColor}`,
                                        }}
                                    >
                                        {stories[currentStoryIndex].text}
                                    </div>
                                </div>
                            </> :     
                            stories[currentStoryIndex]?.type === 'imageStory' ?  
                            <>
                                <div
                                    className='w-full h-full rounded-3xl overflow-hidden relative'
                                >
                                    <div className='absolute top-0 left-0 w-full h-[70px] bg-black/10 backdrop-blur-sm flex flex-row items-center px-4 md:px-5'>
                                        <img src={storyAuthor.profilePic} alt="" className='w-[45px] h-[45px] rounded-full ring-[2px] ring-blue-600'/>
                                        <div className='flex flex-col px-4'>
                                            <div className=' py-1 bg-b kanit text-white'>
                                                {storyAuthor.fullname}
                                            </div>
                                            <div className='text-[0.8rem] text-[#ffffff] radio'>
                                                {formattedTime}
                                            </div>
                                        </div>
                                    </div>
                                    <img src={stories[currentStoryIndex].image} alt="" />
                                    <div className='absolute bottom-0 w-full h-auto px-4 py-1'>
                                        {stories[currentStoryIndex].caption}
                                    </div>
                                </div>
                            </> : ''
                        }
                        <div className='absolute w-[120%] flex items-center justify-between sm:w-[140%] md:w-[160%] h-[60px]'>

                            {/* Left Button */}
                            <div 
                                className={`${storyAuthor?._id.toString() === user._id && currentStoryIndex === stories.length-1 ? '' : 'flex bg-black/50 w-[40px] h-[40px] md:w-[50px] md:h-[50px] items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out rounded-2xl'} `}
                                onClick={handleLeftButtonClick}
                            >
                                <svg className={`${storyAuthor?._id.toString() === user._id && currentStoryIndex === stories.length-1 ? 'hidden' : ''}`}    height="26px" width="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#efefef"></path> </g></svg>
                            </div>

                            {/* Right Button */}
                            <div 
                                className={`${ rightButtonShow ? 'w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out bg-black/50 rounded-2xl' : 'hidden' }`}
                                onClick={handleRightButtonClick}
                            >
                                <svg height="26px" width="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#efefef"></path> </g></svg>
                            </div>

                        </div>
                        <div className={`${storyAuthor?._id.toString() === user?._id ? 'flex' : 'hidden'} absolute bottom-0 w-full h-auto py-2 flex-row gap-2 items-center justify-center rounded-b-3xl bg-black/50`}>
                            <svg height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6C9 4.34315 7.65685 3 6 3H4C2.34315 3 1 4.34315 1 6V8C1 9.65685 2.34315 11 4 11H6C7.65685 11 9 9.65685 9 8V6ZM7 6C7 5.44772 6.55228 5 6 5H4C3.44772 5 3 5.44772 3 6V8C3 8.55228 3.44772 9 4 9H6C6.55228 9 7 8.55228 7 8V6Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M9 16C9 14.3431 7.65685 13 6 13H4C2.34315 13 1 14.3431 1 16V18C1 19.6569 2.34315 21 4 21H6C7.65685 21 9 19.6569 9 18V16ZM7 16C7 15.4477 6.55228 15 6 15H4C3.44772 15 3 15.4477 3 16V18C3 18.5523 3.44772 19 4 19H6C6.55228 19 7 18.5523 7 18V16Z" fill="#ffffff"></path> <path d="M11 7C11 6.44772 11.4477 6 12 6H22C22.5523 6 23 6.44772 23 7C23 7.55228 22.5523 8 22 8H12C11.4477 8 11 7.55228 11 7Z" fill="#ffffff"></path> <path d="M11 17C11 16.4477 11.4477 16 12 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H12C11.4477 18 11 17.5523 11 17Z" fill="#ffffff"></path> </g></svg>
                            <div className='text-[0.8rem] text-[#f2f2f2] exo'>Viewers</div>
                            <div className='exo text-[0.8rem] text-white'>{stories[currentStoryIndex]?.viewers.length}</div>
                        </div>
                    </div>
                    <div className='w-[95%] max-w-[400px] h-[50px] flex flex-row items-center px-3 rounded-2xl'>
                        <textarea
                            className='w-[calc(100%-50px)] max-h-full bg-[#e5e5e5] rounded-xl p-2 kanit focus:outline-none resize-none text-[#232323]'
                            placeholder='Add a comment...'
                        >
                        </textarea>
                        <div 
                            className='w-[50px] h-full flex flex-row items-center justify-center cursor-pointer'
                            onClick={handleStoryLike}    
                        >
                        {
                            likedStory ? 
                            <svg height="24" width="24" version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <path class="stone_een" d="M9,10c0,0.551-0.449,1-1,1s-1-0.449-1-1s0.449-1,1-1S9,9.449,9,10z M30,12c0,6.11-6.453,11.299-10.597,14 c-1.285,0.837-2.348,1.437-2.928,1.75c-0.299,0.161-0.652,0.161-0.951,0c-0.58-0.313-1.644-0.912-2.929-1.75 C8.452,23.298,2,18.11,2,12c0-4.418,3.582-8,8-8c2.393,0,4.534,1.056,6,2.721C17.466,5.056,19.607,4,22,4C26.418,4,30,7.582,30,12z M10,10c0-1.105-0.895-2-2-2c-1.105,0-2,0.895-2,2s0.895,2,2,2C9.105,12,10,11.104,10,10z"></path> </g></svg> : 
                            <svg height="24" width="24" version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#2563eb" stroke="#2563eb" stroke-width="0.44800000000000006"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <path class="feather_een" d="M22,4c-2.393,0-4.534,1.056-6,2.721C14.534,5.056,12.393,4,10,4c-4.418,0-8,3.582-8,8 c0,6.11,6.452,11.298,10.596,14c1.285,0.838,2.349,1.437,2.929,1.75c0.299,0.161,0.652,0.161,0.951,0 c0.579-0.313,1.643-0.912,2.928-1.75C23.547,23.299,30,18.11,30,12C30,7.582,26.418,4,22,4z M16,26.869C13.664,25.601,3,19.406,3,12 c0-3.86,3.14-7,7-7c2.003,0,3.917,0.868,5.25,2.382L16,8.234l0.75-0.852C18.083,5.868,19.997,5,22,5c3.86,0,7,3.14,7,7 C29,19.406,18.336,25.601,16,26.869z M8,8c-1.105,0-2,0.895-2,2s0.895,2,2,2c1.105,0,2-0.895,2-2S9.105,8,8,8z M8,11 c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S8.551,11,8,11z"></path> </g></svg>
                        }
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}

export default StoryView