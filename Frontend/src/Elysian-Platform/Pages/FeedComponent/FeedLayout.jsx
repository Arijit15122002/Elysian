import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import MobileNavBar from '../../Components/NavigationComp/MobileNavBar'
import MobileNavigation from '../../Components/MobileView/MobileNavigation'
import Navbar from '../../Components/NavigationComp/ComputerNavBar'

function FeedLayout () {

	const [ deviceType, setDeviceType ] = useState(null)

	useEffect(() => {
		const userAgent = navigator.userAgent
		const isMobile = userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
		setDeviceType(isMobile ? 'mobile' : 'desktop')
	}, [])

	return (
		<div className=' w-full'>
			<div className={`${deviceType === 'mobile' ? 'block' : 'hidden'} w-full h-[70px] fixed`}>
				<MobileNavBar/>
			</div>
			<div className={`${deviceType === 'mobile' ? 'hidden' : 'block'} w-full fixed top-0`} >
				<Navbar />
			</div>
			<Outlet />
			<div className={`${deviceType === 'mobile' ? 'flex' : 'hidden' } w-full h-16  fixed bottom-6 justify-center`}>
				<MobileNavigation />
			</div>
		</div>
	)
}

export default FeedLayout