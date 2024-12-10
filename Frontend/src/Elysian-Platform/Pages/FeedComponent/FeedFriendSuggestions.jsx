import React from 'react'
import { useSelector } from 'react-redux'

import SuggestionCard from './SuggestionCard'
import { useTheme } from '../../../context/contextAPI'

function FeedFriendSuggestions () {

	const {theme} = useTheme()

	const deviceType = useSelector(state => state.device.deviceType)
	const user = useSelector(state => state.auth.user)
	const suggestedUsers = useSelector((state) => state.suggestedUsers.suggestedUsers)
	const notifications = useSelector((state) => state.notifications.notifications)

	const unreadNotifications = notifications.filter((notification) => !notification.read);
	const readNotifications = notifications.filter((notification) => notification.read);

	return (
		<>
		{
			deviceType === 'mobile' ?
			<></> : <>
				<div className='w-full h-full flex flex-col items-center'>

					<div className='w-full h-[57%] my-4 flex items-start'>
						<div className='w-full lg:w-[90%] xl:w-[85%] mx-0 xl:mx-4 h-full bg-white dark:bg-[#232323] rounded-3xl overflow-hidden' style={{
							boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
						}}>
							<div className='flex flex-row items-center h-[70px] w-full justify-between'>
								<div className='px-6 kanit text-[1.2rem] text-[#777777] dark:text-white'>Suggestions</div>
								<div className=' flex flex-row gap-0.5 items-center text-blue-500 px-4'>
									<div className='radio text-[0.75rem]'>SEE ALL</div>
									<svg className='-mt-[1px]' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
								</div>
							</div>
							<div 
								className='w-full h-[calc(100%-70px)] flex flex-col gap-3 overflow-y-auto pb-6'
								id='menuScroll'
							>
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

					<div className='w-full h-[43%] flex flex-col items-start justify-items-start'>
						<div className='w-full lg:w-[90%] xl:w-[85%] mx-0 xl:mx-4 h-[90%] bg-white dark:bg-gradient-to-tr from-[#232323] to-[#151515] rounded-3xl overflow-hidden flex flex-col' style={{
							boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
						}}>
							<div className='w-full h-[60px] px-6 flex flex-row gap-2 items-center justify-between relative'>
								<div className='w-auto h-full flex flex-row gap-2 items-center'>
									<svg className='' width="20px" height="20px" viewBox="0 0 24 24" fill={ theme === 'dark' ? 'white' : 'none' } xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke={theme === 'dark' ? 'white' : '#777777'} stroke-width="1.64" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke={theme === 'dark' ? 'white' : '#777777'} stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke={theme === 'dark' ? 'white' : '#777777'} stroke-width="1.44" stroke-miterlimit="10"></path> </g></svg>
									<div className='text-[#555555] dark:text-white	kanit text-[1.1rem]'>
										Notifications
									</div>
									<div className={`${ unreadNotifications.length > 0 ? 'block' : 'hidden' } absolute top-[18px] left-[35px]`}>
										<span class="relative flex h-[8px] w-[8px]">
											<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 dark:bg-blue-500 opacity-75"></span>
											<span class="relative inline-flex rounded-full h-[8px] w-[8px] bg-blue-600 dark:bg-blue-500"></span>
										</span>
									</div>
								</div>
								<div className='flex flex-row gap-0.5 items-center text-blue-500 px-4'>
									<div className='radio text-[0.75rem]'>SEE ALL</div>
									<svg className='-mt-[1px]' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
								</div>
							</div>
							<div className='h-[calc(100%-60px)] flex flex-col flex-shrink-0 overflow-y-auto'>
							{
								unreadNotifications.map((notification, index) => (
								<>
									
								</>
								))
							}
							</div>
						</div>
					</div>

				</div>
			</>
		}
		</>
	)
}

export default FeedFriendSuggestions