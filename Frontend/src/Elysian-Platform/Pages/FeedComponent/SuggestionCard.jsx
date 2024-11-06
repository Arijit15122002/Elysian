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
    <div className='w-[90%] xl:w-[85%] mx-auto flex flex-row items-center pl-2 h-[60px] rounded-2xl bg-[#f4f4f4]'>
        <img src={suggestedUser.profilePic} alt="" className='w-[45px] h-[45px] rounded-full'/>
        <div className='flex flex-col ml-2 w-full'>
            <div className='flex flex-row w-full items-center'>
                <div className='kanit text-[0.9rem]'>{suggestedUser.username}</div>
                <div className='w-[4px] h-[4px] bg-[#aaaaaa] rounded-full ml-2'></div>
                <div className={`${followedState ? 'text-[#369b20]' : ' hover:bg-blue-600 text-blue-600 hover:text-white' } ml-1 kanit text-[0.85rem] cursor-pointer px-3 py-0.5 rounded-lg duration-200 ease-in-out'`}
                onClick={() => {
                    setFollowedState(true)
                    followOrUnfollow(suggestedUser._id)
                }}
                >{followedState ? <div className='flex flex-row items-center gap-1'>
                Followed
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#369b20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div> : <>Follow</>}</div>
            </div>
            <div className='radio text-[0.75rem] text-[#aaaaaa]'>{suggestedUser.fullname}</div>
        </div>
    </div>
  )
}

export default SuggestionCard