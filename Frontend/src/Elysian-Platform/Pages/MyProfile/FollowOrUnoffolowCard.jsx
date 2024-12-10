import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { userExists } from '../../../redux/reducers/auth.reducer'

function FollowOrUnoffolowCard ({ key, targetAccount}) {

    const user = useSelector(state => state.auth.user)
	const deviceType = useSelector(state => state.device.deviceType)

    //Follow or Unfollow
    const dispatch =  useDispatch()
    const followOrUnfollow = async (followUserId) => {
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/follow/${followUserId}`, { userId : user._id })
        console.log(response?.data);
		dispatch(userExists(response?.data?.currentUser))
    }

    return (
        <>
        {
            deviceType === 'mobile' ?
            <>
                <div></div>
            </> :
            <>
                <div className='w-[90%] max-w-[500px] px-2 h-[80px] bg-[#ffffff] rounded-2xl flex flex-row items-center justify-between' style={{
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
                }}>
                    <div className='flex flex-row items-center'>
                        <div className='w-[60px] h-[60px] ml-4 mr-2'>
                            <img src={targetAccount.profilePic} alt="" className='w-[60px] h-[60px] rounded-full object-cover object-center'/>
                        </div>
                        <div className='flex flex-col'>
                            <div className='kanit text-[1rem]'>{targetAccount.username}</div>
                            <div className='radio text-[0.8rem] text-[#aaaaaa]'>{targetAccount.fullname}</div>
                        </div>
                    </div>
                    <div className='mx-4 px-4 py-1.5 rounded-lg radio bg-[#111111] text-white text-[0.9rem] cursor-pointer shadow-md shadow-black/20 hover:scale-110 duration-300 ease-in-out cursor-pointer'
                    onClick={() => {
                        followOrUnfollow(targetAccount._id)
                    }}
                    >
                        Unfollow
                    </div>
                </div>
            </>
        }
        </>
    )
}

export default FollowOrUnoffolowCard