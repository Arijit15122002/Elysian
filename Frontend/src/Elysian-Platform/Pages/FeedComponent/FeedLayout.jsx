import React from 'react'
import { Outlet } from 'react-router-dom'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'

function FeedLayout () {
	const isMobile = window.innerWidth < 500;
	return (
		<div className=' w-full'>
			<div className={`${isMobile ? 'block' : 'hidden'} w-full h-[70px] fixed`}>
				<MobileNavBar/>
			</div>
			<div className={`${isMobile ? 'hidden' : 'block'} w-full fixed top-0`} >
				<Navbar />
			</div>
			<Outlet />
			<div className={`${isMobile ? 'flex' : 'hidden' } w-full h-16  fixed bottom-6 justify-center`}>
				<MobileNavigation />
			</div>
		</div>
	)
}

export default FeedLayout