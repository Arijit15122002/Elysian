import React, {  useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { userExists } from '../../../redux/reducers/auth.reducer'

function SuggestionCard ({suggestedUser, index}) {

    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    const [ followedState, setFollowedState ] = useState(false)

    const followOrUnfollow = async (followUserId) => {
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/follow/${followUserId}`, { userId : user._id })
		dispatch(userExists(response?.data?.currentUser))
    }

  return (
    <div className='w-[90%] xl:w-[85%] mx-auto flex flex-row items-center justify-between pl-2 h-[65px] rounded-2xl bg-[#f4f4f4] dark:bg-[#151515]'>
        <div className="flex flex-row items-center">
			<img src={suggestedUser.profilePic} alt="" className='w-[45px] h-[45px] rounded-full'/>
			<div className='flex flex-col gap-1 ml-2 w-full'>
				<div className='kanit text-[0.85rem] font-light dark:text-white'>{suggestedUser.username}</div>
				<div className='radio text-[0.7rem] text-[#aaaaaa]'>{suggestedUser.fullname}</div>
			</div>
		</div>
		<div className='pr-2'>
		{
			followedState ?
			<>
				
			</> : <>
				<div
					className='px-4 py-1 bg-[#ababab] dark:bg-[#333333] hover:bg-gradient-to-tr from-blue-400 to-blue-600 text-[0.85rem] duration-200 ease-in-out rounded-xl text-white cursor-pointer'
				>
					Follow
				</div>
			</>
		}
		</div>
    </div>
  )
}

export default SuggestionCard