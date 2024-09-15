import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './PostCreate.css'
import { useTheme } from '../../../context/contextAPI'

function MobileNavigation () {

	const { theme } = useTheme()

	const user = useSelector(state => state.auth.user)

	const [ active1, setActive1 ] = useState(false)
	const [ active2, setActive2 ] = useState(false)
	const [ active3, setActive3 ] = useState(false)
	const [ active4, setActive4 ] = useState(false)
	const [ active5, setActive5 ] = useState(false)

	const [ active6, setActive6 ] = useState(false)
	const [ active7, setActive7 ] = useState(false)

	const [ createToggle, setCreateToggle ] = useState(false)

	const [ urlPathValue, setUrlPathValue ] = useState(window.location.pathname)

	useEffect(() => {
		const urlPath = window.location.pathname
		if ( urlPath === '/post/story' || urlPath === '/post/create' ) {
			setActive3(true)
		} else{
			setActive3(false)
			setCreateToggle(false)
		}
		setUrlPathValue(urlPath)
	}, [active1, active2, active4, active5, active6, active7]);



	  //HANDLING THE SWIPE EVENT
	const [isSwiping, setIsSwiping] = useState(false);

		const handleTouchStart = (event) => {
		setIsSwiping(true);
		// Store the initial touch position (optional for swipe distance calculation)
		const initialY = event.touches[0].clientY;
		// ... (store initialY for later use)
		};

		const handleTouchMove = (event) => {
		if (!isSwiping) return; // Ignore touches if not in swipe mode

		const currentY = event.touches[0].clientY;
		const swipeDistance = currentY - initialY; // Calculate swipe distance (optional)

		if (swipeDistance > someThreshold) { // Check for sufficient downward swipe
			setCreateToggle(false);
			}
		};

		const handleTouchEnd = () => {
		setIsSwiping(false);
	};

	return (
		<>
			<div className='w-[90%] h-16 flex flex-row justify-between relative'>
				<div className={`${createToggle ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-[100%] opacity-0 scale-0'} w-full h-auto absolute duration-500 ease-in-out bottom-20 flex justify-end `}>
					<div className={` h-auto w-full flex flex-col py-4 px-4 gap-4 items-center z-0 rounded-3xl bg-[#f5f5f5]`}>

						<div className='h-[5px] w-[60px] bg-[#aaaaaa] rounded-full mb-5'
							onTouchStart={handleTouchStart}
							onTouchMove={handleTouchMove}
							onTouchEnd={handleTouchEnd}/>

						<NavLink to={'/post/story'}
						onClick={() => setCreateToggle(false)}
						className={({ isActive }) => {
							isActive ? setActive6(true) : setActive6(false)
							return `${isActive ? 'bg-[#232323] text-white' : 'bg-white text-[#232323]'} flex flex-row items-center rounded-2xl py-3 px-3 w-full`
						}} >
							
							<div className='w-[15%] h-full flex items-center'><svg className='ml-[10px]' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={active6 ? "#0051A2" : "#232323"} stroke={active6 ? "#0051A2" : "#232323"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gallery-horizontal-end"><path d="M2 7v10"/><path d="M6 5v14"/><rect width="12" height="18" x="10" y="3" rx="2"/></svg></div>

							<div className='flex flex-col w-[85%] h-full'>
								<div className='text-[1.1rem] font-semibold quicksand'>STORY</div>
								<div className={`${active6 ? 'text-[white' : 'text-[#232323]'} text-[0.9rem]`}> Share content that disappears after 24 hours</div>
							</div>

						</NavLink>
						<NavLink to={'/post/create'} 
						onClick={() => setCreateToggle(false)}
						className={({ isActive }) => {
							isActive ? setActive7(true) : setActive7(false)
							return `${isActive ? 'bg-[#232323] text-white' : 'bg-white text-[#232323]'} flex flex-row items-center rounded-2xl py-2 px-3 w-full`
						}} >

							<div className='w-[15%] h-full flex items-center' ><svg className='ml-[10px]' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={active7 ? "#0051A2" : "#232323"} stroke={active7 ? "#0051A2" : "#232323"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-milestone"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/><path d="M12 13v8"/><path d="M12 3v3"/></svg></div>
							
							<div className='flex flex-col w-[85%] h-full'>
								<div className='text-[1.1rem] font-semibold quicksand'>POST</div>
								<div className={`${active7 ? 'text-white' : ''} text-[0.8rem] radio`}>Share moment with your followers</div>
							</div>

						</NavLink>
					</div>
				</div>
				<div className='h-full w-[73%] bg-[#eeeeee] dark:bg-[#222222] rounded-full flex flex-row justify-between items-center px-[3%] z-20'>

					<NavLink to={'/feed'}  
					onClick={() => {
						if(active3) {
							setActive3(false)
						}
						if(createToggle) {
							setCreateToggle(false)
						}
					}}
					className={({ isActive }) =>{ 
						isActive ? setActive1(true) : setActive1(false)
					}} >
						<div className={`flex items-center justify-center h-[45px] w-[45px] rounded-full ${active1 ? 'bg-blue-200 dark:bg-blue-400' : ''}`}>
							<svg className='h-[30px] w-[30px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15" stroke={theme === 'dark' ? "#ffffff" : active1 ? '#063581' : '#232323'} stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
						</div>
					</NavLink>

					<NavLink to={"/search"} 
					onClick={() => {
						if(active3) {
							setActive3(false)
						}
						if(createToggle) {
							setCreateToggle(false)
						}
					}}
					className={({ isActive }) =>{ 
					isActive ? setActive2(true) : setActive2(false)
					}}>
						<div className={`flex items-center justify-center h-[45px] w-[45px] rounded-full ${active2 ? ' bg-blue-200 dark:bg-blue-400' : ''}`}>
							<svg className='h-[25px] w-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={theme === 'dark' ? "#ffffff" : active2 ? '#063581' : '#232323'} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
					</NavLink>

					<NavLink to={"/notifications"} 
					onClick={() => {
						if(active3) {
							setActive3(false)
						}
						if(createToggle) {
							setCreateToggle(false)
						}
					}}
					className={({ isActive }) =>{ 
					isActive ? setActive5(true) : setActive5(false)
					}}>
						<div className={`flex items-center justify-center h-[45px] w-[45px] rounded-full ${active5 ? 'bg-blue-200 dark:bg-blue-400' : ''}`}>
							<svg className='h-[24px] w-[24px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke={theme === 'dark' ? "#ffffff" : active5 ? '#063581' : '#232323'} stroke-width="1.104" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke={theme === 'dark' ? "#ffffff" : active5 ? '#063581' : '#232323'} stroke-width="1.104" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke={theme === 'dark' ? "#ffffff" : active5 ? '#063581' : '#232323'} stroke-width="1.104" stroke-miterlimit="10"></path> </g></svg>
						</div>
					</NavLink>

					<NavLink to={'/profile'} className={({isActive}) => {
						return ` rounded-full overflow-hidden border-2 border-black ${isActive ? 'ring-4 ring-blue-300 dark:ring-blue-400 h-[37px] w-[37px]' : ' h-[35px] w-[35px]'} duration-200`
					}}>
					<img src={user?.profilePic} className='w-full h-full object-cover' />
					</NavLink>

				</div>
				<div className='w-[20%] h-full flex justify-center items-center '>
					<div onClick={() => {
						if( urlPathValue === '/post/story' || urlPathValue === '/post/create' ) {
							if( active3 ) {
								setCreateToggle(!createToggle)
							}
						}
						else {
							setActive3(!active3)
							setCreateToggle(!createToggle)
						}
					}} className={`${active3 ? ' dark:bg-blue-400' : 'bg-[#eeeeee] dark:bg-[rgb(35,35,35)] p-5'} cursor-pointer flex items-center justify-center rounded-full duration-200 ease-in-out z-20`}>
						<svg className={`${active3 ? 'w-16 h-16' : 'w-10 h-10'} duration-200`} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={theme === 'dark' ? active3 ? "#232323" : "#ffffff" : active3 ? 'rgb(147 197 253)' : '#303030'}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke={theme === 'dark' ? active3 ? "#232323" : "#ffffff" : active3 ? '#232323' : '#303030'} stroke-width="1.2" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke={theme === 'dark' ? active3 ? "#232323" : "#ffffff" : active3 ? '#232323' : '#303030'} stroke-width="1.2" stroke-linecap="round"></path> </g></svg>
					</div>
				</div>
				
			</div>
		</>
	)
}

export default MobileNavigation