import React from 'react'

import '../../../Mojo-Platform/Pages/MojoNotification/Notifications.css'
import { useSelector } from 'react-redux'
function Notification () {

	const notifications = useSelector((state) => state.notifications.notifications)
	const unreadNotifications = notifications.filter((notification) => !notification.read);
	const readNotifications = notifications.filter((notification) => notification.read);

    return (
		<div className='w-full h-full overflow-y-auto flex flex-col items-center'>
		{
			unreadNotifications.length > 0 ?
			<>
				<div>
					
				</div>
			</> :
			<></>
		}
		</div>
    )
}

export default Notification