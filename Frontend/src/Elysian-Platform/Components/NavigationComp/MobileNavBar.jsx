import React, { useState, Suspense, lazy } from 'react'

import { useTheme } from '../../../context/contextAPI'

import { NotificationLoader } from '../../../Mojo-Platform/Pages/MojoLoaders'
const Notification = lazy(() => import('../Notifications/Notification'))

function MobileNavBar () {

    const { theme } = useTheme()

    const [ notificationOpen, setNotificationOpen ] = useState(false)
    console.log(notificationOpen);

  return (
    <div className='flex justify-center'>
        <nav className='bg-white w-full h-full flex flex-row items-center justify-between'>
            <div className='w-auto h-full flex flex-row items-center pl-4 pr-3 gap-2'>
                <svg width="50px" height="50px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke={theme === 'dark' ? '#232323' : '#ffffff'} stroke-width="3.4560000000000004">
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
                <div className='text-[2.5rem] flex text-[#232323] grand items-end'>
                    <span className=''>Elysian</span>
                </div>
            </div>
            <div className='flex flex-row gap-2 mx-4 items-center'>
                <div className='w-[40px] h-[40px] bg-black'>

                </div>
                <div className='w-[40px] h-[40px] bg-black'>

                </div>
            </div>
        </nav>

        <div className={`${notificationOpen ? 'notificationsShow' : 'notificationsHidden'} fixed w-[80%] max-w-[500px] mt-[80px]`} >
			<Suspense fallback={<NotificationLoader/>}>
				<Notification/>
			</Suspense>
		</div>
    </div>
  )
}

export default MobileNavBar