import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Explore () {

	const deviceType = useSelector(state => state.device.deviceType)
	const user = useSelector(state => state.auth.user)
	const suggestedUsers = useSelector((state) => state.suggestedUsers.suggestedUsers);

	const [ followers, setFollowers ] = useState([])
	const [ following, setFollowing ] = useState([])
	const [usersIdontFollowBack, setUsersIdontFollowBack] = useState([]);
	
	useEffect(() => {

		// Calculate users you don't follow back
		const calculateUsersIdontFollowBack = async () => {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/dontFollowBack`, { userId : user._id })
			if( response?.data?.actualUsersIdontFollowBack.length > 0 ) {
				setUsersIdontFollowBack(response?.data?.actualUsersIdontFollowBack)
			} else {
				setUsersIdontFollowBack([])
			}

		};

		calculateUsersIdontFollowBack()

	}, [user.followers, user.following])

	const [ loading, setLoading ] = useState(false)
	const dispatch = useDispatch()
	const followOrUnfollow = async (followUserId) => {
		try {
			setLoading(true);
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/follow/${followUserId}`, { userId : user._id })
			if(  response?.data?.currentUser ) {
				dispatch(userExists(response?.data?.currentUser))
				setLoading(false);
			}
		} catch (error) {
			console.log("Error occured while following or unfollowing user: ", error);
		}
	}

	return (
	<div className='w-full h-full'>
	{
		deviceType === 'mobile' ? 
		<></> : 
		<>
			<div className='w-full h-full overflow-y-auto flex flex-col items-center'>
			{
				user?.followers === user?.following ? 
				<>
				<div>

				</div>
				</> : <>
				<div className='w-[80%] h-auto'>

				{
					usersIdontFollowBack?.length > 0 ? 
					<>
						<div className='pt-4 pb-2 px-6 text-[1rem] lg:text-[1.3rem] exo font-semibold'>People you don't follow back</div>
						{
							usersIdontFollowBack?.map((follower, index) => 
							<>
								<Link className='w-[95%] md:w-[90%] lg:w-[85%] h-auto mx-auto flex flex-row items-center justify-between my-4 bg-white p-2 rounded-2xl' style={{
									boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.05)'
								}}>
									<div className='flex flex-row h-auto items-center'>
										<img src={follower?.profilePic} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center'/>
										<div className='ml-8 flex flex-col'>
											<div className='kanit'>
												{follower.username}
											</div>
											<div className='text-[0.8rem] text-[#666666]'>
												{follower.fullname}
											</div>
										</div>
									</div>
									<div className='text-[0.88rem] bg-[#111111] px-3 py-1.5 mr-2 rounded-lg radio text-white cursor-pointer hover:scale-110 duration-300 ease-in-out shadow-md shadow-black/20'
										onClick={() => {
											followOrUnfollow(follower._id)
										}}>
										Follow Back
									</div>
								</Link>
							</>
							)
						}
					</> : <></>
				}

				<>
					<div className='pt-4 pb-2 px-6 text-[1rem] lg:text-[1.3rem] exo font-semibold'>People you may know</div>
					{
						suggestedUsers?.length > 0 ?
						<>
						{
							suggestedUsers?.map((suggestedUser, index) =>
							<>
								<Link className='w-[95%] md:w-[90%] lg:w-[85%] h-auto mx-auto flex flex-row items-center justify-between my-4 bg-white p-2 rounded-2xl' style={{
									boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.05)'
								}}>
									<div className='flex flex-row h-auto items-center'>
										<img src={suggestedUser?.profilePic} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center'/>
										<div className='ml-8 flex flex-col'>
											<div className='kanit'>
												{suggestedUser.username}
											</div>
											<div className='text-[0.8rem] text-[#666666]'>
												{suggestedUser.fullname}
											</div>
										</div>
									</div>
									<div className='text-[0.88rem] bg-[#111111] px-3 py-1.5 mr-2 rounded-lg radio text-white cursor-pointer hover:scale-110 duration-300 ease-in-out shadow-md shadow-black/20'
										onClick={() => {
											followOrUnfollow(suggestedUser._id)
										}}>
										Follow
									</div>
								</Link>
							</>
							)
						}
						</> : <>
							<div className='w-full h-auto flex flex-col items-center gap-5'>
								<div className='w-[85%] h-[65px] bg-[#eeeeee] animate-pulse rounded-2xl'></div>
								<div className='w-[85%] h-[65px] bg-[#eeeeee] animate-pulse rounded-2xl'></div>
								<div className='w-[85%] h-[65px] bg-[#eeeeee] animate-pulse rounded-2xl'></div>
								<div className='w-[85%] h-[65px] bg-[#eeeeee] animate-pulse rounded-2xl'></div>
								<div className='w-[85%] h-[65px] bg-[#eeeeee] animate-pulse rounded-2xl'></div>
							</div>
						</>
					}
				</>

				</div>
				</>
			}
			</div>
		</>
	}
	</div>
  	)
}

export default Explore