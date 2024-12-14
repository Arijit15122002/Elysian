import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTheme } from '../../../context/contextAPI';

function NotificationCard ({notification, key, deleteNotificationHandler}) {

    const { theme } = useTheme()

    const user = useSelector((state) => state.auth.user);

    const [formattedTime,  setFormattedTime] = useState('');
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


    //Deleting notification
    const [ deleteNotification, setDeleteNotification ] = useState(false)


    //handling the follow card
    const [ showFollowBack, setShowFollowBack ] = useState(false)
    useEffect(() => {
        if( notification.type === 'follow' ) {
            if( user.following.includes(notification.from._id) ) {
                setShowFollowBack(true)
            } else {
                setShowFollowBack(false)
            }
        }
    }, [notification, user])

    return (
        <>
        {
            notification.type === 'post' && 
            <div className='w-full h-auto flex flex-row items-center'>
                <div className='w-[calc(100%-50px)] h-auto flex flex-row items-center px-6 py-2 bg-[#eaeaea] dark:bg-[#232323] rounded-2xl cursor-pointer duration-200 ease-in-out'>
                    <img src={notification.from.profilePic} alt="" className='w-[60px] h-[60px] rounded-full'/>
                    <div className='w-auto h-auto flex flex-col gap-1 pl-6'>
                        <div><span className='kanit text-[#232323] dark:text-white'>{notification.from.fullname}</span><span className='text-[#555555] dark:text-[#bcbcbc] text-[0.9rem] radio'> posted something on your feed</span></div>
                        <div className='text-[0.8rem] radio text-[#777777]'>{formattedTime}</div>
                    </div>
                </div>
                <div className={`w-[50px] h-auto flex items-center justify-center relative`}>
                    <div 
                        className={`${deleteNotification ? 'bg-blue-600' : 'bg-[#111111] hover:bg-[#232323]'} duration-300 ease-in-out w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => setDeleteNotification(!deleteNotification)}    
                    >
                        <svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    </div>
                    <div 
                        className={`${deleteNotification ? 'absolute' : 'hidden'} right-[100%] w-[190px] h-auto bg-white hover:bg-[#f5f5f5] duration-200 ease-in-out px-4 py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex flex-row items-center justify-center rounded-lg cursor-pointer`}
                        onClick={() => {
                            deleteNotificationHandler(notification._id)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        <div className='pl-2 radio text-[0.9rem] inline-block'>Delete Notification</div>
                    </div>
                </div>
            </div>
        }
        {
            notification.type === 'follow'  &&
            <div className='w-full h-auto flex flex-row items-center justify-between'>
                <div className='w-[calc(100%-50px)] h-auto flex flex-row items-center justify-between px-6 py-2 bg-[#eaeaea] dark:bg-[#232323] rounded-2xl cursor-pointer duration-200 ease-in-out'>
                    <div className='w-auto h-auto flex flex-row items-center'>
                        <img src={notification.from.profilePic} alt="" className='w-[60px] h-[60px] rounded-full'/>
                        <div className='w-auto h-auto flex flex-col gap-1 pl-6'>
                            <div><span className='kanit text-[#232323] dark:text-white'>{notification.from.fullname}</span><span className='text-[#555555] dark:text-[#999999] text-[0.9rem] radio'> started following you</span></div>
                            <div className='text-[0.8rem] radio text-[#777777]'>{formattedTime}</div>
                        </div>
                    </div>
                    <div className={`${ showFollowBack ? 'px-4 py-1.5 bg-[#c1ff31] rounded-lg shadow-md shadow-black/20 radio text-[0.9rem] duration-200 ease-in-out' : 'hidden' } `}>
                        Follow Back
                    </div>
                </div>
                <div className={`w-[50px] h-auto flex items-center justify-center relative`}>
                    <div 
                        className={`${deleteNotification ? 'bg-blue-600' : 'bg-[#111111] hover:bg-[#232323]'} duration-300 ease-in-out w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer`}
                        onClick={() => setDeleteNotification(!deleteNotification)}    
                    >
                        <svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke={ theme === 'dark' ? '#232323' : '#ffffff' } stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    </div>
                    <div 
                        className={`${deleteNotification ? 'absolute' : 'hidden'} right-[100%] w-[190px] h-auto bg-white hover:bg-[#f5f5f5] duration-200 ease-in-out px-4 py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] flex flex-row items-center justify-center rounded-lg cursor-pointer`}
                        onClick={() => {
                            deleteNotificationHandler(notification._id)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                        <div className='pl-2 radio text-[0.9rem] inline-block'>Delete Notification</div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default NotificationCard