import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function FeedNotificationCard ({ notification, key }) {

    const user = useSelector( state => state.auth.user )

    const [ showFollowBack, setShowFollowBack ] = useState(false)
    useEffect(() => {
        if( notification.type === 'follow' ) {
            if( !user.following.includes(notification.from._id) ) {
                setShowFollowBack(true)
            } else {
                setShowFollowBack(false)
            }
        }
    }, [notification, key, user])

    const [formattedTime, setFormattedTime] = useState('');

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay()) - 1); // Start of last week

    useEffect(() => {
        const date = new Date(notification.createdAt);
        const time = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }); // Format the time as hh:mm AM/PM

        if (date >= today) {
            setFormattedTime(`Today, at ${time}`);
        } else if (date >= yesterday) {
            setFormattedTime(`Yesterday, at ${time}`);
        } else if (date >= lastWeekStart) {
            // Days of the week (e.g., Sunday, Monday)
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
            setFormattedTime(`${dayOfWeek}, at ${time}`);
        } else {
            // For older dates, format as a full date
            const fullDate = date.toLocaleString('en-US', {
                dateStyle: 'medium', // e.g., Dec 10, 2024
            });
            setFormattedTime(`${fullDate}, at ${time}`);
        }
    }, [notification.createdAt]);

    return (
        <>
        {
            notification.type === 'follow' &&
            <div className='w-full h-auto flex flex-col items-center rounded-2xl bg-[#efefef] dark:bg-[#151515] hover:bg-[#e7e7e7] dark:hover:bg-[#050505] duration-200 ease-in-out py-3 cursor-default'>
                <div className='w-[calc(100%-40px)] h-auto flex flex-row items-center justify-between'>
                    <img src={notification.from.profilePic} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center'/>
                    <div className='w-[calc(100%-60px)] h-auto flex flex-col items-start ml-4'>
                        <div className='radio '>
                            <span className='text-[0.9rem] text-[#232323] dark:text-white'>{notification?.from?.fullname}</span><span className='text-[0.85rem] text-[#777777]'> started following you</span>
                            <div className='text-[0.8rem] text-[#777777] radio'>
                                {formattedTime}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showFollowBack && <>
                        <div className='ml-[60px] mt-1'>
                            <div className='px-4 py-1.5 text-[0.85rem] radio text-black dark:text-[#111111] bg-[#c1ff31] hover:text-[#c1f331] hover:bg-[#111111] dark:bg-[#c1ff31] shadow-[0_0px_5px_0px_rgba(0,0,0,0.3)] dark:hover:bg-[#111111] dark:hover:text-[#c1ff31] inline-block rounded-lg duration-200 ease-in-out cursor-pointer'>
                                Follow Back
                            </div>
                        </div>
                    </>
                }
            </div>
        }
        {
            notification.type === 'post' &&
            <div className='w-full h-auto flex flex-col items-center rounded-2xl bg-[#efefef] dark:bg-[#151515] hover:bg-[#e7e7e7] dark:hover:bg-[#050505] duration-200 ease-in-out py-3 cursor-default'>
            <div className='w-[calc(100%-40px)] h-auto flex flex-row items-center justify-between'>
                    <img src={notification.from.profilePic} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center'/>
                    <div className='w-[calc(100%-60px)] h-auto flex flex-col items-start ml-4'>
                        <div className='radio '>
                            <span className='text-[0.9rem] text-[#232323] dark:text-white'>{notification?.from?.fullname}</span><span className='text-[0.85rem] text-[#777777]'> posted something on your feed</span>
                            <div className='text-[0.8rem] text-[#777777] radio'>
                                {formattedTime}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default FeedNotificationCard