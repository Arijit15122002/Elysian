import { useState, useEffect, lazy, Suspense, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, UserContext } from './context/ContextAPI'

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

// MOJO
const MojoHome = lazy(() => import('./Mojo-Platform/Pages/MojoHome'))
const MojoLayout = lazy(() => import('./Mojo-Platform/Pages/MojoLayout'))
const Chat = lazy(() => import('./Mojo-Platform/Pages/Chat'))
const Group = lazy(() => import('./Mojo-Platform/Pages/Group'))

import './App.css'


function App() {

	const [theme, setTheme] = useState('light')

	const lightMode = () => {
		setTheme('light')
	}
	const darkMode = () => {
		setTheme('dark')
	}

	const handleThemeChange = (newTheme) => {
		setTheme(newTheme);
		document.querySelector('html').classList.remove('light', 'dark');
		document.querySelector('html').classList.add(newTheme);
	  };


	useEffect(() => {
		document.querySelector('html').classList.remove('light', 'dark')
		document.querySelector('html').classList.add(theme)
	}, [theme])


	// USERPROVIDER
	const { userData, setUserData } = useContext(UserContext)


	const [isBrowserRouterReady, setIsBrowserRouterReady] = useState(false);
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
		  setIsBrowserRouterReady(true);
		}, 2900); // Set delay to 3 seconds
	
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			<ThemeProvider value={{ theme, darkMode: handleThemeChange, lightMode: handleThemeChange }}>
				<AnimatePresence mode='wait'> {/* Ensure smooth transitions */}
					{isBrowserRouterReady ? (
							<motion.div
								key="router"
								initial={{ opacity: 0 }} // Initial opacity: 0 (hidden)
								animate={{ opacity: 1 }} // Animate to opacity: 1 (visible)
								transition={{ duration: 0.7, ease: 'easeInOut' }} // Transition for 0.5s with easeInOut easing
								>
								<BrowserRouter>
									<Suspense fallback={<div>Loading...</div>}>
										<Routes>
											<Route path="/" element={<Layout />}>
												<Route path="" element={<Home />} />
												<Route path="/login" element={<Authorization type='login' />} />
												<Route path="/signup" element={<Authorization type='signup' />} /> 
											</Route>

											<Route path="/feed" element={<FeedLayout />}>
												<Route path="" element={<Feed />} />
											</Route>

											<Route path="/search" element={<FeedLayout />}>
												<Route path="" element={<Search />} />
											</Route>

											<Route path="/post" element={<FeedLayout />}>
												<Route path="" element={<CreatePost />} />
											</Route>

											<Route path="/mojo" element={<MojoLayout />}>
												<Route path="" element={<MojoHome />} />
												<Route path="/mojo/chat" element={<Chat />} />
												<Route path="/mojo/group" element={<Group />} />
											</Route>
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
