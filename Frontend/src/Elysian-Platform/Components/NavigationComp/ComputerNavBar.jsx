import React, { useContext, useState,  useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

import SearchBar from '../SearchComponent/SearchBar'
import { useTheme }  from '../../../context/contextAPI.js'

import { useSelector, useDispatch } from 'react-redux'

import PostCreation from '../../Pages/Posts/PostCreation.jsx'
import { userDoesNotExist } from '../../../redux/reducers/auth.reducer.js'
import ThemeButton from '../../../commonComponents/ThemeButton.jsx'

function Navbar ({ postCreation, setPostCreation }) {

	const { theme } = useTheme()

	const loggedIn = useSelector(state => state.auth.loggedIn)
	const user = useSelector(state => state.auth.user)

	const [active1, setActive1] = useState(false)
	const [active2, setActive2] = useState(false)
	const [active3, setActive3] = useState(false)
	const [active4, setActive4] = useState(false)

	const [postCreateButton, setPostCreateButton] = useState(false)
	const [ urlPathValue, setUrlPathValue ] = useState(window.location.pathname)

	useEffect(() => {
		const urlPath = window.location.pathname
		if ( urlPath === '/post/story' || urlPath === '/post/create' ) {
			setPostCreateButton(true)
		} else{
			setPostCreateButton(false)
			setPostCreation(false)
		}
		setUrlPathValue(urlPath)
	}, [active1, active2, active4, active3]);

	const [settingsDropDown, setSettingsDropDown] = useState(false)

	//Theme Button changing animation: 
	const [themeButtonAnimation, setThemeButtonAnimation] = useState(false)


	//Clicking at any point outside of this div would cause to close the dropDown Box
	const divRef = useRef(null);
	const profilePicRef = useRef(null) // Track the toggle state

	// Function to handle outside click 
	const handleClickOutside = (event) => { 
		if ( divRef.current && !divRef.current.contains(event.target) && profilePicRef.current && !profilePicRef.current.contains(event.target) ) { 
			setSettingsDropDown(false); 
		} 
	};

	useEffect(() => { 
		document.addEventListener("mousedown", handleClickOutside); 
		return () => { 
			document.removeEventListener("mousedown", handleClickOutside); 
		}; 
	}, []);
		
	const handleProfileClick = (e) => { 
		e.stopPropagation(); 
		setSettingsDropDown(!settingsDropDown); 
	}

	//Logging Out User
	const [ confirmationLogOut, setConfirmationLogOut ] = useState(false)
	const dispatch = useDispatch()
	const logOut = () => {
		dispatch(userDoesNotExist())
		localStorage.clear()
	}
	
	

	return (
		<>
			<nav className='w-full h-[70px] fixed bg-[#f7f7f7] dark:bg-[#111111] flex flex-row items-center justify-between z-50'>

				<Link to={'/feed'} className='flex flex-row h-full items-center gap-2 mx-4'>
					<svg width="45px" height="45px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={theme === 'dark' ? '#232323' : '#ffffff'} stroke-width="3.4560000000000004">
						<g id="SVGRepo_bgCarrier" stroke-width="0">
						<path transform="translate(-8.96, -8.96), scale(2.56)" d="M16,28.77608844016989C18.08722480732056,28.9229345016092,20.226069316704844,28.554030911097094,22.06404822606628,27.554078566834065C23.891274512663863,26.55997618650965,25.301655032291862,24.940837233758877,26.350876790021303,23.144694380835702C27.360264704750755,21.41674232922008,27.605997130555764,19.421534355793476,27.96474743419822,17.452783362213804C28.342206267599515,15.381363642845832,28.880868819721044,13.326598109867739,28.51788261134611,11.252593327513381C28.117800709024618,8.966633807279699,27.767609506575134,6.157906774241103,25.77867493016255,4.962157758994726C23.705220285267938,3.715595212798414,21.041126918105817,5.559827491721807,18.6346539866626,5.31078858663758C16.641378684622204,5.104510305978147,14.955868236627868,3.669531887164028,12.952249003709845,3.634788135538358C10.662375972255818,3.595080601016794,8.305943821877014,3.9205899287633796,6.341330833142528,5.0976162636318865C4.235699169259146,6.359128802811522,2.134045983228318,8.12901761903313,1.495002634267129,10.498980105783547C0.8578348897747267,12.861986707243503,2.6790913753764776,15.15207268184285,2.9751401562897257,17.581504313415273C3.2710344995181977,20.009668600479998,1.701431093255813,22.9057757254027,3.238745274647558,24.808458141105064C4.808384583038107,26.75114828682803,7.982886521137543,25.989685546869886,10.367834372107112,26.731195026842677C12.303196774826457,27.332922887775105,13.978250275189568,28.63384885808791,16,28.77608844016989" fill={ theme === 'dark' ? '#fbfbfb' : '#232323' } strokewidth="0"/>
						</g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
						<g id="SVGRepo_iconCarrier">
						<path d="M31.67 8.33h.66A23.67 23.67 0 0 1 56 32v13.15a10.52 10.52 0 0 1-10.52 10.52h-27A10.52 10.52 0 0 1 8 45.15V32A23.67 23.67 0 0 1 31.67 8.33z"/>
						<circle cx="22" cy="30" r="6"/>
						<circle cx="42" cy="30" r="6"/>
						<path d="m56 8-4 4"/>
						</g>
					</svg>

					<div className='text-[2rem] flex text-[#232323] dark:text-[#fbfbfb] grand items-end'>
						<span className=''>Elysian</span>
					</div>
				</Link>

				{
					loggedIn ? 
					<div className=' hidden lg:flex flex-row items-center gap-16'>
						<NavLink to={'/feed'} className={({isActive}) => {
							isActive ? setActive1(true) : setActive1(false)
							return `${isActive ? 'bg-[#111111] dark:bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md dark:shadow-lg shadow-[#111111]/50 dark:shadow-blue-600/50' : 'hover:bg-[#eeeeee] dark:hover:bg-[#232323] duration-200 ease-in-out'} p-2 rounded-full`
						}}>
						<div className='w-[1.7rem] h-[1.7rem] flex items-center justify-center'>
							<svg className='-mt-[2px]' width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15" stroke={active1 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
						</div>
						</NavLink>
						<NavLink to={'/search'} className={({isActive}) => {
							isActive ? setActive2(true) : setActive2(false)
							return `${isActive ? 'bg-[#111111] dark:bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md dark:shadow-lg shadow-[#111111]/50 dark:shadow-blue-600/50' : 'hover:bg-[#eeeeee] dark:hover:bg-[#232323] duration-200 ease-in-out'} p-2 rounded-full`
						}}>
						<div className='w-[1.6rem] h-[1.6rem] flex items-center justify-center '>
							<svg className='' width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={active2 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } stroke-width="1.744" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</div>
						</NavLink>
						<NavLink to={'/notifications'} className={({isActive}) => {
							isActive ? setActive3(true) : setActive3(false)
							return `${isActive ? 'bg-[#111111] dark:bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md dark:shadow-lg shadow-[#111111]/50 dark:shadow-blue-600/50' : 'hover:bg-[#eeeeee] dark:hover:bg-[#232323] duration-200 ease-in-out'} p-2 rounded-full`
						}}>
						<div className='w-[1.6rem] h-[1.6rem] flex items-center justify-center'>
							<svg className='' width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke={active3 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } stroke-width="1.64" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke={active3 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke={active3 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } stroke-width="1.44" stroke-miterlimit="10"></path> </g></svg>
						</div>
						</NavLink>
						<NavLink to={'/explore'} className={({isActive}) => {
							isActive ? setActive4(true) : setActive4(false)
							return `${isActive ? 'bg-[#111111] dark:bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md dark:shadow-lg shadow-[#111111]/50 dark:shadow-blue-600/50' : 'hover:bg-[#eeeeee] dark:hover:bg-[#232323] duration-200 ease-in-out'} p-2 rounded-full`
						}}>
						<div className='w-[1.6rem] h-[1.6rem] flex items-center justify-center'>
							<svg className='' width="18px" height="18px" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke={active4 ? "#ffffff" : "#232323" } stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z" stroke-width="0.3" stroke={active4 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } fill={active4 ? ( theme === "dark" ? "#ffffff" : "#ffffff" ) : ( theme === "dark" ? "#fbfbfb" : "#232323" ) } ></path> </g></svg>
						</div>
						</NavLink>
					</div> : 
					<div>

					</div>
				}

				{
					loggedIn
					
					? 
					
					<div className='flex flex-row gap-6 mx-4 dosis text-lg font-semibold items-center relative'>

						<div className={`${postCreation ? 'bg-blue-100' : 'bg-white hover:bg-[#eeeeee] dark:bg-[#111111] dark:hover:bg-black dark:hover:shadow-[0_0_7px_0_rgba(0,0,0,0.2)]'} duration-300 ease-in-out w-[2rem] h-[2rem] cursor-pointer rounded-xl flex items-center justify-center shadow-[0_0_7px_0_rgba(0,0,0,0.2)] dark:shadow-none`}
						onClick={() => {
							if( urlPathValue === '/post/story' || urlPathValue === '/post/create' ) {
								setPostCreation(!postCreation)
							} else {
								setPostCreateButton(!postCreateButton)
								setPostCreation(!postCreation)
							}
						}}>
							<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill={postCreation ? ( theme === 'dark' ? '' : '' ) : ( theme === 'dark' ? '#fbfbfb' : "#111111" )}></path> </g></svg>
						</div>

						<Link to={"/mojo"} className='p-2 bg-blue-600 rounded-full'>
							<svg className='w-[20px] h-[20px]' fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 11v8h.051c.245 1.692 1.69 3 3.449 3 1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188 1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9s-9 4.038-9 9zm6 1c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-4c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></g></svg>
						</Link>

						<div 
							className={`${settingsDropDown ? 'ring-4 ring-blue-600' : ''} border-2 border-black dark:border-none rounded-full cursor-pointer duration-300 ease-in-out`} 
							onClick={handleProfileClick}
							ref={profilePicRef}
							>
							<img src={user.profilePic} alt="" className='h-[35px] w-[35px] object-cover object-center rounded-full'/>
						</div>

						<div 
							className={`${settingsDropDown ? ' opacity-100 blur-0' : ' opacity-0 blur-xl translate-x-[200%]'} transition-all duration-500 ease-in-out h-auto w-[280px] fixed top-[70px] right-[10px] bg-white flex flex-col justify-center p-2 rounded-3xl gap-2`} 
							style={{boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'}}
							ref={divRef}
							>

							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'>
								<svg viewBox="0 0 16 16" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#232323" fill-rule="evenodd" d="M6.77208,0.683772 C6.90819,0.27543 7.29033,0 7.72076,0 L8.27924,0 C8.70967,0 9.09181,0.27543 9.22792,0.683772 L9.75342,2.26026 C10.125,2.37363 10.4812,2.52208 10.8183,2.70177 L12.3051,1.9584 C12.6901,1.7659 13.155,1.84136 13.4594,2.14572 L13.8543,2.54062 C14.1587,2.84498 14.2341,3.30995 14.0416,3.69494 L13.2983,5.1817 C13.4779,5.51878 13.6264,5.87503 13.7397,6.24658 L15.3162,6.77208 C15.7246,6.90819 16,7.29033 16,7.72076 L16,8.27924 C16,8.70967 15.7246,9.09181 15.3162,9.22792 L13.7397,9.75342 C13.6264,10.125 13.4779,10.4812 13.2983,10.8183 L14.0416,12.3051 C14.2341,12.69 14.1587,13.155 13.8543,13.4594 L13.4594,13.8543 C13.155,14.1586 12.6901,14.2341 12.3051,14.0416 L10.8183,13.2982 C10.4812,13.4779 10.125,13.6264 9.75342,13.7397 L9.22792,15.3162 C9.09181,15.7246 8.70967,16 8.27924,16 L7.72076,16 C7.29033,16 6.90819,15.7246 6.77208,15.3162 L6.24658,13.7397 C5.87503,13.6264 5.51879,13.4779 5.18172,13.2983 L3.69491,14.0417 C3.30992,14.2342 2.84495,14.1587 2.54059,13.8543 L2.14568,13.4594 C1.84132,13.1551 1.76587,12.6901 1.95836,12.3051 L2.70176,10.8183 C2.52208,10.4812 2.37363,10.125 2.26026,9.75342 L0.683772,9.22792 C0.27543,9.09181 0,8.70967 0,8.27924 L0,7.72076 C0,7.29033 0.27543,6.90819 0.683772,6.77208 L2.26026,6.24658 C2.37363,5.87502 2.52208,5.51876 2.70176,5.18167 L1.95837,3.69488 C1.76587,3.30989 1.84133,2.84492 2.14569,2.54056 L2.54059,2.14565 C2.84495,1.84129 3.30993,1.76584 3.69491,1.95833 L5.18172,2.70174 C5.5188,2.52207 5.87504,2.37362 6.24658,2.26026 L6.77208,0.683772 Z M8,12 C10.2091,12 12,10.2091 12,8 C12,5.79086 10.2091,4 8,4 C5.79086,4 4,5.79086 4,8 C4,10.2091 5.79086,12 8,12 Z"></path> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Settings</div>
							</div>
							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'>
								<svg className="svg-wrapper" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#232323"></path> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Your Activity</div>
							</div>
							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'>
								<svg className="svg-wrapper" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 19.2674V7.84496C19 5.64147 17.4253 3.74489 15.2391 3.31522C13.1006 2.89493 10.8994 2.89493 8.76089 3.31522C6.57467 3.74489 5 5.64147 5 7.84496V19.2674C5 20.6038 6.46752 21.4355 7.63416 20.7604L10.8211 18.9159C11.5492 18.4945 12.4508 18.4945 13.1789 18.9159L16.3658 20.7604C17.5325 21.4355 19 20.6038 19 19.2674Z" stroke="#232323" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Saved</div>
							</div>
							<div className={`${themeButtonAnimation ? 'w-[26%]' : 'w-full' } h-[52px] flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer relative`} 
								onClick={() => {
									setThemeButtonAnimation( !themeButtonAnimation )
								}}
							>
								<svg viewBox="0 0 24 24" height="21" width="21" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z" fill="#232323"></path> </g></svg>
								<div className={`${ themeButtonAnimation ? 'translate-x-[-50%] opacity-0 scale-0 duration-200' : 'translate-x-0 opacity-100 scale-100  duration-500' } text-[1.5rem] text-[#232323] dongle font-medium ease-in-out absolute left-[62px]`}>Switch Appearences</div>
								<div className={`${themeButtonAnimation ? 'scale-100 translate-x-0 opacity-100' : 'scale-0 translate-x-[100%] opacity-0'} absolute text-[1.5rem] text-[#232323] dongle font-medium -right-24`}>
									{theme === 'dark' ? 'Dark' : 'Light'} theme
								</div>
								<div className={`${themeButtonAnimation ? 'opacity-100 scale-100 translate-x-[100%]' : 'opacity-0 scale-0'} duration-300 ease-in-out -right-32 absolute`}>
									<ThemeButton />
								</div>
							</div>
							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'>
								<svg viewBox="0 -0.5 21 21" height="20" width="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>report_flag [#23232332323]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -640.000000)" fill="#232323"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M101.9,489 C101.9,489.552 101.4296,490 100.85,490 L85.1,490 L85.1,483 C85.1,482.448 85.5704,482 86.15,482 L100.85,482 C101.4296,482 101.9,482.448 101.9,483 L101.9,489 Z M101.9,480 L85.1,480 C83.93975,480 83,480.895 83,482 L83,499 C83,499.552 83.4704,500 84.05,500 C84.6296,500 85.1,499.552 85.1,499 L85.1,492 L101.9,492 C103.06025,492 104,491.105 104,490 L104,482 C104,480.895 103.06025,480 101.9,480 L101.9,480 Z" id="report_flag-[#23232332323]"> </path> </g> </g> </g> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Report a Problem</div>
							</div>
							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'>
								<svg viewBox="0 0 24 24" height="20" width="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.7153 1.71609C18.3241 1.32351 18.3241 0.687013 18.7153 0.294434C19.1066 -0.0981448 19.7409 -0.0981448 20.1321 0.294434L22.4038 2.57397L22.417 2.58733C23.1935 3.37241 23.1917 4.64056 22.4116 5.42342L20.1371 7.70575C19.7461 8.09808 19.1122 8.09808 18.7213 7.70575C18.3303 7.31342 18.3303 6.67733 18.7213 6.285L20.0018 5L4.99998 5C4.4477 5 3.99998 5.44772 3.99998 6V13C3.99998 13.5523 3.55227 14 2.99998 14C2.4477 14 1.99998 13.5523 1.99998 13V6C1.99998 4.34315 3.34313 3 4.99998 3H19.9948L18.7153 1.71609Z" fill="#232323"></path> <path d="M22 11C22 10.4477 21.5523 10 21 10C20.4477 10 20 10.4477 20 11V18C20 18.5523 19.5523 19 19 19L4.00264 19L5.28213 17.7161C5.67335 17.3235 5.67335 16.687 5.28212 16.2944C4.8909 15.9019 4.2566 15.9019 3.86537 16.2944L1.59369 18.574L1.58051 18.5873C0.803938 19.3724 0.805727 20.6406 1.58588 21.4234L3.86035 23.7058C4.25133 24.0981 4.88523 24.0981 5.2762 23.7058C5.66718 23.3134 5.66718 22.6773 5.2762 22.285L3.99563 21L19 21C20.6568 21 22 19.6569 22 18L22 11Z" fill="#232323"></path> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Switch Accounts</div>
							</div>
							<div className='flex flex-row gap-4 items-center px-6 py-3 bg-[#eeeeee] hover:bg-[#f4f4f4] rounded-2xl transition-all duration-300 ease-in-out cursor-pointer'
								onClick={() => {
									// logOut()
									setConfirmationLogOut(true)
								}}
							>
								<svg viewBox="0 0 24 24" height="22" width="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
								<div className='text-[1.5rem] text-[#232323] dongle font-medium'>Log Out</div>
							</div>

						</div>

					</div> 
					
					: 

					<div className=' hidden sm:flex flex-row gap-16 mx-16 dosis text-lg font-semibold'>
						<NavLink to={'/signup'} className={({isActive}) => `${isActive ? 'bg-[#111111] text-white shadow-md shadow-black/50' : ''} hover:bg-[#111111] hover:text-white hover:shadow-md hover:shadow-black/50 px-4 py-2 rounded-2xl duration-300 ease-in-out`}>
							REGISTER
						</NavLink>

						<NavLink to={'/login'} className={({isActive}) => `${isActive ? 'bg-[#111111] text-white shadow-md shadow-black/50' : ''} hover:bg-[#111111] hover:text-white hover:shadow-md hover:shadow-black/50 px-4 py-2 rounded-2xl duration-300 ease-in-out`}>
							LOGIN
						</NavLink>
					</div> 

				}
			</nav>

			<div className={`${confirmationLogOut ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0'} duration-500 ease-in-out fixed top-0 left-0 h-full w-full z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm`}>
				<div className='p-6 w-[400px] h-[300px] bg-[#f1f1f1] rounded-3xl flex flex-col items-center justify-between relative'>
					<div className='w-full kanit text-[#777777]'>
						Log Out
					</div>
					<div className='w-full flex flex-row items-center justify-center'>
						<img src="/feed/logout(1).png" alt="" className='w-[150px] h-[150px]'/>
						<div className='flex flex-col items-center text-[0.9rem] text-[#232323] exo'>
							<span className='anton text-[1.5rem]'>Oh no!</span>
							<span className='font-semibold mt-2'>You are Leaving...</span>
							<span className='font-semibold'>Are you sure?</span>
						</div>
					</div>
					<div className='flex flex-row items-center justify-center gap-6 mt-4'>
						<div 
							className='kanit text-white bg-red-600 hover:bg-red-500 duration-200 ease-in-out px-6 pt-1.5 pb-2 rounded-xl cursor-pointer'
							onClick={logOut}
						>
							Log Out
						</div>
						<div 
							className='kanit px-6 pt-1.5 pb-2 rounded-xl cursor-pointer text-[#232323] bg-white hover:bg-[#111111] hover:text-white hover:shadow-md hover:shadow-black/50 duration-200 ease-in-out'
							onClick={() => {
								setConfirmationLogOut(false)
							}}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</>


	)
}

export default Navbar