import React from 'react'
import { Outlet } from 'react-router-dom'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'

function FeedLayout () {
	return (
		<div className=' w-full'>
			<div className='w-full sm:hidden h-[70px] fixed'>
				<MobileNavBar/>
			</div>
			<div className='w-full hidden sm:block fixed top-0'>
				<Navbar />
			</div>
			<Outlet />
			<div className='w-full h-16 sm:hidden fixed bottom-6 flex justify-center'>
				<MobileNavigation />
			</div>
		</div>
	)
}

export default FeedLayout