import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { postTypes, postTypesChange } from '../../../constants/Constant'

import './PostCreation.css'
import MobileImageSelector from '../../Components/ImageSelector/MobileImageSelector'
import ScaleLoader from "react-spinners/ScaleLoader";
import DragAndDropImage from '../../Components/DragAndDropImage/DragAndDropImage'
import Carousel from '../../Components/Carousel/Carousel'
import FeelingActivityConstants from '../../../constants/FeelingActivityConstants'

function CreatePost () {

	const deviceType = useSelector(state => state.device.deviceType)

	const user = useSelector(state => state.auth.user)

	const [ postTypeChangeComponent, setPostTypeChangeComponent ] = useState(false)

	const togglePostTypeChangeComponent = () => {
		setPostTypeChangeComponent(!postTypeChangeComponent)
	}

	const [ postable, setPostable ] = useState(false)
	const [ postType, setPostType ] = useState('Public')
	const [message, setMessage] = useState('');
	const [taggedPeople, setTaggedPeople] = useState([])
	const [checkIn, setCheckIn] = useState('')
	const [backgroundColor, setBackgroundColor] = useState('')
	const [feelingActivity, setFeelingActivity] = useState('')
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

	//HANDLING CHECKIN
	const handleCheckIn = (e) => {
		console.log(e.target.value);
		setCheckIn(e.target.value)
	}

	//POST DATA HADNLING
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

	//POSTING
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

	const [ handleTagPeopleScreen, setHandleTagPeopleScreen ] = useState(false)
	const [ handnleCheckInScreen, setHandnleCheckInScreen ] = useState(false)
	const [ handleFeelingActivityScreen, setHandleFeelingActivityScreen ] = useState(false)
	const [ handleBackgroundColorScreen, setHandleBackgroundColorScreen ] = useState(false)

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
			<div className='w-[calc(100%-75px)] lg:w-full h-full flex flex-row items-center'>

				{/* THE LOADING PAGE */}
				<div className={`${loading ? 'block' : 'hidden'} h-[100svh] w-full bg-white absolute z-40 flex flex-row items-center justify-center`}>
				<ScaleLoader 
					color='#232323'
					loading={loading}
					size={40}
				/>
				</div>
				
				<div className='w-[40%] xl:w-[32%] h-full hidden lg:flex flex-col items-center'>
					<div className='w-[80%] kanit text-[1.4rem] text-[#cccccc] py-4'>
						Your Post Preview
					</div>
					<div className=' w-[90%] max-w-[420px] h-auto px-6 py-4 my-6 bg-[#ffffff] rounded-3xl border-[1px] border-[#888888]'>
						<div className='w-full h-auto flex flex-row justify-between items-center'>
							<div className=' h-auto flex flex-row'>
								<img src={user?.profilePic} alt="" className='w-[40px] h-[40px] rounded-full object-cover'/>
								<div className='flex flex-col w-auto h-full px-3 mb-[3px]'>
									<div className='text-[1rem] kanit text-[#232323]'>Arijit Biswas, {
										checkIn.length > 0 ? <span className='text-[#444444] text-[0.8rem]'>at {checkIn}</span> : <span></span>
									}</div>
									<div className='text-[0.7rem] kanit text-[#aaaaaa]'>Now</div>
								</div>
							</div>
							<div className='p-1 bg-[#dddddd] rounded-full'>
								<svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12" stroke="#555555" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="12" r="2" stroke="#555555" stroke-width="1.5"></circle> <path d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10" stroke="#555555" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
							</div>
						</div>
						<div className='text-[0.9rem] text-[#232323] px-6 pt-8 pb-4 kanit'>
							{message}
						</div>
						<div className='w-full h-auto'>
						{
							totalImages.length > 0 ? 
							<div className='w-full h-full flex justify-center pt-3 pb-8'>
							{
								totalImages.length === 1 ? 
								<div className='w-[18rem] h-[18rem] '>
									<img src={totalImages[0]} alt="" className='rounded-xl'/>
								</div> : 
								<div className='w-[18rem] h-[18rem]'>
									<Carousel images={totalImages} />
								</div>
							}
							</div> : 
							<div className='w-full h-[10px]'></div>
						}
						</div>
						<div className='flex flex-row gap-2 items-center justify-between w-[100%] h-auto'>
							<div className='flex flex-row w-[28%] gap-1 text-[0.8rem] justify-center items-center rounded-xl py-2.5 bg-[#eeeeee] cursor-pointer hover:scale-110 hover:bg-[#f0f0f0] hover:border-[1px] duration-300 ease-in-out '>
								<svg className='w-[19px] h-[19px]' version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M507.532,223.313c-9.891-24.594-35-41.125-62.469-41.125H365.86c-2.516,0-4.75-0.031-6.75-0.094 c0.641-0.844,1.203-1.594,1.672-2.203c2.719-3.563,4.922-6.406,6.656-9.188c0.688-0.922,1.688-2.047,2.859-3.453 c9.516-11.234,29.328-34.625,34.531-67.109c2.891-18.016-2.359-36.438-14.359-50.516c-11.156-13.094-26.906-20.891-42.109-20.891 c-15.359,0-28.672,7.641-36.516,20.969c-1.156,1.938-2.531,4.406-4.125,7.266c-7.797,13.859-24,42.719-39.672,54.063 c-17.969,12.984-33.875,30.5-49.25,47.453c-21.141,23.313-43.016,47.406-60.656,47.406c-13.797,0-24.969,11.203-24.969,24.984 v170.516c0,13.797,11.172,24.984,24.969,24.984c18.359,0,59.766,15.938,89.984,27.594c23.156,8.922,43.172,16.609,56.703,19.328 c3.984,0.797,8.094,1.719,12.313,2.641c15.484,3.438,33.063,7.328,50.531,7.328c27.766,0,49.234-10.031,63.797-29.828 c14.203-19.266,30.422-69.313,51.813-137.938c1.453-4.703,2.906-9.328,4.297-13.797 C520.017,267.188,512.501,235.641,507.532,223.313z M465.563,288.453c-17.031,54.172-39.719,130.516-54.219,150.188 c-11.031,15-26.672,19.641-43.672,19.641c-19.141,0-40-5.875-57.938-9.484c-29.891-5.984-114.328-47.406-151.594-47.406V230.875 c45.234,0,81.125-68.25,124.531-99.594c23.391-16.922,42.984-55.797,50.688-68.906c3.547-6.031,9.016-8.672,15-8.672 c15.984,0,35.578,18.844,31.797,42.484c-5.203,32.484-29.891,54.594-33.797,61.078c-3.891,6.516-20.797,24.703-20.797,35.094 c0,9.109,6.484,14.813,40.297,14.813c42.031,0,70.922,0,79.203,0C478.923,207.172,508.767,246.969,465.563,288.453z"></path> <path class="st0" d="M0.001,250.734v158.219c0,19.547,15.844,35.406,35.406,35.406h42.234c13.047,0,23.609-10.578,23.609-23.609 V215.328H35.407C15.845,215.328,0.001,231.172,0.001,250.734z M49.798,374.125c8.969,0,16.25,7.266,16.25,16.25 c0,8.969-7.281,16.25-16.25,16.25c-8.984,0-16.266-7.281-16.266-16.25C33.532,381.391,40.813,374.125,49.798,374.125z"></path> </g> </g></svg>
								<div className='text-[#232323] kanit'>Like</div>
							</div>
							<div className='flex flex-row gap-1 text-[0.8rem] justify-center items-center w-[38%] rounded-xl py-2.5 bg-[#eeeeee] cursor-pointer hover:scale-110 hover:bg-[#f0f0f0] duration-300 ease-in-out '>
								<svg className='w-[19px] h-[19px]' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="none" fill-rule="evenodd"> <path d="m0 0h32v32h-32z"></path> <path d="m24 2c4.418278 0 8 3.581722 8 8v9c0 4.418278-3.581722 8-8 8h-14.65568992c-.8644422 0-1.70562318.280039-2.39757043.7981793l-3.74795444 2.8065233c-.88415838.6620708-2.13762479.4820332-2.79969558-.4021251-.25907013-.3459737-.39908963-.7665641-.39908963-1.1987852v-19.0037923c0-4.418278 3.581722-8 8-8zm0 2h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v19.0037923l3.74795444-2.8065234c.96378366-.7216954 2.12058137-1.1354383 3.31910214-1.1908624l.2772535-.0064065h14.65568992c3.2383969 0 5.8775718-2.5655749 5.9958615-5.7750617l.0041385-.2249383v-9c0-3.23839694-2.5655749-5.87757176-5.7750617-5.99586153zm-2.571997 8.0964585c.4991418.2363808.7121517.8326397.4757709 1.3317815-1.0147484 2.1427431-3.3743976 3.5719947-5.9072405 3.5719947-2.5295477 0-4.8788249-1.4193527-5.8988448-3.5543444-.23808431-.4983315-.0271123-1.0953145.4712193-1.3333988.4983315-.2380843 1.0953145-.0271123 1.3333988.4712192.6812794 1.4259781 2.3208063 2.416524 4.0942267 2.416524 1.7746853 0 3.4225233-.9981039 4.099688-2.4280053.2363808-.4991419.8326397-.7121518 1.3317816-.4757709z" fill="#000000" fill-rule="nonzero"></path> </g> </g></svg>
								<div className='text-[#232323] kanit'>Comment</div>
							</div>
							<div className='flex flex-row gap-1 text-[0.8rem] justify-center items-center w-[28%] rounded-xl py-2.5 bg-[#eeeeee] cursor-pointer hover:scale-110 hover:bg-[#f0f0f0] hover:border-[1px] duration-300 ease-in-out '>
								<svg className='w-[19px] h-[19px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.68445 10.6578L13 8.50003M15.3157 16.6578L11 14.5M21 6C21 7.65685 19.6569 9 18 9C16.3431 9 15 7.65685 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6ZM9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="#000000" stroke-width="1.5"></path> </g></svg>
								<div className='text-[#232323] kanit'>Share</div>
							</div>
						</div>
					</div>
				</div>

				<div className='h-[90%] my-auto w-[1.5px] bg-[#dddddd] rounded-full hidden lg:flex'></div>

				<div className=' w-full max-w-[800px] mx-auto lg:w-[60%] xl:w-[68%] h-full flex flex-col items-center overflow-y-auto' id='scrollHome'>
					<div className='w-full lg:w-[80%] h-[50px] flex flex-row items-center justify-between px-6 py-3'>
						<div className=' text-[1.5rem] font-semibold text-[#cccccc]'>
							Create Post
						</div>
						<div 
							className={`${ postable ? 'bg-[#147ee8] text-white cursor-pointer hover:shadow-md hover:shadow-[#555555]/20' : 'bg-[#eeeeee] text-[#bbbbbb] cursor-default' } duration-300 ease-in-out px-[1rem] py-1 mx-4 dosis rounded-xl text-[1rem]`}
							onClick={post}
						>
							POST
						</div>
					</div>
					<div className='mt-[20px] w-[85%] lg:w-[70%] h-[70px] flex flex-row gap-3 items-center'>
						<div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
							<img src={user?.profilePic} alt="" className='w-[50px] h-[50px] object-cover'/>
						</div>
						<div className='w-auto h-auto flex flex-col gap-1 mb-2 relative'>
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

							<div className={`${postTypeChangeComponent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-200%]'} absolute duration-200 ease-in-out h-[160px] w-[360px] flex flex-col items-center justify-center bg-[#eeeeee] rounded-3xl z-10 top-16`}>
							<div 
							className='w-full flex flex-row py-2 px-2 items-center justify-between rounded-2xl cursor-pointer '
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
								className='w-full flex flex-row py-2 px-2 items-center justify-between rounded-2xl cursor-pointer'
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
					</div>
					<div className='w-[90%] lg:w-[70%] flex flex-col items-center'>
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
										className='w-full min-w-[380px] max-w-[450px] min-h-[4rem] h-[4rem] text-[#232323] bg-[#eeeeee] focus:outline-none p-4 rounded-2xl radio border-2 border-[#dddddd] m-2'
									/>
								</div>

								<div className='text-[#aaaaaa] text-radio text-[1.2rem] font-semibold mt-8 px-6'>
									Add to your POST
								</div>

								<div className=' flex flex-col gap-2 w-full h-auto items-center mt-8 mb-6'>

									<div className=' flex flex-row w-[80%] max-w-[400px] h-[55px] bg-[#eeeeee] rounded-xl border-2 border-[#dddddd] items-center cursor-pointer hover:opacity-80 duration-200 ease-in-out'
										onClick={() => setHandleTagPeopleScreen( !handleTagPeopleScreen )}
									>
										<svg className='w-[40px] h-[40px] ml-6 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.1297 11.3401C14.5197 9.70008 13.0897 8.27003 11.4497 8.66003C10.6797 8.85003 10.0497 9.48005 9.85974 10.2501C9.46974 11.8901 10.8997 13.32 12.5397 12.93C13.3197 12.74 13.9497 12.1101 14.1297 11.3401Z" fill="#025ac5"></path> <path opacity="0.4" d="M6.02094 17.97C5.84093 17.97 5.65093 17.9 5.51093 17.77C3.57093 15.97 2.46094 13.43 2.46094 10.79C2.46094 5.52998 6.74093 1.25 12.0009 1.25C17.2609 1.25 21.5409 5.52998 21.5409 10.79C21.5409 13.45 20.4709 15.91 18.5309 17.74C18.2309 18.02 17.7509 18.01 17.4709 17.71C17.1909 17.41 17.2009 16.93 17.5009 16.65C19.1409 15.11 20.0409 13.04 20.0409 10.8C20.0409 6.36999 16.4309 2.76001 12.0009 2.76001C7.57093 2.76001 3.96094 6.36999 3.96094 10.8C3.96094 13.06 4.87093 15.14 6.53093 16.68C6.83093 16.96 6.85094 17.44 6.57094 17.74C6.42094 17.89 6.22094 17.97 6.02094 17.97Z" fill="#025ac5"></path> <path opacity="0.4" d="M15.9995 15.3C15.8195 15.3 15.6295 15.23 15.4895 15.1C15.1895 14.82 15.1695 14.34 15.4595 14.04C16.2895 13.16 16.7495 12 16.7495 10.8C16.7495 8.18005 14.6195 6.06006 12.0095 6.06006C9.39952 6.06006 7.26953 8.19005 7.26953 10.8C7.26953 12.01 7.72952 13.16 8.55952 14.04C8.83952 14.34 8.82953 14.82 8.52953 15.1C8.22953 15.39 7.74953 15.3701 7.46953 15.0701C6.37953 13.9101 5.76953 12.39 5.76953 10.8C5.76953 7.36005 8.56952 4.56006 12.0095 4.56006C15.4495 4.56006 18.2495 7.36005 18.2495 10.8C18.2495 12.39 17.6495 13.9101 16.5495 15.0701C16.3995 15.2201 16.1995 15.3 15.9995 15.3Z" fill="#025ac5"></path> <path d="M10.3007 16.66L8.86071 18.4501C7.72071 19.8801 8.73071 21.99 10.5607 21.99H13.4307C15.2607 21.99 16.2807 19.8701 15.1307 18.4501L13.6907 16.66C12.8307 15.57 11.1707 15.57 10.3007 16.66Z" fill="#025ac5"></path> </g></svg>
										<div className='text-[#555555] radio'>
											Tag People
										</div>
									</div>

									<div className=' flex flex-row w-[80%] max-w-[400px] h-[55px] bg-[#eeeeee] rounded-xl border-2 border-[#dddddd] items-center cursor-pointer hover:opacity-80 duration-200 ease-in-out'
										onClick={() => setHandnleCheckInScreen( !handnleCheckInScreen )}
									>
										<svg className='w-[33px] h-[33px] ml-7 mr-3' viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 0a7 7 0 0 0-7 7v.04a6.863 6.863 0 0 0 1.09 3.7l.6.81L8.2 17.6a1 1 0 0 0 1.6 0l4.51-6.05.6-.81A6.863 6.863 0 0 0 16 7.04V7a7 7 0 0 0-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#05b339" fill-rule="evenodd"></path> </g></svg>
										<div className='text-[#555555] radio'>
											Add Location
										</div>
									</div>

									<div className=' flex flex-row w-[80%] max-w-[400px] h-[55px] bg-[#eeeeee] rounded-xl border-2 border-[#dddddd] items-center cursor-pointer hover:opacity-80 duration-200 ease-in-out'
										onClick={() => setHandleFeelingActivityScreen( !handleFeelingActivityScreen )}
									>
										<div className='w-[30px] h-[30px] ml-6 mr-3 rounded-full bg-[#fff41c]'>
											<svg className='mt-[1.5px] ml-[1px]' viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#232323" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 26.7728,20.5833C 29.8731,20.5833 32.3864,23.0966 32.3864,26.197C 32.3864,29.2973 29.8731,31.8106 26.7728,31.8106C 23.6724,31.8106 21.1591,29.2973 21.1591,26.197C 21.1591,23.0966 23.6724,20.5833 26.7728,20.5833 Z M 49.2273,20.5833C 52.3276,20.5833 54.8409,23.0967 54.8409,26.197C 54.8409,29.2973 52.3276,31.8106 49.2273,31.8106C 46.127,31.8106 43.6136,29.2973 43.6136,26.197C 43.6136,23.0967 46.127,20.5833 49.2273,20.5833 Z M 20.5833,39.5834L 55.4166,39.5834C 57.1655,39.5834 58.5833,41.0011 58.5833,42.75C 58.5833,44.4989 57.1655,45.9167 55.4166,45.9167L 55.4166,49.875C 55.4166,55.5589 49.2256,60.1667 43.5417,60.1667C 37.8577,60.1667 31.6667,55.5589 31.6667,49.875L 31.6667,45.9167L 20.5833,45.9167C 18.8344,45.9167 17.4167,44.4989 17.4167,42.75C 17.4167,41.0011 18.8344,39.5834 20.5833,39.5834 Z M 36.4167,45.9167L 36.4167,48.2917C 36.4167,52.2267 39.6066,55.4167 43.5417,55.4167C 47.4767,55.4167 50.6667,52.2267 50.6667,48.2917L 50.6667,45.9167L 45.9166,45.9167L 45.9166,49.875C 45.9166,51.1867 44.8533,52.25 43.5416,52.25C 42.23,52.25 41.1666,51.1867 41.1666,49.875L 41.1666,45.9167L 36.4167,45.9167 Z "></path> </g></svg>
										</div>
										<div className='text-[#555555] radio'>
											Feeling Activity
										</div>
									</div>

									<div className=' flex flex-row w-[80%] max-w-[400px] h-[55px] bg-[#eeeeee] rounded-xl border-2 border-[#dddddd] items-center cursor-pointer hover:opacity-80 duration-200 ease-in-out'>
										<div className='w-[30px] h-[30px] ml-6 mr-3 rounded-full bg-[#e01b1b]'>
											<svg className='w-[20px] h-[20px] ml-[6px] mt-[5px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2H7.6087C6.16795 2 5 3.16795 5 4.6087V12ZM5 12H14C16.7614 12 19 14.2386 19 17C19 19.7614 16.7614 22 14 22H7.05882C5.92177 22 5 21.1371 5 20M5 12V15.9706" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
										</div>
										<div className='text-[#555555] radio'>
											Text Background Color
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${handleTagPeopleScreen ? 'opacity-100 blur-0 backdrop-blur-sm scale-100' : 'opacity-0 blur-2xl backdrop-blur-0 scale-0'} fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 duration-300 flex items-end justify-center`}>
				<div className='w-full h-[calc(100vh-70px)] flex items-center justify-center'>
					<div className='w-[500px] h-[400px] bg-[#eeeeee] rounded-3xl flex justify-center relative'>
						<div className=' w-[90%] h-[60px] px-6 py-4 text-[#888888] text-[1.2rem] flex flex-row items-center'>
							<svg className='w-[40px] h-[40px] ml-6 mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.1297 11.3401C14.5197 9.70008 13.0897 8.27003 11.4497 8.66003C10.6797 8.85003 10.0497 9.48005 9.85974 10.2501C9.46974 11.8901 10.8997 13.32 12.5397 12.93C13.3197 12.74 13.9497 12.1101 14.1297 11.3401Z" fill="#025ac5"></path> <path opacity="0.4" d="M6.02094 17.97C5.84093 17.97 5.65093 17.9 5.51093 17.77C3.57093 15.97 2.46094 13.43 2.46094 10.79C2.46094 5.52998 6.74093 1.25 12.0009 1.25C17.2609 1.25 21.5409 5.52998 21.5409 10.79C21.5409 13.45 20.4709 15.91 18.5309 17.74C18.2309 18.02 17.7509 18.01 17.4709 17.71C17.1909 17.41 17.2009 16.93 17.5009 16.65C19.1409 15.11 20.0409 13.04 20.0409 10.8C20.0409 6.36999 16.4309 2.76001 12.0009 2.76001C7.57093 2.76001 3.96094 6.36999 3.96094 10.8C3.96094 13.06 4.87093 15.14 6.53093 16.68C6.83093 16.96 6.85094 17.44 6.57094 17.74C6.42094 17.89 6.22094 17.97 6.02094 17.97Z" fill="#025ac5"></path> <path opacity="0.4" d="M15.9995 15.3C15.8195 15.3 15.6295 15.23 15.4895 15.1C15.1895 14.82 15.1695 14.34 15.4595 14.04C16.2895 13.16 16.7495 12 16.7495 10.8C16.7495 8.18005 14.6195 6.06006 12.0095 6.06006C9.39952 6.06006 7.26953 8.19005 7.26953 10.8C7.26953 12.01 7.72952 13.16 8.55952 14.04C8.83952 14.34 8.82953 14.82 8.52953 15.1C8.22953 15.39 7.74953 15.3701 7.46953 15.0701C6.37953 13.9101 5.76953 12.39 5.76953 10.8C5.76953 7.36005 8.56952 4.56006 12.0095 4.56006C15.4495 4.56006 18.2495 7.36005 18.2495 10.8C18.2495 12.39 17.6495 13.9101 16.5495 15.0701C16.3995 15.2201 16.1995 15.3 15.9995 15.3Z" fill="#025ac5"></path> <path d="M10.3007 16.66L8.86071 18.4501C7.72071 19.8801 8.73071 21.99 10.5607 21.99H13.4307C15.2607 21.99 16.2807 19.8701 15.1307 18.4501L13.6907 16.66C12.8307 15.57 11.1707 15.57 10.3007 16.66Z" fill="#025ac5"></path> </g></svg>
							<div className='text-[#888888] text-[1.2rem] kanit'>
								Tag Your Friends
							</div>
						</div>
						<div className='absolute bottom-0 right-0 w-[90%] flex flex-row justify-end items-center px-6 py-4 gap-3'>
							<div className='text-white bg-blue-600 px-4 py-1.5 rounded-lg dosis font-semibold cursor-pointer'>
								ENTER
							</div>
							<div className='text-[#e02b2b] bg-red-100 px-4 p-1.5 rounded-lg dosis font-semibold cursor-pointer '
								onClick={() => setHandleTagPeopleScreen(false)}
							>
								CANCEL
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${handnleCheckInScreen ? 'opacity-100 blur-0 backdrop-blur-sm scale-100' : 'opacity-0 blur-2xl backdrop-blur-0 scale-0'} fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 duration-300 flex items-end justify-center}`}>
				<div className='w-full h-[calc(100vh-70px)] flex items-center justify-center'>
					<div className='w-[500px] h-auto bg-[#eeeeee] rounded-3xl flex flex-col justify-center relative'>
						<div className='w-[90%] h-[60px] px-6 py-4 flex flex-row items-center'>
							<svg className='w-[33px] h-[33px] ml-7 mr-3' viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 0a7 7 0 0 0-7 7v.04a6.863 6.863 0 0 0 1.09 3.7l.6.81L8.2 17.6a1 1 0 0 0 1.6 0l4.51-6.05.6-.81A6.863 6.863 0 0 0 16 7.04V7a7 7 0 0 0-7-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#05b339" fill-rule="evenodd"></path> </g></svg>
							<div className=' text-[1.2rem] text-[#888888] kanit'>
								Add Location to Your Post
							</div>
						</div>
						<div className='w-full h-auto flex flex-row items-center mx-16 mt-4 '>
							<svg className='w-[35px] h-[35px]' viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z" stroke="#232323" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M12 14.0137V22" stroke="#232323" stroke-miterlimit="10" stroke-linecap="round"></path> </g></svg>
							<div className='text-[1.2rem] kanit text-[#232323]'>Enter Your Location - </div>
						</div>
						<div className='w-full h-auto flex items-center my-4 pb-20'>
							<input 
								type="text" 
								className='w-[70%] text-[1rem] px-4 py-2 mx-auto rounded-lg border-[1.5px] border-[#aaaaaa] focus:border-blue-600 focus:outline-none kanit'
								placeholder='Enter Your Location'
								value={checkIn}
								onChange={handleCheckIn}
							/>
						</div>

						<div className='absolute bottom-0 right-0 w-[90%] flex flex-row justify-end items-center px-6 py-4 gap-3'>
							<div 
								className='text-white bg-blue-600 px-4 py-1.5 rounded-lg dosis font-semibold cursor-pointer'
								onClick={() => setHandnleCheckInScreen( !handnleCheckInScreen )}	
							>
								ENTER
							</div>
							<div className='text-[#e02b2b] bg-red-100 px-4 p-1.5 rounded-lg dosis font-semibold cursor-pointer '
								onClick={() => {
									setCheckIn('')
									setHandnleCheckInScreen(false)
								}}
							>
								CANCEL
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${handleFeelingActivityScreen ? 'opacity-100 blur-0 backdrop-blur-sm scale-100' : 'opacity-0 blur-2xl backdrop-blur-0 scale-0'} fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 duration-300 flex items-end justify-center`}>
				<div className='w-full h-[calc(100vh-70px)] flex items-center justify-center'>
					<div className='w-[500px] h-auto bg-[#eeeeee] rounded-3xl flex flex-col justify-center relative'>
						<div className='flex flex-row w-[90%] px-6 py-4'>
							<div className='w-[30px] h-[30px] ml-6 mr-3 rounded-full bg-[#fff41c]'>
								<svg className='mt-[1.5px] ml-[1px]' viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#232323" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" d="M 26.7728,20.5833C 29.8731,20.5833 32.3864,23.0966 32.3864,26.197C 32.3864,29.2973 29.8731,31.8106 26.7728,31.8106C 23.6724,31.8106 21.1591,29.2973 21.1591,26.197C 21.1591,23.0966 23.6724,20.5833 26.7728,20.5833 Z M 49.2273,20.5833C 52.3276,20.5833 54.8409,23.0967 54.8409,26.197C 54.8409,29.2973 52.3276,31.8106 49.2273,31.8106C 46.127,31.8106 43.6136,29.2973 43.6136,26.197C 43.6136,23.0967 46.127,20.5833 49.2273,20.5833 Z M 20.5833,39.5834L 55.4166,39.5834C 57.1655,39.5834 58.5833,41.0011 58.5833,42.75C 58.5833,44.4989 57.1655,45.9167 55.4166,45.9167L 55.4166,49.875C 55.4166,55.5589 49.2256,60.1667 43.5417,60.1667C 37.8577,60.1667 31.6667,55.5589 31.6667,49.875L 31.6667,45.9167L 20.5833,45.9167C 18.8344,45.9167 17.4167,44.4989 17.4167,42.75C 17.4167,41.0011 18.8344,39.5834 20.5833,39.5834 Z M 36.4167,45.9167L 36.4167,48.2917C 36.4167,52.2267 39.6066,55.4167 43.5417,55.4167C 47.4767,55.4167 50.6667,52.2267 50.6667,48.2917L 50.6667,45.9167L 45.9166,45.9167L 45.9166,49.875C 45.9166,51.1867 44.8533,52.25 43.5416,52.25C 42.23,52.25 41.1666,51.1867 41.1666,49.875L 41.1666,45.9167L 36.4167,45.9167 Z "></path> </g></svg>
							</div>
							<div className='kanit text-[#aaaaaa] text-[1.2rem]'>
								How are you Feeling?
							</div>
						</div>

						<div className='w-[80%] h-auto mx-auto pb-16 overflow-hidden'>
							<FeelingActivityConstants/>
						</div>

						<div className='absolute bottom-0 right-0 w-[90%] flex flex-row justify-end items-center px-6 py-4 gap-3'>
							<div 
								className='text-white bg-blue-600 px-4 py-1.5 rounded-lg dosis font-semibold cursor-pointer'
								onClick={() => setHandleFeelingActivityScreen( !handleFeelingActivityScreen )}	
							>
								ENTER
							</div>
							<div className='text-[#e02b2b] bg-red-100 px-4 p-1.5 rounded-lg dosis font-semibold cursor-pointer '
								onClick={() => {
									setFeelingActivity('')
									setHandleFeelingActivityScreen( !handleFeelingActivityScreen )
								}}
							>
								CANCEL
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