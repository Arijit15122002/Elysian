import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { postTypes, postTypesChange } from '../../../constants/Constant'

import './PostCreation.css'
import MobileImageSelector from '../../Components/ImageSelector/MobileImageSelector'
import ScaleLoader from "react-spinners/ScaleLoader";
import DragAndDropImage from '../../Components/DragAndDropImage/DragAndDropImage'

function CreatePost () {

	const deviceType = useSelector(state => state.device.deviceType)

	const user = useSelector(state => state.auth.user)

	const [ postType, setPostType ] = useState('Public')

	const [ postTypeChangeComponent, setPostTypeChangeComponent ] = useState(false)

	const togglePostTypeChangeComponent = () => {
		setPostTypeChangeComponent(!postTypeChangeComponent)
	}

	const [message, setMessage] = useState('');

	const [ postable, setPostable ] = useState(false)

	const [ totalImages, setTotalImages ] = useState([])

	//HANDLING POST BUTTON COLOR CHANGE
	const handleMessageChange = (event) => {
		if( event.target.value.length >= 3 ) {
			setPostable(true)
		}
		setMessage(event.target.value);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (message.length >= 3 || totalImages.length > 0) {
				setPostable(true);
			} else {
				setPostable(false);
			}
		}, 2000);
		return () => clearTimeout(timer);
	}, [message, totalImages]);


	//HANDLING SETTING, CROPPING & UPLOADING PHOTOS AND VIDEOS
	const [ photoSelector, setPhotoSelector ] = useState(false)
	const togglePhotoSelector = () => {
		setPhotoSelector(!photoSelector)
	}

	//POST DATA HADNLING
	const [taggedPeople, setTaggedPeople] = useState([])
	const [checkIn, setCheckIn] = useState('')
	const [backgroundColor, setBackgroundColor] = useState('')
	const [feelingActivity, setFeelingActivity] = useState('')

	const postData = {
		user,
		postType,
		message,
		images : totalImages,
		taggedPeople,
		checkIn,
		backgroundColor,
		feelingActivity
	}

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const post = async () => {

		setLoading(true)
		
		try {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/create`, postData);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false)
			navigate('/feed')
		}

	}

	return (
	<>
	{
		deviceType === 'mobile' ?
		<div className='w-full h-[webkit-fill-available] flex flex-col items-center justify-center relative'>

			{/* THE LOADING PAGE */}
			<div className={`${loading ? 'block' : 'hidden'} h-[100svh] w-full bg-white absolute z-40 flex flex-row items-center justify-center`}>
			<ScaleLoader 
				color='#232323'
				loading={loading}
				size={40}
			/>
			</div>

			<div className='w-full h-auto flex items-center justify-between'>
				<div className='px-8 text-2xl py-4 radio text-[#999999]'>
					Create Post
				</div>
				<div onClick={post}
				className={`${ postable ? 'bg-[#147ee8] text-white' : 'bg-[#eeeeee] text-[#bbbbbb] ' } px-[1.2rem] py-1 mx-4 dosis rounded-xl text-[1.1rem]`}>
					POST
				</div>
			</div>
			<div className='w-[80%] h-[80px] flex flex-row items-center gap-4 relative'>
				<div className='w-[20%] h-full flex items-center justify-center'>
					<img src={user?.profilePic} 
					className='w-[55px] h-[55px] object-cover object-center rounded-full ring-4 ring-[#4d9eef] '
					alt="" />
				</div>
				<div className='w-[80%] h-full flex flex-col gap-[1px] justify-center mb-[20px]'>
					<div className='text-[#232323] text-xl kanit pb-1'>{user?.fullname}</div>
					<div className=' flex flex-row items-center gap-3 bg-blue-200 w-[120px] py-0.5 justify-center rounded-[4px]'
					onClick={togglePostTypeChangeComponent}>
						<div>
						{
							postType === 'Public' ? 
							<div className='flex flex-row items-center gap-1'>
								<div className='w-[12px] h-[12px]'>
									{postTypes[0].icon}
								</div> 
								<div className='text-[#025FBC] text-[0.9rem] kanit'>
									{postTypes[0].type}
								</div>
							</div> : 
							<div className='flex flex-row items-center gap-1'>
								<div className='w-[12px] h-[12px] mb-[2px]'>
									{postTypes[1].icon}
								</div>
								<div className='text-[#025FBC] text-[0.9rem] kanit'>
									{postTypes[1].type}
								</div>
							</div>
						}
						</div>
						<div className={`${postTypeChangeComponent ? 'rotate-180' : ''} duration-300 w-[12px] h-[12px] `}>
							<svg className='w-[12px] h-[12px]' fill="#025FBC" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></g></svg>
						</div>
					</div>
				</div>

				<div className={`${postTypeChangeComponent ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-[-100%]'} duration-300 ease-in-out absolute top-[110%] flex flex-col w-[100%] gap-2 rounded-3xl bg-[#efefef] py-2 items-center`}
				style={{
					boxShadow: '0 0 20px #aaaaaa'
				}}>
					<div 
					className='w-full flex flex-row py-2 px-2 items-center justify-between rounded-2xl '
					onClick={() => {
						setPostType('Public')
						setPostTypeChangeComponent(!postTypeChangeComponent)
					}}
					>
						<div className='flex flex-row items-center gap-4'>
							<div className='p-3 rounded-full bg-[#eeeeee]'>
								<div className='w-[28px] h-[28px]'>
									{postTypesChange[0].icon}
								</div>
							</div>
							<div className='flex flex-col justify-center'>
								<div className='radio text-lg text-[#555555]'>Public</div>
								<small className='radio text-[#555555]'>Anyone on or off Elysian can see this</small>
							</div>
							<div className={`${postType === 'Public' ? 'ring-[#004385] bg-[#004385] glow' : 'bg-white ring-[#555555]'} ring-1 w-[8px] h-[8px] rounded-full `}/>
						</div>
					</div>

					<div className='bg-[#cccccc] w-[90%] h-[2px]'/>

					<div 
					className='w-full flex flex-row py-2 px-2 items-center justify-between rounded-2xl'
					onClick={() => {
						setPostType('Private')
						setPostTypeChangeComponent(!postTypeChangeComponent)
					}}
					>
						<div className='flex flex-row items-center gap-4'>
							<div className='p-3 rounded-full bg-[#eeeeee]'>
								<div className='w-[30px] h-[30px]'>
									{postTypesChange[1].icon}
								</div>
							</div>
							<div className='flex flex-col justify-center'>
								<div className='radio text-lg text-[#555555]'>Private</div>
								<small className='radio text-[#555555]'>Only your close friends can see this</small>
							</div>
							<div className={`${postType === 'Private' ? 'ring-[#004385] bg-[#004385] glow' : 'bg-white ring-[#555555]'} ring-1 w-[8px] h-[8px] rounded-full `}/>
						</div>
					</div>
				</div>
			</div>

			<div className='text-[1.1rem] w-[85%] mt-3'>
				<textarea
					id="message"
					name="message"
					placeholder="What's on your mind?" 
					value={message}
					onChange={handleMessageChange}
					className='w-full h-[10rem] text-[#232323] bg-[#eeeeee] focus:outline-none p-4 rounded-2xl radio'
				/>
			</div>

			{
				totalImages.length > 0 ? 
				<div className='w-[85%] h-auto flex flex-row gap-5 my-2 overflow-x-auto'>
				{
					totalImages.map((image, index) => (
						<img src={image} alt="" className='h-[75px] rounded-xl'/>
					))
				}
					<div className='border-2 border-[#bbbbbb] rounded-xl w-[75px] h-[75px] flex items-center justify-center'
					onClick={() => {
						togglePhotoSelector()
					}}>
						<svg className='w-[50px] h-[50px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#bbbbbb" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#bbbbbb" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
					</div>
				</div> :
				''
			}

			<div className='w-[90%] mt-2 py-4 px-3 bg-[#dddddd] rounded-3xl flex flex-col items-center gap-3'>
				<div 
				className='flex flex-row gap-4 items-center py-2 px-4 w-[99%] bg-[#f8f8f8] rounded-2xl'
				onClick={() => togglePhotoSelector()}
				>
					<div className='p-1.5 bg-green-200 rounded-full'>
						<svg className='w-[24px] h-[24px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 4H8.8C7.11984 4 6.27976 4 5.63803 4.32698C5.07354 4.6146 4.6146 5.07354 4.32698 5.63803C4 6.27976 4 7.11984 4 8.8V15.2C4 16.8802 4 17.7202 4.32698 18.362C4.6146 18.9265 5.07354 19.3854 5.63803 19.673C6.27976 20 7.11984 20 8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V11" stroke="#0a8f00" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 16L8.29289 11.7071C8.68342 11.3166 9.31658 11.3166 9.70711 11.7071L13 15M13 15L15.7929 12.2071C16.1834 11.8166 16.8166 11.8166 17.2071 12.2071L20 15M13 15L15.25 17.25" stroke="#0a8f00" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.5 3V5.5M18.5 8V5.5M18.5 5.5H16M18.5 5.5H21" stroke="#0a8f00" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					</div>
					<div className='radio text-[#777777]'>
						Photos or Videos 
					</div>
				</div>

				<div className='flex flex-row gap-4 items-center py-2 px-4 w-[99%] bg-[#f8f8f8] rounded-2xl'>
					<div className='p-1.5 bg-blue-200 rounded-full'>
						<svg className='w-[24px] h-[24px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0c78bb"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.72848 16.1369C3.18295 14.5914 2.41018 13.8186 2.12264 12.816C1.83509 11.8134 2.08083 10.7485 2.57231 8.61875L2.85574 7.39057C3.26922 5.59881 3.47597 4.70292 4.08944 4.08944C4.70292 3.47597 5.59881 3.26922 7.39057 2.85574L8.61875 2.57231C10.7485 2.08083 11.8134 1.83509 12.816 2.12264C13.8186 2.41018 14.5914 3.18295 16.1369 4.72848L17.9665 6.55812C20.6555 9.24711 22 10.5916 22 12.2623C22 13.933 20.6555 15.2775 17.9665 17.9665C15.2775 20.6555 13.933 22 12.2623 22C10.5916 22 9.24711 20.6555 6.55812 17.9665L4.72848 16.1369Z" stroke="#0c78bb" stroke-width="1.6"></path> <circle opacity="0.5" cx="8.60699" cy="8.87891" r="2" transform="rotate(-45 8.60699 8.87891)" stroke="#0c78bb" stroke-width="1.6"></circle> <path opacity="0.5" d="M11.5417 18.5L18.5208 11.5208" stroke="#0c78bb" stroke-width="1.9" stroke-linecap="round"></path> </g></svg>
					</div>
					<div className='radio text-[#777777]'>
						Tag your friends
					</div>
				</div>

				<div className='flex flex-row gap-4 items-center py-2 px-4 w-[99%] bg-[#f8f8f8] rounded-2xl'>
					<div className='p-2 bg-red-200 rounded-full'>
						<svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2H7.6087C6.16795 2 5 3.16795 5 4.6087V12ZM5 12H14C16.7614 12 19 14.2386 19 17C19 19.7614 16.7614 22 14 22H7.05882C5.92177 22 5 21.1371 5 20M5 12V15.9706" stroke="#d91212" stroke-width="2" stroke-linecap="round"></path> </g></svg>
					</div>
					<div className='radio text-[#777777]'>
						Text background color 
					</div>
				</div>

				<div className='flex flex-row gap-4 items-center py-2 px-4 w-[99%] bg-[#f8f8f8] rounded-2xl'>
					<div className='p-1.5 bg-yellow-200 rounded-full'>
						<svg className='w-[24px] h-[24px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#e9cb0c" stroke-width="2" stroke-linecap="round"></path> <path d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z" fill="#e9cb0c"></path> <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill="#e9cb0c"></ellipse> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#e9cb0c" stroke-width="2" stroke-linecap="round"></path> </g></svg>
					</div>
					<div className='radio text-[#777777]'>
						Feeling Activity
					</div>
				</div>

				<div className='flex flex-row gap-4 items-center py-2 px-4 w-[99%] bg-[#f8f8f8] rounded-2xl'>
					<div className='p-1.5 bg-[#bbbbbb] rounded-full'>
						<svg className='w-[24px] h-[24px]' viewBox="0 0 64.00 64.00" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#555555" stroke-width="3.072"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 27.2C12 46.4 32 56 32 56s20-9.6 20-28.8C52 16.6 43.05 8 32 8s-20 8.6-20 19.2z"></path><circle cx="32" cy="26.88" r="6.88"></circle></g></svg>
					</div>
					<div className='radio text-[#777777]'>
						Check in
					</div>
				</div>

			</div>

			<div className={`${ photoSelector ? 'scale-100 opacity-100 blur-0 translate-y-0' : 'scale-0 opacity-0 blur-3xl translate-y-[100%]'} duration-500 ease-in-out absolute h-[100%] w-[90%] bg-[#efefef] rounded-3xl`}>
				<MobileImageSelector photoSelector={photoSelector} setPhotoSelector={setPhotoSelector} totalImages={totalImages} setTotalImages={setTotalImages}/>
				
			</div>

		</div> : 
		<div className='w-full h-full flex justify-end'>
			<div className='w-[calc(100%-75px)] lg:w-full h-full flex flex-col items-center'>
				<div className='w-full lg:w-[80%] max-w-[1400px] h-[50px] flex flex-row items-center justify-between px-6 py-3'>
					<div className=' text-[1.5rem] font-semibold text-[#cccccc]'>
						Create Post
					</div>
					<div className={`${ postable ? 'bg-[#147ee8] text-white' : 'bg-[#eeeeee] text-[#bbbbbb] ' } px-[1rem] py-1 mx-4 dosis rounded-xl text-[1rem]`}>
						POST
					</div>
				</div>
				<div className='mt-[20px] w-[85%] lg:w-[70%] max-w-[1200px] h-[70px] flex flex-row gap-3 items-center'>
					<div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
						<img src={user?.profilePic} alt="" className='w-[50px] h-[50px] object-cover'/>
					</div>
					<div className='w-auto h-auto flex flex-col gap-1 mb-2'>
						<div className='text-[1.1rem] font-semibold'>
							{user?.fullname}
						</div>
						<div className=' flex flex-row items-center gap-1 bg-blue-200 w-auto py-0.5 justify-center rounded-[4px] cursor-pointer'
						onClick={togglePostTypeChangeComponent}>
						<div>
						{
							postType === 'Public' ? 
							<div className='flex flex-row items-center gap-1'>
								<div className='w-[10px] h-[10px] mb-[1px]'>
									{postTypes[0].icon}
								</div> 
								<div className='text-[#025FBC] text-[0.7rem] kanit'>
									{postTypes[0].type}
								</div>
							</div> : 
							<div className='flex flex-row items-center gap-1'>
								<div className='w-[10px] h-[10px] mb-[2px]'>
									{postTypes[1].icon}
								</div>
								<div className='text-[#025FBC] text-[0.7rem] kanit'>
									{postTypes[1].type}
								</div>
								</div>
							}
							</div>
							<div className={`${postTypeChangeComponent ? 'rotate-180' : ''} duration-300 w-[10px] h-[10px] `}>
								<svg className='w-[10px] h-[10px]' fill="#025FBC" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></g></svg>
							</div>
						</div>
					</div>
				</div>
				<div className='w-[90%] lg:w-[70%] flex flex-col xl:flex-row items-center'>
					<div className='w-[100%] max-w-[400px] lg:max-w-[450px] h-full mt-5 relative flex flex-col gap-4'>
						<DragAndDropImage totalImages={totalImages} setTotalImages={setTotalImages} />
						
					</div>
					<div className='w-full h-full flex flex-col items-center justify-center'>
						<div className='w-[90%] h-[90%] flex flex-col justify-center'>
							<div className='w-full flex justify-center'>
								<textarea
									id="message"
									name="message"
									placeholder="What's on your mind?" 
									value={message}
									onChange={handleMessageChange}
									className='w-full max-w-[500px] min-h-[4rem] h-[4rem] text-[#232323] bg-[#eeeeee] focus:outline-none p-4 rounded-2xl radio border-2 border-[#dddddd] m-2'
								/>
							</div>

							<div className='text-[#aaaaaa] text-radio text-[1.2rem] font-semibold mt-8 px-6'>
								Add to your POST
							</div>

							<div className='flex flex-row w-full h-[90px]'>

								<div className=''>
									
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
	</>
	)
}

export default CreatePost