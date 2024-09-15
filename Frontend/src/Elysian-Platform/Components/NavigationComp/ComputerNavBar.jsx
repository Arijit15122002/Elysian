import React, { useContext, useState,  useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import SearchBar from '../SearchComponent/SearchBar'
import { useTheme }  from '../../../context/contextAPI.js'

import { useSelector } from 'react-redux'

import PostCreation from '../../Pages/Posts/PostCreation.jsx'

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
	
	

	return (
		<nav className='w-full h-[70px] fixed bg-white dark:bg-[#232323] flex flex-row items-center justify-between z-50'>

			<Link className='flex flex-row h-full items-center gap-2 mx-4'>
				<svg width="45px" height="45px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={theme === 'dark' ? '#232323' : '#ffffff'} stroke-width="3.4560000000000004">
					<g id="SVGRepo_bgCarrier" stroke-width="0">
					<path transform="translate(-8.96, -8.96), scale(2.56)" d="M16,28.77608844016989C18.08722480732056,28.9229345016092,20.226069316704844,28.554030911097094,22.06404822606628,27.554078566834065C23.891274512663863,26.55997618650965,25.301655032291862,24.940837233758877,26.350876790021303,23.144694380835702C27.360264704750755,21.41674232922008,27.605997130555764,19.421534355793476,27.96474743419822,17.452783362213804C28.342206267599515,15.381363642845832,28.880868819721044,13.326598109867739,28.51788261134611,11.252593327513381C28.117800709024618,8.966633807279699,27.767609506575134,6.157906774241103,25.77867493016255,4.962157758994726C23.705220285267938,3.715595212798414,21.041126918105817,5.559827491721807,18.6346539866626,5.31078858663758C16.641378684622204,5.104510305978147,14.955868236627868,3.669531887164028,12.952249003709845,3.634788135538358C10.662375972255818,3.595080601016794,8.305943821877014,3.9205899287633796,6.341330833142528,5.0976162636318865C4.235699169259146,6.359128802811522,2.134045983228318,8.12901761903313,1.495002634267129,10.498980105783547C0.8578348897747267,12.861986707243503,2.6790913753764776,15.15207268184285,2.9751401562897257,17.581504313415273C3.2710344995181977,20.009668600479998,1.701431093255813,22.9057757254027,3.238745274647558,24.808458141105064C4.808384583038107,26.75114828682803,7.982886521137543,25.989685546869886,10.367834372107112,26.731195026842677C12.303196774826457,27.332922887775105,13.978250275189568,28.63384885808791,16,28.77608844016989" fill={ theme === 'dark' ? '#ffffff' : '#232323' } strokewidth="0"/>
					</g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
					<g id="SVGRepo_iconCarrier">
					<path d="M31.67 8.33h.66A23.67 23.67 0 0 1 56 32v13.15a10.52 10.52 0 0 1-10.52 10.52h-27A10.52 10.52 0 0 1 8 45.15V32A23.67 23.67 0 0 1 31.67 8.33z"/>
					<circle cx="22" cy="30" r="6"/>
					<circle cx="42" cy="30" r="6"/>
					<path d="m56 8-4 4"/>
					</g>
				</svg>

				<div className='text-[2rem] flex text-[#232323] grand items-end'>
					<span className=''>Elysian</span>
				</div>
			</Link>

			{
				loggedIn ? 
				<div className=' hidden lg:flex flex-row items-center gap-16'>
					<NavLink to={'/feed'} className={({isActive}) => {
						isActive ? setActive1(true) : setActive1(false)
						return `${isActive ? 'bg-blue-100' : 'hover:bg-[#eeeeee] duration-200 ease-in-out'} p-2 rounded-full`
					}}>
					<div className='w-[2rem] h-[2rem] flex items-center justify-center'>
						<svg className='w-[2rem] h-[2rem] -mt-[2px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1.2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15" stroke={active1 ? "#056ed7" : "#232323" } stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
					</div>
					</NavLink>
					<NavLink to={'/search'} className={({isActive}) => {
						isActive ? setActive2(true) : setActive2(false)
						return `${isActive ? 'bg-blue-100' : 'hover:bg-[#eeeeee] duration-200 ease-in-out'} p-2 rounded-full`
					}}>
					<div className='w-[2rem] h-[2rem] flex items-center justify-center '>
						<svg className='w-[1.6rem] h-[1.6rem] -mt-[1px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={active2 ? "#056ed7" : "#232323" } stroke-width="1.744" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
					</div>
					</NavLink>
					<NavLink to={'/notifications'} className={({isActive}) => {
						isActive ? setActive3(true) : setActive3(false)
						return `${isActive ? 'bg-blue-100' : 'hover:bg-[#eeeeee] duration-200 ease-in-out'} p-2 rounded-full`
					}}>
					<div className='w-[2rem] h-[2rem] flex items-center justify-center'>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke={active3 ? "#056ed7" : "#232323" } stroke-width="1.64" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke={active3 ? "#056ed7" : "#232323" } stroke-width="1.44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke={active3 ? "#056ed7" : "#232323" } stroke-width="1.44" stroke-miterlimit="10"></path> </g></svg>
					</div>
					</NavLink>
					<NavLink to={'/explore'} className={({isActive}) => {
						isActive ? setActive4(true) : setActive4(false)
						return `${isActive ? 'bg-blue-100' : 'hover:bg-[#eeeeee] duration-200 ease-in-out'} p-2 rounded-full`
					}}>
					<div className='w-[2rem] h-[2rem] flex items-center justify-center'>
						<svg className='w-[1.4rem] h-[1.4rem]' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke={active4 ? "#056ed7" : "#232323" } stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z" stroke-width="0.3" stroke={active4 ? "#056ed7" : "#232323" } fill={active4 ? "#056ed7" : "#232323" } ></path> </g></svg>
					</div>
					</NavLink>
				</div> : 
				<div>

				</div>
			}

			{
				loggedIn
				
				? 
				
				<div className='flex flex-row gap-4 mx-4 dosis text-lg font-semibold items-center relative'>

					<div className={`${postCreateButton ? 'bg-blue-100' : 'bg-white hover:bg-[#eeeeee]'} duration-300 ease-in-out w-[2rem] h-[2rem] cursor-pointer rounded-xl flex items-center justify-center`}
					style={{
						boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)'
					}}
					onClick={() => {
						if( urlPathValue === '/post/story' || urlPathValue === '/post/create' ) {
							setPostCreation(!postCreation)
						} else {
							setPostCreateButton(!postCreateButton)
							setPostCreation(!postCreation)
						}
					}}>
						<svg className='w-[1.5rem] h-[1.5rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill={postCreateButton ? '#2292ce' : '#232323'}></path> </g></svg>
					</div>

					<Link to={'/mojo'} className='p-1.5 rounded-full '>
						<svg
						 className='w-[1.7rem] h-[1.7rem]'
						 fill="#232323" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#232323" stroke-width="0.1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 16 3 C 14.0625 3 12.570313 3.507813 11.5 4.34375 C 10.429688 5.179688 9.8125 6.304688 9.375 7.34375 C 8.9375 8.382813 8.65625 9.378906 8.375 10.09375 C 8.09375 10.808594 7.859375 11.085938 7.65625 11.15625 C 4.828125 12.160156 3 14.863281 3 18 L 3 19 L 4 19 C 5.347656 19 6.003906 19.28125 6.3125 19.53125 C 6.621094 19.78125 6.742188 20.066406 6.8125 20.5625 C 6.882813 21.058594 6.847656 21.664063 6.9375 22.34375 C 6.984375 22.683594 7.054688 23.066406 7.28125 23.4375 C 7.507813 23.808594 7.917969 24.128906 8.375 24.28125 C 9.433594 24.632813 10.113281 24.855469 10.53125 25.09375 C 10.949219 25.332031 11.199219 25.546875 11.53125 26.25 C 11.847656 26.917969 12.273438 27.648438 13.03125 28.1875 C 13.789063 28.726563 14.808594 29.015625 16.09375 29 C 18.195313 28.972656 19.449219 27.886719 20.09375 26.9375 C 20.417969 26.460938 20.644531 26.050781 20.84375 25.78125 C 21.042969 25.511719 21.164063 25.40625 21.375 25.34375 C 22.730469 24.9375 23.605469 24.25 24.09375 23.46875 C 24.582031 22.6875 24.675781 21.921875 24.8125 21.40625 C 24.949219 20.890625 25.046875 20.6875 25.375 20.46875 C 25.703125 20.25 26.453125 20 28 20 L 29 20 L 29 19 C 29 17.621094 29.046875 16.015625 28.4375 14.5 C 27.828125 12.984375 26.441406 11.644531 24.15625 11.125 C 24.132813 11.121094 24.105469 11.132813 24 11 C 23.894531 10.867188 23.734375 10.601563 23.59375 10.25 C 23.3125 9.550781 23.042969 8.527344 22.59375 7.46875 C 22.144531 6.410156 21.503906 5.269531 20.4375 4.40625 C 19.371094 3.542969 17.90625 3 16 3 Z M 16 5 C 17.539063 5 18.480469 5.394531 19.1875 5.96875 C 19.894531 6.542969 20.367188 7.347656 20.75 8.25 C 21.132813 9.152344 21.402344 10.128906 21.75 11 C 21.921875 11.433594 22.109375 11.839844 22.40625 12.21875 C 22.703125 12.597656 23.136719 12.96875 23.6875 13.09375 C 25.488281 13.503906 26.15625 14.242188 26.5625 15.25 C 26.871094 16.015625 26.878906 17.066406 26.90625 18.09375 C 25.796875 18.1875 24.886719 18.386719 24.25 18.8125 C 23.40625 19.378906 23.050781 20.25 22.875 20.90625 C 22.699219 21.5625 22.632813 22.042969 22.40625 22.40625 C 22.179688 22.769531 21.808594 23.128906 20.78125 23.4375 C 20.070313 23.652344 19.558594 24.140625 19.21875 24.59375 C 18.878906 25.046875 18.675781 25.460938 18.4375 25.8125 C 17.960938 26.515625 17.617188 26.980469 16.0625 27 C 15.078125 27.011719 14.550781 26.820313 14.1875 26.5625 C 13.824219 26.304688 13.558594 25.929688 13.3125 25.40625 C 12.867188 24.460938 12.269531 23.765625 11.53125 23.34375 C 10.792969 22.921875 10.023438 22.714844 9 22.375 C 8.992188 22.359375 8.933594 22.285156 8.90625 22.09375 C 8.855469 21.710938 8.886719 21.035156 8.78125 20.28125 C 8.675781 19.527344 8.367188 18.613281 7.5625 17.96875 C 7 17.515625 6.195313 17.289063 5.25 17.15625 C 5.542969 15.230469 6.554688 13.65625 8.3125 13.03125 C 9.375 12.65625 9.898438 11.730469 10.25 10.84375 C 10.601563 9.957031 10.851563 8.96875 11.21875 8.09375 C 11.585938 7.21875 12.019531 6.480469 12.71875 5.9375 C 13.417969 5.394531 14.402344 5 16 5 Z M 13 9 C 12.449219 9 12 9.671875 12 10.5 C 12 11.328125 12.449219 12 13 12 C 13.550781 12 14 11.328125 14 10.5 C 14 9.671875 13.550781 9 13 9 Z M 17 9 C 16.449219 9 16 9.671875 16 10.5 C 16 11.328125 16.449219 12 17 12 C 17.550781 12 18 11.328125 18 10.5 C 18 9.671875 17.550781 9 17 9 Z"></path></g></svg>
					</Link>
					<NavLink to={'/profile'} className={({isActive}) => {
						return `${isActive ? 'ring-4 ring-violet-300' : ''} border-2 border-black rounded-full`
						}}>
						<img src={user.profilePic} alt="" className='h-[35px] w-[35px] object-cover object-center rounded-full'/>
					</NavLink>
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


	)
}

export default Navbar