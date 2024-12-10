import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import ScaleLoader from "react-spinners/ScaleLoader";

import setCanvasPreview from '../../../Components/ImageSelector/SetCanvasPreview';
import { userExists } from '../../../../redux/reducers/auth.reducer';



function ImageStory ({imagesrc, setImagesrc, imageCropper, setImageCropper, MIN_WIDTH, story, setStory}) {

    const deviceType = useSelector(state => state.device.deviceType)
    const user = useSelector(state => state.auth.user)

    //Common and Media story variables
	const [image, setImage] = useState('')
	const [video, setVideo] = useState('')
    const [caption, setCaption] = useState('')

	const imageRef = useRef(null)
    const canvasRef = useRef(null)

	const ASPECT_RATIO = 9/16

    const [ crop, setCrop ] = useState()
    const [ imageFinalizer, setImageFinalizer ] = useState(false)
    const [ croppedImageURL, setCroppedImageURL ] = useState('')
	const [ captionScreen, setCaptionScreen ] = useState(false)
	const [ loading, setLoading ] = useState(false)

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


    //Sharing the story 
    const dispatch = useDispatch()
    const handleShareStory = async () => {

        setStory({...story, caption: caption})

		setLoading(true)
        setImageCropper(false)
		setImageFinalizer(false)
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/story/post`, story)
		console.log(response);
		if( response?.data?.success ) {
            dispatch(userExists(response?.data?.user))
			setLoading(false)
			setCrop('')
            setImagesrc('')
			setCroppedImageURL('')
			setCaptionScreen(false)
			setStory({
				...story,
                type: '',
                image: '',
                caption: '',
			})
		}
	}

    return (
        <>
        {
            deviceType === 'mobile' ?
            <></> :
            <>
                <div className={`w-full h-full bg-black/50 backdrop-blur-sm flex flex-row items-center justify-center overflow-hidden gap-20 z-50`}>
                    <div className='bg-black/70 w-full max-w-[750px] h-[95%] rounded-2xl flex flex-col items-center justify-center relative'>
                        <div className={`${loading ? 'scale-100 opacity-100 blur-0' : 'scale-0 opacity-0 blur-md'} w-full h-full duration-200 absolute left-0 top-0 flex flex-row items-center justify-center`}>
                            <ScaleLoader 
                                color='#ffffff'
                                loading={loading}
                                size={40}
                            />
                        </div>
                        <div 
                            className='absolute p-1.5 top-2 right-2 bg-[#fefefe] rounded-full cursor-pointer z-20'
                            onClick={() => {
                                setImageCropper(false)
                                setImageFinalizer(false)
                                setImagesrc('')
                                setCroppedImageURL('')
                                setCrop('')
                                setCaptionScreen(false)
                                setStory({
                                    ...story,
                                    type: '',
                                    image: '',
                                    caption: '',
                                })
                            }}
                        >
                            <svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5.00001 5L19 19" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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

                        <div className={`${ imageFinalizer ? 'scale-100 opacity-100 blur-none translate-x-0' : 'scale-0 opacity-0 blur-3xl translate-x-[100%]' } duration-500 ease-in-out fixed w-full max-w-[750px] flex flex-col items-center justify-center`}>

                            <canvas
                            className='rounded-xl overflow-hidden'
                                ref={canvasRef}
                                style={{
                                    objectFit: 'contain',
                                    height: 500,
                                }}
                            />
                            <div className='w-full h-[70px] flex flex-row items-center justify-center mt-4'>
                                <div className={`${captionScreen ? 'opacity-0 h-0 w-0 blur-3xl' : 'opacity-100 w-[calc(500px*9/16)] h-full px-10 duration-500 blur-none'} ease-in-out flex flex-row items-center justify-between`}>
                                    <button 
                                    className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
                                    onClick={() => {
                                        setImageCropper(!imageCropper)
                                        setImageFinalizer(!imageFinalizer)
                                    }}
                                    >
                                        RESIZE
                                    </button>
                                    <button 
                                    className='px-4 py-2 rounded-xl font-semibold text-white bg-black'
                                    onClick={() => {
                                        setCaptionScreen(true)
                                        setStory({...story, image: croppedImageURL})
                                    }}
                                    >
                                        SAVE
                                    </button>
                                </div>

                                <div className={`${captionScreen ? 'opacity-100 w-full h-full duration-300 gap-8' : 'opacity-0 w-0 h-0 duration-200'} ease-in-out flex flex-row items-end justify-center`}>

                                    <div className={`${captionScreen ? 'w-[20%] flex flex-row justify-end opacity-100 translate-x-0 duration-500' : 'w-0 h-0 opacity-0 translate-x-[-100%]'}ease-in-out`}>
                                        <div 
                                            className='text-[1rem] w-[100px] bg-black py-1.5 text-center rounded-xl quicksand font-semibold text-white cursor-pointer hover:scale-105 duration-300 ease-in-out'
                                            onClick={() => {
                                                setCaptionScreen(false)
                                                setStory({...story, text: '', image: ''})
                                            }}
                                        >
                                            Back
                                        </div>
                                    </div>

                                    <textarea
                                    value={caption}
                                        onChange={(e) => {
                                            setCaption(e.target.value)
                                        }}
                                        placeholder="Caption..."
                                        className={`${captionScreen ? 'w-[calc(500px*9/15.5)] min-h-[40px] px-6 py-2 duration-200 opacity-100 blur-none' : 'w-0 h-0 duration-500 opacity-0 blur-2xl' } ease-in-out rounded-xl resize-none text-base leading-6 box-border overflow-hidden break-words bg-black/50 focus:outline-none text-[#efefef] quicksand font-semibold text-[0.8rem]`}
                                    >
                                    </textarea>

                                    <div className={`${captionScreen ? 'w-[20%] opacity-100 translate-x-0 duration-500' : 'w-0 h-0 opacity-0 translate-x-[100%]'} ease-in-out`}>
                                        <div 
                                            className='text-[1rem] w-[100px] bg-blue-600 py-1.5 text-center rounded-xl quicksand font-semibold text-white cursor-pointer hover:scale-105 duration-300 ease-in-out'
                                            onClick={() => {
                                                handleShareStory()
                                            }}
                                        >
                                            Share 
                                        </div>
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

export default ImageStory