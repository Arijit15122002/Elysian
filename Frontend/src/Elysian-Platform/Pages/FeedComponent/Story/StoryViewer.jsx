import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios, { all } from 'axios'

import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import StoryView from './StoryView';
import SyncLoader from "react-spinners/SyncLoader";

import { setCurrentStoryContainer } from '../../../../redux/reducers/story.reducer';

function StoryViewer () {

	const user = useSelector(state => state.auth.user)
	const deviceType = useSelector(state => state.device.deviceType)
    const [ currentlyStoryContainer, setCurrentlyStoryContainer ] = useState(useSelector(state => state.currentStoryContainer.storyContainer));



    //Fetching single Story Contianer 
    const fetchSingleContainer = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/story/userStories/${id}`);
            return response.data.storyContainer;
        } catch (error) {
            console.error('Error fetching story container:', error);
            navigate('/feed');
        }
    };



    //Showing the Currently Clicked Story
    const { userId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAndSetStoryContainer = async () => {
            try {
                const storyContainer = await fetchSingleContainer(userId);
                if (storyContainer) {
                    dispatch(setCurrentStoryContainer(storyContainer));
                    setCurrentlyStoryContainer(storyContainer);
                }
            } catch (error) {
                console.error('Error fetching and setting story container:', error);
            }
        };
    
        if (!currentlyStoryContainer) {
            fetchAndSetStoryContainer();
        }
    }, [currentlyStoryContainer, dispatch, userId]);


    
    //Fetching User's stories if currentStoryContainer.user._id !== user._id
    const [ usersStoriesContainer, setUsersStoriesContainer ] = useState(null)

    useEffect(() => {
        if (!user || !user._id) {
            console.error('User is undefined or missing _id');
            return;
        }
    
        if (currentlyStoryContainer?.user?._id !== user._id) {
            setUsersStoriesContainer(fetchSingleContainer(user._id))
        }
    }, [currentlyStoryContainer, user]);



	//Fetching all available stories of user's following
	const [ allStoryContainers, setAllStoryContainers ] = useState([])
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const fetchAllStoryContainers = async (page, reset = false) => {
		try {
			setLoading(true);
            console.log('now storyconatainers are being fetched');
			const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/story/allFollowingStories/${user._id}/all-stories?page=${page}&limit=4`) 
            console.log(response);
			const { followingStories, totalPages, currentPage, hasMore } = response.data

            const filteredAndSortedStories = followingStories
            .filter(storyContainer => storyContainer.user._id !== currentlyStoryContainer?.user?._id)
            .sort((a, b) => {
                const dateA = new Date(a.storyArray[a.storyArray.length - 1]?.updatedAt || a.updatedAt);
                const dateB = new Date(b.storyArray[b.storyArray.length - 1]?.updatedAt || b.updatedAt);
                return dateB - dateA;
            });
            setAllStoryContainers(prevStories =>
                reset ? filteredAndSortedStories : [...prevStories, ...filteredAndSortedStories]
            );
			setHasMore(hasMore);
			setPage(currentPage + 1);

		} catch (error) {
			console.error("Error fetching stories: ", error)
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
        if (!currentlyStoryContainer || !user._id) return;
        setAllStoryContainers([]);
        setPage(1);
        setHasMore(true);
        fetchAllStoryContainers(1, true);
    }, [currentlyStoryContainer, user._id]);

    const handleInfiniteScroll = useCallback(() => {
        const scrollElement = document.getElementById("scrollStories");
    
        if (!scrollElement) return;
    
        const scrollTop = scrollElement.scrollTop;
        const scrollHeight = scrollElement.scrollHeight;
        const clientHeight = scrollElement.clientHeight;
    
        if (scrollHeight - scrollTop <= clientHeight + 50 && !loading && hasMore) {
            fetchAllStoryContainers(page);
        }
    }, [loading, hasMore, page, fetchAllStoryContainers]);

    useEffect(() => {
        const scrollElement = document.getElementById("scrollStories");
        if (!scrollElement) return; // Check if the element exists
        scrollElement.addEventListener("scroll", handleInfiniteScroll);
        return () => scrollElement?.removeEventListener('scroll', handleInfiniteScroll);
    }, [loading, hasMore, handleInfiniteScroll]);


    //Handling Story Carousel
    const [ currentStoryContainerIndex, setCurrentStoryContainerIndex ] = useState(-1);


    //Handling User Stories Click
    const handleClickUserStories = () => {
        if( user._id === currentlyStoryContainer?.user?._id ) {
            setCurrentStoryContainerIndex(-1)
        } else {
            setCurrentStoryContainerIndex(-2)
        }
    }


    if (!currentlyStoryContainer) {
        return <div className='w-full h-full flex flex-row items-center justify-center'>
                <div className='kanit text-[#232323]'>Loading...</div>
                <SyncLoader 
                    color='#232323'
                    loading={loading}
                    size={50}
                />
            </div>;
      }


	return (
		<>
		{
			deviceType === 'mobile' ?
			<></> :
			<>
				<div className='w-full h-full flex flex-col items-center'>
					<div className='w-full h-full flex flex-row items-center'>

                        {/* Followers who have stories */}
                        <div className='w-[25%] h-[90%] flex flex-col items-center justify-between'>
                            <div className='kanit text-[#bababa] text-[1.4rem]'>
                                Stories
                            </div>
                            {/* User Profile */}
                            <div className='w-auto h-auto flex flex-row items-center justify-center gap-2 '>
                                <div className={`w-auto h-auto p-2 rounded-full bg-[#dedede] z-0`}>
                                    <div 
                                        className={`${user._id === currentlyStoryContainer?.user?._id ? currentStoryContainerIndex === -1 ? 'bg-white' : 'bg-[#efefef] hover:bg-[#efefef] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]' : currentStoryContainerIndex === -2 ? 'bg-white' : 'bg-[#efefef] hover:bg-[#efefef] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]'} w-[65px] lg:w-auto h-[65px] lg:h-[55px] flex flex-row items-center justify-center rounded-full cursor-pointer group z-20 duration-200 ease-in-out`}
                                        onClick={handleClickUserStories}    
                                    >
                                        <img
                                            src={user.profilePic}
                                            alt=""
                                            className='w-[50px] h-[50px] rounded-full object-cover object-center ring-2 ring-blue-600'
                                        />
                                        <div className='px-3 kanit text-[#555555] hidden lg:block'>
                                            {user.fullname}
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden lg:flex flex-row items-center justify-center w-[45px] h-[45px] rounded-2xl bg-[#fefefe] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] hover:bg-white cursor-pointer duration-200 ease-in-out'>
                                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#2563eb" stroke-width="1.3" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#2563eb" stroke-width="1.3" stroke-linecap="round"></path> </g></svg>
                                </div>
                            </div>

                            {/* Scrollable Container h-[calc(100%-132px)] */}
                            <div
                                className='w-[78px] lg:w-[250px] h-[calc(100%-132px)] flex-shrink-0 flex flex-col items-center lg:items-start overflow-y-auto rounded-full lg:rounded-[34px] p-[8px] relative bg-[#dedede]'
                                id='scrollStories'
                            >   
                                {
                                    currentlyStoryContainer && currentlyStoryContainer?.user?._id !== user._id ? 
                                    <>
                                        <div
                                            className={` ${currentStoryContainerIndex === -1 ? 'bg-white' : 'hover:bg-[#efefef] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]'} w-[65px] lg:w-auto h-[65px] lg:h-[55px] flex flex-row items-center justify-center lg:justify-normal flex-shrink-0 rounded-full mb-3 lg:ml-1 cursor-pointer group relative overflow-visible duration-200 ease-in-out`}
                                            onClick={() => {
                                                setCurrentStoryContainerIndex(-1);
                                            }}
                                        >
                                            <img
                                                src={currentlyStoryContainer?.user?.profilePic}
                                                alt={currentlyStoryContainer?.user?.fullname}
                                                className="w-[50px] h-[50px] rounded-full object-cover object-center ring-2 ring-blue-600"
                                            />
                                            <div className='px-3 kanit text-[#555555] hidden lg:flex'>
                                                {currentlyStoryContainer?.user?.fullname}
                                            </div>
                                        </div>
                                    </> : <></>
                                }

                                {
                                    allStoryContainers?.length === 0 && currentlyStoryContainer?.user?._id === user._id && !loading ?
                                    <>
                                        <div className='w-[65px] h-auto relative lg:hidden' >
                                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[70px] -rotate-90 w-[150px] bg-[#efefef] text-center py-1.5 rounded-2xl kani text-[#aaaaaa]'>
                                                No Stories Yet
                                            </div>
                                        </div>
                                        <div className='w-[200px] h-full hidden lg:flex items-center justify-center'>
                                            <div className='w-[150px] bg-[#efefef] text-center py-1.5 rounded-2xl kani text-[#aaaaaa]'>
                                                No Stories Yet
                                            </div>
                                        </div>
                                    </> : <></>
                                }
                                {
                                    allStoryContainers.map((story, index) => (
                                        <div
                                            key={story._id}
                                            className={`${currentStoryContainerIndex === index ? 'bg-white' : 'hover:bg-[#efefef] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.05)]'} w-[65px] lg:w-auto h-[65px] lg:h-[55px] lg:ml-1 flex flex-row items-center justify-center lg:justify-normal flex-shrink-0 rounded-full mb-3 cursor-pointer group relative overflow-visible duration-200 ease-in-out`}
                                            onClick={() => {
                                                setCurrentStoryContainerIndex(index);
                                            }}
                                        >
                                            <img
                                                src={story.user.profilePic}
                                                alt={story.user.fullname}
                                                className="w-[50px] h-[50px] rounded-full object-cover object-center ring-2 ring-blue-600"
                                            />
                                            <div className='px-3 kanit text-[#555555] hidden lg:flex'>
                                                {story.user.fullname}
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    loading && (
                                        <div className='w-full h-full flex flex-col justify-start items-center gap-2'>
                                            <div className='h-[65px] w-[65px] bg-[#cdcdcd] rounded-full animate-pulse' />
                                            <div className='h-[65px] w-[65px] bg-[#cdcdcd] rounded-full animate-pulse' />
                                            <div className='h-[65px] w-[65px] bg-[#cdcdcd] rounded-full animate-pulse' />
                                            <div className='h-[65px] w-[65px] bg-[#cdcdcd] rounded-full animate-pulse' />
                                            <div className='h-[65px] w-[65px] bg-[#cdcdcd] rounded-full animate-pulse' />
                                            <ClipLoader
                                                color='#555555'
                                                loading={loading}
                                                size={30}
                                                className='w-[65px] h-full flex items-center flex-shrink-0 justify-center rounded-full mb-2 cursor-pointer'
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>


                        {/* Story View */}
                        <div 
                            className='w-[75%] h-full flex flex-row items-center justify-center relative'
                        >
                            {
                                (( currentStoryContainerIndex === -2 ) && usersStoriesContainer ) ? 
                                <>
                                    <StoryView 
                                        page={page}
                                        hasMore={hasMore}
                                        totalStoryContainerLength={allStoryContainers.length}
                                        storyContainer={usersStoriesContainer}
                                        storyAuthor={user}
                                        currentStoryContainerIndex={currentStoryContainerIndex}
                                        setCurrentStoryContainerIndex={setCurrentStoryContainerIndex}
                                        fetchNextStories={fetchAllStoryContainers}
                                    />
                                </> : <></>
                            }
                            {
                                (currentStoryContainerIndex === -1) ?
                                <>
                                    <StoryView 
                                        page={page}
                                        hasMore={hasMore}
                                        totalStoryContainerLength={allStoryContainers.length}
                                        storyContainer={currentlyStoryContainer}
                                        storyAuthor={currentlyStoryContainer?.user}
                                        currentStoryContainerIndex={currentStoryContainerIndex}
                                        setCurrentStoryContainerIndex={setCurrentStoryContainerIndex}
                                        fetchNextStories={fetchAllStoryContainers}
                                    />
                                </> : <></>
                            }
                            {
                                (currentStoryContainerIndex >= 0 && currentStoryContainerIndex < allStoryContainers.length) ?
                                <>
                                    <StoryView 
                                        page={page}
                                        hasMore={hasMore}
                                        totalStoryContainerLength={allStoryContainers.length}
                                        storyContainer={allStoryContainers[currentStoryContainerIndex]}
                                        storyAuthor={allStoryContainers[currentStoryContainerIndex].user}
                                        currentStoryContainerIndex={currentStoryContainerIndex}
                                        setCurrentStoryContainerIndex={setCurrentStoryContainerIndex}
                                        fetchNextStories={fetchAllStoryContainers}
                                    />
                                </> : <></>
                            }
                            {/* Buttons for Changing Stories */}
                            <div className='hidden absolute w-full h-full flex-row items-center justify-center'>
                                <div className='w-full h-[95%] flex flex-col gap-4 items-center justify-center'>
                                    <div className='w-[80%] max-w-[300px] aspect-[9/16] flex flex-row items-center justify-center rounded-3xl relative'>
                                        <div className='absolute w-[120%] flex items-center justify-between sm:w-[140%] md:w-[160%] h-[60px]'>

                                            {/* Left Button */}
                                            <div className=' w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out bg-black/50 rounded-2xl'>
                                                <svg height="26px" width="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="#efefef"></path> </g></svg>
                                            </div>

                                            {/* Right Button */}
                                            <div className=' w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out bg-black/50 rounded-2xl'>
                                                <svg height="26px" width="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="#efefef"></path> </g></svg>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='w-[95%] max-w-[400px] h-[50px] flex flex-row items-center px-3 rounded-2xl'>
                                        
                                    </div>
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

export default StoryViewer