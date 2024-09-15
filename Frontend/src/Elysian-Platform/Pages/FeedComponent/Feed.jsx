import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'



function Feed () {

	const deviceType = useSelector(state => state.device.deviceType)
	const user = useSelector(state => state.auth.user)

	const [posts, setPosts] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/posts`)
			setPosts(response.data)
		}

		fetchPosts()
	}, [])

	//Handling Post Create section on Feed
	const [ createPostOpen, setCreatePostOpen ] = useState(false)

	return (
	<>
	{
		deviceType === 'mobile' ?
		<>
			<div className='w-full h-[webkit-fill-available] overflow-y-auto'>
				<div className='w-full h-[240px] flex items-center justify-center bg-[#f2f2f2]'>
					<div className='w-full h-[225px] bg-[#f8f8f8] flex justify-center items-center'>
						<div className='h-[200px] w-[95%]'>
							<div className='w-[130px] h-full rounded-xl overflow-hidden relative group'>
								<Link to={'/post/story'}>
								<img src={user.profilePic} alt="" className='object-cover object-center group-hover:scale-110 duration-200 ease-in-out'/>
								</Link>
								<div className='absolute bottom-0 w-full h-[50px] bg-[#efefef] text-white flex items-end'>
									<div className='w-full text-center py-2 text-[#232323] text-[0.8rem] kanit'>
										create story
									</div>
								</div>
								<Link to={'/post/story'}>
									<div className='absolute bottom-[30px] h-[50px] w-full flex items-center justify-center rounded-full'>
										<div className='h-[50px] w-[50px] rounded-full flex items-center justify-center bg-blue-600'>
											<svg className='w-[32px] h-[32px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full h-auto flex flex-col justify-center'>
					<Link to={'/post/create'} className='w-[95%] h-auto mx-auto my-2 px-4 py-3 bg-[#efefef] flex flex-row items-center gap-3 rounded-xl'>
						<div 
						className='w-full px-3 py-2 rounded-xl bg-[#f5f5f5] text-[0.95rem] text-[#999999] radio' >
							What's on your mind ?
						</div>
						<svg className='w-[30px] h-[30px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.97 1H18.03C16.76 1 16 1.76 16 3.03V5.97C16 7.24 16.76 8 18.03 8H20.97C22.24 8 23 7.24 23 5.97V3.03C23 1.76 22.24 1 20.97 1ZM19.01 6.57C18.98 6.6 18.91 6.64 18.86 6.64L17.82 6.79C17.79 6.8 17.75 6.8 17.72 6.8C17.57 6.8 17.44 6.75 17.35 6.65C17.23 6.53 17.18 6.36 17.21 6.18L17.36 5.14C17.37 5.09 17.4 5.02 17.43 4.99L19.13 3.29C19.16 3.36 19.19 3.44 19.22 3.52C19.26 3.6 19.3 3.67 19.34 3.74C19.37 3.8 19.41 3.86 19.45 3.9C19.49 3.96 19.53 4.02 19.56 4.05C19.58 4.08 19.59 4.09 19.6 4.1C19.69 4.21 19.79 4.31 19.88 4.38C19.9 4.4 19.92 4.42 19.93 4.42C19.98 4.46 20.04 4.51 20.08 4.54C20.14 4.58 20.19 4.62 20.25 4.65C20.32 4.69 20.4 4.73 20.48 4.77C20.56 4.81 20.64 4.84 20.71 4.86L19.01 6.57ZM21.4 4.18L21.08 4.5C21.06 4.53 21.03 4.54 21 4.54C20.99 4.54 20.98 4.54 20.97 4.54C20.25 4.33 19.68 3.76 19.47 3.04C19.46 3 19.47 2.96 19.5 2.93L19.83 2.6C20.37 2.06 20.88 2.07 21.41 2.6C21.68 2.87 21.81 3.13 21.81 3.39C21.8 3.65 21.67 3.91 21.4 4.18Z" fill="#444444"></path> <path d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z" fill="#444444"></path> <path d="M20.97 8H20.5V12.61L20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16V3.03C16 2.63 16.07 2.29 16.23 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.77C21.71 7.93 21.37 8 20.97 8Z" fill="#444444"></path> </g></svg>
					</Link>
				</div>

				<div className='w-full h-auto overflow-auto pb-20'>
				{
					posts.map((post) => 
					<>
						<PostCard post={post} />
					</>
					)
				}
				</div>
			</div>
		</> : 
		<>

			<div className='w-[90%] mx-auto h-[-webkit-fill-available] overflow-y-auto py-8 relative' id='feedScroll'>
				<div className='w-full max-w-[580px] mx-auto overflow-x-auto mb-4'>
					<div className='w-[150px] h-[240px] bg-[#eeeeee] rounded-2xl overflow-hidden relative group cursor-pointer'>
						<img src={user.profilePic} alt="" className='h-[80%] w-full object-cover object-top group-hover:scale-105 duration-200 ease-in-out'/>
						<Link className='absolute top-[70%] left-[40%] p-1 bg-blue-500 rounded-full group-hover:scale-125 duration-200 ease-in-out cursor-pointer'>
							<svg className='w-[30px] h-[30px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</Link>
						<div className='absolute w-full text-center bottom-3 text-[#232323] text-[0.9rem] kanit'>
							Create Story
						</div>
					</div>
				</div>

				<div className='w-full max-w-[580px] mx-auto h-auto my-6 flex flex-col justify-center border-[2px] border-[#cccccc] rounded-2xl p-4'>
					<div className='flex flex-row w-[99%] gap-2 items-center'>
						<img src={user.profilePic} alt=""  className='w-[40px] h-[40px] object-cover object-center rounded-full'/>
						<div className='w-[92%] rounded-xl bg-[#eeeeee] px-4 py-3 outline-none text-[1rem] radio text-[#888888] cursor-text'
							onClick={() => {
								setCreatePostOpen(true)
							}}
						>
							What's on your mind, {user.fullname.split(' ')[0]}?
						</div>
					</div>

					<div className='w-[90%] h-[2px] bg-[#dcdcdc] mx-auto my-4 rounded-full'/>

					<div className='w-full justify-center items-center flex flex-row gap-4 h-auto'>
						
						<div className='flex flex-row items-center px-[4%] py-2 bg-[#eeeeee] rounded-xl gap-2 cursor-pointer hover:bg-[#dedede] duration-200 ease-in-out'>
							<img src="/feed/liveVideo.png" alt="" className='w-[30px] h-[30px]'/>
							<div className='text-[#232323] kanit text-[0.8rem]'>Live Video</div>
						</div>

						<div className='flex flex-row items-center px-[4%] py-2 bg-[#eeeeee] rounded-xl gap-2 cursor-pointer hover:bg-[#dedede] duration-200 ease-in-out'>
							<img src="/feed/gallery.png" alt="" className='w-[30px] h-[30px]'/>
							<div className='text-[#232323] kanit text-[0.8rem]'>Photo/Video</div>
						</div>

						<div className='flex flex-row items-center px-[4%] py-2 bg-[#eeeeee] rounded-xl gap-2 cursor-pointer hover:bg-[#dedede] duration-200 ease-in-out'>
							<img src="/feed/smily.png" alt="" className='w-[28px] h-[28px]'/>
							<div className='text-[#232323] kanit text-[0.8rem]'>Feeling Activity</div>
						</div>

					</div>
				</div>

				<div className=''>

				</div>

				{
					posts.map((post) => 
					<>
						<PostCard post={post} />
					</>
					)
				}
			</div>
		</>
	}
	</>
	)
}

export default Feed