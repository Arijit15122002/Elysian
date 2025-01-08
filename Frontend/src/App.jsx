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
import { addNotifications, setNotifications } from './redux/reducers/notifications.reducer'
import 'react-image-crop/dist/ReactCrop.css'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

// SplashScreen Animation
import SplashScreen from './commonComponents/HomeAnimation.jsx/SplashScreen'

// ELYSIAN
const Home = lazy(() => import('./Elysian-Platform/Pages/Home'))
const Layout = lazy(() => import('./Elysian-Platform/Pages/Layout'))
const Authorization = lazy(() => import('./Elysian-Platform/Pages/Authorization/Authorization'))
const FeedLayout = lazy(() => import('./Elysian-Platform/Pages/FeedComponent/FeedLayout'))
const Feed = lazy(() => import('./Elysian-Platform/Pages/FeedComponent/Feed'))
const Search = lazy(() => import('./Elysian-Platform/Pages/Search/Search'))
const CreatePost = lazy(() => import('./Elysian-Platform/Pages/Posts/CreatePost'))
const NotFound = lazy(() => import('./Elysian-Platform/Pages/NotFound'))
const Notification = lazy(() => import('./Elysian-Platform/Components/Notifications/Notification'))
const Profile = lazy(() => import('./Elysian-Platform/Pages/MyProfile/Profile'))
const StoryViewer = lazy(() => import('./Elysian-Platform/Pages/FeedComponent/Story/StoryViewer'))
const Explore = lazy(() => import('./Elysian-Platform/Pages/ExplorePeople/Explore'))

// MOJO
const MojoHome = lazy(() => import('./Mojo-Platform/Pages/MojoHome'))
const MojoLayout = lazy(() => import('./Mojo-Platform/Pages/MojoLayout'))
const Chat = lazy(() => import('./Mojo-Platform/Components/Chat/Chat'))
const Group = lazy(() => import('./Mojo-Platform/Pages/Group'))

import './App.css'
import ProtectRoute from './ProtectRoute'
import { Loader } from './Elysian-Platform/Pages/ElysianLoaders'
import CreateStory from './Elysian-Platform/Pages/FeedComponent/Story/CreateStory'

let socket;

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
	const [ userId, setUserId ] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const decoded = jwtDecode(token);
			const currentTime = Math.floor(Date.now() / 1000);
			if (decoded.exp < currentTime) {
				localStorage.removeItem('token')
				return
			} else {
				fetchUser(decoded.userId)
				initializeSocket(decoded.userId);
				fetchNotifications(decoded.userId);
			}
		}

		async function fetchUser(userId) {
			const response  = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile/${userId}`)
			if (response?.data?.user) {
				dispatch(userExists(response.data.user))
			}
		}
	}, [])

	const calculateSuggestedUsers = async () => {
		if (user) {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/suggested/${user?._id}`);
			if (response?.data?.suggestedUsers.length) {
				dispatch(setSuggestedUsers(response?.data?.suggestedUsers));
			}
		} else {
			console.log("User object is not yet available");
		}
	};

	useEffect(() => {
		calculateSuggestedUsers();
		fetchNotifications(user?._id);
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

	//Adaptive theme changing setup
	useEffect(() => {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (prefersDark) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
		const themeChangeListener = (e) => {
			setTheme(e.matches ? "dark" : "light");
		};
	
		const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		darkModeMediaQuery.addEventListener("change", themeChangeListener);
		return () => {
			darkModeMediaQuery.removeEventListener("change", themeChangeListener);
		};
	}, []);



	//SETTING BROWSER ANIMATION CONFIGURATION
	const [isBrowserRouterReady, setIsBrowserRouterReady] = useState(false);
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
		  setIsBrowserRouterReady(true);
		}, 2900); // Set delay to 3 seconds
	
		return () => clearTimeout(timeoutId);
	}, []);


	//Setting Notifications 
	const initializeSocket = (userId) => {
		if (!socket) {
			socket = io(import.meta.env.VITE_BASE_URL, { withCredentials: true }) 
			socket.emit("joinRoom", userId)
		}

		socket.removeAllListeners("NEW_ELYSIAN_NOTIFICATION") // Remove all listeners for this event
		socket.on("NEW_ELYSIAN_NOTIFICATION", (notification) => {
			console.log("Received notification:", notification)
			dispatch(addNotifications(notification))
		})
	}
	

	useEffect(() => {
		if (user && !socket) {
			initializeSocket(user._id)
		}
		return () => {
			if (socket) {
				socket.disconnect()
				socket = null
			}
		}
	}, [user])


	const fetchNotifications = async (userId) => {
		try {
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/notification/${userId}`, { userId });
			if (response?.data) {
				dispatch(setNotifications(response.data));
			}
		} catch (error) {
			console.error("Error loading notifications:", error);
		}
	};

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
											</Route>

											<Route path='/stories/:userId' element={
												<ProtectRoute>
													<FeedLayout />
												</ProtectRoute>
											}>
												<Route path='' element={<StoryViewer/>}></Route>
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
												<Route path="" element={<Profile />} />
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
