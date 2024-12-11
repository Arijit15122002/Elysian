import React from 'react'
import { useSelector } from 'react-redux'

function StoryCard ({story, storyAuthor}) {

    const user = useSelector((state) => state.auth.user)
    const deviceType = useSelector((state) => state.device.deviceType)

    return (
    <>
    {
        deviceType === 'mobile' ? 
        <></> : 
        <>
        {
            story.type === 'textStory' ? <>
                <div className='w-[130px] lg:w-[138px] aspect-[9/15.5] rounded-2xl overflow-hidden relative group cursor-pointer shadow-[0_0_10px_0_rgba(0,0,0,0.1)]'>
                    <div className='absolute w-[35px] top-3 left-3 z-10 '>
                        <img src={storyAuthor.profilePic} alt="" className='rounded-full overflow-hidden ring-2 ring-blue-600 w-[35px] h-[35px] object-cover object-center'/>
                    </div>
                    <div className='absolute z-10 bottom-0 left-0 h-[35px] w-full flex flex-row justify-center text-[0.9rem] bg-gradient-to-t from-[#000000]/50 radio text-white to-transparent'>{
                        user._id === storyAuthor._id ? 'You' : storyAuthor.fullname.length > 14 ? `${storyAuthor.fullname.slice(0, 14)}...` : storyAuthor.fullname
                    }</div>
                    
                    {/* Acrual Story Text's miniature */}
                    <div 
                        className='h-full w-full flex flex-row justify-center items-center group-hover:scale-110 duration-200 ease-in-out'
                        style={{
                            backgroundColor: story.backgroundColor,
                        }}
                    >
                        <div
                            className={`${story.fontFamily} text-white text-story-viewer text-[calc(1.8rem*130/320)] text-center`}
                            style={{
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                textAlign: `${story.textAlignment}`,
                                color: `${story.fontColor}`,
                            }}
                        >
                            {story.text}
                        </div>
                    </div>
                    
                    <div className='absolute w-full h-full left-0 top-0 group-hover:bg-black/20 duration-200 ease-in-out'></div>
                </div>
            </> :
            story.type === 'imageStory' ? 
            <>
                <div className='w-[130px] lg:w-[138px] aspect-[9/15.5] rounded-2xl overflow-hidden relative group cursor-pointer'>
                    <div className='absolute w-[35px] top-2 left-2 z-10 '>
                        <img src={storyAuthor.profilePic} alt="" className='rounded-full overflow-hidden ring-2 ring-blue-600 w-[35px] h-[35px] object-cover object-center'/>
                    </div>
                    <div className='absolute z-10 bottom-0 left-0 h-[35px] w-full flex flex-row justify-center text-[0.9rem] bg-gradient-to-t from-[#000000]/50 radio text-white to-transparent'>{storyAuthor.fullname}</div>
                    <img src={story.image} alt="" className='w-full h-full object-cover object-center group-hover:scale-105 duration-200 ease-in-out z-0'/>
                    <div className='absolute w-full h-full left-0 top-0 group-hover:bg-black/20 duration-200 ease-in-out'></div>
                </div>
            </> : 
            story.type === 'videoStory' ? <></> : <></>
        }
        </> 
    }
    </>
    )
}

export default StoryCard