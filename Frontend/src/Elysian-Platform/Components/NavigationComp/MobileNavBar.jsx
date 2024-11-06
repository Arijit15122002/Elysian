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
    <div className='justify-center h-[65px] flex items-center w-full bg-white '>
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
                
                <Link to={"/mojo"} className='p-2 bg-blue-600 rounded-full'>
                    <svg className='w-[20px] h-[20px]' fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 11v8h.051c.245 1.692 1.69 3 3.449 3 1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188 1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9s-9 4.038-9 9zm6 1c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm6-4c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z"></path></g></svg>
				</Link>
				
                <div 
				className={`${ settingsOpen ? 'bg-[#000000]' : 'bg-[#e1ffa1]' } h-[38px] w-[38px] rounded-full  flex flex-col items-center justify-center cursor-pointer duration-200`}
				onClick={() => {
					toggleMenus()
				}}
				>
                    <div className={`w-[45%] py-[0.8px] mb-[6px] ] rounded-full ${settingsOpen ? 'rotate-45 translate-y-[3.8px] scale-110 bg-[#ffffff]' : 'bg-[#000000]'} duration-200 ease-in-out`}></div>
					<div className={`w-[45%] py-[0.8px] ] rounded-full ${settingsOpen ? '-rotate-45  -translate-y-[3.8px] scale-110 bg-[#ffffff]' : 'bg-[#000000]'} duration-200 ease-in-out`}></div>
				</div>

			</div>
        </nav>
    </div>
  )
}

export default MobileNavBar