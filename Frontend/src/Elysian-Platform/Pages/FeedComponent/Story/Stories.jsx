import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from 'react-infinite-scroll-component';

import StoryCard from './StoryCard'
import ImageStory from './ImageStory'
import TextStory from './TextStory'

import { setCurrentStoryContainer } from '../../../../redux/reducers/story.reducer';
import debounce from '../../../utils/debounce'

function Stories () {

	const user = useSelector((state) => state.auth.user)
	const deviceType = useSelector((state) => state.device.deviceType)


	//Fetching User stories
	const [usersLastStory, setUsersLastStory] = useState(null)

	const fetchUserStories = async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/story/userStories/${user._id}`)
			const userStories = response.data.storyContainer.storyArray
			setUsersLastStory(userStories[userStories.length - 1])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchUserStories()
	}, [user.stories])


	








	// Fetching Followings' Stories
	const [lastStories, setLastStories] = useState([]);
	const [page, setPage] = useState(1);
	console.log(page);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const fetchFollowingsStories = async () => {
		if (loading || !hasMore) return; // Prevent multiple fetches
	
		setLoading(true);
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/api/story/followings/${user._id}/last-stories?page=${page}&limit=4`
			);
			console.log(response);
	
			const { followingsLastStories, currentPage, totalPages, hasMore } = response.data;
	
			const storyMap = new Map();

			lastStories.forEach(story => {
				storyMap.set(story.user._id, story);
			});

			followingsLastStories.forEach(story => {
				storyMap.set(story.user._id, story);
			});

			// Update state with the values from the map, which preserves insertion order
			setLastStories(Array.from(storyMap.values()));
	
			// Update pagination state
			setHasMore(hasMore);
			setPage(currentPage + 1);
		} catch (error) {
			console.error("Error fetching followings' stories:", error);
		} finally {
			setLoading(false);
		}
	};


	const initializeStories = async () => {
		setLastStories([]); // Reset previous stories
		setPage(1);
		setHasMore(true);
		setLoading(false);
		await fetchFollowingsStories();
	  };


	useEffect(() => {
		initializeStories();
	}, [user._id]);

	const handleInfiniteScroll = useCallback(
		debounce((event) => {
			const scrollElement = event.target;
			if (scrollElement.scrollLeft + scrollElement.clientWidth >= scrollElement.scrollWidth - 10) {
				fetchFollowingsStories();
				}
			}, 300), // Debounce to avoid firing multiple requests
			[page, hasMore, loading]
		);

	useEffect(() => {
		const scrollElement = document.getElementById('scrollStories');
		scrollElement.addEventListener('scroll', handleInfiniteScroll);
		return () => scrollElement.removeEventListener('scroll', handleInfiniteScroll);
	}, [handleInfiniteScroll]);

	










	//Opening story modals dropdown
	const closeDropDownRef = useRef()
	const storyCreateButtonRef = useRef()
	const [ selectStoryTypeDropdown, setSelectStoryTypeDropdown ] = useState(false)
	const [ storyType, setStoryType ] = useState('')
	const [ selectImageModalOpen, setSelectImageModalOpen ] = useState(false)

	useEffect(() => {
		const handleClickOutside = (event) => {
		  if (closeDropDownRef.current && !closeDropDownRef.current.contains(event.target) && storyCreateButtonRef.current &&
		  !storyCreateButtonRef.current.contains(event.target)) {
			setSelectStoryTypeDropdown(false);
		  }
		};
		document.addEventListener("mousedown", handleClickOutside);
	
		return () => {
		  document.removeEventListener("mousedown", handleClickOutside);
		};
	  }, []);











	  //Opening the image story creation modal
	  const fileInputRef = useRef(null)
	  const [imagesrc, setImagesrc] = useState('')
	  const [imageCropper, setImageCropper] = useState(false)
	  const MIN_WIDTH = 150
	  const onSelectFile = (e) => {
        const file = e.target.files?.[0]
        if( !file ) {
			return
		}

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










	//Actual Story model
	const [ type, setType ] = useState('')
	const [story, setStory] = useState({
		userId : user._id,
		type,
		image : '',
		video : '',
        caption : '',
		text : '',
		fontColor : '#ffffff',
        fontFamily : 'radio',
        textAlignment : 'center',
        fontSize : '1.8',
		backgroundColor : '#232323',
	})

	//Opening the video story creation modal

	//Opening the text story creation modal
	const [ textStoryModalOpen, setTextStoryModalOpen ] = useState(false)










	//Fetching selected user's Followings' StoryContainers
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleStoryClick = async (userId) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/story/userStories/${userId}`)
			if( response.data.success ) {
				dispatch(setCurrentStoryContainer(response.data.storyContainer))
				navigate(`/stories/${user._id}`)
			}
		} catch (error) {
			console.log("An error occured while fetching the selected Story: ",error)
		}
	}

	useEffect(() => {
		if( imagesrc !== '' || imagesrc !== null){ 
			setSelectImageModalOpen(false);
		}	
	}, [imagesrc])
	
	

return (
	<>
	{
		deviceType === 'mobile' ?
		<></> :
		<>
			<div className='h-full w-full flex flex-row gap-1 items-center overflow-x-auto whitespace-nowrap' id='scrollStories'>

				{/* Adding Story Section */}
				<div className='w-[130px] lg:w-[138px] aspect-[9/15.5] ml-2 mr-2 relative flex-shrink-0'>
					<div className='w-full h-full bg-[#ffffff] dark:bg-[#232323] rounded-2xl relative group cursor-pointer shadow-[0_0_7px_0_rgba(0,0,0,0.2)] flex-shrink-0 overflow-hidden'>
						<img src={user.profilePic} alt="" className='h-[80%] w-full object-cover object-top group-hover:scale-105 duration-200 ease-in-out'/>
						<div 
							ref={storyCreateButtonRef}
							className='absolute top-[70%] left-[50%] translate-x-[-50%] p-2 bg-[#111111] rounded-full group-hover:scale-125 duration-200 ease-in-out cursor-pointer shadow-[0_0_7px_0_rgba(0,0,0)]'
							onClick={() => {
								setSelectStoryTypeDropdown(!selectStoryTypeDropdown)
							}}
						>
							<svg className='w-[25px] h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						<div className='absolute w-full text-center bottom-3 text-[#232323] dark:text-white text-[0.9rem] kanit'>
							Create Story
						</div>
					</div>

					{/* DropDown for Selecting Story Type */}
					<div 
						className={`${ selectStoryTypeDropdown ? 'scale-100 opcaity-100 translate-x-0 translate-y-0' : 'scale-0 opacity-0 translate-x-[-50%] translate-y-[40%]' } duration-300 absolute left-[110px] bottom-[35px] bg-white flex flex-col gap-1 p-1 rounded-xl shadow-[0_0_7px_0_rgba(0,0,0,0.3)] z-10`}
						ref={closeDropDownRef}
					>
						<svg className='absolute -left-[8px] bottom-[10px]' height="15px" width="15px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.205 8.72805L12.205 3.72805C13.2041 3.10363 14.5 3.82189 14.5 5.00004V15C14.5 16.1782 13.2041 16.8965 12.205 16.272L4.205 11.272C3.265 10.6845 3.265 9.31555 4.205 8.72805Z" fill="#ffffff"></path> </g></svg>
						<div className='bg-white flex flex-col gap-1'>
							<div 
								className={`${storyType === 'imageStory' ? 'bg-blue-600 text-white' : 'hover:bg-[#efefef] text-[#232323]'} duration-200 ease-in-out rounded-lg flex flex-row items-center px-6 py-1.5 gap-2 cursor-pointer`}
								onClick={() => {
									setStory({ ...story, type: 'imageStory' })
									setSelectImageModalOpen(true)
								}}	
							>	
								<svg height="19px" width="19px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" 
								fill={storyType === 'imageStory' ? 'white' : '#232323'}
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"></style> <g> <path class="st0" d="M256.005,220.786c-35.892,0-64.989,29.35-64.989,65.558c0,36.226,29.097,65.558,64.989,65.558 c35.892,0,64.978-29.332,64.978-65.558C320.983,250.135,291.896,220.786,256.005,220.786z"></path> <path class="st0" d="M496.774,135.592c-9.344-9.461-22.509-15.416-36.886-15.416h-56.404c-4.546,0.018-8.784-2.702-10.736-7.093 l-16.898-37.826c-8.358-18.741-26.936-30.931-47.557-30.931H183.706c-20.611,0-39.198,12.19-47.575,30.931l-16.88,37.826 c-1.952,4.391-6.199,7.111-10.736,7.093H52.112c-14.368,0-27.56,5.954-36.922,15.416C5.828,145.026,0,158.21,0,172.569v242.73 c0,14.368,5.828,27.543,15.19,36.976c9.361,9.462,22.554,15.416,36.922,15.398h224.55h183.227 c14.377,0.018,27.542-5.937,36.886-15.398c9.407-9.433,15.226-22.608,15.226-36.976v-242.73 C512,158.21,506.181,145.008,496.774,135.592z M339.463,370.334c-21.28,21.515-50.892,34.89-83.458,34.89 c-32.585,0-62.187-13.374-83.468-34.89c-21.316-21.46-34.528-51.262-34.509-83.991c-0.018-32.729,13.193-62.504,34.509-84 c21.28-21.498,50.874-34.889,83.468-34.862c32.566-0.027,62.178,13.364,83.458,34.862c21.316,21.497,34.528,51.271,34.5,84 C373.99,319.072,360.779,348.874,339.463,370.334z M461.967,214.542h-35.793V178.74h35.793V214.542z"></path> </g> </g></svg>
								<div className='kanit text-[0.9rem]'>Photo Story</div>
							</div>
							<div
								className={`${storyType === 'videoStory' ? 'bg-blue-600 text-white' : 'hover:bg-[#efefef] text-[#232323]'} duration-200 ease-in-out rounded-lg flex flex-row items-center px-6 py-1.5 gap-2 cursor-pointer`}
								onClick={() => {
									setStory({...story, type: 'videoStory'})
								}}
							>
								<svg viewBox="0 0 1024 1024" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg" 
								fill={storyType === 'videoStory' ? 'white' : '#232323'}
								><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path 
								fill={storyType === 'videoStory' ? 'white' : '#232323'}
								d="m768 576 192-64v320l-192-64v96a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V480a32 32 0 0 1 32-32h640a32 32 0 0 1 32 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 0 1 320 0 160 160 0 0 1-320 0zm64 0a96 96 0 1 0 192.064-.064A96 96 0 0 0 448 288zm-320 32a128 128 0 1 1 256.064.064A128 128 0 0 1 128 320zm64 0a64 64 0 1 0 128 0 64 64 0 0 0-128 0z"></path></g></svg>
								<div className='kanit text-[0.9rem]'>Video Story</div>
							</div>
							<div
								className={`${storyType === 'textStory' ? 'bg-blue-600 text-white' : 'hover:bg-[#efefef] text-[#232323]'} duration-200 ease-in-out rounded-lg flex flex-row items-center px-6 py-1.5 gap-2 cursor-pointer`}
								onClick={() => {
									setStory({...story, type: 'textStory'})
									setTextStoryModalOpen(true)
								}}
							>
								<svg viewBox="0 0 24 24" height="20px" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.95197 6.25C9.52211 6.24993 9.12024 6.24986 8.79192 6.29891C8.42102 6.35432 8.04 6.4853 7.73542 6.82371C7.44103 7.15082 7.3371 7.54061 7.29204 7.91294C7.24993 8.26096 7.24996 8.69238 7.25 9.17954L7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5C8.41421 10.5 8.75 10.1642 8.75 9.75V9.22222C8.75 8.67931 8.75129 8.34011 8.78118 8.09313C8.7952 7.97725 8.81273 7.91048 8.8269 7.87221C8.83885 7.83993 8.84739 7.83046 8.85023 7.82731L8.85104 7.82637C8.8524 7.82473 8.8534 7.82353 8.86242 7.8194C8.87904 7.8118 8.92168 7.79617 9.01354 7.78245C9.21765 7.75196 9.50511 7.75 10 7.75H11.25V16.25H9.5C9.08579 16.25 8.75 16.5858 8.75 17C8.75 17.4142 9.08579 17.75 9.5 17.75H15C15.4142 17.75 15.75 17.4142 15.75 17C15.75 16.5858 15.4142 16.25 15 16.25H12.75V7.75H14C14.4949 7.75 14.7824 7.75196 14.9865 7.78245C15.0783 7.79617 15.121 7.8118 15.1376 7.8194C15.1466 7.82353 15.1476 7.82473 15.149 7.82637L15.1496 7.82716C15.1525 7.83031 15.1611 7.83993 15.1731 7.87221C15.1873 7.91048 15.2048 7.97725 15.2188 8.09313C15.2487 8.34011 15.25 8.67931 15.25 9.22222V9.75C15.25 10.1642 15.5858 10.5 16 10.5C16.4142 10.5 16.75 10.1642 16.75 9.75L16.75 9.17953C16.75 8.69238 16.7501 8.26096 16.708 7.91294C16.6629 7.54061 16.559 7.15082 16.2646 6.82371C15.96 6.4853 15.579 6.35432 15.2081 6.29891C14.8798 6.24986 14.4779 6.24993 14.048 6.25H9.95197Z" fill={storyType === 'textStory' ? 'white' : '#232323'}></path> </g></svg>
								<div className='kanit text-[0.9rem]'>Text Story</div>
							</div>
						</div>
					</div>
				</div>


				{/* User Stories Section */}
				<div className='w-auto flex flex-row'>
				{	
					user.stories ? 
						usersLastStory ? 
						<>
							{/* User Stories Section */}
							<div 
								className='ml-[10px] mr-[12px] h-auto flex-shrink-0 z-0'
								to={`/stories/${user._id}`}
								onClick={() => handleStoryClick(user._id)}
							>
								<StoryCard 
									story={usersLastStory} 
									storyAuthor={user}
									initializeStories={initializeStories}
								/>
							</div>
						</> : 
						<>
							{/* <div className='w-[130px] aspect-[9/15.5] rounded-2xl overflow-hidden animate-pulse'></div> */}
						</> : 
					<></>
				}
				</div>


				{/* User's Followings' Stories Section */}
				<div className='mr-[10px] w-auto flex flex-row gap-[16px] h-auto flex-shrink-0 z-0'>
				{
					lastStories.length > 0 ? (
						lastStories.map((story, index) => (
							<div 
								to={`/stories/${story.user._id}`}
								onClick={() => handleStoryClick(story.user._id)}	
							>
								<StoryCard key={index} story={story.lastStory} storyAuthor={story.user} />
							</div>
							))
						) : !loading ? (
							<p className='kanit text-[1rem] text-[#cdcdcd] dark:text-[#555555] bg-[#efefef] dark:bg-[#232323] px-6 py-2 rounded-xl my-auto rotate-90 -ml-12'>No stories to show</p>
						) : null}

					{/* Loading and End Message */}
					{
						loading && 
						<>
							<div className='w-[130px] lg:w-[138px] aspect-[9/15.5] flex flex-row items-center justify-center'>
								<ClipLoader 
									color='#111111'
									loading={loading}
									size={22}
								/>
							</div>
						</>
					}
					
				</div>
			</div>


			{/* SelectImageModal Handling */}
			<div className={`${ selectImageModalOpen ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0' } duration-500 ease-in-out fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm`}>
				<div className='p-6 w-[400px] h-[300px] bg-[#f1f1f1] dark:bg-[#232323] rounded-3xl flex flex-col items-center justify-between relative'>
					<div className='kanit text-[1.2rem] text-[#777777]'>Select Image</div>
					<div className='flex flex-row items-center justify-center gap-6'>
						<img src='/story/media.png' alt="" className='w-[130px] h-[130px]'/>
						<div className='w-[100px] exo font-semibold text-[1rem] text-[#888888] dark:text-[#bcbcbc]'>
							Select an image from your device
						</div>
					</div>
					<svg
					className='absolute left-[10px] top-[45px] rotate-90' height="100" width="100"
					fill="#2563eb" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 377.114 377.115" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M16.808,330.236c-1.836-2.449-4.896-4.285-7.344-6.732c-2.448-2.447-4.284-6.119-6.12-9.18 c-1.224-1.836-4.284-0.611-3.06,1.225c2.448,6.119,6.732,17.135,14.076,17.748C16.808,333.908,18.032,332.072,16.808,330.236z"></path> <path d="M63.932,357.775c-3.672-2.447-7.956-3.059-12.24-4.283c-4.896-1.836-9.792-3.672-13.464-6.732 c-1.224-0.611-2.448,0.613-1.836,1.836c6.12,6.732,16.524,14.076,26.316,14.688C65.156,362.671,65.768,359,63.932,357.775z"></path> <path d="M101.875,332.683c-3.06,3.061-5.508,6.732-9.18,9.18c-3.672,2.449-7.344,3.061-11.628,3.672 c-2.448,0.613-1.224,3.061,0.612,3.674c10.404,1.223,20.196-3.674,24.48-12.854C106.771,333.296,103.711,330.236,101.875,332.683z "></path> <path d="M111.056,295.351c-0.612-0.611-1.836-0.611-3.06,0c-2.448,2.449-1.836,5.508-1.836,7.957 c0,4.283-0.612,7.955-2.448,11.627c-0.612,2.449,2.448,3.672,3.672,1.836c1.836-3.672,3.06-7.344,3.672-11.016 C112.892,302.695,114.116,297.8,111.056,295.351z"></path> <path d="M98.204,278.828c-3.672-1.836-6.732-4.896-9.792-7.344c-3.06-3.061-5.508-6.121-9.18-8.568 c-2.448-1.225-4.896,1.225-3.672,3.672c2.448,3.672,6.12,6.732,9.792,9.793c3.06,2.447,6.732,4.895,10.404,6.73 C98.815,284.335,101.264,280.664,98.204,278.828z"></path> <path d="M55.976,259.244c-4.284,0-7.956,0.611-11.628,2.447c-3.06,1.836-7.344,5.508-7.344,9.182c0,1.836,2.448,3.672,4.284,2.447 c2.448-1.836,4.284-4.285,6.12-6.121c2.448-1.836,5.508-3.059,7.956-3.059C59.036,264.14,59.647,259.855,55.976,259.244z"></path> <path d="M55.976,303.308c-2.448-3.672-2.448-8.568-1.224-12.24c0.612-1.836-2.448-3.061-3.06-1.225 c-1.836,4.896-3.06,9.18-1.836,14.076c1.224,4.283,4.284,10.404,8.568,11.629c1.836,0.611,3.672-1.225,3.06-3.061 C60.872,308.816,57.812,306.367,55.976,303.308z"></path> <path d="M98.204,325.951c-2.448-1.223-5.508-0.611-8.568-1.836c-3.672-1.223-6.732-3.672-9.792-6.119 c-1.836-1.836-4.284,0.611-2.448,2.447c4.284,4.896,13.464,13.465,20.808,11.018C100.651,330.236,100.651,326.564,98.204,325.951z "></path> <path d="M155.731,313.099c-7.956,4.896-15.912,9.793-24.48,12.852c-2.448,1.225-1.836,4.896,1.224,4.285 c9.792-2.449,20.808-4.285,26.928-13.465C161.24,314.935,158.18,311.876,155.731,313.099z"></path> <path d="M178.988,273.931c-0.612-2.447-3.672-2.447-4.896-1.223c-3.06,2.447-4.284,7.955-6.732,11.627 c-2.448,3.672-5.508,7.344-8.568,11.016c-1.836,1.836,1.224,4.896,3.06,3.061c4.284-3.672,7.956-7.344,11.628-11.016 C176.54,283.724,180.211,278.828,178.988,273.931z"></path> <path d="M184.496,223.136c-1.224-1.836-4.896-1.225-4.284,1.223c0.612,9.793,4.284,18.973,4.284,28.152 c0,1.836,2.448,1.836,2.448,0C187.556,242.72,190.003,231.703,184.496,223.136z"></path> <path d="M174.704,201.103c-1.836-3.672-3.672-7.344-6.732-10.404c-3.06-3.671-6.12-8.567-10.404-9.791 c-1.836-0.612-4.284,1.224-3.06,3.06c1.224,3.672,4.896,6.12,7.344,8.567c3.06,3.061,6.732,6.732,9.18,10.404 C172.868,205.388,175.928,203.552,174.704,201.103z"></path> <path d="M133.7,165.607c-3.672-3.672-7.956-5.508-12.852-7.344c-5.508-1.224-12.852-2.448-17.748-0.612 c-3.06,1.224-3.06,4.896,0,6.12c9.18,3.672,19.584-1.224,28.152,5.508C133.087,170.503,134.924,167.443,133.7,165.607z"></path> <path d="M95.755,178.459c-8.568,7.344-23.256,23.868-13.464,35.497c1.836,1.836,4.896,0.611,5.508-1.225 c1.224-4.896,0-9.793,1.224-14.076c1.836-6.121,6.12-11.628,9.792-16.524C100.651,179.072,97.592,176.624,95.755,178.459z"></path> <path d="M111.667,241.496c-3.672-3.061-7.344-5.508-11.016-8.568c-3.672-3.672-6.12-7.955-8.568-12.24 c-0.612-1.836-3.672-0.611-3.06,1.225c2.448,9.791,8.568,24.48,20.808,23.867C111.667,245.779,113.503,242.72,111.667,241.496z"></path> <path d="M151.448,256.796c-7.344-1.836-15.3-0.613-21.42-5.51c-1.224-1.223-3.06,0.613-1.836,1.838 c6.12,6.73,15.3,9.18,23.868,7.344C153.284,260.468,153.284,257.408,151.448,256.796z"></path> <path d="M205.916,265.976c-7.956-4.896-20.809-3.672-29.988-2.449c-2.448,0-2.448,3.672,0,4.285 c4.896,0.611,10.404,0.611,15.3,1.836c4.284,0.611,8.568,2.447,12.852,2.447C207.752,271.484,208.363,267.199,205.916,265.976z"></path> <path d="M254.264,243.332c-4.896,1.836-7.956,4.896-12.24,7.955c-4.284,3.674-8.567,6.121-13.464,8.568 c-2.448,1.225-0.612,5.508,1.836,4.896c4.896-1.225,8.568-3.672,12.852-6.119c4.896-3.061,9.793-6.121,14.076-10.404 C259.159,246.392,257.323,242.107,254.264,243.332z"></path> <path d="M279.968,198.044c-0.612-2.449-4.284-2.449-4.896,0c-1.836,6.73-3.672,12.852-7.956,18.359 c-1.224,1.836,0.612,3.672,2.448,2.447C275.684,213.343,281.191,207.224,279.968,198.044z"></path> <path d="M279.355,146.636c-1.836-2.448-5.508-0.612-4.896,1.836c2.447,7.956,3.06,16.524,3.672,24.48c0,2.448,4.284,2.448,4.284,0 C283.64,164.384,284.863,154.592,279.355,146.636z"></path> <path d="M260.384,95.84c-1.836-2.448-4.896,0.612-3.672,3.06c3.672,8.568,9.18,16.524,13.464,25.092 c0.612,1.836,3.672,0.612,3.06-1.224C270.788,112.976,267.115,103.184,260.384,95.84z"></path> <path d="M231.619,80.54c-5.508-5.508-15.911-13.464-24.479-10.404c-2.448,0.612-2.448,4.284,0,4.896 c3.672,1.224,7.344,0.612,11.016,1.836S225.5,80.54,228.56,83.6C230.396,84.824,232.844,82.375,231.619,80.54z"></path> <path d="M188.78,77.479c-5.508,0-10.404,1.224-14.076,5.508c-3.06,3.672-7.956,11.628-4.896,16.524 c1.224,2.448,4.284,1.836,6.12,0c1.224-1.836,1.224-3.06,1.224-4.896s0.612-4.284,1.836-6.12c1.836-3.672,5.508-7.956,9.792-8.568 C190.615,79.928,190.615,77.479,188.78,77.479z"></path> <path d="M201.02,140.516c-3.06-4.284-7.956-7.344-11.017-11.016c-3.671-4.284-6.119-9.18-8.567-14.076 c-1.224-2.448-4.896-0.612-4.284,1.836c2.448,9.792,9.792,24.48,20.196,27.54C199.796,145.412,202.243,142.352,201.02,140.516z"></path> <path d="M250.592,168.056c-4.896-2.448-9.792-3.06-15.3-4.896c-7.345-1.836-13.465-5.508-18.973-10.404 c-2.447-2.448-6.12,1.224-3.672,3.672c8.568,9.18,23.868,17.136,36.72,17.136C251.815,173.563,253.04,169.28,250.592,168.056z"></path> <path d="M300.775,127.052c-3.06,3.06-3.672,7.344-4.896,11.016c-1.836,4.896-4.284,10.404-7.345,14.688 c-2.447,2.448,1.225,6.12,3.673,3.672c3.672-3.672,6.731-7.956,9.18-12.24s5.508-9.792,4.896-14.688 C305.672,127.052,302.611,125.216,300.775,127.052z"></path> <path d="M316.688,82.988c-7.956,6.732-10.404,20.808-9.792,30.6c0,3.06,4.284,3.06,4.896,0c0.611-4.284,1.836-9.18,3.06-13.464 c1.836-4.896,5.508-9.18,6.732-14.076C321.584,82.988,318.523,81.151,316.688,82.988z"></path> <path d="M341.168,50.552c-3.672-0.612-6.732,2.448-9.181,4.284c-3.06,2.448-4.896,6.12-6.12,9.18 c-1.224,3.06,3.061,5.508,4.284,2.448c1.836-2.448,3.061-4.896,5.508-7.344c2.448-1.836,6.12-2.448,7.345-5.508 C343.615,53,343.004,51.164,341.168,50.552z"></path> <path d="M375.439,36.476c-1.224-6.12-3.06-12.852-5.508-18.972c-0.612-1.836-2.448-3.672-4.284-3.672 c-12.24,0.612-23.256,4.284-33.66,11.016c-3.672,2.448-0.611,7.956,3.672,6.12c8.568-4.896,17.137-7.344,26.316-7.344 c1.224,4.284,2.448,8.568,3.672,12.852c1.225,4.896,0.612,9.792,3.672,13.464c1.836,2.448,4.896,1.224,6.12-0.612 C378.5,45.656,376.663,40.147,375.439,36.476z"></path> </g> </g> </g>
					</svg>
					<div className='flex flex-row gap-6'>
						<div 
							className='kanit text-white bg-blue-600 px-6 pt-1 pb-1.5 rounded-lg shadow-[0_0px_10px_0px_rgba(0,0,0,0.1] hover:bg-blue-500 hover:scale-105 duration-200 ease-in-out cursor-pointer'
							onClick={() => {
								setSelectStoryTypeDropdown(false);	
								fileInputRef.current.click();
							}}
						>	
								Choose File
								<input 
									ref={fileInputRef}
									type="file" 
									className='hidden' 
									onChange={onSelectFile}
								/>
						</div>
						<div 
							className='kanit text-red-600 dark:text-white bg-red-50 dark:bg-[#5f2d2d] px-6 pt-1 pb-1.5 rounded-lg
						 	shadow-[0_0px_10px_0px_rgba(0,0,0,0.1] hover:bg-red-100 hover:scale-105 duration-200 ease-in-out cursor-pointer '
							onClick={() => {
								setSelectStoryTypeDropdown(false);
								setStory({...story, type: ''})
								setSelectImageModalOpen(false);
							}}
							>
								Cancel
							</div>
					</div>
				</div>
			</div>


			{/* Image Story Creation Modal */}
			<div className={`${ imagesrc ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0' } duration-500 ease-in-out fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center`}>
				<ImageStory  
					imagesrc={imagesrc}
					setImagesrc={setImagesrc}
					imageCropper={imageCropper}
					setImageCropper={setImageCropper}
					MIN_WIDTH={MIN_WIDTH}
					story={story}
					setStory={setStory}
					setUsersLastStory={setUsersLastStory}
				/>
			</div>

			{/* Video Story Creation Modal */}
			<div></div>

			{/* Text Story Creation Modal */}
			<div className={`${textStoryModalOpen? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0'} duration-500 ease-in-out fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center`}>
				<TextStory 
					textStoryModalOpen={textStoryModalOpen}
					setTextStoryModalOpen={setTextStoryModalOpen}
					story={story}
					setStory={setStory}
					setUsersLastStory={setUsersLastStory}
				/>
			</div>
		</>
	}
	</>
)
}

export default Stories