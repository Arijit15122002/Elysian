import React from 'react'
import { Link } from 'react-router-dom'

function Settings ({ settingsOpen, setSettingsOpen }) {
	return (
		<div className={`${settingsOpen ? 'translate-x-0 opacity-100' : 'translate-x-[100%] opacity-0'} duration-500 w-full h-[webkit-fill-available] z-20 fixed flex flex-col items-center justify-end`}>
			<div className='w-full h-[100px] bg-white'/>
			
			<div className='w-[90%] h-[88vh] overflow-y-auto bg-white flex flex-col gap-2 items-center rounded-3xl overflow-hidden' id='settingScroll'>
				

				<small className='w-full px-4 text-[#aaaaaa]'>Your Account</small>
				<Link to={'/profile'}
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'> 
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=stroke"> <g id="profile"> <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12 2.75C9.92893 2.75 8.25 4.42893 8.25 6.5C8.25 8.57107 9.92893 10.25 12 10.25C14.0711 10.25 15.75 8.57107 15.75 6.5C15.75 4.42893 14.0711 2.75 12 2.75ZM6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#000000"></path> <path id="rec (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714ZM9.57143 14.75C7.46091 14.75 5.75 16.4609 5.75 18.5714C5.75 20.0508 6.94924 21.25 8.42857 21.25H15.5714C17.0508 21.25 18.25 20.0508 18.25 18.5714C18.25 16.4609 16.5391 14.75 14.4286 14.75H9.57143Z" fill="#000000"></path> </g> </g> </g></svg>
						<div className='radio text-[1.1rem]'>
							Account
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<div className='w-full h-[1px] bg-inherit my-1'/>

				<small className='w-full px-4 text-[#aaaaaa]'>How you use Elysian</small>
				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 19.2674V7.84496C19 5.64147 17.4253 3.74489 15.2391 3.31522C13.1006 2.89493 10.8994 2.89493 8.76089 3.31522C6.57467 3.74489 5 5.64147 5 7.84496V19.2674C5 20.6038 6.46752 21.4355 7.63416 20.7604L10.8211 18.9159C11.5492 18.4945 12.4508 18.4945 13.1789 18.9159L16.3658 20.7604C17.5325 21.4355 19 20.6038 19 19.2674Z" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Saved
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#232323"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Your Activity
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#292D32" stroke-width="1.464" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#292D32" stroke-width="1.464" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#292D32" stroke-width="1.464" stroke-miterlimit="10"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Notifications
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.6rem] h-[1.6rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#232323" stroke-width="1.5"></path> <path d="M12 7L12 12" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 4L20 3" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Time Spent
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<div className='w-full h-[1px] bg-inherit my-1'/>

				<small className='w-full px-4 text-[#aaaaaa]'>Who can see your content?</small>
				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.8rem] h-[1.8rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 10.4298V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V10.4298M16 10.4298C14.9876 10.1268 13.6753 10 12 10C10.3247 10 9.01243 10.1268 8 10.4298M16 10.4298C18.2226 11.0952 19 12.6104 19 15.5C19 19.7059 17.3529 21 12 21C6.64706 21 5 19.7059 5 15.5C5 12.6104 5.77744 11.0952 8 10.4298" stroke="#232323" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Privacy
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.6rem] h-[1.6rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_429_11210)"> <path d="M21 11.9999C21 16.9705 16.9706 20.9999 12 20.9999C7.02944 20.9999 3 16.9705 3 11.9999C3 7.02938 7.02944 2.99994 12 2.99994" stroke="#232323" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 5.00006L16 8.00006" stroke="#232323" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.9999 5.00005L19 7.99991" stroke="#232323" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_429_11210"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
						<div className='radio text-[1.1rem]'>
							Close Friends
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.4rem] h-[1.4rem]' viewBox="0 0 24 24" id="meteor-icon-kit__regular-blocked-circle" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289Z" fill="#232323"></path></g></svg>
						<div className='radio text-[1.1rem]'>
							Blocked
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<div className='w-full h-[1px] bg-inherit my-1'/>

				<small className='w-full px-4 text-[#aaaaaa]'>How others can interact with you?</small>
				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg 
						className='w-[1.8rem] h-[1.8rem] cursor-pointer'
						fill="#232323" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g><g id="SVGRepo_iconCarrier"><path d="M 16 3 C 14.0625 3 12.570313 3.507813 11.5 4.34375 C 10.429688 5.179688 9.8125 6.304688 9.375 7.34375 C 8.9375 8.382813 8.65625 9.378906 8.375 10.09375 C 8.09375 10.808594 7.859375 11.085938 7.65625 11.15625 C 4.828125 12.160156 3 14.863281 3 18 L 3 19 L 4 19 C 5.347656 19 6.003906 19.28125 6.3125 19.53125 C 6.621094 19.78125 6.742188 20.066406 6.8125 20.5625 C 6.882813 21.058594 6.847656 21.664063 6.9375 22.34375 C 6.984375 22.683594 7.054688 23.066406 7.28125 23.4375 C 7.507813 23.808594 7.917969 24.128906 8.375 24.28125 C 9.433594 24.632813 10.113281 24.855469 10.53125 25.09375 C 10.949219 25.332031 11.199219 25.546875 11.53125 26.25 C 11.847656 26.917969 12.273438 27.648438 13.03125 28.1875 C 13.789063 28.726563 14.808594 29.015625 16.09375 29 C 18.195313 28.972656 19.449219 27.886719 20.09375 26.9375 C 20.417969 26.460938 20.644531 26.050781 20.84375 25.78125 C 21.042969 25.511719 21.164063 25.40625 21.375 25.34375 C 22.730469 24.9375 23.605469 24.25 24.09375 23.46875 C 24.582031 22.6875 24.675781 21.921875 24.8125 21.40625 C 24.949219 20.890625 25.046875 20.6875 25.375 20.46875 C 25.703125 20.25 26.453125 20 28 20 L 29 20 L 29 19 C 29 17.621094 29.046875 16.015625 28.4375 14.5 C 27.828125 12.984375 26.441406 11.644531 24.15625 11.125 C 24.132813 11.121094 24.105469 11.132813 24 11 C 23.894531 10.867188 23.734375 10.601563 23.59375 10.25 C 23.3125 9.550781 23.042969 8.527344 22.59375 7.46875 C 22.144531 6.410156 21.503906 5.269531 20.4375 4.40625 C 19.371094 3.542969 17.90625 3 16 3 Z M 16 5 C 17.539063 5 18.480469 5.394531 19.1875 5.96875 C 19.894531 6.542969 20.367188 7.347656 20.75 8.25 C 21.132813 9.152344 21.402344 10.128906 21.75 11 C 21.921875 11.433594 22.109375 11.839844 22.40625 12.21875 C 22.703125 12.597656 23.136719 12.96875 23.6875 13.09375 C 25.488281 13.503906 26.15625 14.242188 26.5625 15.25 C 26.871094 16.015625 26.878906 17.066406 26.90625 18.09375 C 25.796875 18.1875 24.886719 18.386719 24.25 18.8125 C 23.40625 19.378906 23.050781 20.25 22.875 20.90625 C 22.699219 21.5625 22.632813 22.042969 22.40625 22.40625 C 22.179688 22.769531 21.808594 23.128906 20.78125 23.4375 C 20.070313 23.652344 19.558594 24.140625 19.21875 24.59375 C 18.878906 25.046875 18.675781 25.460938 18.4375 25.8125 C 17.960938 26.515625 17.617188 26.980469 16.0625 27 C 15.078125 27.011719 14.550781 26.820313 14.1875 26.5625 C 13.824219 26.304688 13.558594 25.929688 13.3125 25.40625 C 12.867188 24.460938 12.269531 23.765625 11.53125 23.34375 C 10.792969 22.921875 10.023438 22.714844 9 22.375 C 8.992188 22.359375 8.933594 22.285156 8.90625 22.09375 C 8.855469 21.710938 8.886719 21.035156 8.78125 20.28125 C 8.675781 19.527344 8.367188 18.613281 7.5625 17.96875 C 7 17.515625 6.195313 17.289063 5.25 17.15625 C 5.542969 15.230469 6.554688 13.65625 8.3125 13.03125 C 9.375 12.65625 9.898438 11.730469 10.25 10.84375 C 10.601563 9.957031 10.851563 8.96875 11.21875 8.09375 C 11.585938 7.21875 12.019531 6.480469 12.71875 5.9375 C 13.417969 5.394531 14.402344 5 16 5 Z M 13 9 C 12.449219 9 12 9.671875 12 10.5 C 12 11.328125 12.449219 12 13 12 C 13.550781 12 14 11.328125 14 10.5 C 14 9.671875 13.550781 9 13 9 Z M 17 9 C 16.449219 9 16 9.671875 16 10.5 C 16 11.328125 16.449219 12 17 12 C 17.550781 12 18 11.328125 18 10.5 C 18 9.671875 17.550781 9 17 9 Z" ></path></g></svg>
						<div className='radio text-[1.1rem]'>
							Messages & Replies
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.6rem] h-[1.6rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#232323" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
						<div className='radio text-[1.1rem]'>
							Comments
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.7rem] h-[1.7rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 16L20 21M20 16L15 21M4 21C4 17.134 7.13401 14 11 14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#232323" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Restricted
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.7rem] h-[1.7rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#232323" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Follow & Invite Friends
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<div className='w-full h-[1px] bg-inherit my-1'/>

				<small className='w-full px-4 text-[#aaaaaa]'>What you see</small>
				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.7rem] h-[1.7rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						<div className='radio text-[1.1rem]'>
							Favorites
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>

				<Link
				onClick={() => setSettingsOpen( !settingsOpen )} 
				className='w-full mx-auto px-6 py-4 bg-[#f1f1f1] rounded-xl flex flex-row justify-between items-center'>
					<div className='flex flex-row items-center gap-4'>
						<svg className='w-[1.6rem] h-[1.6rem]' viewBox="0 0 48 48" enable-background="new 0 0 48 48" id="Layer_3" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon fill="#232323" points="15.71,14.931 13.323,7.144 5.291,5.276 4.098,6.549 4.12,6.568 4.127,6.561 4.302,6.722 4.303,6.723 9.352,11.365 9.352,13.929 6.53,14.432 1.431,9.742 1.229,9.609 0.02,10.898 2.484,18.752 10.392,20.651 32.382,42.724 37.835,37.29 16.35,15.724 "></polygon> <polygon fill="#232323" points="6.412,37.29 11.867,42.722 20.083,34.481 14.648,29.028 "></polygon> <path d="M47.98,18.694l-3.422-3.483l-0.989,0.972l-4.086-4.101c-0.003-0.003-0.006-0.005-0.009-0.008 c-8.008-8.196-16.667-6.601-16.667-6.601l7.66,7.688l-6.283,6.302l5.434,5.453l6.283-6.302l2.569,2.58l-0.975,0.958l3.421,3.482 l0.999-0.981l0.065,0.064l5.064-5.045l-0.031-0.03L47.98,18.694z" fill="#232323"></path> </g> </g></svg>
						<div className='radio text-[1.1rem]'>
							Suggestions
						</div>
					</div>
					<div className=''>
						<svg className='w-[1.2rem] h-[1.2rem]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</Link>


				<div className='w-full h-[1px] bg-inherit my-1'/>
			</div>

		</div>
	)
}

export default Settings