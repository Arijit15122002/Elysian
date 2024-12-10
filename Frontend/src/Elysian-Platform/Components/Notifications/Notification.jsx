import React from 'react'

import '../../../Mojo-Platform/Pages/MojoNotification/Notifications.css'
import { useSelector } from 'react-redux'
function Notification () {

	const notifications = useSelector((state) => state.notifications.notifications)
	console.log(notifications);

    return (
		<div className=' bg-green-300 p-2 rounded-xl'>
			Notificatons...
		</div>
    )
}

export default Notification