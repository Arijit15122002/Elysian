import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './CreateStory.css'

function CreateStory () {

	const deviceType = useSelector(state => state.device.deviceType)

	const user = useSelector(state => state.auth.user)

	const handleFileChange = () => {

	}

	return (
	<>
		{
			deviceType === 'mobile' ? 
			<>
				<div className='w-full h-full flex flex-col items-center'>
					<div className='w-[80%] mx-auto py-3 px-2 text-[1.2rem] kanit text-[#888888]'>
						Create Story
					</div>
					<div className='flex flex-col items-center w-[80%] h-auto gap-6 my-10'>
						
						<div className='w-full h-auto flex flex-row items-center justify-center gap-16'>
							<Link to={'/post/story/photo'} className='w-[40%] h-[250px] bg-[#fafafa] rounded-xl flex flex-col items-center justify-center shadow1'>
								<div className=' my-2.5 text-center text-[1.1rem] text-[#256068] borel font-semibold'>
									Create a 
								</div>
								<svg className="w-[45px] h-[45px]" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#F76D57" d="M6,10h4v2c-1.24,0-2.782,0-4,0V10z"></path> <g> <path fill="#45AAB8" d="M60,14c0,0-8,0-9,0s-1.961-0.547-2.707-1.293s-5.203-5.203-5.961-5.961S40.5,6,40.5,6h-17 c0,0-1.105,0.02-1.809,0.723s-5.305,5.305-5.984,5.984S14,14,13,14s-9,0-9,0c-1.104,0-2,0.896-2,2v12h13.893 C18.84,22.078,24.937,18,32,18s13.16,4.078,16.107,10H62V16C62,14.896,61.104,14,60,14z"></path> <path fill="#45AAB8" d="M50,36c0,9.941-8.059,18-18,18s-18-8.059-18-18c0-2.107,0.381-4.121,1.046-6H2v26c0,1.104,0.896,2,2,2h56 c1.104,0,2-0.896,2-2V30H48.954C49.619,31.879,50,33.893,50,36z"></path> </g> <circle fill="#F9EBB2" cx="32" cy="36" r="12"></circle> <path fill="#394240" d="M32,50c7.732,0,14-6.268,14-14s-6.268-14-14-14s-14,6.268-14,14S24.268,50,32,50z M32,24 c6.627,0,12,5.373,12,12s-5.373,12-12,12s-12-5.373-12-12S25.373,24,32,24z"></path> <path fill="#394240" d="M60,12c0,0-7,0-8,0s-1.582,0.004-2.793-1.207s-5.538-5.538-5.538-5.538C43.481,5.067,42.33,4,41,4 S24.453,4,23,4s-2.498,1.084-2.686,1.271c0,0-4.326,4.326-5.521,5.521S13.018,12,12,12V9c0-0.553-0.447-1-1-1H5 C4.447,8,4,8.447,4,9v3c-2.211,0-4,1.789-4,4v40c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V16C64,13.789,62.211,12,60,12z M6,10 h4v2c-1.24,0-2.782,0-4,0V10z M4,14c0,0,8,0,9,0s2.027-0.613,2.707-1.293s5.281-5.281,5.984-5.984S23.5,6,23.5,6h17 c0,0,1.074-0.012,1.832,0.746s5.215,5.215,5.961,5.961S50,14,51,14s9,0,9,0c1.104,0,2,0.896,2,2v12H48.107 C45.16,22.078,39.063,18,32,18s-13.16,4.078-16.107,10H2V16C2,14.896,2.896,14,4,14z M32,20c8.837,0,16,7.163,16,16 c0,8.838-7.163,16-16,16s-16-7.162-16-16C16,27.163,23.163,20,32,20z M60,58H4c-1.104,0-2-0.896-2-2V30h13.046 C14.381,31.879,14,33.893,14,36c0,9.941,8.059,18,18,18s18-8.059,18-18c0-2.107-0.381-4.121-1.046-6H62v26 C62,57.104,61.104,58,60,58z"></path> <path fill="#394240" d="M32,30c3.313,0,6,2.687,6,6c0,0.553,0.447,1,1,1s1-0.447,1-1c0-4.418-3.582-8-8-8c-0.553,0-1,0.447-1,1 S31.447,30,32,30z"></path> <path fill="#506C7F" d="M32,20c-8.837,0-16,7.163-16,16c0,8.838,7.163,16,16,16s16-7.162,16-16C48,27.163,40.837,20,32,20z M32,50 c-7.732,0-14-6.268-14-14s6.268-14,14-14s14,6.268,14,14S39.732,50,32,50z"></path> <path opacity="0.2" fill="#231F20" d="M4,14c0,0,8,0,9,0s2.027-0.613,2.707-1.293s5.281-5.281,5.984-5.984S23.5,6,23.5,6h17 c0,0,1.074-0.012,1.832,0.746s5.215,5.215,5.961,5.961S50,14,51,14s9,0,9,0c1.104,0,2,0.896,2,2v12H48.107 C45.16,22.078,39.063,18,32,18s-13.16,4.078-16.107,10H2V16C2,14.896,2.896,14,4,14z"></path> <path fill="#394240" d="M55,24c1.657,0,3-1.344,3-3s-1.343-3-3-3s-3,1.344-3,3S53.343,24,55,24z M55,20c0.553,0,1,0.447,1,1 s-0.447,1-1,1s-1-0.447-1-1S54.447,20,55,20z"></path> <circle fill="#F9EBB2" cx="55" cy="21" r="1"></circle> </g> </g></svg>
								<div className=' my-6 text-center text-[1.1rem] text-[#256068] borel font-semibold'>
									Photo Story
								</div>
							</Link>
							<div className='w-[40%] h-[250px] bg-[#fafafa] rounded-xl flex flex-col items-center justify-center shadow2'>
								<div className=' my-3 text-center text-[1.1rem] text-[#83196c] borel font-semibold'>Create a</div>
								<div className='w-[50px] h-[50px]'>
									<svg className='w-[50px] h-[50px]' viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.333329 405.333462l981.333129 0 0 597.333209-981.333129 0 0-597.333209Z" fill="#9FDBAD"></path><path d="M959.9998 426.666791a21.333329 21.333329 0 0 1 21.333329 21.333329v511.999893a21.333329 21.333329 0 0 1-21.333329 21.333329H63.999987a21.333329 21.333329 0 0 1-21.333329-21.333329V448.00012a21.333329 21.333329 0 0 1 21.333329-21.333329h895.999813m0-42.666658H63.999987a63.999987 63.999987 0 0 0-63.999987 63.999987v511.999893a63.999987 63.999987 0 0 0 63.999987 63.999987h895.999813a63.999987 63.999987 0 0 0 63.999987-63.999987V448.00012a63.999987 63.999987 0 0 0-63.999987-63.999987z" fill="#5C2D51"></path><path d="M66.986653 407.040129a15.999997 15.999997 0 0 1-15.359997-11.946665L21.333329 281.600155a15.999997 15.999997 0 0 1 11.519997-19.626663L951.679802 21.333542h4.053332a15.999997 15.999997 0 0 1 15.359997 11.946664l29.653327 113.49331a15.999997 15.999997 0 0 1-11.519997 19.626663L71.039985 406.613462z" fill="#FFFFFF"></path><path d="M951.893135 43.946871l27.093328 103.253312L70.826652 384.000133l-26.879994-102.613312L951.893135 43.946871M955.733134 0.000213a37.333326 37.333326 0 0 0-9.386664 1.28L27.946661 241.493496a37.333326 37.333326 0 0 0-26.666661 45.439991l29.653327 113.49331A37.333326 37.333326 0 0 0 76.373317 426.666791L994.986459 186.880174a37.333326 37.333326 0 0 0 26.666661-45.653323L991.999793 27.946874A37.333326 37.333326 0 0 0 955.733134 0.000213z" fill="#5C2D51"></path><path d="M177.493296 224.426833l78.933317-20.693329 9.173332 151.893302-78.933317 20.693329-9.173332-151.893302z" fill="#F05071"></path><path d="M236.799951 230.826832l6.399998 108.586644-36.906659 9.599998-6.399998-108.586644 36.906659-9.599998m39.466658-54.399989L155.306634 208.213503l11.519998 195.413293 120.959975-31.573327-11.519998-195.413292z" fill="#5C2D51"></path><path d="M369.919923 174.080177l78.933317-20.693329 8.959998 152.106635-78.933317 20.479996-8.959998-151.893302z" fill="#F05071"></path><path d="M429.013244 180.693509l6.399999 108.586644-36.693326 9.386665-6.399999-108.586644 36.906659-9.599998M469.333236 126.29352L347.519928 157.866847l11.519997 195.413293 120.959975-31.573327-10.666664-195.413293z" fill="#5C2D51"></path><path d="M562.133216 123.733521l78.933317-20.693329 9.173332 152.106635-79.146651 20.693329-8.959998-152.106635z" fill="#F05071"></path><path d="M621.439871 130.346853l6.399998 108.586644-36.906659 9.599998-6.399998-108.586644 36.906659-9.599998M661.333196 75.946864L539.946554 106.666858l11.519998 195.413292 120.959975-31.573326L661.333196 75.946864z" fill="#5C2D51"></path><path d="M754.559843 73.386865l78.719983-20.479996 9.173332 151.893302-78.933317 20.693329-8.959998-152.106635z" fill="#F05071"></path><path d="M813.653164 80.000197l6.399998 108.586644-36.906658 9.599998-6.399999-108.586644 36.906659-9.599998M853.333156 25.600208l-121.173309 31.573327 11.519998 195.413292 120.959975-31.573326L853.333156 25.600208z" fill="#5C2D51"></path><path d="M429.013244 842.026705a42.666658 42.666658 0 0 1-42.666658-42.666658v-189.866627a42.666658 42.666658 0 0 1 42.666658-42.666658 42.666658 42.666658 0 0 1 21.333329 5.759999l165.973299 94.933313a42.666658 42.666658 0 0 1 0 74.666651l-165.973299 94.079981a42.666658 42.666658 0 0 1-21.333329 5.759999z" fill="#FDCA89"></path><path d="M429.013244 587.306758a21.333329 21.333329 0 0 1 10.666664 2.986666l165.973299 94.933313a21.333329 21.333329 0 0 1 0 37.759992l-165.973299 94.933314a21.333329 21.333329 0 0 1-10.666664 2.986666 21.333329 21.333329 0 0 1-21.333329-21.333329v-189.866627a21.333329 21.333329 0 0 1 21.333329-21.333329m0-42.666658a63.999987 63.999987 0 0 0-63.999987 63.999987v189.866627a63.999987 63.999987 0 0 0 96.426647 55.893322l165.973299-94.933314a63.999987 63.999987 0 0 0 0-111.786643l-165.973299-94.933314a63.999987 63.999987 0 0 0-31.78666-8.533331z" fill="#5C2D51"></path></g></svg>
								</div>
								<div className='p-4 my-3 text-center text-[1.1rem] text-[#177b35] borel font-semibold'>
									Video Story
								</div>
							</div>
						</div>		

						<div className='w-full h-auto flex flex-row gap-16 items-center justify-center mt-10'>
							<Link to={'/post/story/text'} className='w-[40%] h-[250px] bg-[#fafafa] rounded-xl shadow4 flex flex-col items-center justify-center'>
								<div className='py-3 text-center text-[1.1rem] text-[#d82c2c] borel font-semibold'> Create a </div>
								<svg className='w-[55px] h-[55px] -mt-1.5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.75 2C15.75 1.58579 15.4142 1.25 15 1.25C14.5858 1.25 14.25 1.58579 14.25 2V22C14.25 22.4142 14.5858 22.75 15 22.75C15.4142 22.75 15.75 22.4142 15.75 22V19.9944C18.3859 19.9668 19.8541 19.8028 20.8284 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.8541 4.19724 18.3859 4.03321 15.75 4.00559V2Z" fill="#d11515"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13V20H10ZM6.81782 7.78733C7.11779 7.74992 7.48429 7.74996 7.88383 7.75H10.1162C10.5157 7.74996 10.8822 7.74992 11.1822 7.78733C11.5109 7.82833 11.8612 7.9242 12.1624 8.19187C12.2138 8.23753 12.2625 8.28618 12.3081 8.33756C12.5758 8.63878 12.6717 8.98915 12.7127 9.31782C12.7501 9.61779 12.7501 9.98428 12.75 10.3838L12.75 10.425C12.75 10.8392 12.4142 11.175 12 11.175C11.5858 11.175 11.25 10.8392 11.25 10.425C11.25 9.97047 11.2486 9.69931 11.2242 9.50348C11.1998 9.30765 10.9965 9.2758 10.9965 9.2758C10.8007 9.25137 10.5295 9.25001 10.075 9.25001H9.75001V14.75H11C11.4142 14.75 11.75 15.0858 11.75 15.5C11.75 15.9142 11.4142 16.25 11 16.25H7.00001C6.58579 16.25 6.25001 15.9142 6.25001 15.5C6.25001 15.0858 6.58579 14.75 7.00001 14.75H8.25001V9.25001H7.925C7.47047 9.25001 7.19931 9.25137 7.00348 9.2758C7.00348 9.2758 6.80023 9.30765 6.7758 9.50348C6.75137 9.69931 6.75001 9.97047 6.75001 10.425C6.75001 10.8392 6.41422 11.175 6.00001 11.175C5.58579 11.175 5.25001 10.8392 5.25001 10.425L5.25 10.3838C5.24996 9.98428 5.24992 9.61779 5.28733 9.31782C5.32833 8.98915 5.4242 8.63878 5.69187 8.33756C5.73753 8.28618 5.78618 8.23753 5.83756 8.19187C6.13878 7.9242 6.48915 7.82833 6.81782 7.78733Z" fill="#d11515"></path> </g></svg>
								<div className='py-4 text-center text-[1.1rem] text-[#d82c2c] borel font-semibold'>
									Text Story
								</div>
							</Link>
							<div className='w-[40%] h-[250px] bg-[#fafafa] rounded-xl shadow3 flex flex-col items-center justify-center'>
								<div className='p-6 text-center text-[1.1rem] text-[#05462ff1] borel font-semibold'>Create a</div>
								<img src="/feed/boomerang.png" alt="" className='w-[60px] h-[60px] -mt-4'/>
								<div className='p-6 text-center text-[1.1rem] text-[#05462ff1] borel font-semibold'>
									Boomerang
								</div>
							</div>

						</div>				

					</div>
				</div>
			</> : 
			<>
				<div className='w-full h-full flex items-end justify-end'>
					<div className='w-[calc(100vw-80px)] h-[calc(100vh-70px)] flex flex-row'>
						<div className='w-[30%] min-w-[280px] max-w-[400px] hidden sm:flex flex-col h-full justify-center '>
							<div className='h-[80%] rounded-xl bg-[#dddddd]'
								style={{
									boxShadow: '0 0 20px #dddddd'
								}}
							>
								<div className='text-[1.3rem] kanit text-[#888888] px-6 py-2'>
									Your Story
								</div>
								<div className='w-full flex justify-center'>
									<div className='w-[90%] flex flex-row my-4 py-3 px-4 items-center gap-4 bg-white rounded-xl'>
										<img src={user?.profilePic} alt=""  
											className='w-[45px] h-[45px] object-cover object-center rounded-full ring-[3px] ring-[#4d9eef] '
										/>
										<div className='kanit text-[#777777] text-[1.1rem]'>
											{user?.fullname}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='h-full w-[70%] max-w-[100vw-300px] flex flex-col md:flex-row items-center justify-center gap-6'>
							<div 
								className='w-[200px] h-[280px] lg:w-[220px] lg:h-[350px] bg-gradient-to-tr from-[#25c0e7] to-[#12d86f] rounded-xl flex flex-row items-center justify-center px-4 gap-4 cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-[#232323]/50 duration-200 ease-in-out relative'
							>
								<svg className='w-[60px] h-[60px]' version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#ffffff" d="M32,48c6.627,0,12-5.373,12-12s-5.373-12-12-12s-12,5.373-12,12S25.373,48,32,48z M32,28 c4.418,0,8,3.582,8,8c0,0.553-0.447,1-1,1s-1-0.447-1-1c0-3.313-2.687-6-6-6c-0.553,0-1-0.447-1-1S31.447,28,32,28z"></path> <path fill="#ffffff" d="M32,52c8.837,0,16-7.162,16-16c0-8.837-7.163-16-16-16s-16,7.163-16,16C16,44.838,23.163,52,32,52z M32,22 c7.732,0,14,6.268,14,14s-6.268,14-14,14s-14-6.268-14-14S24.268,22,32,22z"></path> <circle fill="#ffffff" cx="55" cy="21" r="1"></circle> <path fill="#ffffff" d="M60,12c0,0-7,0-8,0s-1.582,0.004-2.793-1.207s-5.538-5.538-5.538-5.538C43.481,5.067,42.33,4,41,4 S24.453,4,23,4s-2.498,1.084-2.686,1.271c0,0-4.326,4.326-5.521,5.521S13.018,12,12,12V9c0-0.553-0.447-1-1-1H5 C4.447,8,4,8.447,4,9v3c-2.211,0-4,1.789-4,4v12h15.893C18.84,22.078,24.937,18,32,18s13.16,4.078,16.107,10H64V16 C64,13.789,62.211,12,60,12z M10,12c-1.24,0-2.782,0-4,0v-2h4V12z M55,24c-1.657,0-3-1.344-3-3s1.343-3,3-3s3,1.344,3,3 S56.657,24,55,24z"></path> <path fill="#ffffff" d="M50,36c0,9.941-8.059,18-18,18s-18-8.059-18-18c0-2.107,0.381-4.121,1.046-6H0v26c0,2.211,1.789,4,4,4h56 c2.211,0,4-1.789,4-4V30H48.954C49.619,31.879,50,33.893,50,36z"></path> </g> </g></svg>
								<div className='text-white kanit text-[1.1rem]'>
									Create a Photo Story
								</div>

								<input 
									type="file" 
									className='absolute w-full h-full opacity-0 cursor-pointer'
									onChange={handleFileChange}	
								/>
							</div>
							<div 
								className='w-[200px] h-[280px] lg:w-[220px] lg:h-[350px] bg-gradient-to-br from-[#097992] to-[#8d0690] rounded-xl flex flex-row items-center justify-center px-4 gap-4 cursor-pointer hover:scale-110 hover:shadow-md hover:shadow-[#232323]/50 duration-200 ease-in-out'
							>
								<svg className='w-[70px] h-[70px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM9.95197 6.25C9.52211 6.24993 9.12024 6.24986 8.79192 6.29891C8.42102 6.35432 8.04 6.4853 7.73542 6.82371C7.44103 7.15082 7.3371 7.54061 7.29204 7.91294C7.24993 8.26096 7.24996 8.69238 7.25 9.17954L7.25 9.22222C7.25 9.63644 7.58579 9.97222 8 9.97222C8.41421 9.97222 8.75 9.63644 8.75 9.22222C8.75 8.67931 8.75129 8.34011 8.78118 8.09313C8.7952 7.97725 8.81273 7.91048 8.8269 7.87221C8.83885 7.83993 8.84739 7.83046 8.85023 7.82731L8.85104 7.82637C8.8524 7.82473 8.8534 7.82353 8.86242 7.8194C8.87904 7.8118 8.92168 7.79617 9.01354 7.78245C9.21765 7.75196 9.50511 7.75 10 7.75H11.25V9.5C11.25 9.91421 11.5858 10.25 12 10.25C12.4142 10.25 12.75 9.91421 12.75 9.5V7.75H14C14.4949 7.75 14.7824 7.75196 14.9865 7.78245C15.0783 7.79617 15.121 7.8118 15.1376 7.8194C15.1466 7.82353 15.1476 7.82473 15.149 7.82637L15.1496 7.82716C15.1525 7.83031 15.1611 7.83993 15.1731 7.87221C15.1873 7.91048 15.2048 7.97725 15.2188 8.09313C15.2487 8.34011 15.25 8.67931 15.25 9.22222C15.25 9.63644 15.5858 9.97222 16 9.97222C16.4142 9.97222 16.75 9.63644 16.75 9.22222L16.75 9.17953C16.75 8.69238 16.7501 8.26096 16.708 7.91294C16.6629 7.54061 16.559 7.15082 16.2646 6.82371C15.96 6.4853 15.579 6.35432 15.2081 6.29891C14.8798 6.24986 14.4779 6.24993 14.048 6.25H9.95197ZM8 11.25C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H8ZM12.75 14.5C12.75 14.0858 12.4142 13.75 12 13.75C11.5858 13.75 11.25 14.0858 11.25 14.5V16.25H9.5C9.08579 16.25 8.75 16.5858 8.75 17C8.75 17.4142 9.08579 17.75 9.5 17.75H14.5C14.9142 17.75 15.25 17.4142 15.25 17C15.25 16.5858 14.9142 16.25 14.5 16.25H12.75V14.5Z" fill="#ffffff"></path> </g></svg>
								<div className='text-[1.1rem] text-white kanit'>
									Create a Text Story
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

export default CreateStory