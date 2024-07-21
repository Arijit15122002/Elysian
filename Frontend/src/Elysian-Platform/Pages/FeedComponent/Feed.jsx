import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Feed () {

	const [posts, setPosts] = useState([])

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/posts`)
			setPosts(response.data)
		}

		fetchPosts()
	}, [])

	return (
	<div className='w-full h-[-webkit-fill-available]'>
		
	</div>
	)
}

export default Feed