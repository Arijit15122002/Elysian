import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'
import ComputerSideNavigation from '../../Components/ComputerView/ComputerSideNavigation'
import PostCreation from '../Posts/PostCreation'
import Settings from '../Settings/Settings'

function FeedLayout () {

	const deviceType = useSelector(state => state.device.deviceType)

	const [postCreation, setPostCreation] = useState(false)

	const [settingsOpen, setSettingsOpen] = useState(false)

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
						<div className='w-full h-full relative flex items-center'>
							<div className='absolute left-2 lg:hidden z-50'>
								<ComputerSideNavigation/>
							</div>
							<Outlet />
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