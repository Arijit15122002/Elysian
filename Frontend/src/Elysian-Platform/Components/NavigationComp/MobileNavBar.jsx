import React, { useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'

import { useTheme } from '../../../context/contextAPI'

import { NotificationLoader } from '../../../Mojo-Platform/Pages/MojoLoaders'
import { useSelector } from 'react-redux'
const Notification = lazy(() => import('../Notifications/Notification'))

function MobileNavBar ({ settingsOpen, setSettingsOpen }) {

    const { theme } = useTheme()

	const user = useSelector(state => state.auth.user)

	const toggleMenus = () => {
        setSettingsOpen(!settingsOpen)
	}

  return (
    <div className='justify-center h-[65px] flex items-center w-full '>
        <nav className=' w-full h-full flex flex-row items-center justify-between'>
            <div className='w-auto h-full flex flex-row items-center pl-4 pr-3 gap-2'>
                <svg width="48px" height="48px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={theme === 'dark' ? '#232323' : '#232323'} stroke-width="3">
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <path transform="translate(-8.96, -8.96), scale(2.56)" d="M16,28.77608844016989C18.08722480732056,28.9229345016092,20.226069316704844,28.554030911097094,22.06404822606628,27.554078566834065C23.891274512663863,26.55997618650965,25.301655032291862,24.940837233758877,26.350876790021303,23.144694380835702C27.360264704750755,21.41674232922008,27.605997130555764,19.421534355793476,27.96474743419822,17.452783362213804C28.342206267599515,15.381363642845832,28.880868819721044,13.326598109867739,28.51788261134611,11.252593327513381C28.117800709024618,8.966633807279699,27.767609506575134,6.157906774241103,25.77867493016255,4.962157758994726C23.705220285267938,3.715595212798414,21.041126918105817,5.559827491721807,18.6346539866626,5.31078858663758C16.641378684622204,5.104510305978147,14.955868236627868,3.669531887164028,12.952249003709845,3.634788135538358C10.662375972255818,3.595080601016794,8.305943821877014,3.9205899287633796,6.341330833142528,5.0976162636318865C4.235699169259146,6.359128802811522,2.134045983228318,8.12901761903313,1.495002634267129,10.498980105783547C0.8578348897747267,12.861986707243503,2.6790913753764776,15.15207268184285,2.9751401562897257,17.581504313415273C3.2710344995181977,20.009668600479998,1.701431093255813,22.9057757254027,3.238745274647558,24.808458141105064C4.808384583038107,26.75114828682803,7.982886521137543,25.989685546869886,10.367834372107112,26.731195026842677C12.303196774826457,27.332922887775105,13.978250275189568,28.63384885808791,16,28.77608844016989" fill={ theme === 'dark' ? '#ffffff' : 'none' } strokewidth="0"/>
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <path d="M31.67 8.33h.66A23.67 23.67 0 0 1 56 32v13.15a10.52 10.52 0 0 1-10.52 10.52h-27A10.52 10.52 0 0 1 8 45.15V32A23.67 23.67 0 0 1 31.67 8.33z"/>
                    <circle cx="22" cy="30" r="6"/>
                    <circle cx="42" cy="30" r="6"/>
                    <path d="m56 8-4 4"/>
                    </g>
                </svg>
                <div className='text-[2rem] flex text-[#303030] grand -mb-[7px]'>
                    <span className=''>Elysian</span>
                </div>
            </div>
            
            <div className=' flex flex-row items-center gap-3 mx-4'>
                
                <Link to={"/mojo"} className='p-2 bg-[#eeeeee] rounded-full'>
                    <svg 
                    className='w-[1.5rem] h-[1.5rem]'
                    fill="#232323" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width=""></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g><g id="SVGRepo_iconCarrier"><path d="M 16 3 C 14.0625 3 12.570313 3.507813 11.5 4.34375 C 10.429688 5.179688 9.8125 6.304688 9.375 7.34375 C 8.9375 8.382813 8.65625 9.378906 8.375 10.09375 C 8.09375 10.808594 7.859375 11.085938 7.65625 11.15625 C 4.828125 12.160156 3 14.863281 3 18 L 3 19 L 4 19 C 5.347656 19 6.003906 19.28125 6.3125 19.53125 C 6.621094 19.78125 6.742188 20.066406 6.8125 20.5625 C 6.882813 21.058594 6.847656 21.664063 6.9375 22.34375 C 6.984375 22.683594 7.054688 23.066406 7.28125 23.4375 C 7.507813 23.808594 7.917969 24.128906 8.375 24.28125 C 9.433594 24.632813 10.113281 24.855469 10.53125 25.09375 C 10.949219 25.332031 11.199219 25.546875 11.53125 26.25 C 11.847656 26.917969 12.273438 27.648438 13.03125 28.1875 C 13.789063 28.726563 14.808594 29.015625 16.09375 29 C 18.195313 28.972656 19.449219 27.886719 20.09375 26.9375 C 20.417969 26.460938 20.644531 26.050781 20.84375 25.78125 C 21.042969 25.511719 21.164063 25.40625 21.375 25.34375 C 22.730469 24.9375 23.605469 24.25 24.09375 23.46875 C 24.582031 22.6875 24.675781 21.921875 24.8125 21.40625 C 24.949219 20.890625 25.046875 20.6875 25.375 20.46875 C 25.703125 20.25 26.453125 20 28 20 L 29 20 L 29 19 C 29 17.621094 29.046875 16.015625 28.4375 14.5 C 27.828125 12.984375 26.441406 11.644531 24.15625 11.125 C 24.132813 11.121094 24.105469 11.132813 24 11 C 23.894531 10.867188 23.734375 10.601563 23.59375 10.25 C 23.3125 9.550781 23.042969 8.527344 22.59375 7.46875 C 22.144531 6.410156 21.503906 5.269531 20.4375 4.40625 C 19.371094 3.542969 17.90625 3 16 3 Z M 16 5 C 17.539063 5 18.480469 5.394531 19.1875 5.96875 C 19.894531 6.542969 20.367188 7.347656 20.75 8.25 C 21.132813 9.152344 21.402344 10.128906 21.75 11 C 21.921875 11.433594 22.109375 11.839844 22.40625 12.21875 C 22.703125 12.597656 23.136719 12.96875 23.6875 13.09375 C 25.488281 13.503906 26.15625 14.242188 26.5625 15.25 C 26.871094 16.015625 26.878906 17.066406 26.90625 18.09375 C 25.796875 18.1875 24.886719 18.386719 24.25 18.8125 C 23.40625 19.378906 23.050781 20.25 22.875 20.90625 C 22.699219 21.5625 22.632813 22.042969 22.40625 22.40625 C 22.179688 22.769531 21.808594 23.128906 20.78125 23.4375 C 20.070313 23.652344 19.558594 24.140625 19.21875 24.59375 C 18.878906 25.046875 18.675781 25.460938 18.4375 25.8125 C 17.960938 26.515625 17.617188 26.980469 16.0625 27 C 15.078125 27.011719 14.550781 26.820313 14.1875 26.5625 C 13.824219 26.304688 13.558594 25.929688 13.3125 25.40625 C 12.867188 24.460938 12.269531 23.765625 11.53125 23.34375 C 10.792969 22.921875 10.023438 22.714844 9 22.375 C 8.992188 22.359375 8.933594 22.285156 8.90625 22.09375 C 8.855469 21.710938 8.886719 21.035156 8.78125 20.28125 C 8.675781 19.527344 8.367188 18.613281 7.5625 17.96875 C 7 17.515625 6.195313 17.289063 5.25 17.15625 C 5.542969 15.230469 6.554688 13.65625 8.3125 13.03125 C 9.375 12.65625 9.898438 11.730469 10.25 10.84375 C 10.601563 9.957031 10.851563 8.96875 11.21875 8.09375 C 11.585938 7.21875 12.019531 6.480469 12.71875 5.9375 C 13.417969 5.394531 14.402344 5 16 5 Z M 13 9 C 12.449219 9 12 9.671875 12 10.5 C 12 11.328125 12.449219 12 13 12 C 13.550781 12 14 11.328125 14 10.5 C 14 9.671875 13.550781 9 13 9 Z M 17 9 C 16.449219 9 16 9.671875 16 10.5 C 16 11.328125 16.449219 12 17 12 C 17.550781 12 18 11.328125 18 10.5 C 18 9.671875 17.550781 9 17 9 Z" ></path></g></svg>
				</Link>
				
                <div 
				className={`${ settingsOpen ? 'bg-blue-100' : '' } h-[38px] w-[38px] rounded-full  flex flex-col items-center justify-center cursor-pointer duration-200`}
				onClick={() => {
					toggleMenus()
				}}
				>
                    <div className={`w-[45%] py-[0.8px] mb-[6px] ] rounded-full ${settingsOpen ? 'rotate-45 translate-y-[3.8px] scale-110 bg-sky-700' : 'bg-[#232323]'} duration-200 ease-in-out`}></div>
					<div className={`w-[45%] py-[0.8px] ] rounded-full ${settingsOpen ? '-rotate-45  -translate-y-[3.8px] scale-110 bg-sky-700' : 'bg-[#232323]'} duration-200 ease-in-out`}></div>
				</div>

			</div>
        </nav>
    </div>
  )
}

export default MobileNavBar