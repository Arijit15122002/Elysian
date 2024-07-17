import React from 'react'

function ChatList ({
	chats = [],
	chatId,
	onlineUsers = [],
	newMessagesAlert = [{
		chatId : "",
		count : 0, 
	}],
	handleDeleteChat,
	}) {
return (
	<div className='w-full h-full overscroll-y-auto flex flex-col gap-1'>
	{
		chats?.map((data) => {
			return (
				<div>
					{data}
				</div>
			)
		})
	}
	Chatlist
	</div>
	)
}

export default ChatList