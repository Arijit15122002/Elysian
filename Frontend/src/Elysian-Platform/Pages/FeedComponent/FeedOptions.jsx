import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function FeedOptions () {

	const deviceType = useSelector((state) => state.device.deviceType)

	const user = useSelector((state) => state.auth.user)

	const [open, setOpen] = useState(false)

	return (
	<>
		{
			deviceType === 'mobile' ? 
			<>
				hello
			</> : 
			<>
				<div className='w-full h-[90%] my-auto rounded-3xl gap-0.5 overflow-y-auto overflow-hidden' id='menuScroll'>

					<div className='h-[65px] w-[97%] xl:w-[95%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer '>
						<img src={user.profilePic} className='w-[40px] h-[40px] rounded-full object-cover object-center ml-[8px]' alt="" />
						<div className='font-semibold kanit text-[#777777] text-[1rem] '>
							{user.fullname}
						</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/friend.png' alt="" className='w-[35px] h-[35px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5px]'>Friends</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/memory.png' alt="" className='w-[40px] h-[40px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem]'>Memories</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/saved.png' alt="" className='w-[30px] h-[30px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[10px]'>Saved</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/groups.png' alt="" className='w-[35px] h-[35px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5px]'>Groups</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/videos2.png' alt="" className='w-[35px] h-[35px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5px]'>Videos</div>
					</div>

					<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
						<img src='/feed/Mojo.png' alt="" className='w-[30px] h-[30px]'/>
						<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[10px]'>Mojo</div>
					</div>

					{
						open ? 
						<>
							<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
								<img src='/feed/event2.png' alt="" className='w-[32px] h-[32px]'/>
								<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[8px]'>Event</div>
							</div>

							<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
								<img src='/feed/ads.png' alt="" className='w-[35px] h-[35px]'/>
								<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5px]'>Ads Manager</div>
							</div>

							<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer'>
								<img src='/feed/climate.png' alt="" className='w-[35px] h-[35px]'/>
								<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5.5px]'>Climate Science</div>
							</div>

							<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer group'
								onClick={() => setOpen(!open)}
							>
								<img src='/feed/showMore.png' alt="" className='w-[35px] h-[35px] p-2 rounded-full group-hover:bg-[#c0d1d7] duration-200 ease-in-out rotate-180'/>
								<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5.5px]'>Show Less</div>
							</div>

						</> : 
						<>
							<div className='h-[65px] w-[90%] mx-auto px-6 flex flex-row gap-4 items-center rounded-xl hover:bg-[#eeeeee] duration-200 cursor-pointer group'
								onClick={() => setOpen(!open)}
							>
								<img src="/feed/showMore.png" alt="" className='w-[35px] h-[35px] p-2 rounded-full group-hover:bg-[#c0d1d7] duration-200 ease-in-out'/>
								<div className='font-semibold kanit text-[#777777] text-[1rem] pl-[5.5px]'>
									Show More
								</div>
							</div>
						</>
					}

				</div>
			</>
		}
	</>
	)
}

export default FeedOptions