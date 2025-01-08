import React from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment'

import '../../../Mojo-Platform/Pages/MojoNotification/Notifications.css'
import NotificationCard from './NotificationCard'
import axios from 'axios'
function Notification () {

	const user = useSelector(state => state.auth.user)

	const notifications = useSelector((state) => state.notifications.notifications)
	console.log(notifications);
	const unreadNotifications = notifications.filter((notification) => !notification.read);
	const readNotifications = notifications.filter((notification) => notification.read);

    // Helper function to group notifications
	const groupNotifications = (notifications) => {
		const grouped = {};

		notifications.forEach((notification) => {
		const notificationDate = moment(notification.createdAt);
		const today = moment();
		const diffDays = today.diff(notificationDate, 'days');
		const dayName = notificationDate.format('dddd'); // Monday, Tuesday, etc.
		const monthName = notificationDate.format('MMMM'); // January, February, etc.

		if (diffDays === 0) {
			// Today
			grouped['Today'] = grouped['Today'] || [];
			grouped['Today'].push(notification);
		} else if (diffDays === 1) {
			// Yesterday
			grouped['Yesterday'] = grouped['Yesterday'] || [];
			grouped['Yesterday'].push(notification);
		} else if (diffDays <= today.day()) {
			// Days of the current week (Monday, Tuesday, ...)
			grouped[dayName] = grouped[dayName] || [];
			grouped[dayName].push(notification);
		} else if (diffDays <= today.day() + 7) {
			// Previous week up to Friday
			grouped['Last Week'] = grouped['Last Week'] || [];
			grouped['Last Week'].push(notification);
		} else {
			// Older notifications grouped by month
			grouped[monthName] = grouped[monthName] || [];
			grouped[monthName].push(notification);
		}
		});

		return grouped;
	};

	const unreadGrouped = groupNotifications(unreadNotifications);
	const readGrouped = groupNotifications(readNotifications);

	console.log(unreadGrouped)
	console.log(readGrouped);
	

	// Render notifications for a group
	const renderGroup = (groupName, notifications) => (
		<div 
			key={groupName}
			className='w-[90%] max-w-[600px]'
		>
			<div className="w-full text-[1.1rem] kanit text-[#555555] dark:text-white pt-5 pb-2 dark:font-light">{groupName}</div>
			<div className='w-full flex flex-col gap-4'>
			{
				notifications.map((notification, index) => (
					<NotificationCard 
						key={notification._id} 
						notification={notification} 
						deleteNotificationHandler={deleteNotificationHandler}			
					/>
				))
			}
			</div>
		</div>
	);


	//Handling deletion of Notifications 
	const deleteNotificationHandler = async (notificationId) => {
		try {
			
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/deleteNotification/${notificationId}`, { userId : user._id });
			console.log(response);

		} catch (error) {
			console.log("Error while deleting notification:", error);
		}
	}

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center">
		{/* Unread Notifications */}
		{Object.keys(unreadGrouped).length > 0 && (
			<>
			<div className="w-[90%] pt-8 pb-3 kanit text-[1.2rem] text-[#999999] font-light">Unread Notifications</div>
			{
				Object.entries(unreadGrouped).map(([group, notifications]) => renderGroup(group, notifications))
			}
			</>
		)}

		{/* Read Notifications */}
		{Object.keys(readGrouped).length > 0 && (
			<>
			<div className="w-[90%] pt-8 pb-3 kanit text-[1.2rem] text-[#999999]">Read Notifications</div>
			{
				Object.entries(readGrouped).map(([group, notifications]) => renderGroup(group, notifications))
			}
			</>
		)}
    </div>
  );
}

export default Notification