import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import moment from 'moment'
import ClipLoader from 'react-spinners/ClipLoader'
import Carousel from '../../Components/Carousel/Carousel'
import { useTheme } from '../../../context/contextAPI'

import { postPrivacies2, postPrivacyChange } from '../../../constants/Constant'
import axios from 'axios'

function ShareModal ({post, setShareModalOpen, fetchPosts}) {

	const { theme } = useTheme()

	const user = useSelector(state => state.auth.user)
	const deviceType = useSelector(state => state.device.deviceType)

	const creationDate = moment(post.createdAt)
	let formattedTime = creationDate.fromNow()

	const [ loading, setLoading ] = useState(false)
	const [ changePostPrivacy, setChangePostPrivacy ] = useState(false)
	const [ sharedPostData, setSharedPostData ] = useState({
		postPrivacy : 'Public',
		postType : 'Shared',
		userId : user._id,
		message : '',
		images : [],
		hashTags : [],
		taggedPeople : [],
		checkIn : '',
		backgroundColor : '',
		feelingActivity : '',
		sharedPost : post._id,
	})
	const handleShare = async () => {
		setLoading(true)
		
		try {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/create`, sharedPostData)
			console.log(response);
			if( response?.data?.success ) {
				fetchPosts(1)
			}
		} catch (error) {	
			console.error(error);
		} finally {
			setLoading(false)
			setShareModalOpen(false)
		}
		
	}

	return (
		<div className={`${ deviceType === 'mobile' ? 'w-[100%]' : 'w-[calc(100%-60px)]' } h-full flex items-center justify-center`}>
			<div className={`min-w-[400px] w-[50%] max-w-[550px] h-auto bg-white dark:bg-[#232323] rounded-2xl overflow-hidden relative flex flex-col items-center`}
				onClick={(e) => e.stopPropagation()}
			>
				<div 
					className='absolute px-3 py-1.5 text-[0.9rem] bg-[#111111] dark:bg-white text-white dark:text-black rounded-xl top-3 right-3 cursor-pointer kanit font-light dark:font-normal hover:scale-110 duration-200 ease-in-out'
					onClick={() => {
						setShareModalOpen(false)
					}}
				>
					CANCEL
				</div>

				<div className='w-full h-auto px-8 py-4 flex flex-row items-center'>
					<img src={user.profilePic} alt="" className='w-[55px] h-[55px] rounded-full'/>
					<div className='flex flex-col gap-1.5 ml-4'>
						<div className='kanit text-black dark:text-white text-[1.1rem]'>
							{user.fullname}
						</div>
						<div 
							className=' flex flex-row items-center gap-1 bg-blue-200 w-[90px] py-[1px] justify-center rounded-[4px] cursor-pointer'
							onClick={() => {
								setChangePostPrivacy(!changePostPrivacy)
							}}
						>
							<div>
							{
								sharedPostData.postPrivacy === 'Public' ? 
								<div className='flex flex-row items-center gap-1'>
									<div className='w-[10px] h-[10px]'>
										{postPrivacies2[0].icon}
									</div> 
									<div className='text-[#025FBC] text-[0.75rem] kanit'>
										{postPrivacies2[0].type}
									</div>
								</div> : 
								<div className='flex flex-row items-center gap-1'>
									<div className='w-[10px] h-[10px] mb-[2px]'>
										{postPrivacies2[1].icon}
									</div>
									<div className='text-[#025FBC] kanit text-[0.75rem]'>
										{postPrivacies2[1].type}
									</div>
								</div>
							}
							</div>
							<div className={`${changePostPrivacy ? 'rotate-180' : ''} duration-300 w-[10px] h-[10px] `}>
								<svg className='w-[10px] h-[10px]' fill="#025FBC" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></g></svg>
							</div>
						</div>
						<div className='radio font-light text-[0.85rem] text-[#555555] dark:text-[#bcbcbc]'>
							Sharing {post.user.fullname}'s post
						</div>
					</div>
					<div 
						className={`${ changePostPrivacy ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-[-100%]'} p-2 duration-300 ease-in-out absolute left-[50px] top-[70px] flex flex-col h-auto w-[300px] max-w-[400px] gap-2 rounded-3xl bg-white items-center shadow-[0_0_10px_0_rgba(0,0,0,0.1)]`}
					>

						<div 
							className='w-full flex flex-row items-center justify-between p-2 bg-[#efefef] rounded-2xl cursor-pointer'
							onClick={() => {
								setSharedPostData({...sharedPostData, postPrivacy : 'public'})
								setChangePostPrivacy(false)
							}}
						>
							<div className='flex flex-row items-center'>
								<div className='w-[30px] h-[30px]'>{postPrivacyChange[0].icon}</div>
								<div className='flex flex-col pl-4'>
									<div className='kanit text-[0.9rem]'>Public</div>
									<div className='text-[0.8rem] radio'>Everyone can see this...</div>
								</div>
							</div>
							<div className={`${ sharedPostData.postPrivacy === 'public' ? 'bg-blue-600 glow ring-blue-600 glow' : 'bg-white ring-[#232323]' } ring-[0.5px] w-[7px] h-[7px] mr-2 rounded-full`} />
						</div>

						<div 
							className='w-full flex flex-row items-center justify-between p-2 bg-[#efefef] rounded-2xl cursor-pointer'
							onClick={() => {
								setSharedPostData({...sharedPostData, postPrivacy : 'private'})
								setChangePostPrivacy(false)
							}}
						>
							<div className='flex flex-row items-center'>
								<div className='w-[30px] h-[30px]'>{postPrivacyChange[1].icon}</div>
								<div className='flex flex-col pl-4'>
									<div className='kanit text-[0.9rem]'>Private</div>
									<div className='text-[0.8rem] radio'>Everyone can see this...</div>
								</div>
							</div>
							<div className={`${ sharedPostData.postPrivacy === 'private' ? 'bg-blue-600 ring-blue-600 glow' : 'bg-white ring-[#232323]' } ring-[0.5px] w-[7px] h-[7px] mr-2 rounded-full`} />
						</div>
					</div>
				</div>

				

				<textarea
					onChange={(e) => {
						setSharedPostData({ ...sharedPostData, message : e.target.value })
					}}
					placeholder='Say something about this post...'
					className='w-[85%] min-h-[100px] resize-none text-base leading-6 box-border overflow-hidden break-words focus:outline-none bg-inherit text-[#000000] dark:text-white quicksand font-semibold text-[0.8rem]'

				/>

				<div className='w-full px-3 pt-1 pb-3 flex flex-row justify-end'>
					<div 
						className=' mx-4 px-6 py-1.5 kanit text-[0.9rem] flex flex-row items-center gap-2 font-light bg-blue-600 dark:bg-gradient-to-tr from-blue-700 to-blue-500 text-white rounded-xl cursor-pointer hover:scale-110 duration-200 ease-in-out'
						onClick={() => {
							handleShare()
						}}
					>
						<svg className='w-[16px] h-[16px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.68445 10.6578L13 8.50003M15.3157 16.6578L11 14.5M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke={theme === 'dark' ? '#fff' : '#fff'} stroke-width="1.5"></path> </g></svg>
						<div>SHARE</div>
					</div>
				</div>

				<div className={`${loading ? 'w-full h-full opacity-100 blur-none scale-100 bg-white dark:bg-[#232323]' : 'w-0 h-0 opacity-100 blur-md scale-0'} absolute top-0 left-0 flex items-center justify-center`}>
					<ClipLoader 
						color={theme === 'dark' ? '#fff' : '#232323'}
						loading={loading}
						size={40}
					/>
				</div>
			</div>
		</div>
	)
}

export default ShareModal