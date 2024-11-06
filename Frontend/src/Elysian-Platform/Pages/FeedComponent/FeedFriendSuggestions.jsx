import React from 'react'
import { useSelector } from 'react-redux'

import SuggestionCard from './SuggestionCard'

function FeedFriendSuggestions () {

	const deviceType = useSelector(state => state.device.deviceType)
	const user = useSelector(state => state.auth.user)
	const suggestedUsers = useSelector((state) => state.suggestedUsers.suggestedUsers)

	console.log(suggestedUsers);

	return (
		<>
		{
			deviceType === 'mobile' ?
			<></> : <>
				<div className='w-full h-[55%] my-4 flex items-start'>
					<div className='w-full lg:w-[90%] xl:w-[80%] mx-0 xl:mx-4 h-full bg-white rounded-3xl overflow-hidden' style={{
						boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
					}}>
						<div className='pt-4 pb-3 px-6 kanit text-[1.2rem] h-[70px]'>Suggestions</div>
						<div className='w-full h-[calc(100%-70px)] flex flex-col gap-3 overflow-y-auto'>
						{
							suggestedUsers.map((suggestedUser, index) => (
							<div key={suggestedUser._id} className='w-full h-[60px]'>
								<SuggestionCard suggestedUser={suggestedUser} index={index} />
							</div>
							))
						}
						</div>
					</div>
				</div>
			</>
		}
		</>
	)
}

export default FeedFriendSuggestions