import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import MoonLoader from "react-spinners/MoonLoader";

import ProfilePostCard from './ProfilePostCard'
import FollowOrUnoffolowCard from './FollowOrUnoffolowCard'
import ProfileEditingModal from './ProfileEditingModal'
import ViewProfileDetails from './ViewProfileDetails'
import setCanvasPreview from '../../Components/ImageSelector/SetCanvasPreview';
import { userExists } from '../../../redux/reducers/auth.reducer';

function Profile () {

	const user = useSelector(state => state.auth.user)
	const deviceType = useSelector(state => state.device.deviceType)
	const dispatch = useDispatch()

	//Editing User's Profile Picture
	const fileInputRef = useRef(null)
	const imageRef = useRef(null)
    const canvasRef = useRef(null)

	const ASPECT_RATIO = 1
    const MIN_WIDTH = 150

	const [imagesrc, setImagesrc] = useState('')
    const [imageCropper, setImageCropper] = useState(false)
    const [ crop, setCrop ] = useState()
    const [ imageFinalizer, setImageFinalizer ] = useState(false)
    const [ croppedImageURL, setCroppedImageURL ] = useState('')
	const [ loading, setLoading ] = useState(false)

	const handleProfilePictureEditClick = () => {
		fileInputRef.current.click()
	}

	const onSelectFile = (e) => {
        const file = e.target.files?.[0]
        if( !file ) return

        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
            const imageElement = new Image()
            const imageurl = reader.result?.toString() || ''
            imageElement.src = imageurl

            imageElement.addEventListener('load', () => {
                const { naturalWidth, naturalHeight } = event.currentTarget

                if( naturalWidth < MIN_WIDTH || naturalHeight < MIN_WIDTH ) {
                    toast.error('Image must be at least 25x25px')
                    return setImagesrc('')
                }
            })

            setImagesrc(imageurl)
            setImageCropper(!imageCropper)
        })
        reader.readAsDataURL(file)
    }

	const onImageLoad = (e) => {
		
		const { width, height } = e.currentTarget
        const cropWidthPercent = (MIN_WIDTH / width) * 100

        const crop = makeAspectCrop({
                unit: '%',
                width: cropWidthPercent,
            }, 
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)

	}

    const handleEditedProfilePictureSubmit = async (croppedImageURL) => {

		setLoading(true)
		setImagesrc('')
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/update/profilePicture`, { profilePic: croppedImageURL, userId: user._id })

		if( response?.data?.user ) {
			dispatch(userExists(response.data.user))
			setLoading(false)
			setCrop('')
			setCroppedImageURL('')
			setImageCropper(false)
			setImageFinalizer(false)
		}

	}

	
	//Fetching User Posts
	const [ userPosts, setUserPosts ] = useState([])
	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/profilePosts`, { postIds: user.posts });
				if( response?.data?.posts ) {
					setUserPosts(response.data.posts)
				} else {
					setUserPosts([])
				}
			} catch (error) {
				console.error("Error fetching user posts:", error);
			}
		}

		fetchUserPosts()
	}, [])


	//Fetching Followers & Followings
	const [ followers, setFollowers ] = useState([])
    const [ followings, setFollowings ] = useState([])

	const fetchFollowingsAndFollowers = async () => {
		try {
			const followingsresponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/bunchOfUsers`, { userIds: user.following });
			const followersresponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/bunchOfUsers`, { userIds: user.followers });
			if( followingsresponse?.data?.users && followersresponse?.data?.users ) {
				setFollowers(followersresponse.data.users)
				setFollowings(followingsresponse.data.users)
			} else {
				setFollowings([])
			}
		} catch (error) {
			console.error("Error fetching followings:", error);
		}
	}

    useEffect(() => {

        fetchFollowingsAndFollowers()

    }, [user.following])

	//For Profile Settings Dropdown
	const [ profileSettings, setProfileSettings ] = useState(false)
	const [ watchProfilePicture, setWatchProfilePicture ] = useState(false)
	const [ watchCoverPicture, setWatchCoverPicture ] = useState(false)
	
	useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && watchProfilePicture) {
                setWatchProfilePicture(false);
			} else if ( e.key === 'Escape' && watchCoverPicture ) {
				setWatchCoverPicture(false)
			}
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [watchProfilePicture, watchCoverPicture]);


	//Handing Posts Followers Following Tagged Pages
	const [ OnPostsScreen, setOnPostsScreen ] = useState(true)
	const [ OnFollowersScreen, setOnFollowersScreen ] = useState(false)
	const [ OnFollowingScreen, setOnFollowingScreen ] = useState(false)
	const [ OnTaggedScreen, setOnTaggedScreen ] = useState(false)

	//Handling the Edit Profile Part
	const [ profilePictureEditOrRemove, setProfilePictureEditOrRemove ] = useState(false)
	const [ removeProfilePicture, setRemoveProfilePicture ] = useState(false)
	const [ profileEditingOpen, setProfileEditingOpen ] = useState(false)

	//Handling the View Details Part
	const [ viewDetailsOpen, setViewDetailsOpen ] = useState(false)

	return (
		<>
		{
			deviceType === 'mobile' ?
			<> </> : 
			<>
				<div className='w-full h-full relative overflow-y-auto' id='scrollHome'>
					

					{/* Profile Setting Dropdown Hamburger */}
					<div className='w-full h-auto flex justify-end pt-2'>
						<div 
							className={` ${profileSettings ? 'bg-[#e1ffa1]' : 'bg-[#eeeeee] hover:bg-[#e2e2e2]'} w-[2.1rem] h-[2.1rem] flex lg:hidden flex-col items-center justify-center gap-1.5 rounded-full duration-300 ease-in-out cursor-pointer`}
							onClick={() => {
								setProfileSettings(!profileSettings)
							}}
						>
							<div className={` ${profileSettings ? 'translate-y-[3.8px] rotate-45 bg-[#5c7e13]' : 'bg-[#888888] rotate-0'} w-[1rem] h-[0.1rem] rounded-full duration-300 ease-in-out`}/>
							<div className={` ${profileSettings ? '-translate-y-[3.8px] -rotate-45 bg-[#5c7e13]' : 'bg-[#888888] rotate-0'} w-[1rem] h-[0.1rem] rounded-full duration-300 ease-in-out`}/>
						</div>
					</div>
					

					{/* Profile Settings Dropdown */}
					<div className={`${profileSettings ? ' opacity-100 blur-0 w-[220px] h-auto' : ' opacity-0 blur-xl translate-x-[200%]'} duration-300 ease-in-out fixed top-[120px] right-8 bg-white flex lg:hidden flex-col gap-1 p-1 rounded-2xl z-20`} style={{
						boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
					}}>
						<div 
							className='w-full h-[40px] flex flex-row gap-2 items-center hover:bg-[#f5f5f5] rounded-xl px-6 cursor-pointer'
							onClick={() => {
								setProfileEditingOpen(true)
								setProfileSettings(false)
							}}
						>
							<svg height="20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z" fill="#555555"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z" fill="#555555"></path> </g></svg>
							<div className='kanit text-[#555555]'>Edit Profile</div>
						</div>
						<div className='w-full h-[40px] flex flex-row gap-2 items-center hover:bg-[#f5f5f5] rounded-xl px-6 cursor-pointer'>
							<svg fill="#555555" height="20px" width="20px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" stroke="#555555"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Information-Filled"> <path d="M19,7.78c0.06,2.04-0.74,3.89-2.08,5.2C15.73,14.15,15,16.33,15,17H9c0-0.63-0.67-2.82-1.85-3.95C5.82,11.78,5,9.99,5,8 c0-3.92,3-7,7.16-7C16,1,18.89,4.13,19,7.78z M9,20c0,1.66,1.34,3,3,3s3-1.34,3-3v-1H9V20z"></path> </g> </g></svg>
							<div className='kanit text-[#555555]'>View Details</div>
						</div>
						<div className='w-full h-[40px] flex flex-row gap-2 items-center hover:bg-[#f5f5f5] rounded-xl px-6 cursor-pointer'>
							<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M11.9993 2C16.7133 2 19.0704 2 20.5348 3.46447C21.2923 4.22195 21.658 5.21824 21.8345 6.65598V10H2.16406V6.65598C2.3406 5.21824 2.70628 4.22195 3.46377 3.46447C4.92823 2 7.28525 2 11.9993 2Z" fill="#555555"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V15.1893L10.0303 13.9697C9.73744 13.6768 9.26256 13.6768 8.96967 13.9697C8.67678 14.2626 8.67678 14.7374 8.96967 15.0303L11.4697 17.5303C11.6103 17.671 11.8011 17.75 12 17.75C12.1989 17.75 12.3897 17.671 12.5303 17.5303L15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697L12.75 15.1893V11Z" fill="#555555"></path> </g></svg>
							<div className='kanit text-[#555555]'>View Archive</div>
						</div>
					</div>
					

					{/* Actual Profile Part */}
					<div className='w-[95%] lg:w-[90%] h-auto mx-auto my-4 p-2 bg-white rounded-3xl' style={{
						boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
					}}>
						<div className='w-full h-[200px] rounded-2xl overflow-hidden z-10'>
						{
							user.coverPic ? 
							<>
								<div className='w-full h-full bg-[#f1f1f1] flex items-center justify-center relative'>
									<img 
										src={user.coverPic} 
										alt=""  
										className='w-full h-full object-cover object-center cursor-pointer'
										onClick={() => setWatchCoverPicture(true)}	
									/>
									<div className='absolute bottom-0 right-0 flex flex-row gap-1 items-center bg-white hover:bg-[#f8f8f8] duration-300 ease-in-out px-4 py-1.5 m-2 rounded-lg cursor-pointer' style={{
										boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
									}}>
										<svg viewBox="0 0 24 24" height="20" widht="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#555555"></path> </g></svg>
										<div className='text-[0.8rem] kanit'>
											Edit Cover Image
										</div>
									</div>
								</div>
							</> : 
							<>
								<div className='w-full h-full bg-[#f1f1f1] flex items-center justify-center relative'>
									<img src="/Profile/addCoverPic.png" alt="" className='w-[50px] '/>
									<div className='absolute bottom-0 right-0 flex flex-row gap-1 items-center bg-white hover:bg-[#f8f8f8] duration-300 ease-in-out px-4 py-1.5 m-2 rounded-lg cursor-pointer' style={{
										boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
									}}>
										<svg viewBox="0 0 24 24" height="20" widht="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#555555"></path> </g></svg>
										<div className='text-[0.8rem] kanit'>
											Add Cover Image
										</div>
									</div>
								</div>
							</>
						}
						</div>

						<div className='w-full h-auto relative'>
							<div className='flex flex-col'>
								<div className='flex flex-row items-center'>
									<div className='z-10 flex flex-col'>
										<div className='relative'>
											<div className='w-[100px] h-[100px] border-8 border-white bg-white -mt-[40px] ml-8 rounded-3xl overflow-hidden flex items-center justify-center'>
											{
												loading ? 
												<>
													<MoonLoader 
														color='#232323'
														loading={loading}
														size={20}
													/>
												</> : 
												<>
													<img 
														src={user.profilePic} 
														alt="" 
														className='w-full h-full object-cover object-center cursor-pointer' 
														style={{
															boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)'
														}}
														onClick={() => setWatchProfilePicture(true)}
													/>
												</>
											}
											</div>
											<div 
												className='absolute w-[30px] h-[30px] flex items-center justify-center bg-white hover:bg-[#efefef] duration-200 ease-in-out rounded-full right-0 top-[40px] hover:cursor-pointer ' 
												style={{
													boxShadow: '00 0 10px 0 rgba(0, 0, 0, 0.2)'
												}}
												onClick={() => {
													setProfilePictureEditOrRemove(!profilePictureEditOrRemove)
												}}
											>
												<svg viewBox="0 0 24 24" height="20" widht="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#555555"></path> </g></svg>

												<div 
													className={`${profilePictureEditOrRemove ? 'opacity-100 blur-none scale-100' : 'opacity-0 blur-xl scale-0'} duration-300 ease-in-out absolute w-[250px] bg-white flex flex-col items-center -bottom-[110px] -right-[150px] p-2 rounded-2xl gap-2`} 
													style={{
														boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
													}}
												>
													<div 
														className='flex flex-row items-center gap-3 py-1.5 px-4 hover:bg-[#eeeeee] rounded-lg duration-200 ease-in-out'
														onClick={(e) => {
															e.stopPropagation()
															setRemoveProfilePicture(true)
															setProfilePictureEditOrRemove(false)
														}}	
													>
														<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
														<span className='radio text-[#232323]'>Remove Profile Picture</span>
													</div>
													<div 
														className='flex flex-row items-center gap-3 py-1.5 px-4 hover:bg-[#eeeeee] rounded-lg duration-200 ease-in-out'
														onClick={() => {
															handleProfilePictureEditClick()
															setProfilePictureEditOrRemove(false)
														}}
													>
														<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
														<span className='radio text-[#232323]'>Change Profile Picture</span>

														<input 
															ref={fileInputRef}
															type="file" 
															accept="image/*"
															className='hidden'
															onChange={onSelectFile}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='flex flex-col ml-4 gap-1'>
										<div className='text-[1.6rem] text-[#444444] font-semibold kanit'>{user.fullname}</div>
										<div className='flex flex-row items-center gap-4'>
											<div className='text-blue-600 text-[0.9rem] font-semibold radio'>@{user.username.toLowerCase()}</div>
											<div 
												className='bg-white hover:bg-[#f4f4f4] kanit text-[0.9rem] px-4 py-2 rounded-lg lg:flex flex-row gap-2 items-center duration-200 ease-in-out cursor-pointer hidden border-[2px] border-[#efefef]' 
												style={{
													boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
												}}
												onClick={() => setViewDetailsOpen(true)}
											>View Details</div>
										</div>
									</div>
								</div>
								<div className='text-[0.8rem] radio pl-10 mt-2 mb-2 text-[#444444]'>
									{
										user.bio.description ? 
										<># {user.bio.description}</> :
										<></>
									}
								</div>
							</div>

							<div 
								className='absolute right-2 bottom-2 hidden lg:flex flex-row gap-2'
							>
								<div 
									className='bg-blue-500 hover:opacity-85 px-4 py-2 rounded-lg flex flex-row gap-2 items-center duration-200 ease-in-out cursor-pointer'
									onClick={() => setProfileEditingOpen(!profileEditingOpen)}
								>
									<svg height="18" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z" fill="#ffffff"></path> </g></svg>
									<div className='text-white text-[0.9rem] radio'>Edit Profile</div>
								</div>

								<div className='bg-black hover:opacity-85 px-4 py-1.5 rounded-lg flex flex-row gap-2 items-center duration-200 ease-in-out cursor-pointer'>
									<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M11.9993 2C16.7133 2 19.0704 2 20.5348 3.46447C21.2923 4.22195 21.658 5.21824 21.8345 6.65598V10H2.16406V6.65598C2.3406 5.21824 2.70628 4.22195 3.46377 3.46447C4.92823 2 7.28525 2 11.9993 2Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.75 11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V15.1893L10.0303 13.9697C9.73744 13.6768 9.26256 13.6768 8.96967 13.9697C8.67678 14.2626 8.67678 14.7374 8.96967 15.0303L11.4697 17.5303C11.6103 17.671 11.8011 17.75 12 17.75C12.1989 17.75 12.3897 17.671 12.5303 17.5303L15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697C14.7374 13.6768 14.2626 13.6768 13.9697 13.9697L12.75 15.1893V11Z" fill="#ffffff"></path> </g></svg>
									<div className='text-white text-[0.9rem] radio'>View Archive</div>
								</div>
							</div>
						</div>
					</div>


					{/* Posts Followers Following Tagged Selecting Section*/}
					<div className='w-full h-[50px] flex justify-center items-center'>
						<div className='w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] text-[0.85rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[0.9rem] flex flex-row overflow-x-auto justify-between'>
							<div className={`${OnPostsScreen ? 'font-bold border-2 border-black border-t-0 border-l-0 border-r-0' : ''} cursor-pointer exo px-1 py-1`} onClick={() => {
								setOnPostsScreen(true)
								setOnFollowersScreen(false)
								setOnFollowingScreen(false)
								setOnTaggedScreen(false)
								}}>Posts</div>
							<div className={`${OnFollowersScreen ? 'font-bold border-2 border-black border-t-0 border-l-0 border-r-0' : ''} cursor-pointer exo px-1 py-1`} onClick={() => {
								setOnPostsScreen(false)
								setOnFollowersScreen(true)
								setOnFollowingScreen(false)
								setOnTaggedScreen(false)
								}}>Followers</div>
							<div className={`${OnFollowingScreen ? 'font-bold border-2 border-black border-t-0 border-l-0 border-r-0' : ''} cursor-pointer exo px-1 py-1`} onClick={() => {
								setOnPostsScreen(false)
								setOnFollowersScreen(false)
								setOnFollowingScreen(true)
								setOnTaggedScreen(false)
								}}>Following</div>
							<div className={`${OnTaggedScreen ? 'font-bold border-2 border-black border-t-0 border-l-0 border-r-0' : ''} cursor-pointer exo px-1 py-1 `} onClick={() => {
								setOnPostsScreen(false)
								setOnFollowersScreen(false)
								setOnFollowingScreen(false)
								setOnTaggedScreen(true)
								}}>Tagged</div>
						</div>
					</div>
					

					{/* Handling the Posts of User */}
					<>
					{
						OnPostsScreen && 
						<div className='w-full h-auto'>
							<div className='mx-auto md:ml-8 xl:mx-auto my-4 p-4 w-[90%] h-auto grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 bg-white rounded-3xl' style={{
								boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
							}}>
							{
								userPosts.length > 0 ?
								userPosts.map((post) => (
									<ProfilePostCard key={post._id} post={post} />
								)) :
								<div className='w-full h-auto flex items-center justify-center text-[#7c7c7c] text-[20px]'>No Posts Yet</div>
							}
								<div className='w-full aspect-[1/1] bg-[#e1e1e1] hover:bg-[#e9e9e9] duration-200 ease-in-out rounded-2xl flex items-center justify-center cursor-pointer'>
									<svg viewBox="0 0 24 24" height="120" width="120" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								</div>
							</div>
						</div>
					}
					</>


					{/* Handling the Followers of the User */}
					<>
					{
						OnFollowersScreen &&
						<div className='w-full h-auto flex justify-center'>
							<div className='w-[90%] h-auto py-6 flex flex-col gap-3 items-center'>
							{
								followers.length > 0 ?
								followers.map((followerUser) => (
									<FollowOrUnoffolowCard key={followerUser._id} targetAccount={followerUser} />
								)) : <>

								</>
							}
							</div>
						</div>
					}
					</>


					{/* Handling the Followings of User */}
					<>
					{
						OnFollowingScreen &&
						<div className='w-full h-auto flex justify-center'>
							<div className='w-[90%] h-auto py-6 flex flex-col gap-3 items-center'>
							{
								followings.length > 0 ?
								followings.map((followingUser) => (
									<FollowOrUnoffolowCard key={followingUser._id} type='following' targetAccount={followingUser}/>
								)) : <>

								</>
							}
							</div>
						</div>
					}
					</>


					{/* Handling the Tagged Posts */}
					<>
					{
						OnTaggedScreen &&
						<div>
							Tagged
						</div>	
					}
					</>


					{/* Background SVG */}
					<div className='fixed h-[100vh] w-[100vw] top-0 left-0 mt-[70%] ml-[80%] -z-20'>
						<svg className='absolute z-0 bg-black' width="500px" height="500px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#f1f1f1" stroke-width="3.4560000000000004">
							<g id="SVGRepo_bgCarrier" stroke-width="0">
							<path transform="translate(-8.96, -8.96), scale(2.56)" d="M16,28.77608844016989C18.08722480732056,28.9229345016092,20.226069316704844,28.554030911097094,22.06404822606628,27.554078566834065C23.891274512663863,26.55997618650965,25.301655032291862,24.940837233758877,26.350876790021303,23.144694380835702C27.360264704750755,21.41674232922008,27.605997130555764,19.421534355793476,27.96474743419822,17.452783362213804C28.342206267599515,15.381363642845832,28.880868819721044,13.326598109867739,28.51788261134611,11.252593327513381C28.117800709024618,8.966633807279699,27.767609506575134,6.157906774241103,25.77867493016255,4.962157758994726C23.705220285267938,3.715595212798414,21.041126918105817,5.559827491721807,18.6346539866626,5.31078858663758C16.641378684622204,5.104510305978147,14.955868236627868,3.669531887164028,12.952249003709845,3.634788135538358C10.662375972255818,3.595080601016794,8.305943821877014,3.9205899287633796,6.341330833142528,5.0976162636318865C4.235699169259146,6.359128802811522,2.134045983228318,8.12901761903313,1.495002634267129,10.498980105783547C0.8578348897747267,12.861986707243503,2.6790913753764776,15.15207268184285,2.9751401562897257,17.581504313415273C3.2710344995181977,20.009668600479998,1.701431093255813,22.9057757254027,3.238745274647558,24.808458141105064C4.808384583038107,26.75114828682803,7.982886521137543,25.989685546869886,10.367834372107112,26.731195026842677C12.303196774826457,27.332922887775105,13.978250275189568,28.63384885808791,16,28.77608844016989" fill="none" strokewidth="0"/></g>
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
							<g id="SVGRepo_iconCarrier">
							<path d="M31.67 8.33h.66A23.67 23.67 0 0 1 56 32v13.15a10.52 10.52 0 0 1-10.52 10.52h-27A10.52 10.52 0 0 1 8 45.15V32A23.67 23.67 0 0 1 31.67 8.33z"/>
							<circle cx="22" cy="30" r="6"/>
							<circle cx="42" cy="30" r="6"/>
							<path d="m56 8-4 4"/>
							</g>
						</svg>
					</div>


					{/* Setting Up Profile Picture Crop and Edit */}
					<div className={`${ imagesrc ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0' } duration-500 ease-in-out fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50`}>
			
						<div className='bg-black/70 w-full max-w-[540px] h-[95%] rounded-2xl flex items-center justify-center relative'>

							<div 
								className='absolute p-1.5 top-2 right-2 bg-red-200 rounded-full cursor-pointer z-20'
								onClick={() => {
									setImageCropper(false)
									setImageFinalizer(false)
									setImagesrc(null)
									setCroppedImageURL(null)
									setCrop(null)
									setImagesrc(null)
								}}
							>
								<svg className='w-[22px] h-[22px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d90d0d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#f00a0a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
							</div>

							<div className={`${imageCropper ? ' scale-100 blur-none opacity-100 translate-x-0 ' : ' scale-0 blur-3xl opacity-0 translate-x-[-100%]'} duration-500 ease-in-out w-full h-full flex flex-col items-center justify-center items fixed`}>

								<ReactCrop
									className='max-w-[450px] max-h-[450px] rounded-xl'
									crop={crop}
									keepSelection
									aspect={ASPECT_RATIO}
									minWidth={MIN_WIDTH}
									onChange={((
										pixelCrop,
										percentCrop
									) => setCrop(percentCrop))}
								>
									<img src={imagesrc} alt="" 
										className='w-full h-full rounded-xl overflow-hidden'
										onLoad={onImageLoad}
										ref={imageRef}
									/>
								</ReactCrop>

								<button 
								className='bg-black text-white kanit px-6 py-2 rounded-xl mt-5 hover:scale-110 duration-300 ease-in-out' 
								style={{
									boxShadow: '0px 0px 20px #232323'
								}}
								onClick={() => {
									setCanvasPreview(
										imageRef.current,
										canvasRef.current,
										convertToPixelCrop(
											crop,
											imageRef.current.width,
											imageRef.current.height
										)
									)
									setCroppedImageURL(canvasRef.current.toDataURL('image/jpeg', 0.2))
									setImageCropper(!imageCropper)
									setImageFinalizer(!imageFinalizer)
								}}
								>
									CROP IMAGE
								</button>

							</div>

							<div className={`${ imageFinalizer ? 'scale-100 opacity-100 blur-none translate-x-0' : 'scale-0 opacity-0 blur-3xl translate-x-[100%]' } duration-500 ease-in-out fixed`}>

								<canvas
								className=' rounded-xl overflow-hidden'
									ref={canvasRef}
									style={{
										objectFit: 'contain',
										width: 350,
										height: 350
									}}
								/>

								<div className='w-full flex flex-row items-center justify-between pt-6 px-10'>
									<button 
									className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
									onClick={() => {
										setImageCropper(!imageCropper)
										setImageFinalizer(!imageFinalizer)
									}}
									>RESIZE</button>
									<button 
									className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
									onClick={() => {
										handleEditedProfilePictureSubmit(croppedImageURL)
									}}
									>SAVE</button>
								</div>

							</div>

						</div>

					</div>


					{/* Watching Profile Picture */}
					<div className={`${watchProfilePicture ? 'scale-100 opacity-100 blur-none ' : 'scale-0 opacity-0 blur-3xl ' } duration-300 ease-in-out fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center`}>
						<img 
							src={user.profilePic} 
							alt="" 
							className='w-[70%] max-w-[600px] rounded-3xl border-4 border-white'
						/>
						<div className='absolute w-full h-full flex items-center justify-center'>
							<div className='w-[70%] max-w-[600px] rounded-3xl aspect-[1/1] p-4 relative'>
								<div 
									className='w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center absolute top-4 right-4 cursor-pointer hover:shadow-md hover:shadow-black/50 duration-200 ease-in-out'
									onClick={() => setWatchProfilePicture(false)}
								>
									<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								</div>
							</div>
						</div>
					</div>


					{/* Watching Cover Picture */}
					<div className={`${watchCoverPicture ? 'scale-100 opacity-100 blur-none ' : 'scale-0 opacity-0 blur-3xl ' } duration-300 ease-in-out fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center`}>
						<div className='w-[90%] max-w-[1000px] h-[80%] max-h-[90%] bg-black flex items-center justify-center rounded-3xl relative'>
							<img src={user.coverPic} alt="" className='w-full h-full rounded-3xl border-white border-4'/>
							<div className='absolute top-4 right-4'>
								<div 
									className='h-[35px] w-[35px] bg-white rounded-full flex items-center justify-center cursor-pointer hover:shadow-md hover:shadow-black/50 duration-200 ease-in-out'
									onClick={() => setWatchCoverPicture(false)}
								>
									<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#000000" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								</div>
							</div>
						</div>
					</div>


					{/* Profile Editing Modal */}
					<div 
						className={`${profileEditingOpen ? 'scale-100 opacity-100 blur-0' : 'scale-0 opacity-0 blur-md'} w-full h-full bg-[#232323]/50 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center duration-300 ease-in-out`}
						onClick={() => setProfileEditingOpen(false)}
					>
						<ProfileEditingModal setProfileEditingOpen={setProfileEditingOpen}/>
					</div>


					{/* View Profile Details */}
					<div 
						className={`${viewDetailsOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} w-full h-full bg-[#232323]/50 backdrop-blur-sm fixed top-0 left-0 z-50 flex justify-center items-center duration-300 ease-in-out`}
						onClick={() => setViewDetailsOpen(false)}	
					>
						<ViewProfileDetails setViewDetailsOpen={setViewDetailsOpen}/>
					</div>


					{/* Removing Profile Picture */}
					<div
						className={`${removeProfilePicture ? 'scale-100 opacity-100 blur-none' : 'scale-0 opacity-0 blur-xl'} duration-300 ease-in-out fixed w-full h-full bg-black/50 backdrop-blur-md top-0 left-0 z-50 flex justify-center items-center`}
					>
						<div className='w-[450px] px-6 py-2 flex flex-col bg-white rounded-3xl'>
							<div className='flex flex-row px-6 py-4 items-center'>
								<img src="/Profile/deleting.png" alt="" className='w-[150px]'/>
								<div className='text-[#232323] py-6 text-[1.2rem] kanit'>You want to remove your profile picture?</div>
							</div>
							<div className='flex flex-row p-4 items-center justify-center gap-6 kanit'>
								<div 
									className='py-1.5 px-6 bg-red-600 hover:bg-red-500 duration-200 ease-in-out text-white rounded-lg cursor-pointer'
									onClick={() => {
										handleEditedProfilePictureSubmit('')
									}}
									>
									Remove
								</div>
								<div 
									className='py-1.5 px-6 bg-[#dedede] hover:bg-[#111111] hover:text-white duration-200 ease-in-out rounded-lg cursor-pointer'
									onClick={() => setRemoveProfilePicture(false)}
								>
									Cancel
								</div>
							</div>
						</div>
					</div>

				</div>
			</>
		}
		</>
  )
}

export default Profile