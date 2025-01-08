import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MoonLoader from "react-spinners/MoonLoader";

import { userExists } from '../../../redux/reducers/auth.reducer'
import { current } from '@reduxjs/toolkit';

function Search () {

	const deviceType = useSelector(state => state.deviceType)
	const user = useSelector(state => state.auth.user)


	//Handling the whole search procedure
	const [searchInput, setSearchInput] = useState('')
	const searchRef = useRef(null)
	const [searchSuggestions, setSearchSuggestions] = useState([])
	const [searchSuggestionsActive, setSearchSuggestionsActive] = useState(false)
	const [searchResultUsers, setSearchResultUsers] = useState([])
	const [searchResultPosts, setSearchResultPosts] = useState([])

	const fetchSearchSuggestions = async (searchInput) => {
		const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/searchSuggestions/${searchInput}`)
		if( response?.data?.uniqueUsernames?.length > 0 ) {
			setSearchSuggestions(response?.data?.uniqueUsernames)
		}
	}

	function debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }
	const debouncedFetchResults = useCallback(debounce(fetchSearchSuggestions, 200), []);

	useEffect(() => {
        if (searchInput.length > 2) {
            debouncedFetchResults(searchInput);
        }
    }, [searchInput, debouncedFetchResults]);

	
	//Fetching Search Results

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Enter') {
				searchRef.current?.click(); // Simulate click on the div
			}
		};
	
		document.addEventListener('keydown', handleKeyDown);
	
		return () => {
			document.removeEventListener('keydown', handleKeyDown); // Cleanup
		};
	}, []);

	//Fetching Search Results
	const fetchSearchResults = async (searchInput) => {
		const postResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/search/${searchInput}`)
		setSearchResultPosts(postResponse.data.posts)
		const userResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/search/${searchInput}`)
		setSearchResultUsers(userResponse.data.users)
	}


	//Showing Search Results
	const [ userScreenOpen, setUserScreenOpen ] = useState(true)
	const [ postScreenOpen, setPostScreenOpen ] = useState(false)
	const [ allScreenOpen, setAllScreenOpen ] = useState(false)
	const [ searchButtonClicked, setSearchButtonClicked ] = useState(false)
	const [ loading, setLoading ] = useState(false)


	//Follow or Unfollow user
	const dispatch = useDispatch()
	const [ updatedUser, setUpdatedUser ] = useState(user)
	const followOrUnfollow = async (followUserId) => {
		setLoading(true)
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/follow/${followUserId}`, { userId : user._id })
		if( response?.data?.currentUser ) {
			dispatch(userExists(response?.data?.currentUser))
			setUpdatedUser(response?.data?.currentUser)
		}
		
	}

	useEffect(() => {
		if( user.following.length === updatedUser.following.length ) {
			setLoading(false)
		}
	}, [user, updatedUser])

	return (
		<>
		{	
			deviceType === 'mobile' ?
			<></> : 
			<>
				<div className='w-[90%] h-full mx-auto relative'>
					<div className=' text-[#232323] dark:text-white w-full sm:w-[90%] md:w-[95%] lg:w-[80%] xl:w-[70%] h-[45px] flex flex-row mx-auto my-4 rounded-xl overflow-hidden' style={{
						boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
					}}>
						<input 
							type="text" 
							value={searchInput}
							className='w-[calc(100%-55px)] h-full pl-4 kanit focus:outline-none bg-white dark:bg-[#232323]' 
							placeholder='Search for people, posts, and more...'
							onChange={(e) => {
								setSearchInput(e.target.value)
								setSearchSuggestionsActive(true)
								if(searchInput.length < 2 || searchInput.length === 0) {
									setSearchSuggestionsActive(false)
									setSearchButtonClicked(false)
								}
							}}
							/>
						<div 
							className={` ${searchInput.length < 2 ? 'bg-[#cdcdcd] dark:bg-[#777777]' : 'bg-blue-500'} duration-200 ease-in-out h-full w-[55px] py-2 flex items-center justify-center group cursor-pointer `}
							ref={searchRef}
							onClick={() => {
								setSearchSuggestionsActive(false)
								fetchSearchResults(searchInput)
								if(searchInput.length > 2) {
									setSearchButtonClicked(true)
								}
							}}
						>
							<svg className={`${searchInput.length < 2 ? '' : 'group-hover:scale-110'} duration-200 ease-in-out`} viewBox="0 0 24 24" width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 17L21 21" stroke="#ffffff" stroke-width="2.112" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffff" stroke-width="2.112"></path> </g></svg>
						</div>
					</div>

					<>
						{
							searchSuggestions.length > 0 && searchSuggestionsActive ?
							<>
							<div className='absolute top-[70px] w-full flex flex-col items-center'>
								<div 
									className='w-full sm:w-[90%] md:w-[95%] lg:w-[80%] xl:w-[70%] h-auto max-h-[200px] overflow-y-auto p-1 pb-0 rounded-2xl bg-white dark:bg-[#232323]' 
									id='menuScroll'
									style={{
										boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
									}}	
								>
								{
									searchSuggestions.map((suggestedUsers) =>
										<div 
											key={suggestedUsers._id} 
											className='bg-[#f2f2f2] dark:bg-[#232323] dark:hover:bg-[#111111] mb-1 px-6 py-1.5 rounded-xl kanit text-[#777777] dark:text-white cursor-pointer duration-200 ease-in-out'
											onClick={() => {
												setSearchSuggestionsActive(false)
												setSearchInput(suggestedUsers.fullname)
												setSearchSuggestions([])
												fetchSearchResults(suggestedUsers.fullname)
												setSearchButtonClicked(true)
											}}
										>
											{suggestedUsers.fullname}
										</div>
									)
								}
								</div>
							</div>
							</> : <>
							</>
						}	
					</>

					<div className={`${searchButtonClicked ? 'flex' : 'hidden'} h-[calc(100%-100px)] w-full sm:w-[90%] md:w-[95%] lg:w-[80%] xl:w-[70%] mx-auto flex-col items-center overflow-y-auto`}>
						
						<div className={`w-full flex flex-row gap-4 mt-4 px-2 mb-10`}>
							<div 
								className={`${userScreenOpen ? 'bg-[#111111] text-white dark:bg-blue-500 dark:text-white' : 'bg-[#dfdfdf] hover:bg-[#efefef] dark:bg-[#232323] dark:text-white'} px-4 py-1.5 kanit cursor-pointer rounded-xl duration-300 ease-in-out`}
								onClick={() => {
									setUserScreenOpen(true)
									setPostScreenOpen(false)
									setAllScreenOpen(false)
								}}
							>
								Accounts
							</div>
							<div 
								className={`${postScreenOpen ? 'bg-[#111111] text-white dark:bg-blue-500 dark:text-white' : 'bg-[#dfdfdf] hover:bg-[#efefef] dark:bg-[#232323] dark:text-white'} px-4 py-1.5 kanit cursor-pointer rounded-xl duration-300 ease-in-out`}
								onClick={() => {
									setUserScreenOpen(false)
									setPostScreenOpen(true)
									setAllScreenOpen(false)
								}}
							>
								Posts
							</div>
							<div 
								className={`${allScreenOpen ? 'bg-[#111111] text-white dark:bg-blue-500 dark:text-white' : 'bg-[#dfdfdf] hover:bg-[#efefef] dark:bg-[#232323] dark:text-white'} px-4 py-1.5 kanit cursor-pointer rounded-xl duration-300 ease-in-out`}
								onClick={() => {
									setUserScreenOpen(false)
									setPostScreenOpen(false)
									setAllScreenOpen(true)
								}}
							>
								All
							</div>
						</div>

						<div className='w-full flex flex-col items-center gap-3'>

							{/* Found Accounts Section */}
							{	
								userScreenOpen ? 
								searchResultUsers.length > 0 ? 
								<>
									{
										searchResultUsers.map((resultUser) => 
										<>
											<div key={resultUser._id} className='w-[95%] h-[80px] bg-[#ffffff] rounded-2xl shadow-[0_0_7px_0_rgba(0,0,0,0.2)] flex flex-row items-center justify-between px-4'>
												<div className='flex flex-row gap-4'>
													<img src={resultUser.profilePic} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center'/>
													<div className='flex flex-col justify-center'>
														<div className='flex flex-row gap-2'>
															<div className='kanit text-[#232323] '>{resultUser.username}</div>
															<div className='flex flex-row gap-2 items-center'>
															{
																user.following.includes(resultUser._id) ?
																<>
																	<div className='w-[5px] h-[5px] rounded-full bg-[#232323]'/>
																	<div 
																		className='text-[0.85rem] kanit text-blue-600 cursor-pointer hover:opacity-80 duration-200 ease-in-out'
																		onClick={() => {
																			followOrUnfollow(resultUser._id)
																		}}
																	>
																		Unfollow
																	</div>
																</> : <>
																</>
															}
															</div>
														</div>
														<div className='text-[0.8rem] kanit text-[#777777]'>
															{resultUser.fullname}
														</div>
													</div>
												</div>
												<>
												{
													loading ? <div className='w-[80px] h-full flex items-center justify-center'>
														<MoonLoader 
															color='#232323'
															loading={loading}
															size={20}
														/>
													</div> : 
													user.following.includes(resultUser._id) ?
													<>
													</> : 
													<>
														<div 
															className='px-5 py-1.5 bg-blue-600 text-white kanit rounded-xl cursor-pointer  hover:opacity-80 duration-200 ease-in-out'
															onClick={() => {
																followOrUnfollow(resultUser._id)
															}}
														>
															Follow
														</div>
													</>
												}
												</>
											</div>
										</>)
									}
								</> : 
								<>
									<div className='w-[95%] rounded-[20px] shadow-[0_0_7px_0_rgba(0,0,0,0.2)] p-1 bg-[#ffffff]'>
										<div className='bg-[#777777] rounded-2xl text-[1.1rem] py-2 quicksand font-semibold text-white text-center'>
											No Elysian accounts Found
										</div>
									</div>
								</> : ''
							}
							{
								postScreenOpen ? 
								searchResultPosts.length > 0 ? 
								<></> : <>
									<div className='w-[95%] rounded-[20px] shadow-[0_0_7px_0_rgba(0,0,0,0.2)] p-1 bg-[#ffffff]'>
										<div className='bg-[#777777] rounded-2xl text-[1.1rem] py-2 quicksand font-semibold text-white text-center'>
											No Elysian posts Found
										</div>
									</div>
								</> : ''
							}
						</div>

					</div>


				</div>
			</>
		}
		</>
	)
}

export default Search