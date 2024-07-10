import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async'
import { UserProvider } from './context/ContextAPI'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			<UserProvider initialUserData={{ user: {}, loggedIn: false }}>
				<App />
			</UserProvider>
		</HelmetProvider>
	</React.StrictMode>,
)
