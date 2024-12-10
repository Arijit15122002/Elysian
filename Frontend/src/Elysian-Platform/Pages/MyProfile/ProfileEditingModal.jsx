import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userExists } from '../../../redux/reducers/auth.reducer'
import axios from 'axios'
import ScaleLoader from "react-spinners/ScaleLoader";

import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import imageCompression from 'browser-image-compression';

import setCanvasPreview from '../../Components/ImageSelector/SetCanvasPreview';
import { interests } from '../../../constants/Constant';

function ProfileEditingModal ({setProfileEditingOpen}) {

    const user = useSelector(state => state.auth.user)
    const deviceType = useSelector(state => state.device.deviceType)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setProfileEditingOpen(false);
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setProfileEditingOpen]);

    const [ username, setUsername ] = useState(user.username)
    const [ profilePic, setProfilePic ] = useState('')
    const [ coverPic, setCoverPic ] = useState(user.coverPic)



    //Handling Username Change
    const [ available, setAvailable ] = useState('')

    const fetchUsername = async (username) => {
        if( username != user.username ) {
            const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/username/${username}`, { currentUserName : user.username })

            if( response?.data?.available ) {
                setAvailable("Available")
            } else if( response?.data?.phase === "same" ) {
                setAvailable("")
            } else {
                setAvailable("Not Available")
            }
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

    const debounceFetchUsername = useCallback(debounce(fetchUsername, 500), []);

    useEffect(() => {
        if( username.length < 3 ) {
            setAvailable('')
        }

        if( username === user.username ) {
            setAvailable('')
        }
    })

    useEffect(() => {
        if( username.length >= 3 ) {
            debounceFetchUsername(username)
        }
    }, [username, debounceFetchUsername])



    //Handling The Profile Picture Change
    const imageRef = useRef(null)
    const canvasRef = useRef(null)
	const fileInputRef = useRef(null)

    const ASPECT_RATIO = 1
    const MIN_WIDTH = 150

    const [imagesrc, setImagesrc] = useState('')
    const [imageCropper, setImageCropper] = useState(false)
    const [ crop, setCrop ] = useState()
    const [ imageFinalizer, setImageFinalizer ] = useState(false)
    const [ croppedImageURL, setCroppedImageURL ] = useState('')

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const onSelectFile = (e) => {
        const file = e.target.files?.[0]
        if( !file ) return

        const reader = new FileReader()
        reader.addEventListener('load', (event) => {
            const imageElement = new Image()
            const imageurl = reader.result?.toString() || ''
            imageElement.src = imageurl

            imageElement.addEventListener('load', () => {
                const { naturalWidth, naturalHeight } = event.currentTarget

                if( naturalWidth < MIN_WIDTH || naturalHeight < MIN_WIDTH ) {
                    toast.error('Image must be at least 25x25px')
                    return setImagesrc('')
                }
            })

            setImagesrc(imageurl)
            setImageCropper(!imageCropper)
        })
        reader.readAsDataURL(file)
    }

    const onImageLoad = (e) => {
		
		const { width, height } = e.currentTarget
        const cropWidthPercent = (MIN_WIDTH / width) * 100

        const crop = makeAspectCrop({
                unit: '%',
                width: cropWidthPercent,
            }, 
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)

	}

    const handleSave = () => {

		setProfilePic(croppedImageURL);
		setCrop('')
		setCroppedImageURL('')
		setImagesrc('')
		setImageCropper(false)
		setImageFinalizer(false)

	}



    // Handling the Cover Picture
    const coverPicInputRef = useRef(null)
    
    const handleCoverPicInput = () => {
        coverPicInputRef.current.click()
    }

    const handleCoverPicChange = async (e) => {
        const file = e.target.files[0]; // Get the selected file
    
        if (file) {
            try {
                // Compression options
                const options = {
                    maxSizeMB: 0.5, // Desired max file size in MB
                    maxWidthOrHeight: 1500, // Max width or height of the image
                    useWebWorker: true, // Use a web worker for performance
                };
    
                // Compress the image
                const compressedFile = await imageCompression(file, options);
    
                // Convert compressed image to base64
                const reader = new FileReader();
                reader.onload = () => {
                    setCoverPic(reader.result); // Set the compressed base64 image to state
                };
                reader.readAsDataURL(compressedFile);
    
            } catch (error) {
                console.error('Error compressing the image:', error);
            }
        }
    };


    //Handling DOB
    const [dobAlert, setDobAlert] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const validateDOB = (input) => {
        // Regular expression for DD/MM/YYYY
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!dateRegex.test(input)) {
            setDobAlert("Please use DD/MM/YYYY format!");
            return false;
        }

        // Split the input and validate the date parts
        const [day, month, year] = input.split("/").map(Number);
        const enteredDate = new Date(year, month - 1, day);

        // Check if the date is realistic
        if (
            enteredDate.getFullYear() !== year ||
            enteredDate.getMonth() !== month - 1 ||
            enteredDate.getDate() !== day
        ) {
            setDobAlert("The date is not correct!");
            return false;
        }

        // Additional validation (e.g., age limit)
        const today = new Date();
        const ageLimit = 13;
        const age = today.getFullYear() - year;
        if (age < ageLimit || (age === ageLimit && today < enteredDate)) {
            setDobAlert("You must be at least 13 years old!");
            return false;
        }

        setDobAlert(null);
        return true;
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setDob(value);

        if (typingTimeout) clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            if (value) validateDOB(value);
        }, 1000);

        setTypingTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [typingTimeout]);


    // Handling the BIO
    const [description, setDescription] = useState(user.bio.description)
    const [dob, setDob] = useState(user.bio.dob)
    const [location, setLocation] = useState(user.bio.location)
    const [offices, setOffices] = useState(user.bio.work.offices)
    const [schools, setSchools] = useState(user.bio.education.schools) 
    const [colleges, setColleges] = useState(user.bio.education.colleges)
    const [userInterests, setUserInterests] = useState(user.bio.interests || [])


    //Handling Offices
    const [ newOffice, setNewOffice ] = useState(false)
    const [ newOfficeName, setNewOfficeName ] = useState("")
    const [ newOfficeDesignation, setNewOfficeDesignation ] = useState("")

    
    //Handling Schools
    const [ newSchool, setNewSchool ] = useState(false)
    const [ newSchoolName, setNewSchoolName ] = useState("")


    //Handling Colleges
    const [ newCollege, setNewCollege ] = useState(false)
    const [ newCollegeName, setNewCollegeName ] = useState("")
    const [ newCollegeDegree, setNewCollegeDegree ] = useState("")


    // Handling Interests
    const [ totalInterests, setTotalInterests ] = useState(interests)
    const [ tempInterests, setTempInterests ] = useState(interests)



    //Handling the Submit Button
    const [ loading, setLoading ] = useState(false)

    const formData = {
        userId : user._id,
        username,
        profilePic,
        coverPic,
        description,
        dob,
        location,
        offices,
        schools,
        colleges,
        userInterests
    }

    const handleSubmit = async () => {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/update/profile`, formData)

        if( response?.data?.user ) {
            dispatch(userExists(response.data.user))
            setLoading(false)
            setProfileEditingOpen(false)
            setProfilePic('')
        }
    }

    
    return (
    <>
    {
        deviceType === 'mobile' ?
        <>

        </> : <>
            <div 
                className='w-[85%] max-w-[500px] h-[90%] rounded-2xl bg-white relative flex flex-col items-center overflow-hidden'
                onClick={e => e.stopPropagation()}
            >

                {/* Loading */}
                <div className={`${loading ? 'flex' : 'hidden'} w-full h-full absolute left-0 top-0 bg-white flex-row gap-2 items-center justify-center z-50`}>
                    <div className='text-[#232323] kanit text-[0.9rem]'>Updating</div>
                    <ScaleLoader 
                        color='#232323'
                        loading={loading}
                        size={40}
                    />
                </div>

                {/* Headers */}
                <div className='w-full h-auto bg-white sticky top-0'>
                    <div className='w-full px-8 py-3 kanit text-[#bbbbbb] text-[1.3rem] '>
                        Edit Your Profile
                    </div>
                    <div className='absolute bg-[#444444] m-2 top-1 right-1 rounded-full cursor-pointer' 
                        onClick={() => {
                            setProfileEditingOpen(false)
                            setUsername(user.username)
                            setProfilePic('')
                            setCoverPic(user.coverPic)
                            setDescription(user.bio.description)
                            setDob(user.bio.dob)
                            setLocation(user.bio.location)
                            setOffices(user.bio.work.offices)
                            setSchools(user.bio.education.schools)
                            setColleges(user.bio.education.colleges)
                            setUserInterests(user.bio.interests)
                        }}
                    >
                        <svg height="30" width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M12 12L16 16M8 8L10 10" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                </div>

                
                {/* Editing section Starts here */}


                <div className='w-[90%] max-w-[400px] h-auto overflow-y-auto bg-white' id='scrollHome'>
                    {/* Edit Profile Picture */}

                    {
                        !profilePic && <>
                            <div className='w-full h-[70px] bg-[#f2f2f2] rounded-2xl my-4 flex flex-row items-center justify-between'>
                                <div className='flex flex-row'>
                                    <div className='w-[50px] h-[50px] mx-4'>
                                        <img src={user.profilePic} alt="" className='w-full h-full rounded-full'/>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='kanit text-[1.1rem] text-[#232323]'>{user.username}</div>
                                        <div className='text-[0.8rem] radio text-[#888888]'>{user.fullname}</div>
                                    </div>
                                </div>
                                <div className='px-3 py-2 mx-2 text-[0.8rem] radio text-white bg-blue-500 rounded-lg cursor-pointer hover:opacity-80 duration-200 ease-in-out relative'
                                    onClick={handleClick}
                                >
                                    Edit Profile Picture
                                    <input 
                                        ref={fileInputRef}
                                        type="file" 
                                        accept="image/*"
                                        className='w-full h-full absolute rounded-3xl overflow-hidden opacity-0 focus:outline-none cursor-pointer hidden'
                                        onChange={onSelectFile}
                                    />
                                </div>
                            </div>
                        </>
                    }
                    
                    {
                        profilePic && <>
                            <div className='w-full h-auto bg-[#f2f2f2] rounded-2xl my-4 flex flex-col '>
                                <div className='w-[200px] h-[200px] mx-auto my-4 ring-4 ring-blue-500 rounded-full overflow-hidden'>
                                    <img src={profilePic} alt="" className='w-full h-full rounded-full'/>
                                </div>
                                <div className="flex flex-col mx-auto">
                                    <div className='kanit text-[1.1rem] text-[#232323] text-center'>{user.username}</div>
                                    <div className='text-[0.8rem] radio text-[#888888] text-center'>{user.fullname}</div>
                                </div>
                                <div className='w-full flex justify-end px-4 py-3'>
                                    <div 
                                        className='bg-[#232323] px-4 py-1.5 text-white rounded-xl cursor-pointer kanit text-[0.9rem]'
                                        style={{
                                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
                                        }}
                                        onClick={() => setProfilePic('')}
                                        >
                                            Remove
                                        </div>
                                </div>
                            </div>
                        </>
                    }
                    

                    {/* Edit Cover Picture */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mt-2'>Edit Your Cover Picture</div>
                        <div className={`${ coverPic ? 'h-[230px]' : 'h-[180px]' } w-full bg-[#f2f2f2] rounded-2xl my-2 flex flex-col items-end p-1`}>
                        {
                            coverPic ? <>
                            <div className='w-full h-[180px] relative'>
                                <img src={coverPic} alt="" className='w-full h-full rounded-xl object-cover object-center'/>
                            </div>
                            <div 
                                className='w-full flex flex-row gap-4 justify-end rounded-xl text-white cursor-pointer my-1 mx-1 kanit text-[0.9rem]'   
                            >
                                <div 
                                    className='bg-blue-600 px-6 pt-1.5 pb-[7px] rounded-xl relative'
                                    onClick={handleCoverPicInput}
                                >
                                    Edit
                                    <input 
                                        ref={coverPicInputRef}
                                        type="file" 
                                        accept='image/*'
                                        className='absolute hidden'
                                        onChange={handleCoverPicChange}
                                    />
                                </div>

                                <div className='bg-black px-4 pt-1.5 pb-[7px] rounded-xl'
                                    onClick={() => setCoverPic('')}
                                >
                                    Remove
                                </div>
                            </div>
                            </> :
                            <>
                            <div className='w-full h-full bg-white rounded-xl flex items-center justify-center relative'>
                                <img src="/Profile/addCoverPic.png" alt="" className='w-[50px] '/>
                                <div 
                                    className='flex flex-row gap-1 px-3 py-1 items-center absolute right-2 bottom-2 bg-[#f2f2f2] hover:bg-white rounded-lg cursor-pointer border-[2px] border-white hover:border-[#cccccc] duration-300 ease-in-out'
                                    onClick={handleCoverPicInput}
                                >
                                    <svg viewBox="0 0 24 24" height="20" widht="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z" fill="#777777"></path> </g></svg>
                                    <div className='text-[0.8rem] radio text-[#555555]'>
                                    {
                                        user?.coverPic === "" ? 
                                        <>Add Cover Picture</> : <> Edit Cover Picture</>
                                    }
                                    </div>
                                    <input 
                                        ref={coverPicInputRef}
                                        type="file" 
                                        className='hidden absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                        accept='image/*'
                                        onChange={handleCoverPicChange}
                                    />
                                </div>
                            </div>
                            </> 
                        }
                        </div>
                    </>


                    {/* Edit username */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mt-4 mb-2'>Edit Your Username</div>
                        <input 
                            type="text" 
                            className='w-full text-[#555555] kanit text-[0.9rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                            value={username}
                            placeholder="Username"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </>
                    <div className='w-full h-[18px] flex items-center mb-6'>
                    {
                        available === '' ? <></> : 
                        available === 'Available' ?
                        <div className='flex flex-row items-center'>
                            <svg height="22" width="22" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#15ac3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <div className=' text-[0.8rem] radio text-[#15ac3b]'>
                                This username is available    
                            </div>
                        </div> : 
                        <div className='flex flex-row items-center'>
                            <svg height="22" width="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#d80e0e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <div className='text-[0.8rem] radio text-[#d80e0e]'>
                                This username is not available
                            </div>
                        </div>
                    }
                    </div>



                    {/* Editing BIO */}

                    {/* Editing Description */}
                    <>
                        <div className='w-full text-[#777777] kanit text-[1.1rem] px-2 mb-4 flex justify-end'>Edit Your Bio - </div>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Edit your description</div>
                        <input 
                            type="text" 
                            placeholder='Description'
                            value={description}
                            className='w-full text-[#555555] kanit text-[0.9rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2 mb-8'
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </>

                    {/* Editing Date of Birth */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Edit your Date of Birth</div>
                        <input 
                            type="text" 
                            placeholder='DD/MM/YYYY'
                            value={dob}
                            className='w-full text-[#555555] kanit text-[0.9rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2 mb-1'
                            onChange={handleInputChange}
                        />
                        <div className='w-full kanit text-[0.7rem] px-2 h-[17px] mb-4'>
                            <div className={`${dobAlert ? 'flex' : 'hidden' } inline-block rounded-lg text-red-600 `}>
                                {dobAlert}
                            </div>
                        </div>
                    </>

                    {/* Editing Home Location */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Your Home</div>
                        <input 
                            type="text" 
                            placeholder='Home'
                            value={location}
                            className='w-full text-[#555555] kanit text-[0.9rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2 mb-8'
                            onChange={(e) => {
                                setLocation(e.target.value)
                            }}
                        />
                    </>

                    {/* Editing Job Description */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Your Job Description</div>
                        {
                            offices.map((office, index) => <>
                                <div className='flex flex-col px-5 py-2.5 gap-2 bg-[#eeeeee] rounded-xl mb-4 relative'>
                                    <div className='w-[90%] flex flex-row items-center gap-2 text-[0.85rem]'>
                                        <div className='kanit text-[#777777]'>Organisation: </div>
                                        <div className='kanit text-[#232323]'>{office.name}</div>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2 text-[0.85rem]'>
                                        <div className='kanit text-[#777777]'>Designation: </div>
                                        <div className='kanit text-[#232323]'>{office.designation}</div>
                                    </div>
                                    <div 
                                        className='absolute top-1.5 right-1.5 h-[22px] w-[22px] rounded-lg bg-[#aaaaaa] hover:bg-[#232323] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-black/50 duration-300 ease-in-out'
                                        onClick={() => {    
                                            setNewOfficeName(office.name)
                                            setNewOfficeDesignation(office.designation)
                                            setOffices(offices => offices.filter((_, i) => i !== index))
                                            setNewOffice(true)
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" height="13" width="13" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z" fill="#ffffff"></path> <path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z" fill="#ffffff"></path> </g></svg>
                                    </div>
                                </div>
                            </>)
                        }

                        {
                            newOffice ?
                            <div className='flex flex-col gap-2 my-6'>
                                <div className='w-full h-auto flex flex-row gap-2 items-center'>
                                    <div className='text-[#555555] kanit text-[0.85rem] px-2'>Organisation: </div>
                                    <input 
                                        type="text" 
                                        placeholder='Organisation'
                                        value={newOfficeName}
                                        className='w-full text-[#555555] kanit text-[0.85rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                                        onChange={(e) => {
                                            setNewOfficeName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='w-full h-auto flex flex-row gap-2 items-center'>
                                    <div className='text-[#555555] kanit text-[0.85rem] px-2'>Designation: </div>
                                    <input 
                                        type="text" 
                                        placeholder='Designation'
                                        value={newOfficeDesignation}
                                        className='w-full text-[#555555] kanit text-[0.85rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                                        onChange={(e) => {
                                            setNewOfficeDesignation(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='w-full h-auto flex flex-row items-center justify-end gap-4'>
                                    <div 
                                        className={`${ newOfficeName.length > 2 && newOfficeDesignation.length > 2 ? 'bg-blue-600 text-white shadow-md shadow-black/30' : 'bg-[#dedede] text-[#999999]'  } text-[0.8rem] kanit px-6 py-1.5 rounded-lg cursor-pointer`}
                                        onClick={() => {
                                            if( newOfficeName && newOfficeDesignation ) {
                                                setOffices(offices => [...offices, {name: newOfficeName, designation: newOfficeDesignation}])
                                                setNewOfficeName('')
                                                setNewOfficeDesignation('')
                                                setNewOffice(false)
                                            }
                                        }}
                                    >
                                        Add
                                    </div>
                                    <div 
                                        className='text-[0.8rem] kanit text-white bg-[#232323] px-4 py-1.5 rounded-lg cursor-pointer shadow-md shadow-black/30'
                                        onClick={() => {
                                            setNewOfficeName('')
                                            setNewOfficeDesignation('')
                                            setNewOffice(false)
                                        }}
                                    >
                                        Remove
                                    </div>
                                </div>
                            </div> : <></>
                        }

                        <div className='flex flex-row items-center justify-end mb-6'>
                            <div 
                                className='bg-[#f5f5f5] hover:bg-[#eaeaea] px-3 py-1.5 flex flex-row items-center gap-2 rounded-lg duration-200 ease-in-out cursor-pointer'
                                onClick={() => {
                                    setNewOffice(true)
                                }}
                            >
                                <svg className='mt-[1px]' viewBox="0 0 24 24" height="22" width="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className='text-[0.9rem] kanit text-[#555555]'>
                                    {
                                        offices.length === 0 ?
                                        <>Add Your First Job Description</> : 
                                        <>Add Your Next Job Description</>
                                    }
                                </div>
                            </div>
                        </div>
                    </>

                    {/* Editing Educational Qualifications Details */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Your Educational Details</div>

                        {/* School Details */}
                        <div className='w-full text-[#888888] kanit text-[0.9rem] px-2 mb-2'>School Details:</div>

                        {
                            schools.map((school, index) => <>
                                <div className='flex flex-col px-5 py-2.5 gap-2 bg-[#eeeeee] rounded-xl mb-4 relative'>
                                    <div className='w-[90%] flex flex-row items-center gap-2 text-[0.85rem]'>
                                        <div className='kanit text-[#777777]'>School: </div>
                                        <div className='kanit text-[#232323]'>{school}</div>
                                    </div>
                                    <div 
                                        className='absolute top-1.5 right-1.5 h-[22px] w-[22px] rounded-lg bg-[#aaaaaa] hover:bg-[#232323] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-black/50 duration-300 ease-in-out'
                                        onClick={() => {    
                                            setNewSchoolName(school)
                                            setSchools(schools => schools.filter((_, i) => i !== index))
                                            setNewSchool(true)
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" height="13" width="13" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z" fill="#ffffff"></path> <path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z" fill="#ffffff"></path> </g></svg>
                                    </div>
                                </div>
                            </>)
                        }

                        {
                            newSchool && <>
                            <div className='flex flex-col gap-2 my-6'>
                                <div className='w-full h-auto flex flex-row gap-2 items-center'>
                                    <div className='text-[#555555] kanit text-[0.85rem] px-2'>School: </div>
                                    <input 
                                        type="text" 
                                        placeholder='School'
                                        value={newSchoolName}
                                        className='w-full text-[#555555] kanit text-[0.85rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                                        onChange={(e) => {
                                            setNewSchoolName(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className='w-full h-auto flex flex-row items-center justify-end gap-4'>
                                    <div 
                                        className={`${ newSchoolName.length > 2 ? 'bg-blue-600 text-white shadow-md shadow-black/30' : 'bg-[#dedede] text-[#999999]'  } text-[0.8rem] kanit px-6 py-1.5 rounded-lg cursor-pointer`}
                                        onClick={() => {
                                            if( newSchoolName ) {
                                                setSchools(schools => [...schools, newSchoolName])
                                                setNewSchoolName('')
                                                setNewSchool(false)
                                            }
                                        }}
                                    >
                                        Add
                                    </div>
                                    <div 
                                        className='text-[0.8rem] kanit text-white bg-[#232323] px-4 py-1.5 rounded-lg cursor-pointer shadow-md shadow-black/30'
                                        onClick={() => {
                                            setNewSchoolName('')
                                            setNewSchool(false)
                                        }}
                                    >
                                        Remove
                                    </div>
                                </div>
                            </div>
                            </>
                        }

                        <div className='w-full h-auto flex justify-end'>
                            <div 
                                className='bg-[#f5f5f5] hover:bg-[#eaeaea] px-3 py-1.5 flex flex-row items-center gap-2 rounded-lg duration-200 ease-in-out cursor-pointer mb-6'
                                onClick={() => {
                                    setNewSchool(true)
                                }}
                            >
                            <svg className='mt-[1px]' viewBox="0 0 24 24" height="22" width="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className='text-[0.9rem] kanit text-[#555555]'>Add School Details</div>
                            </div>
                        </div>

                        {/* College Details */}
                        <div className='w-full text-[#888888] kanit text-[0.9rem] px-2 mb-2'>College Details:</div>

                        {
                            colleges.map((college, index) => <>
                                <div className='flex flex-col px-5 py-2.5 gap-2 bg-[#eeeeee] rounded-xl mb-4 relative'>
                                    <div className='w-[90%] flex flex-row items-center gap-2 text-[0.85rem]'>
                                        <div className='kanit text-[#777777]'>College: </div>
                                        <div className='kanit text-[#232323]'>{college.name}</div>
                                    </div>
                                    <div className='w-full flex flex-row items-center gap-2 text-[0.85rem]'>
                                        <div className='kanit text-[#777777]'>Specialization: </div>
                                        <div className='kanit text-[#232323]'>{college.degree}</div>
                                    </div>
                                    <div 
                                        className='absolute top-1.5 right-1.5 h-[22px] w-[22px] rounded-lg bg-[#aaaaaa] hover:bg-[#232323] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-black/50 duration-300 ease-in-out'
                                        onClick={() => {    
                                            setNewCollegeName(college.name)
                                            setNewCollegeDegree(college.degree)
                                            setColleges(colleges.filter((_, i) => i !== index))
                                            setNewCollege(true)
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" height="13" width="13" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z" fill="#ffffff"></path> <path d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z" fill="#ffffff"></path> </g></svg>
                                    </div>
                                </div>
                            </>)
                        }

                        {
                            newCollege && <>
                                <div className='flex flex-col gap-2 my-6'>
                                    <div className='w-full h-auto flex flex-row gap-2 items-center'>
                                        <div className='text-[#555555] kanit text-[0.85rem] px-2'>College: </div>
                                        <input 
                                            type="text" 
                                            placeholder='College'
                                            value={newCollegeName}
                                            className='w-full text-[#555555] kanit text-[0.85rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                                            onChange={(e) => {
                                                setNewCollegeName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full h-auto flex flex-row gap-2 items-center'>
                                        <div className='text-[#555555] kanit text-[0.85rem] px-2'>Specialisation: </div>
                                        <input 
                                            type="text" 
                                            placeholder='Specialisation'
                                            value={newCollegeDegree}
                                            className='w-full text-[#555555] kanit text-[0.85rem] px-2 bg-[#f4f4f4] rounded-lg border-2 outline-none py-2'
                                            onChange={(e) => {
                                                setNewCollegeDegree(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full h-auto flex flex-row items-center justify-end gap-4'>
                                    <div 
                                        className={`${ newCollegeName.length > 2 && newCollegeDegree.length > 2 ? 'bg-blue-600 text-white shadow-md shadow-black/30' : 'bg-[#dedede] text-[#999999]'  } text-[0.8rem] kanit px-6 py-1.5 rounded-lg cursor-pointer`}
                                        onClick={() => {
                                            if( newCollegeName.length > 2 && newCollegeDegree.length > 2 ) {
                                                setColleges(colleges => [...colleges, {name: newCollegeName, degree: newCollegeDegree}])
                                                setNewCollegeName('')
                                                setNewCollegeDegree('')
                                                setNewCollege(false)
                                            }
                                        }}
                                    >
                                        Add
                                    </div>
                                    <div 
                                        className='text-[0.8rem] kanit text-white bg-[#232323] px-4 py-1.5 rounded-lg cursor-pointer shadow-md shadow-black/30'
                                        onClick={() => {
                                            setNewCollegeName('')
                                            setNewCollegeDegree('')
                                            setNewCollege(false)
                                        }}
                                    >
                                        Remove
                                    </div>
                                </div>
                                </div>
                            </>
                        }

                        <div className='w-full h-auto flex justify-end'>
                            <div 
                                className='bg-[#f5f5f5] hover:bg-[#eaeaea] px-3 py-1.5 flex flex-row items-center gap-2 rounded-lg duration-200 ease-in-out cursor-pointer mb-6'
                                onClick={() => {
                                    setNewCollege(true)
                                }}
                            >
                            <svg className='mt-[1px]' viewBox="0 0 24 24" height="22" width="22" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                <div className='text-[0.9rem] kanit text-[#555555]'>Add College Details</div>
                            </div>
                        </div>
                    </>

                    {/* Editing Interests Section */}
                    <>
                        <div className='w-full text-[#555555] kanit text-[0.9rem] px-2 mb-2'>Your Interests</div>

                        <div className='w-full h-auto min-h-[50px] pl-4'>
                        {
                            userInterests.map((interest, index) => <>
                                <div 
                                    key={index} 
                                    className='inline-block pl-3 pr-6 relative py-1.5 bg-[#dedede] hover:bg-[#cccccc] items-center mr-2 mt-2 kanit text-[#777777] text-[0.8rem] rounded-lg duration-300 ease-in-out cursor-pointer'
                                    onClick={() => {
                                        setUserInterests(userInterests.filter((i) => i !== interest))
                                    }}
                                >
                                    <svg className='absolute right-1 top-[6.5px]' viewBox="0 -0.5 25 25" height="18" width="18" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#777777"></path> </g></svg>
                                    <span>{interest}</span>
                                </div>
                            </>)
                        }
                        </div>

                        <div className='w-full h-auto flex flex-col gap-3 mt-8'>
                        {
                            interests.map((interest, index) => (
                                <div key={index} className='w-full h-auto flex flex-col px-4'>
                                    <div className='text-[#777777] kanit text-[0.9rem]'>{interest.name}</div>
                                    <div className='w-full h-auto'>
                                        {
                                            interest.list.filter((subinterest) => !userInterests.includes(subinterest)).map((subinterest, subIndex) =>  (
                                                <span
                                                    key={subIndex}
                                                    className='inline-block pl-3 pr-6 relative py-1.5 bg-[#dedede] hover:bg-[#cccccc] items-center mr-2 mt-2 kanit text-[#777777] text-[0.8rem] rounded-lg duration-300 ease-in-out cursor-pointer'
                                                    onClick={() => {
                                                        // Add subinterest to userInterests
                                                        setUserInterests([...userInterests, subinterest]);
                                                    }}
                                                >
                                                    <span>{subinterest}</span>
                                                    <svg className='absolute right-1 top-[6.5px]' viewBox="0 0 24 24" height="18" width="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 12H18M12 6V18" stroke="#777777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </>
                </div>

                {/* Setting Up Profile Picture Crop and Edit */}
                <div className={`${ imagesrc ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0' } duration-500 ease-in-out fixed top-0 left-0 h-full w-full bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50`}>
			
                    <div className='bg-black/70 w-full max-w-[540px] h-[95%] rounded-2xl flex items-center justify-center relative'>

                        <div 
                            className='absolute p-1.5 top-2 right-2 bg-red-200 rounded-full cursor-pointer z-20'
                            onClick={() => {
                                setImageCropper(false)
                                setImageFinalizer(false)
                                setImagesrc(null)
                                setCroppedImageURL(null)
                                setCrop(null)
                                setImagesrc(null)
                            }}
                        >
                            <svg className='w-[22px] h-[22px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d90d0d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke="#f00a0a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>

                        <div className={`${imageCropper ? ' scale-100 blur-none opacity-100 translate-x-0 ' : ' scale-0 blur-3xl opacity-0 translate-x-[-100%]'} duration-500 ease-in-out w-full h-full flex flex-col items-center justify-center items fixed`}>

                            <ReactCrop
                                className='max-w-[450px] max-h-[450px] rounded-xl'
                                crop={crop}
                                keepSelection
                                aspect={ASPECT_RATIO}
                                minWidth={MIN_WIDTH}
                                onChange={((
                                    pixelCrop,
                                    percentCrop
                                ) => setCrop(percentCrop))}
                            >
                                <img src={imagesrc} alt="" 
                                    className='w-full h-full rounded-xl overflow-hidden'
                                    onLoad={onImageLoad}
                                    ref={imageRef}
                                />
                            </ReactCrop>

                            <button 
                            className='bg-black text-white kanit px-6 py-2 rounded-xl mt-5 hover:scale-110 duration-300 ease-in-out' 
                            style={{
                                boxShadow: '0px 0px 20px #232323'
                            }}
                            onClick={() => {
                                setCanvasPreview(
                                    imageRef.current,
                                    canvasRef.current,
                                    convertToPixelCrop(
                                        crop,
                                        imageRef.current.width,
                                        imageRef.current.height
                                    )
                                )
                                setCroppedImageURL(canvasRef.current.toDataURL('image/jpeg', 0.2))
                                setImageCropper(!imageCropper)
                                setImageFinalizer(!imageFinalizer)
                            }}
                            >
                                CROP IMAGE
                            </button>

                        </div>

                        <div className={`${ imageFinalizer ? 'scale-100 opacity-100 blur-none translate-x-0' : 'scale-0 opacity-0 blur-3xl translate-x-[100%]' } duration-500 ease-in-out fixed`}>

                            <canvas
                            className=' rounded-xl overflow-hidden'
                                ref={canvasRef}
                                style={{
                                    objectFit: 'contain',
                                    width: 350,
                                    height: 350
                                }}
                            />

                            <div className='w-full flex flex-row items-center justify-between pt-6 px-10'>
                                <button 
                                className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
                                onClick={() => {
                                    setImageCropper(!imageCropper)
                                    setImageFinalizer(!imageFinalizer)
                                }}
                                >RESIZE</button>
                                <button 
                                className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
                                onClick={() => {
                                    handleSave()
                                }}
                                >SAVE</button>
                            </div>

                        </div>

                    </div>

                </div>

                <div className='w-full h-auto sticky bottom-0 left-0 flex items-center p-2 justify-end'>
                    <div 
                        className='px-7 py-2 rounded-xl text-white bg-blue-600 kanit text-[0.9rem] cursor-pointer hover:bg-blue-500 duration-300 ease-in-out' 
                        style={{
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
                        }}
                        onClick={() => {
                            handleSubmit()
                        }}
                    >SUBMIT</div>
                </div> 
            
            </div>
        </>
    }
    </>
    )
}

export default ProfileEditingModal