import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import videoBG from '../../assets/videoplayback.webm'
import { HomeScreenImagesArray, TransitionalBG } from '../../constants/Constant'

import { useSelector } from 'react-redux'
import { useTheme } from '../../context/contextAPI'

function Home () {

	const navigate = useNavigate()
	
	const loggedIn = useSelector(state => state.auth.loggedIn)

	const [randomImage, setRandomImage] = useState(null); // Store the random image

	useEffect(() => {
		// Select a random image only once on component mount
		const randomIndex = Math.floor(Math.random() * HomeScreenImagesArray.length);
		setRandomImage(HomeScreenImagesArray[randomIndex]);
	}, []);


	//Clock
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
		  setCurrentTime(new Date());
		}, 1000); // Update only the time every second
	
			return () => clearInterval(timerId); // Cleanup function to prevent memory leaks
		}, []);
	
		const formatTime = (timeValue) => {
		// Ensure two-digit format with leading zero for single digits
		return timeValue.toString().padStart(2, '0');
	};

	const hours = formatTime(currentTime.getHours());
	const minutes = formatTime(currentTime.getMinutes());
	const seconds = formatTime(currentTime.getSeconds());

	//Let's Start
	const [openForm, setOpenForm] = useState(false);

	const handleOpenForm = () => {
		setOpenForm(true);
	}

	//Transitional background: 
	const [currentIndex, setCurrentIndex] = useState(0);
	const wallpapers = TransitionalBG
  
	useEffect(() => {
	  const intervalId = setInterval(() => {
		setCurrentIndex((prevIndex) =>
		  (prevIndex + 1) % wallpapers.length
		);
	  }, 2000);
  
	  return () => clearInterval(intervalId); // Cleanup function to stop interval on unmount
	}, [wallpapers.length]); // Run effect only when wallpapers change

	const {theme} = useTheme()
	
	return (
		<>

			{/* MOBILE VIEW */}
			<div className='w-full h-auto relative flex justify-center items-center sm:hidden'>
			<div className='mt-[70px] w-full h-auto flex flex-col items-center justify-center gap-5 '>
				<div className='w-full h-auto  flex flex-col px-8 py-2 gap-2'>
					<span className='anton text-[3.2rem]'>
						Show the World
					</span>
					<span className='cabin font-bold text-[2rem] pl-16 sm:hidden'>
						- the stories of <span className='text-[2.4rem] radio'>your dreams</span> 
					</span>
				</div>
				<div className='w-[90%] h-[300px] flex flex-row justify-center gap-10 items-center'>
					<div className='w-[70%] h-full min-h-[350px] max-w-[250px] bg-cover bg-center rounded-3xl shadow-md shadow-black/50 relative' style={{
						backgroundImage: `url("${randomImage?.url}")`,
					}}>
						<div className='absolute bottom-[10%] left-[6%] bg-black/80 px-6 py-4 rounded-3xl inline-block text-white text-3xl'>
							<div className='anton'>
								The Social hub
							</div>
							<div className='dosis'>
								For Dreamers
							</div>
						</div>
					</div>
					<div className='w-[25%] max-w-[100px] h-[70%] bg-black/80 rounded-3xl flex flex-col items-center justify-center gap-2'>
						<div className='text-5xl anton text-white'>{hours}</div>
						<div className='text-4xl protest text-white'>{minutes}</div>
						<div className='text-3xl kanit font-semibold text-white'>{seconds}</div>
					</div>
				</div>

				<div className='w-[90%] h-[20%] flex items-center justify-end'>
					{
						loggedIn ? 
						<Link to={'/feed'} className='bg-black text-white px-6 py-4 rounded-3xl shadow-md shadow-black/50 radio hover:scale-110 duration-300 ease-in-out cursor-pointer'>
							PROCEED TO DASHBOARD
						</Link> : 
						<div 
						onClick={handleOpenForm}
						className='bg-black text-white px-6 py-4 rounded-3xl shadow-md shadow-black/50 radio hover:scale-110 duration-300 ease-in-out cursor-pointer'>
							START NOW!
						</div>
					}
				</div>
			</div>

				{/* FORM */}
				<div className={`${openForm ? 'formShow' : 'formHidden'} mt-[70px] fixed w-[90%] max-w-[700px] h-[78vh] bg-[#111111]/50 dark:bg-[#ffffff]/40 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-6 z-10`}>
					<svg 
					onClick={() => setOpenForm(false)}
					className='absolute top-0 right-0 m-4 cursor-pointer'
					width="50px" 
					height="50px" 
					viewBox="0 0 24 24" 
					fill="#111111" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M10.4269 2.42136C11.4003 1.85938 12.5996 1.85938 13.573 2.42136L19.5087 5.84836C20.4821 6.41034 21.0817 7.44892 21.0817 8.57288V15.4269C21.0817 16.5508 20.4821 17.5894 19.5087 18.1514L13.573 21.5784C12.5996 22.1404 11.4003 22.1404 10.4269 21.5784L4.49122 18.1514C3.51784 17.5894 2.91821 16.5508 2.91821 15.4269V8.57288C2.91821 7.44892 3.51784 6.41034 4.49122 5.84836L10.4269 2.42136ZM9.34833 9.34832C9.64123 9.05543 10.1161 9.05543 10.409 9.34832L11.9999 10.9393L13.5909 9.34833C13.8838 9.05544 14.3587 9.05544 14.6516 9.34833C14.9444 9.64123 14.9444 10.1161 14.6516 10.409L13.0606 11.9999L14.6516 13.591C14.9445 13.8839 14.9445 14.3587 14.6516 14.6516C14.3587 14.9445 13.8839 14.9445 13.591 14.6516L11.9999 13.0606L10.4089 14.6516C10.116 14.9445 9.64115 14.9445 9.34825 14.6516C9.05536 14.3587 9.05536 13.8839 9.34825 13.591L10.9393 11.9999L9.34833 10.409C9.05544 10.1161 9.05544 9.64122 9.34833 9.34832Z" fill="#ffffff" fill-rule="evenodd"/></svg>
					<div className='bg-white px-10 py-6 rounded-3xl flex flex-col items-center gap-3 justify-center'>
						<div className='flex flex-col'>
							<span className='text-2xl text-[#232323] anton'>
								Already Elysian?
							</span>
							<span className='text-xl kanit'>
								Enter Now
							</span>
						</div>
						<Link to={'/login'} className='px-6 py-3 dosis font-bold text-white text-xl bg-[#111111] inline-block rounded-xl shadow-md shadow-black/30'>
							LOG IN
						</Link>
					</div>

					<div className='bg-blue-500 px-10 py-6 rounded-3xl flex flex-col items-center gap-3 justify-center'>
						<div className='flex flex-col text-[#ffffff]'>
							<span className='text-2xl anton'>
								Don't have an account?
							</span>
							<span className='text-xl protest pt-4'>
								Enter Elysian.
							</span>
							<span className='text-xl protest pb-4'>
								Create Your Story.
							</span>
						</div>
						<Link to={'/signup'} className='px-6 py-3 dosis font-bold text-black text-xl bg-white inline-block rounded-xl shadow-md shadow-black/50'>
							REGISTER
						</Link>
					</div>
				</div>

			</div>


			{/* COMPUTER VIEW */}
			<div className='w-full h-[100vh] justify-center items-center relative hidden sm:flex'>
			<div className='flex w-full mt-[70px] h-[calc(100vh-70px)] items-center justify-center flex-row '>

				{/* LEFT DIV */}
				<div className='flex flex-col h-[90%] w-[45%] lg:w-[30%] items-center'>
					<div className='h-[40%] flex flex-col justify-center'>
						<span className='radio text-[#555555] font-bold text-3xl'>Where</span>
						<span className='radio text-black dark:text-white font-bold text-4xl'>Connections</span>
						<span className='protest text-black dark:text-white text-3xl pl-32'>Ignite</span>
					</div>
					<div className='w-[85%] h-full min-h-[350px] max-w-[450px] bg-cover bg-center rounded-3xl shadow-md shadow-black/50 relative' style={{
						backgroundImage: `url("${randomImage?.url}")`,
					}}>
						<div className='absolute bottom-[10%] left-[6%] bg-black/80 px-6 py-4 rounded-3xl inline-block text-white text-3xl'>
							<div className='anton'>
								The Social hub
							</div>
							<div className='dosis'>
								For Dreamers
							</div>
						</div>
					</div>
				</div>

				{/* MIDDLE DIV */}
				<div className='hidden lg:flex flex-col h-[90%] w-[35%] gap-10 items-center justify-center'>
					<div className='w-[95%] h-[30%] flex items-center justify-center'>
						<div className='p-4 rounded-full shadow-md shadow-black/40 bg-[#f8f8f8]'>
							<svg width="156px" height="156px" viewBox="-8.96 -8.96 81.92 81.92" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff" stroke-width="3.4560000000000004">
								<g id="SVGRepo_bgCarrier" stroke-width="0">
								<path transform="translate(-8.96, -8.96), scale(2.56)" d="M16,28.77608844016989C18.08722480732056,28.9229345016092,20.226069316704844,28.554030911097094,22.06404822606628,27.554078566834065C23.891274512663863,26.55997618650965,25.301655032291862,24.940837233758877,26.350876790021303,23.144694380835702C27.360264704750755,21.41674232922008,27.605997130555764,19.421534355793476,27.96474743419822,17.452783362213804C28.342206267599515,15.381363642845832,28.880868819721044,13.326598109867739,28.51788261134611,11.252593327513381C28.117800709024618,8.966633807279699,27.767609506575134,6.157906774241103,25.77867493016255,4.962157758994726C23.705220285267938,3.715595212798414,21.041126918105817,5.559827491721807,18.6346539866626,5.31078858663758C16.641378684622204,5.104510305978147,14.955868236627868,3.669531887164028,12.952249003709845,3.634788135538358C10.662375972255818,3.595080601016794,8.305943821877014,3.9205899287633796,6.341330833142528,5.0976162636318865C4.235699169259146,6.359128802811522,2.134045983228318,8.12901761903313,1.495002634267129,10.498980105783547C0.8578348897747267,12.861986707243503,2.6790913753764776,15.15207268184285,2.9751401562897257,17.581504313415273C3.2710344995181977,20.009668600479998,1.701431093255813,22.9057757254027,3.238745274647558,24.808458141105064C4.808384583038107,26.75114828682803,7.982886521137543,25.989685546869886,10.367834372107112,26.731195026842677C12.303196774826457,27.332922887775105,13.978250275189568,28.63384885808791,16,28.77608844016989" fill="#111111" strokewidth="0"/></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
								<g id="SVGRepo_iconCarrier">
								<path d="M31.67 8.33h.66A23.67 23.67 0 0 1 56 32v13.15a10.52 10.52 0 0 1-10.52 10.52h-27A10.52 10.52 0 0 1 8 45.15V32A23.67 23.67 0 0 1 31.67 8.33z"/>
								<circle cx="22" cy="30" r="6"/>
								<circle cx="42" cy="30" r="6"/>
								<path d="m56 8-4 4"/>
								</g>
							</svg>
						</div>
					</div>
					<div 
					className='w-[85%] h-[45%] bg-[#111111] dark:bg-[#efefef] rounded-3xl flex flex-row shadow-md shadow-black/40 overflow-hidden' 
					>
						<div className='bg-[url(https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover h-full w-[30%] '/>
						<div className='flex flex-col w-[70%] h-full'>
							<div className='dosis text-lg font-semibold text-white dark:text-black px-6 xl:px-10 pt-10 pb-2'>
								'A stranger is a friend you haven't met yet.'
							</div>
							<div className='w-full flex justify-end px-6'>
								<div className='protest text-[#0f4b36] dark:text-[#107954]'>
									- WILL ROGERS
								</div>
							</div>

							<div className='flex flex-col px-6 py-4 justify-end items-end'>
								<div className='lg:text-xl xl:text-2xl anton text-[#cccccc] dark:text-[#bbbbbb]'>
									Then, what are you waiting for?
								</div>

								<div className='kanit text-[#75ffcf] dark:text-[#107954] font-bold text-xl inline-block '>Meet'em</div>
							</div>
						</div>
					</div>
				</div>


				{/* RIGHT DIV */}	
				<div className='w-[50%] lg:w-[32%] max-w-[420px] h-[95%] bg-green-200 rounded-2xl flex flex-col justify-center items-center gap-10'>
					<div className='w-[90%] h-[45%] bg-[#232323] rounded-3xl flex items-center justify-center relative'>
						<div className='w-[90%] h-[90%] rounded-3xl overflow-hidden absolute'>
							<video src={videoBG} autoPlay loop muted className=' h-full w-full object-cover z-0'></video>
						</div>
						<div className='fixed text-3xl text-white flex flex-col'>
							<span className='anton'>Spark your story.</span>
							<span className='dosis font-bold'>- with connections.</span>
						</div>
					</div>
					<div className='h-auto w-[90%] bg-white shadow-md shadow-black/50 rounded-3xl px-6 py-4 kanit tect-[#232323] font-semibold flex flex-row justify-center items-center gap-4'>
						<svg 
						className=''
						fill="#000000" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 					viewBox="0 0 508 508" xml:space="preserve">
						<g>
							<g>
								<path d="M378.756,0h-249.58C57.948,0,0,57.964,0,129.212v249.572C0,450.036,57.948,508,129.176,508h249.58
									C450.02,508,508,450.036,508,378.788V129.212C508,57.964,450.02,0,378.756,0z M500,378.788
									c0,66.84-54.392,121.216-121.244,121.216h-249.58C62.36,500.004,8,445.628,8,378.788V129.212C8,62.376,62.36,8,129.176,8h249.58
									C445.612,8,500,62.376,500,129.212V378.788z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M480.192,253.968c-2.208,0-4,1.788-4,4v112.016c0,57.572-48.632,106.208-106.2,106.208H138.004
									c-57.564,0-106.196-48.636-106.196-106.208V138c0-57.564,48.632-106.192,106.196-106.192H369.08c2.208,0,4-1.788,4-4
									c0-2.212-1.792-4-4-4H138.004C76.104,23.808,23.808,76.1,23.808,138v231.984c0,61.908,52.296,114.208,114.196,114.208h231.988
									c61.904,0,114.2-52.3,114.2-114.208V257.968C484.192,255.756,482.4,253.968,480.192,253.968z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M449.808,58.184C428.92,37.3,395.48,23.808,364.616,23.808c-2.208,0-4,1.788-4,4c0,2.212,1.792,4,4,4
									c28.412,0,60.372,12.872,79.536,32.032c0.78,0.78,1.804,1.172,2.828,1.172s2.048-0.392,2.828-1.172
									C451.372,62.276,451.372,59.748,449.808,58.184z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M480.192,166.668c-2.208,0-4,1.788-4,4v59.524c0,2.212,1.792,4,4,4s4-1.788,4-4v-59.524
									C484.192,168.456,482.4,166.668,480.192,166.668z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M167.52,236.108c-5.704-10.472-16.596-16.976-28.42-16.976c-17.908,0-32.476,14.764-32.476,32.912
									c0,18.14,14.568,32.896,32.476,32.896c3.208,0,6.416-0.484,9.532-1.444c1.66-0.508,2.8-2.02,2.828-3.756
									c0.032-1.732-1.06-3.284-2.696-3.848l-13.208-4.552c-8.764-4.956-12.024-16.2-7.256-25.224c3.22-6.088,9.436-9.868,16.22-9.868
									c3.032,0,5.932,0.748,8.62,2.216c0.2,0.104,0.404,0.196,0.62,0.272l8.952,3.072c1.56,0.532,3.288,0.056,4.352-1.208
									C168.128,239.344,168.312,237.556,167.52,236.108z M121.224,242.384c-5.04,9.544-3.756,20.836,2.364,28.908
									c-5.468-4.568-8.964-11.496-8.964-19.244c0-13.736,10.98-24.912,24.476-24.912c2.592,0,5.128,0.42,7.524,1.204
									C136.208,227.476,126.168,233.04,121.224,242.384z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M287.176,273.24c-2.56,0-5.184,0.312-7.812,0.928c-1.736,0.408-2.992,1.916-3.08,3.692
									c-0.088,1.78,1.008,3.404,2.692,3.984l16.852,5.808c8.752,4.948,12.008,16.188,7.248,25.22c-3.212,6.088-9.424,9.872-16.212,9.872
									c-2.992,0-5.984-0.772-8.648-2.22c-0.196-0.108-0.4-0.196-0.612-0.268l-18.536-6.376c-1.428-0.496-2.996-0.136-4.08,0.904
									c-1.08,1.048-1.484,2.612-1.048,4.048c4.532,14.856,17.892,24.84,33.24,24.84c19.156,0,34.744-15.8,34.744-35.22
									C321.924,289.036,306.336,273.24,287.176,273.24z M287.176,335.672c-8.748,0-16.66-4.228-21.592-11.088l9.112,3.132
									c3.752,1.98,7.956,3.028,12.168,3.028c9.764,0,18.688-5.416,23.288-14.136c2.432-4.608,3.388-9.624,3.04-14.488
									c0.48,2.032,0.732,4.152,0.732,6.332C313.924,323.46,301.924,335.672,287.176,335.672z"/>
							</g>
						</g>
						<g>
							<g>
								<path d="M357.716,160.056c-30.904,0-56.048,25.476-56.048,56.788c0,0.592,0.04,1.188,0.084,1.776v0.004l-11.424,35.236
									c-11.172,0.9-21.6,5.5-29.836,13.172l-38.332-13.2c-2.096-0.728-4.364,0.388-5.084,2.48c-0.72,2.088,0.392,4.364,2.48,5.084
									l40.668,14.004c1.46,0.512,3.092,0.116,4.172-0.996c7.692-7.932,17.984-12.44,28.984-12.692c1.7-0.036,3.188-1.148,3.712-2.764
									l12.508-38.584c0.148-0.464,0.212-0.952,0.188-1.44l-0.056-0.884c-0.032-0.4-0.064-0.796-0.064-1.196
									c0-26.9,21.556-48.788,48.048-48.788c26.476,0,48.012,21.884,48.012,48.788c0,20.744-12.988,39.264-32.316,46.08
									c-0.472,0.168-0.912,0.42-1.292,0.752l-34.94,30.344c-1.028,0.892-1.532,2.256-1.332,3.608c0.396,2.648,0.58,4.816,0.58,6.812
									c0,23.592-18.876,42.788-42.084,42.788c-19.792,0-36.664-13.696-41.032-33.304c-0.3-1.356-1.284-2.46-2.6-2.912l-86.424-29.772
									c-1.272-0.444-2.676-0.212-3.748,0.612c-6.44,4.968-14.08,7.592-22.092,7.592c-20.228,0-36.684-16.724-36.684-37.284
									s16.456-37.288,36.684-37.288c17.156,0,31.84,11.876,35.704,28.876c0.488,2.152,2.632,3.492,4.788,3.016
									c2.152-0.492,3.504-2.636,3.012-4.788c-4.696-20.668-22.588-35.1-43.504-35.1c-24.64,0-44.684,20.316-44.684,45.288
									c0,24.968,20.044,45.284,44.684,45.284c9.072,0,17.744-2.744,25.216-7.96l82.384,28.38c5.928,22.116,25.48,37.364,48.3,37.364
									c27.616,0,50.084-22.788,50.076-50.792c0-1.8-0.12-3.68-0.368-5.796l32.748-28.44c22.12-8.144,36.924-29.488,36.924-53.36
									C413.728,185.532,388.6,160.056,357.716,160.056z"/>
							</g>
						</g>
						<g>
							<g>
								<g>
									<path d="M357.516,183.872c-18.12,0-32.864,14.944-32.864,33.312c0,18.364,14.744,33.304,32.864,33.304
										s32.864-14.94,32.864-33.304C390.38,198.816,375.636,183.872,357.516,183.872z M357.516,242.488
										c-13.708,0-24.864-11.352-24.864-25.304c0-13.956,11.156-25.312,24.864-25.312s24.864,11.356,24.864,25.312
										C382.38,231.136,371.224,242.488,357.516,242.488z"/>
									<path d="M357.532,171.952c-24.476,0-44.388,20.196-44.388,45.016c0,24.812,19.912,45,44.388,45c24.496,0,44.424-20.188,44.424-45
										C401.956,192.148,382.028,171.952,357.532,171.952z M357.532,253.968c-20.064,0-36.388-16.596-36.388-37
										c0-20.412,16.324-37.016,36.388-37.016c20.084,0,36.424,16.608,36.424,37.016C393.956,237.372,377.616,253.968,357.532,253.968z"
										/>
								</g>
							</g>
						</g>
						</svg>
						<div className='w-[80%] h-[80%] flex items-center justify-center text-3xl bg-[#232323] rounded-3xl shadow-md shadow-black/50'>
							<div className='w-auto my-auto text-white'>
								{hours} : {minutes} : {seconds}
							</div>
						</div>
					</div>
					<div className='h-[12%] w-[90%] flex justify-center items-start '>
						{
							loggedIn ? 
							<Link to={'/feed'} className='bg-black text-white px-6 py-4 rounded-3xl shadow-md shadow-black/50 radio hover:scale-110 duration-300 ease-in-out cursor-pointer'>
								PROCEED TO DASHBOARD
							</Link> : 
							<div 
							onClick={handleOpenForm}
							className='bg-black text-white px-6 py-4 rounded-3xl shadow-md shadow-black/50 radio hover:scale-110 duration-300 ease-in-out cursor-pointer'>
								START NOW!
							</div>
						}
					</div>
				</div>
			</div>

			{/* FORM */}
			<div className={`${openForm ? 'formShow' : 'formHidden'} fixed w-[90%] max-w-[700px] h-[70%] bg-[#111111]/50 dark:bg-[#ffffff]/40 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center gap-6 z-10`}>
				<svg 
				onClick={() => setOpenForm(false)}
				className='absolute top-0 right-0 m-4 cursor-pointer'
				width="50px" 
				height="50px" 
				viewBox="0 0 24 24" 
				fill="#111111" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M10.4269 2.42136C11.4003 1.85938 12.5996 1.85938 13.573 2.42136L19.5087 5.84836C20.4821 6.41034 21.0817 7.44892 21.0817 8.57288V15.4269C21.0817 16.5508 20.4821 17.5894 19.5087 18.1514L13.573 21.5784C12.5996 22.1404 11.4003 22.1404 10.4269 21.5784L4.49122 18.1514C3.51784 17.5894 2.91821 16.5508 2.91821 15.4269V8.57288C2.91821 7.44892 3.51784 6.41034 4.49122 5.84836L10.4269 2.42136ZM9.34833 9.34832C9.64123 9.05543 10.1161 9.05543 10.409 9.34832L11.9999 10.9393L13.5909 9.34833C13.8838 9.05544 14.3587 9.05544 14.6516 9.34833C14.9444 9.64123 14.9444 10.1161 14.6516 10.409L13.0606 11.9999L14.6516 13.591C14.9445 13.8839 14.9445 14.3587 14.6516 14.6516C14.3587 14.9445 13.8839 14.9445 13.591 14.6516L11.9999 13.0606L10.4089 14.6516C10.116 14.9445 9.64115 14.9445 9.34825 14.6516C9.05536 14.3587 9.05536 13.8839 9.34825 13.591L10.9393 11.9999L9.34833 10.409C9.05544 10.1161 9.05544 9.64122 9.34833 9.34832Z" fill="#ffffff" fill-rule="evenodd"/></svg>
				<div className='bg-white px-10 py-6 rounded-3xl flex flex-col items-center gap-3 justify-center'>
					<div className='flex flex-col'>
						<span className='text-2xl text-[#232323] anton'>
							Already Elysian?
						</span>
						<span className='text-xl kanit'>
							Enter Now
						</span>
					</div>
					<Link to={'/login'} className='px-6 py-3 dosis font-bold text-white text-xl bg-[#111111] inline-block rounded-xl shadow-md shadow-black/30'>
						LOG IN
					</Link>
				</div>

				<div className='bg-blue-500 px-10 py-6 rounded-3xl flex flex-col items-center gap-3 justify-center'>
					<div className='flex flex-col text-[#ffffff]'>
						<span className='text-2xl anton'>
							Don't have an account?
						</span>
						<span className='text-xl protest pt-4'>
							Enter Elysian.
						</span>
						<span className='text-xl protest pb-4'>
							Create Your Story.
						</span>
					</div>
					<Link to={'/signup'} className='px-6 py-3 dosis font-bold text-black text-xl bg-white inline-block rounded-xl shadow-md shadow-black/50'>
						REGISTER
					</Link>
				</div>
			</div>
			</div>
		</>
	)
}

export default Home