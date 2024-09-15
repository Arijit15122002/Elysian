import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'
import ComputerSideNavigation from '../../Components/ComputerView/ComputerSideNavigation'
import PostCreation from '../Posts/PostCreation'
import Settings from '../Settings/Settings'

import FeedOptions from './FeedOptions'
import FeedFriendSuggestions from './FeedFriendSuggestions'

function FeedLayout () {

	const deviceType = useSelector(state => state.device.deviceType)

	const [postCreation, setPostCreation] = useState(false)

	const [settingsOpen, setSettingsOpen] = useState(false)

	const [ nowOnPostScreen, setNowOnPostScreen ] = useState(false)

	useEffect(() => {
		const urlPath = window.location.pathname
		if ( urlPath === '/post/story' || urlPath === '/post/create' ) {
			setNowOnPostScreen(true)
		} else{
			setNowOnPostScreen(false)
		}
	}, [window.location.pathname]);

	return (
		<div className=' w-full h-[webkit-fill-available]'>

			<div className={`${deviceType === 'mobile' ? 'block' : 'hidden'} w-full h-[70px] fixed z-50`}>
				<MobileNavBar settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
			</div>

			<div className={`${deviceType === 'mobile' ? 'hidden' : 'block'} w-full fixed top-0 z-50`} >
				<Navbar postCreation={postCreation} setPostCreation={setPostCreation} />
			</div>

			<PostCreation postCreation={postCreation} setPostCreation={setPostCreation}/>

			<Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />


			<div className='w-full h-[100vh] flex items-end'>
				<div className='w-full h-[calc(100vh-70px)] '>
					{
						deviceType === 'mobile' ? 
						<Outlet /> : 
						<div className='w-full h-full relative flex flex-row items-center justify-end'>
							<div className='absolute left-2 lg:hidden z-50'>
								<ComputerSideNavigation/>
							</div>
							<div className='w-[calc(100vw-77px)] lg:w-full h-full flex flex-row justify-center gap-[10px] lg:gap-[15px] pr-[10px] lg:px-[15px]'>
							{
								nowOnPostScreen ?
								<>
									<div className='w-[100%] h-full'><Outlet/></div>
								</> : 
								<>
									<div className='w-[25%] min-w-[230px] h-full hidden lg:flex'><FeedOptions/></div>
									<div className='w-[100%] md:w-[65%] h-full'><Outlet/></div>
									<div className='w-[35%] h-full hidden md:flex bg-red-500'><FeedFriendSuggestions/></div>
								</>
							}
							</div>
						</div>
					}
				</div>
			</div>

			<div className={`${deviceType === 'mobile' ? 'flex' : 'hidden' } w-full h-auto fixed bottom-4 justify-center z-10`}>
				<MobileNavigation />
			</div>

		</div>
	)
}

export default FeedLayout