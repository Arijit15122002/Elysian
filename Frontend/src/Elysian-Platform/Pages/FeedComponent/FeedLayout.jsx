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
import ProfileSideNavigation from '../MyProfile/ProfileSideNavigation'
import Profile from '../MyProfile/Profile'

function FeedLayout () {

	const deviceType = useSelector(state => state.device.deviceType)

	const [postCreation, setPostCreation] = useState(false)

	const [settingsOpen, setSettingsOpen] = useState(false)

	const [ nowOnPostScreen, setNowOnPostScreen ] = useState(false)
	const [ nowOnStoryScreen, setNowOnStoryScreen ] = useState(false)
	const [ nowOnProfileScreen, setNowOnProfileScreen ] = useState(false)

	useEffect(() => {
		const urlPath = window.location.pathname
		if (urlPath === '/post/create') {
			setNowOnPostScreen(true);
			setNowOnProfileScreen(false);
			setNowOnStoryScreen(false);
		} else if (urlPath === '/profile') {
			setNowOnProfileScreen(true);
			setNowOnPostScreen(false);
			setNowOnStoryScreen(false);
		} else if (urlPath.startsWith('/stories')) {
			setNowOnStoryScreen(true);
			setNowOnPostScreen(false);
			setNowOnProfileScreen(false);
		} else {
			setNowOnPostScreen(false);
			setNowOnProfileScreen(false);
			setNowOnStoryScreen(false); // Reset all states to show feed layout
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
				<div className='w-full h-[calc(100vh-70px)]'>
					{
						deviceType === 'mobile' ? 
						<Outlet /> : 
						<div className='w-full h-full relative flex flex-row items-center justify-end'>
							<div className='absolute left-2 lg:hidden z-50'>
								<ComputerSideNavigation/>
							</div>
							<div className={`${ nowOnProfileScreen ? '' : 'lg:px-[15px]' } w-[calc(100vw-77px)] pr-[10px] lg:pr-0 lg:w-full h-full flex flex-row justify-center`}>
							{
								nowOnPostScreen || nowOnStoryScreen ?
								<>
									<div className='w-[100%] h-full'><Outlet/></div>
								</> : 
								nowOnProfileScreen ?
								<>
									<div className='hidden md:block w-[25%] min-w-[300px] h-full'><ProfileSideNavigation/></div>
									<div className='w-[100%] md:w-[75%] h-full'><Outlet/></div>
								</> :
								<>
									<div className='w-[25%] min-w-[230px] h-full hidden lg:flex '><FeedOptions/></div>
									<div className='w-[100%] md:w-[60%] h-full'><Outlet/></div>
									<div className='w-[35%] lg:w-[30%] xl:w-[27%] h-full hidden md:flex'><FeedFriendSuggestions/></div>
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