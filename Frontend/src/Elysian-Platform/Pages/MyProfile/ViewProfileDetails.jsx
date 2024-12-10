import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ViewProfileDetails ({setViewDetailsOpen}) {

    const user = useSelector(state => state.auth.user)
    const deviceType = useSelector(state => state.device.deviceType)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setViewDetailsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setViewDetailsOpen]);

    //Handling user's birthday
    const [ birthday, setBirthday ] = useState('')

    useEffect(() => {
        if (user?.bio?.dob) {
            setBirthday(formatDate(user.bio.dob));
        }
    }, [user]);

    const formatDate = (dob) => {
        const [day, month, year] = dob.split("/"); // Split the string into parts
        const date = new Date(`${year}-${month}-${day}`); // Create a Date object

        const options = { year: "numeric", month: "long", day: "numeric" }; // Formatting options
        return date.toLocaleDateString("en-US", options); // Format to "March 15, 1999"
    };


    return (
    <>
    {
        deviceType === 'mobile' ?
        <></> : 
        <>
        <div className='w-[90%] max-w-[500px] h-[90%] relative bg-white rounded-3xl p-2'
            onClick={(e) => e.stopPropagation()}
        >

                <div 
                    className='absolute w-[33px] h-[33px] rounded-full bg-[#111111] top-2 right-2 shadow-md shadow-[#111111]/50 flex items-center justify-center cursor-pointer z-10'
                    onClick={() => setViewDetailsOpen(false)}
                >
                    <svg viewBox="0 0 24 24" height="19" width="19" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>

            <div className='w-full h-[100%] relative overflow-y-auto' id='scrollHome'>

                <div className='w-[90%] mx-auto h-[180px] flex flex-row items-center justify-center gap-6 relative' >
                    <div className='w-[150px] h-auto'>
                        <img src={user.profilePic} alt="" 
                            className='w-[150px] h-[150px] rounded-full '
                        />
                    </div>
                    <div className='w-[calc(100%-200px)] h-[150px] flex flex-col justify-center gap-2 rounded-3xl'>
                        <div className='kanit text-[1.5rem]'>
                            @ {user.username}
                        </div>
                        <div className='w-full flex items-start'>
                            <div className='bg-[#111111] px-4 py-1.5 rounded-xl text-white kanit'>
                                {user.fullname}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[70%] mx-auto h-auto flex flex-row items-center justify-between'>
                    <div className='flex flex-col items-center'>
                        <div className='kanit text-[1.2rem] text-[#aaaaaa]'>
                            Posts
                        </div>
                        <div className='anton text-md'>
                            {user.posts.length}
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='kanit text-[1.2rem] text-[#aaaaaa]'>
                            Followers
                        </div>
                        <div className='anton text-md'>
                            {user.followers.length}
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='kanit text-[1.2rem] text-[#aaaaaa]'>
                            Following
                        </div>
                        <div className='anton text-md'>
                            {user.following.length}
                        </div>
                    </div>
                </div>

                <div className='radio w-full mt-8'>
                    {
                        user.bio.description && 
                        <div className='px-4 w-[70%] mx-auto py-1.5 rounded-xl bg-[#efefef] mt-6'>
                            <div className='dosis font-semibold italic'>
                                {user.bio.description}
                            </div>
                        </div>
                    }

                    {
                        user.bio.location && 
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] mt-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center'>
                                    <svg viewBox="0 0 64 64" height="26" width="26" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.52 42.781C30.4414 42.7836 29.4077 43.2133 28.645 43.976C27.8823 44.7387 27.4527 45.7724 27.45 46.851V54.781H35.6V46.851C35.5968 45.7708 35.1656 44.7359 34.4009 43.9731C33.6361 43.2102 32.6002 42.7815 31.52 42.781Z" fill="#555555"></path> <path d="M56.72 25.981L50.21 21.101L47.12 18.7809L35.43 10.0009C34.3004 9.16314 32.9314 8.71082 31.525 8.71082C30.1187 8.71082 28.7496 9.16314 27.62 10.0009L17.5 17.601L12.93 21.0269C12.6258 21.2484 12.3474 21.5034 12.1 21.787L6.3 26.287C5.88228 26.6137 5.61022 27.092 5.54283 27.618C5.47544 28.1441 5.61816 28.6754 5.94002 29.097C6.12874 29.3381 6.37014 29.5328 6.64574 29.6663C6.92133 29.7998 7.22381 29.8684 7.53001 29.8669C7.97265 29.87 8.40306 29.7218 8.75002 29.447L10.33 28.2169V48.2769C10.3316 50.0004 11.0169 51.6528 12.2356 52.8714C13.4542 54.09 15.1066 54.7754 16.83 54.7769H23.45V46.847C23.4524 44.7074 24.3034 42.6561 25.8163 41.1432C27.3292 39.6303 29.3804 38.7793 31.52 38.7769C33.6611 38.7772 35.7146 39.6272 37.2296 41.1403C38.7445 42.6534 39.5971 44.7058 39.6 46.847V54.7769H46.23C47.9529 54.7735 49.6042 54.0876 50.8224 52.8694C52.0406 51.6511 52.7266 49.9998 52.73 48.2769V27.9869L54.32 29.1769C54.6659 29.4372 55.0871 29.5777 55.52 29.5769C55.8305 29.5769 56.1367 29.5047 56.4144 29.3658C56.6922 29.227 56.9337 29.0253 57.12 28.7769C57.2786 28.5676 57.3942 28.3289 57.46 28.0746C57.5258 27.8203 57.5405 27.5555 57.5033 27.2955C57.4661 27.0355 57.3777 26.7854 57.2433 26.5598C57.1088 26.3341 56.931 26.1374 56.72 25.981Z" fill="#999999"></path> </g></svg>
                                    <div className='kanit text-[0.8rem]'>
                                        Home - 
                                    </div>
                                </div>
                                <div className='pl-[42px] pb-1 kanit text-[#555555]'>
                                    {user.bio.location}
                                </div>
                            </div>
                        </div>
                    }

                    {
                        user.bio.dob && 
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] mt-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center'>
                                    <svg fill="#999999" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.996 511.996" xml:space="preserve" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M499.996,359.248c0-19.852-16.58-35.248-36.424-35.248H443.92c0.188,0,0.08-3.392,0.08-4.752v-94.444 c4-2.188,4-5.284,4-8.752v-20.136C448,176.064,431.924,160,412.08,160h-20.164c0.188,0,0.08-2.72,0.08-4.084V67.72 c4-2.192,4-5.308,4-8.8V35.248C395.996,15.4,379.984,0,360.136,0H152.22c-19.848,0-36.224,15.4-36.224,35.248v23.668 c0,0.184,0.156,0.36,0.164,0.544c0.02,0.272,0.032,0.544,0.072,0.816c0.336,2.948,3.764,5.556,3.764,7.46v88.184 c0,1.36,0.268,4.08,0.456,4.08h-20.128c-19.852,0-36.328,16.068-36.328,35.916v20.136c0,0.304,0.232,0.592,0.252,0.9 c0.004,0.468,0.16,0.944,0.224,1.424c0.008,0.036,0.052,0.08,0.06,0.116c0.056,0.38,0.02,0.752,0.108,1.132 c0.568,2.328,3.356,4.312,3.356,5.844v93.78c0,1.36,0.268,4.752,0.456,4.752H48.136c-19.852,0-36.14,15.4-36.14,35.248v20.14 c0,3.584,0,6.768,4,8.968v94.64c0,15.436,12.8,29,28.244,29h423.9c15.436,0,27.86-13.564,27.86-29V387.78c4-2.164,4-5.12,4-8.392 v-20.14H499.996z M140,35.248C139.996,28.632,145.6,24,152.22,24h207.916c6.616,0,11.86,4.632,11.86,11.248v8.196 c0,0-0.976-0.056-1.54-0.056c-10.288,0-15.968,3.192-20.148,5.524c-3.048,1.7-4.42,2.476-8.46,2.476 c-4.044,0-5.424-0.776-8.472-2.476c-4.176-2.332-9.888-5.524-20.172-5.524s-16.004,3.192-20.176,5.524 c-3.048,1.7-4.436,2.476-8.476,2.476c-4.044,0-5.432-0.776-8.48-2.476c-4.172-2.332-9.888-5.524-20.176-5.524 c-10.284,0-16,3.192-20.172,5.524c-3.048,1.7-4.432,2.476-8.468,2.476c-4.048,0-5.436-0.776-8.484-2.476 c-4.176-2.332-9.892-5.524-20.18-5.524c-10.288,0-16.008,3.192-20.18,5.524c-3.048,1.7-4.436,2.476-8.476,2.476 c-4.044,0-5.432-0.776-8.48-2.476c-4.176-2.332-10.004-5.524-20.288-5.524c-0.372,0-1.168,0.028-1.168,0.036V35.248z M87.996,195.92c0-6.62,5.712-11.92,12.328-11.92h47.812h216.1h47.836c6.616,0,11.92,5.3,11.92,11.916v8.444 c-8,0.824-11.72,3.288-15.164,5.2c-3.084,1.712-4.476,2.492-8.584,2.492c-4.096,0-5.496-0.78-8.576-2.492 c-4.188-2.324-9.916-5.508-20.232-5.508s-16.048,3.184-20.24,5.508c-3.084,1.712-4.492,2.492-8.592,2.492 c-4.1,0-5.508-0.78-8.584-2.492c-4.196-2.324-9.924-5.508-20.244-5.508c-10.312,0-16.048,3.184-20.236,5.508 c-3.084,1.712-4.492,2.492-8.592,2.492c-4.096,0-5.508-0.78-8.584-2.492c-4.192-2.324-9.924-5.508-20.244-5.508 c-10.312,0-16.048,3.184-20.236,5.508c-3.08,1.712-4.484,2.492-8.58,2.492c-4.1,0-5.512-0.78-8.592-2.492 c-4.192-2.324-9.928-5.508-20.244-5.508c-10.316,0-16.048,3.184-20.236,5.508c-3.084,1.712-4.492,2.492-8.592,2.492 c-4.1,0-5.508-0.78-8.588-2.492c-4.188-2.324-9.924-5.508-20.24-5.508c-10.316,0-16.052,3.184-20.24,5.508 c-3.084,1.712-4.488,2.492-8.588,2.492c-4.1,0-5.672-0.78-8.756-2.492c-3.412-1.896-7.232-4.344-15.232-5.184V195.92z M475.992,369.14c-4,1.1-6.304,2.536-8.492,3.748c-3.112,1.72-4.64,2.504-8.784,2.504s-5.612-0.784-8.724-2.504 c-4.204-2.32-9.976-5.496-20.312-5.496c-10.328,0-16.084,3.18-20.284,5.5c-3.104,1.716-4.532,2.5-8.668,2.5 c-4.132,0-5.548-0.784-8.648-2.5c-4.196-2.32-9.94-5.5-20.264-5.5c-10.332,0-16.08,3.18-20.272,5.5 c-3.104,1.716-4.524,2.5-8.656,2.5s-5.548-0.784-8.648-2.5c-4.196-2.32-9.94-5.5-20.268-5.5s-16.076,3.18-20.268,5.5 c-3.1,1.716-4.516,2.5-8.648,2.5s-5.548-0.784-8.648-2.5c-4.196-2.32-9.94-5.5-20.268-5.5c-10.324,0-16.072,3.18-20.26,5.5 c-3.1,1.72-4.516,2.5-8.644,2.5c-4.136,0-5.552-0.784-8.652-2.5c-4.196-2.32-9.944-5.5-20.272-5.5s-16.072,3.18-20.264,5.5 c-3.104,1.716-4.524,2.5-8.656,2.5c-4.128,0-5.548-0.784-8.648-2.5c-4.196-2.32-9.936-5.5-20.264-5.5 c-10.328,0-16.076,3.18-20.268,5.5c-3.1,1.716-4.52,2.5-8.648,2.5c-4.132,0-5.552-0.784-8.652-2.5 c-4.196-2.32-9.936-5.5-20.264-5.5s-16.08,3.18-20.268,5.5c-3.104,1.716-4.52,2.5-8.652,2.5c-4.124,0-5.608-0.78-8.712-2.5 c-2.34-1.288-5.02-2.812-9.02-3.944v-9.7c0-6.616,5.524-11.248,12.14-11.248h48h320.1h47.332c6.616,0,12.424,4.632,12.424,11.248 V369.14z"></path> </g> </g> </g></svg>
                                    <div className='kanit text-[0.8rem]'>
                                        Birthday - 
                                    </div>
                                </div>
                                <div className='pl-[42px] pb-1 kanit text-[#555555]'>
                                    {birthday}
                                </div>
                            </div>
                        </div>
                    }

                    {
                        user.bio.work?.offices?.length > 0 &&
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] mt-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center pb-1'>
                                    <svg fill="#999999" viewBox="0 0 24 24" height="20" width="20" id="job" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M16,8H8A1,1,0,0,1,7,7V4A2,2,0,0,1,9,2h6a2,2,0,0,1,2,2V7A1,1,0,0,1,16,8ZM9,6h6V4H9Z"></path><rect id="primary" x="2" y="6" width="20" height="16" rx="2"></rect><path id="secondary-2" data-name="secondary" d="M15,14a1,1,0,0,1-1-1V12H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2H16v1A1,1,0,0,1,15,14Z"></path></g></svg>
                                    <div className='kanit text-[0.8rem]'>
                                        Job Description - 
                                    </div>
                                </div>
                                {
                                    user.bio.work.offices.map((office, index) => 
                                    <>
                                    <div key={index} className='flex flex-row gap-2 pl-[42px]'>
                                        <svg className='mt-[6px]' viewBox="0 0 24 24" fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#555555" stroke-width="2" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" fill="#555555"></path> </g></svg>
                                        <div className='kanit text-[#555555]'>
                                            worked at <span className='text-[#232323]'>{office.name}</span> as a {office.designation}
                                        </div>
                                    </div>
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    }

                    {
                        user.bio.education.colleges.length > 0 &&
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] mt-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center pb-1'>
                                    <svg height="20" width="20" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" fill="#999999" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g> <path d="M31,26c-0.6,0-1-0.4-1-1V12c0-0.6,0.4-1,1-1s1,0.4,1,1v13C32,25.6,31.6,26,31,26z"></path> </g> <g> <path d="M16,21c-0.2,0-0.3,0-0.5-0.1l-15-8C0.2,12.7,0,12.4,0,12s0.2-0.7,0.5-0.9l15-8c0.3-0.2,0.6-0.2,0.9,0l15,8 c0.3,0.2,0.5,0.5,0.5,0.9s-0.2,0.7-0.5,0.9l-15,8C16.3,21,16.2,21,16,21z"></path> </g> <path d="M17.4,22.6C17,22.9,16.5,23,16,23s-1-0.1-1.4-0.4L6,18.1V22c0,3.1,4.9,6,10,6s10-2.9,10-6v-3.9L17.4,22.6z"></path> </g></svg>
                                    <div className='kanit text-[0.8rem]'>
                                        College Details -
                                    </div>
                                </div>
                                {
                                    user.bio.education.colleges.map((college, index) =>
                                    <>
                                        <div key={index} className='flex flex-row gap-2 pl-[42px]'>
                                            <svg className='mt-[6px]' viewBox="0 0 24 24" fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#555555" stroke-width="2" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" fill="#555555"></path> </g></svg>
                                            <div className='kanit text-[#555555]'>
                                                done <span className='text-[#232323]'>{college.degree}</span> from <span className='text-[#232323]'>{college.name}</span>
                                            </div>
                                        </div>
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    }

                    {
                        user.bio.education.schools.length > 0 &&
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] mt-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center pb-1'>
                                    <svg fill="#999999" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M117.333,170.595h-64c-4.032,0-7.723,2.283-9.536,5.888L1.131,261.816c-0.043,0.085-0.021,0.192-0.064,0.277 C0.427,263.459,0,264.973,0,266.595v192c0,5.888,4.779,10.667,10.667,10.667h106.667c5.888,0,10.667-4.779,10.667-10.667V181.261 C128,175.373,123.221,170.595,117.333,170.595z M106.667,394.595c0,5.888-4.779,10.667-10.667,10.667H32 c-5.888,0-10.667-4.779-10.667-10.667v-64c0-5.888,4.779-10.667,10.667-10.667h64c5.888,0,10.667,4.779,10.667,10.667V394.595z"></path> <path d="M266.667,230.179v-16.917c0-5.888-4.779-10.667-10.667-10.667s-10.667,4.779-10.667,10.667v21.333 c0,2.837,1.131,5.547,3.115,7.552l10.667,10.667c2.091,2.091,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.552-3.115 c4.16-4.16,4.16-10.923,0-15.083L266.667,230.179z"></path> <path d="M373.333,490.595h-10.667V149.261h10.667c4.224,0,8.064-2.496,9.771-6.379c1.707-3.861,0.96-8.384-1.899-11.499 l-117.333-128c-4.032-4.416-11.691-4.416-15.723,0l-117.333,128c-2.859,3.115-3.605,7.637-1.899,11.499 c1.707,3.883,5.525,6.379,9.771,6.379h10.667v341.333h-10.667c-5.888,0-10.667,4.779-10.667,10.667s4.779,10.667,10.667,10.667 h234.667c5.888,0,10.667-4.779,10.667-10.667S379.221,490.595,373.333,490.595z M298.667,490.595h-85.333v-96 c0-5.888,4.779-10.667,10.667-10.667h64c5.888,0,10.667,4.779,10.667,10.667V490.595z M256,298.595c-35.285,0-64-28.715-64-64 s28.715-64,64-64s64,28.715,64,64S291.285,298.595,256,298.595z"></path> <path d="M510.933,262.093c-0.043-0.085-0.021-0.192-0.064-0.277l-42.667-85.333c-1.813-3.605-5.504-5.888-9.536-5.888h-64 c-5.888,0-10.667,4.779-10.667,10.667v277.333c0,5.888,4.779,10.667,10.667,10.667h106.667c5.888,0,10.667-4.779,10.667-10.667 v-192C512,264.973,511.573,263.48,510.933,262.093z M490.667,394.595c0,5.888-4.779,10.667-10.667,10.667h-64 c-5.888,0-10.667-4.779-10.667-10.667v-64c0-5.888,4.779-10.667,10.667-10.667h64c5.888,0,10.667,4.779,10.667,10.667V394.595z"></path> </g> </g> </g> </g></svg>
                                    <div className='kanit text-[0.8rem]'>
                                        Scool Details - 
                                    </div>
                                </div>
                                {
                                    user.bio.education.schools.map((school, index) => 
                                    <>
                                        <div key={index} className='flex flex-row gap-2 pl-[42px]'>
                                            <svg className='mt-[6px]' viewBox="0 0 24 24" fill="none" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6" stroke="#555555" stroke-width="2" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" fill="#555555"></path> </g></svg>
                                            <div className='kanit text-[#555555]'>
                                                went to <span className='text-[#232323]'>{school}</span>
                                            </div>
                                        </div>
                                    </>
                                    )
                                }
                            </div>
                        </div>
                    }

                    {
                        user.bio.interests.length > 0 &&
                        <div className='px-4 py-1.5 w-[80%] mx-auto rounded-xl bg-[#efefef] my-6 pb-4'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-row gap-4 items-center pb-1'>
                                    <img src="/Profile/interest.png" alt="" className='w-[20px] h-[20px]'/>
                                    <div className='kanit text-[0.8rem]'>
                                        Interests - 
                                    </div>
                                </div>
                                <div className='w-full pl-[42px]'>
                                {
                                    user.bio.interests.map((interest, index) =>
                                    <>
                                        <span className='px-3 py-1.5 mr-2 mb-2 kanit inline-block text-[0.8rem] text-[#555555] bg-white rounded-lg'>
                                            {interest}
                                        </span>
                                    </>
                                    )
                                }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    }
    </>
    )
}

export default ViewProfileDetails