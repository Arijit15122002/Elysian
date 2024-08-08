import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'

import setCanvasPreview from './SetCanvasPreview';

function MobileImageSelector ({photoSelector, setPhotoSelector, setTotalImages}) {

    const [ imagesrc, setImagesrc ] = useState('')
    const [ crop, setCrop ] = useState()
    const ASPECT_RATIO = 1
    const MIN_WIDTH = 150

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

                if( naturalWidth < MIN_WIDTH || naturalHeight < MIN_WIDTH) {
                    toast.error('Image must be at least 25x25px')
                    return setImagesrc('')
                }
            })

            setImagesrc(imageurl)

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

    const [imageCropper, setImageCropper] = useState(true)
    const imageRef = useRef(null)
    const canvasRef = useRef(null)
    const [croppedImageURL, setCroppedImageURL] = useState('')
    console.log(croppedImageURL);

    const handleSave = () => {
        setTotalImages((prevTotalImages) => {
            return [...prevTotalImages, croppedImageURL];
        });
        setPhotoSelector(!photoSelector)
        setCrop()
        setCroppedImageURL()
        setImagesrc('')
        setImageCropper(!imageCropper)
    }

    return (
    <>
        <div className='w-full h-full flex flex-col items-center justify-center relative'>
            <div 
            onClick={() => {
                setPhotoSelector(!photoSelector)
                setCrop()
                setCroppedImageURL()
                setImagesrc('')
            }}
            className='absolute top-0 right-0 p-1 mt-4 mr-4 rounded-full bg-[#cccccc]'>
                <svg className='h-[30px] w-[30px]' viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path> </g></svg>
            </div>
            <div 
            onClick={() => {
                setPhotoSelector(!photoSelector)
                setCrop()
                setCroppedImageURL()
                setImagesrc('')
            }}
            className='absolute mr-4 mb-4 bottom-0 right-0 bg-red-200 text-red-600 rounded-md py-2 px-5 dosis font-semibold'>
                CANCEL
            </div>

            {
                imagesrc ? 
                <>
                    <div className={`${imageCropper ? 'translate-x-0 opacity-100 blur-none scale-100 flex' : 'translate-x-[-200%] opacity-0 blue-xl scale-0'} duration-700 ease-in-out w-[80%] h-[70%] flex-col items-center fixed`} >
                        <ReactCrop 
                            className='max-h-[450px] max-w-[350px] rounded-md'
                            crop = { crop }
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_WIDTH}
                            onChange={(
                                pixelCrop, 
                                percentCrop
                            ) => setCrop(percentCrop)}
                        >
                            <img src={ imagesrc } alt="" className='rounded-md overflow-hidden' 
                            onLoad={onImageLoad}
                            ref={imageRef}
                            />
                        </ReactCrop>
                        <button className='mt-4 px-4 py-2 rounded-xl bg-blue-200 text-blue-600 kanit '
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
                        }}>
                            Crop Image
                        </button>
                    </div>


                    <div className={`${imageCropper ? 'translate-x-[200%] opacity-0 blue-xl scale-0' : 'translate-x-0 opacity-100 blur-none scale-100 flex'} duration-700 ease-in-out w-[80%] h-[70%] flex-col items-center fixed }`}>
                        <canvas 
                            ref={canvasRef} 
                            className='mt-4 rounded-xl overflow-hidden'
                            style={{
                                objectFit: 'contain',
                                width: 350,
                                height: 350
                            }}
                        />

                        <div className='w-full flex flex-row items-center justify-between pt-6'>
                            <button 
                            className='px-4 py-2 rounded-xl bg-blue-200 text-blue-700 font-semibold'
                            onClick={() => {
                                setImageCropper(!imageCropper)
                            }}
                            >RESIZE</button>
                            <button 
                            className='px-4 py-2 rounded-xl bg-green-200 text-green-700 font-semibold'
                            onClick={() => {
                                handleSave()
                            }}
                            >SAVE</button>
                        </div>
                    </div>
                </> 
                : 
                <div className='w-[90%] py-4 border-2 border-dashed border-[#aaaaaa] rounded-3xl flex items-center justify-center'>
                    <img src='/public/folder.png' alt="" className='w-[80%]'/>
                </div>
            }

            <div className='flex flex-row items-center w-[70%] mt-4'>
                <input 
                    type="file" 
                    accept='image/*'
                    onChange={onSelectFile}
                    className={`${ imagesrc ? 'hidden' : 'block' } text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:bg-violet-200 file:text-violet-700 hover:file:bg-violet-100 kanit w-[270px]`}
                />
            </div>

        </div>
    </>
    )
}

export default MobileImageSelector

