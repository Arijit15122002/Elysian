import { useState, useEffect, lazy, Suspense } from 'react'
import { jwtDecode } from 'jwt-decode' 
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider, useTheme } from './context/contextAPI'
import { useDispatch } from 'react-redux'
import { userExists } from './redux/reducers/auth.reducer'
import { setSuggestedUsers } from './redux/reducers/suggestedUsers.reducer'
import { setDeviceType } from './redux/reducers/deviceType.reducer'
import 'react-image-crop/dist/ReactCrop.css'
import { useSelector } from 'react-redux'

// SplashScreen Animation
import SplashScreen from './commonComponents/HomeAnimation.jsx/SplashScreen'

// ELYSIAN
const Home = lazy(() => import('./Elysian-Platform/Pages/Home'))
const Layout = lazy(() => import('./Elysian-Platform/Pages/Layout'))
const Authorization = lazy(() => import('./Elysian-Platform/Pages/Authorization/Authorization'))
const FeedLayout = lazy(() => import('./Elysian-Platform/Pages/FeedComponent/FeedLayout'))
const Feed = lazy(() => import('./Elysian-Platform/Pages/FeedComponent/Feed'))
const Search = lazy(() => import('./Elysian-Platform/Pages/Search'))
const CreatePost = lazy(() => import('./Elysian-Platform/Pages/Posts/CreatePost'))
const NotFound = lazy(() => import('./Elysian-Platform/Pages/NotFound'))
const Notification = lazy(() => import('./Elysian-Platform/Components/Notifications/Notification'))
const MyProfile = lazy(() => import('./Elysian-Platform/Pages/MyProfile'))
const CreatePhotoStory = lazy(() => import('./Elysian-Platform/Pages/Story/CreatePhotoStory'))
const CreateTextStory = lazy(() => import('./Elysian-Platform/Pages/Story/CreateTextStory'))
const Explore = lazy(() => import('./Elysian-Platform/Pages/ExplorePeople/Explore'))

// MOJO
const MojoHome = lazy(() => import('./Mojo-Platform/Pages/MojoHome'))
const MojoLayout = lazy(() => import('./Mojo-Platform/Pages/MojoLayout'))
const Chat = lazy(() => import('./Mojo-Platform/Components/Chat/Chat'))
const Group = lazy(() => import('./Mojo-Platform/Pages/Group'))

import './App.css'
import ProtectRoute from './ProtectRoute'
import { Loader } from './Elysian-Platform/Pages/ElysianLoaders'
import CreateStory from './Elysian-Platform/Pages/Posts/CreateStory'



function App() {

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)

	//SETTING UP DEVICETYPE 
	// useEffect(() => {
	// 	const handleResize = () => {
	// 	  if (window.innerWidth >= 768) {
	// 		dispatch(setDeviceType('desktop'))
	// 	  } else {
	// 		dispatch(setDeviceType('mobile'))
	// 	  }
	// 	}
	// 	window.addEventListener('resize', handleResize)
	// 	handleResize()
	// 	return () => {
	// 	  window.removeEventListener('resize', handleResize)
	// 	}
	//   }, [])

	//SETTING UP DEVICETYPE 
	useEffect(() => {
		const userAgent = navigator.userAgent
		const isMobile = userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
		dispatch(setDeviceType(isMobile ? 'mobile' : 'desktop'))
	}, [])


	
	//SETTING USER TO THE import { connect } from 'react-redux'
	useEffect(() => {
		const token = localStorage.getItem('token')
		if( token ) {
			const decoded = jwtDecode(token);
			const currentTime = Math.floor(Date.now() / 1000);
			if( decoded.exp < currentTime ) {
				localStorage.removeItem('token')
				return
			} else {
				fetchUser(decoded.userId)
			}
		}

		async function fetchUser(userId) {
			const response  = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile/${userId}`)
			console.log(response);
			if(response?.data?.user) {
				dispatch(userExists(response.data.user))
			}
		}
		
		
	}, [])

	useEffect(() => {
		const calculateSuggestedUsers = async () => {
		  // Check if user object is available before making the API call
		  if (user) {
			const response = await axios.get(
			  `${import.meta.env.VITE_BASE_URL}/api/user/suggested/${user._id}`
			);
			if ( response?.data?.suggestedUsers.length ) {
			  dispatch(setSuggestedUsers(response?.data?.suggestedUsers));
			}
		  } else {
			console.log("User object is not yet available");
		  }
		};
	  
		calculateSuggestedUsers();
	  }, [ user ]);


	//SETTING THEME
	const [theme, setTheme] = useState('light')

	const lightMode = () => {
		setTheme('light')
	}
	const darkMode = () => {
		setTheme('dark')
	}
	useEffect(() => {
		document.querySelector('html').classList.remove('light', 'dark')
		document.querySelector('html').classList.add(theme)
	}, [theme])



	//SETTING BROWSER ANIMATION CONFIGURATION
	const [isBrowserRouterReady, setIsBrowserRouterReady] = useState(false);
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
		  setIsBrowserRouterReady(true);
		}, 2900); // Set delay to 3 seconds
	
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			<ThemeProvider value={{theme, darkMode, lightMode}}>
				<AnimatePresence mode='wait'> {/* Ensure smooth transitions */}
					{isBrowserRouterReady ? (
							<motion.div
								key="router"
								initial={{ opacity: 0 }} // Initial opacity: 0 (hidden)
								animate={{ opacity: 1 }} // Animate to opacity: 1 (visible)
								transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition for 0.5s with easeInOut easing
								>
								<BrowserRouter>
									<Suspense fallback={<Loader/>}>
										<Routes>

											<Route path="/" element={<Layout />}>
												<Route path="" element={<Home />} />
												<Route path="/login" element={<Authorization type='login' />} />
												<Route path="/signup" element={<Authorization type='signup' />} /> 
											</Route>

											<Route path="/feed" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<Feed />} />
											</Route>

											<Route path="/search" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<Search />} />
											</Route>

											<Route path="/post" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="/post/create" element={<CreatePost />} />
												<Route path="/post/story" element={<CreateStory />} />
												<Route path="/post/story/photo" element={<CreatePhotoStory/>} />
												<Route path="/post/story/text" element={<CreateTextStory/>} />
											</Route>

											<Route path="/notifications" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<Notification />} />
											</Route>

											<Route path="/explore" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<Explore />} />
											</Route>

											<Route path="/profile" element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<MyProfile />} />
											</Route>

											<Route path="/mojo" element={
												<ProtectRoute>
													<MojoLayout />
												</ProtectRoute>
											}>
												<Route path="" element={<MojoHome />} />
												<Route path="/mojo/chat/:chatId" element={<Chat />} />
												<Route path="/mojo/groups" element={<Group />} />
											</Route>
											<Route path="*" element={<NotFound />} />
										</Routes>
									</Suspense>
								</BrowserRouter>
							</motion.div>
						) : (
							<SplashScreen />
						)
					}
				</AnimatePresence>
			</ThemeProvider>
		</>
	)
}

export default App
