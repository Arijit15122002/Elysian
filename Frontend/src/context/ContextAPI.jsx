import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

import { verifyToken } from '../Elysian-Platform/utils/verifyToken'



export const ThemeContext = createContext({
    theme: 'light',
    darkMode: () => {},
    lightMode: () => {}
})

export const ThemeProvider = ThemeContext.Provider

export function useTheme() {
    return useContext(ThemeContext)
}




export const UserContext = createContext({
    userObject: null, // Object containing user data
    loggedIn: false,
    setUserData: () => {}, // Function to update user data
});

export const UserProvider = ({ children, initialUserData }) => {

    const [userData, setUserData] = useState(initialUserData || {
		user: {},
		loggedIn: false,
		token: null
    });

    useEffect(() => {

		const token = localStorage.getItem('token');

		if( token ) {
			const decodedToken = verifyToken(token);
			const userId = decodedToken.userId;

			async function fetchUser() {
				try {
					const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile/${userId}`);
					setUserData({
						...userData,
						user : response.data.user,
						loggedIn: true,
					})

				} catch (error) {
					console.log(error);
				}
			}
			fetchUser()
		}

    }, [])
  
    return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
    );
  };