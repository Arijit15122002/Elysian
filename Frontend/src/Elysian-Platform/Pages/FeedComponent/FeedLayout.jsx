import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'

function FeedLayout () {

	const deviceType = useSelector(state => state.device.deviceType)

	return (
		<div className=' w-full'>
			<div className={`${deviceType === 'mobile' ? 'block' : 'hidden'} w-full h-[70px] fixed`}>
				<MobileNavBar/>
			</div>
			<div className={`${deviceType === 'mobile' ? 'hidden' : 'block'} w-full fixed top-0`} >
				<Navbar />
			</div>
			<div className='w-full h-[100vh] flex items-end'>
				<div className='w-full h-[calc(100vh-70px)] '>
					{
						deviceType === 'mobile' ? 
						<Outlet /> : 
						<div className='w-full h-full bg-green-200'>
							<Outlet />
						</div>
					}
				</div>
			</div>
			<div className={`${deviceType === 'mobile' ? 'flex' : 'hidden' } w-full h-16  fixed bottom-6 justify-center`}>
				<MobileNavigation />
			</div>
		</div>
	)
}

export default FeedLayout