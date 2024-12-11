import React, { useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import ReactCrop, { centerCrop, convertToPercentCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';

import setCanvasPreview from '../ImageSelector/SetCanvasPreview';

import './DragAndDrop.css'

function DragAndDropImage ({ totalImages, setTotalImages }) {
    const wrapperRef = useRef(null);

	const onDragEnter = () => wrapperRef.current.classList.add('dragover');
	const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
	const onDrop = () => wrapperRef.current.classList.remove('dragover');

	const [ imageCropper, setImageCropper ] = useState(false)
	const [ imageFinalizer, setImageFinalizer ] = useState(false)
	const [ imagesrc, setImagesrc ] = useState('')
	const [ crop, setCrop ] = useState()
    const ASPECT_RATIO = 1
    const MIN_WIDTH = 150

	const [ croppedImageURL, setCroppedImageURL ] = useState('')

	const imageRef = useRef(null)
    const canvasRef = useRef(null)
	const fileInputRef = useRef(null)

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
			console.log(imageurl);
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

		setTotalImages((prevTotalImages) => {
			return [...prevTotalImages, croppedImageURL];
		});
		setCrop('')
		setCroppedImageURL('')
		setImagesrc('')
		setImageCropper(false)
		setImageFinalizer(false)

	}

	const handleClick = () => {
		fileInputRef.current.click()
	}

	const deleteImage = (index) => {
		const newImages = [...totalImages];
		newImages.splice(index, 1);
		setTotalImages(newImages);
	};
	
	return (
	<>
	
		<div 
		ref = {wrapperRef}
		onDragEnter = {onDragEnter}
		onDragLeave = {onDragLeave}
		onDrop = {onDrop}
		className='w-full h-[240px] bg-blue-50 dark:bg-[#262b31] rounded-3xl border-2 border-dashed border-[#004b97] dark:border-[#efefef] flex flex-col items-center justify-center relative drop-file-input'>
			<div className='absolute top-6 w-[30%] opacity-70 flex justify-center items-center'>
				<img src="/public/posts/upload.png" alt="" />
			</div>

			<div className='absolute w-[20%] left-[30%] top-4'>
				<img src="/public/posts/curved-arrow.png" alt="" />
			</div>

			<div className='absolute bottom-4 w-auto flex flex-col gap-1 items-center'>
				<div className='text-[#232323c5] dark:text-[#ffffff] text-[0.9rem] radio font-semibold'>
					Drag and Drop image files to upload
				</div>
				<div className='text-[#23232391] dark:text-[#cdcdcd] kanit font-semibold text-[0.7rem]'>
					Or, Click to browse
				</div>
			</div>

			<input 
			ref = {fileInputRef}
			type="file" 
			accept='image/*'
			onChange = {onSelectFile}
			className='w-[100%] h-[100%] absolute rounded-3xl overflow-hidden opacity-0 focus:outline-none cursor-pointer'/>
		</div>

		{
			totalImages.length > 0 ?
			<div 
				className='flex flex-row items-center h-[90px] w-full overflow-x-auto gap-2 px-2.5 rounded-[20px] bg-[#eeeeee]'
				id='settingScroll'
			>
			{
				totalImages.map((image, index) => 
					<div className='w-[70px] h-[70px] relative'>
						<img src={image} alt="" 
							className='w-full h-full rounded-xl object-contain'
						/>
						<button 
							className='absolute top-[-5px] right-[-5px] h-[20px] w-[20px] rounded-full bg-red-100 cursor-pointer flex items-center justify-center'
							onClick={() => deleteImage(index)}
						>
							<svg className='w-[15px] h-[15px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#eb0505" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
						</button>
					</div>
				)
			}

			<div 
				className='w-[70px] h-[70px] flex items-center justify-center rounded-xl border-[3px] border-[#aaaaaa] cursor-pointer '
				onClick={handleClick}
			>
				<svg className='w-[50px] h-[50px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#aaaaaa" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
			</div>

			</div> : <div></div>
		}

		<div className={`${ imagesrc ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-3xl opacity-0' } duration-500 ease-in-out fixed mt-[70px] h-[calc(100vh-70px)] w-[100vw] bg-black/50 backdrop-blur-sm left-0 top-0 flex flex-col items-center justify-center`}>
			
			<div className='bg-black/70 w-[70%] max-w-[550px] h-[90%] flex items-center justify-center rounded-3xl relative'>

				<div 
					className='absolute p-1.5 top-2 right-2 bg-red-200 rounded-full cursor-pointer'
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
	</>
	)
}

export default DragAndDropImage