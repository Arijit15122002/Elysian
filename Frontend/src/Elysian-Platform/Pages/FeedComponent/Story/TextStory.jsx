import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HexColorPicker } from "react-colorful";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from 'axios'

import { randomColorGenerator, fontFamilies, isColorLight } from '../../../../constants/Constant';

function TextStory ({ setTextStoryModalOpen, story, setStory, setUsersLastStory}) {
	const deviceType = useSelector(state => state.device.deviceType)
	const user = useSelector(state => state.auth.user)

    //Text story variables
	const [text, setText] = useState('')
	const [fontFamily, setFontFamily] = useState("radio");
	const [ fontColor, setFontColor] = useState('#ffffff')
    const [textAlignment, setTextAlignment] = useState("center");
	const [fontSize, setFontSize] = useState(1.8);
	const [backgroundColor, setBackgroundColor] = useState('#111111')

	//Hnadling the Text Story Modal Features and Settings:
	const containerRef = useRef(null)
	const contentRef = useRef(null)

	const handleInput = (e) => {
		let newText = e.target.innerText;
	
		// Split the text into lines to handle spaces line-by-line
		newText = newText
			.split('\n') // Split by line breaks
			.map(line => 
				line
					.replace(/^\s+/, ' ')  // Replace leading spaces with a single space
					.replace(/\s+$/, ' ')  // Replace trailing spaces with a single space
					.replace(/\s+/g, ' ')  // Normalize multiple spaces between words
			)
			.join('\n'); // Rejoin the lines with line breaks
	
		setStory((prev) => ({ ...prev, text: newText }));
		setText(newText);
	};

	useEffect(() => {
		const trimmedText = text.trim().replace(/^\n+|\n+$/g, "");
		setSharable(trimmedText.length >= 3 && backgroundColor && fontColor);
	}, [story.text, story.backgroundColor, story.fontColor]);


	//Handling the Cursor Position
	const fixCursorPosition = () => {
		const contentEditable = contentRef.current;
		const range = document.createRange();
		const selection = window.getSelection();

		if (contentEditable) {
			range.selectNodeContents(contentEditable);
			range.collapse(false);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	};


	//Handling the Font Size while the text is overflowing the container
	const adjustFontSize = () => {
		const contentEditable = contentRef.current;
		const container = containerRef.current;

		if (contentEditable && container) {
			const { scrollHeight, scrollWidth } = contentEditable
			const { clientHeight, clientWidth } = container

			// Check if the text overflows the container
			if (scrollHeight > clientHeight || scrollWidth > clientWidth) {
			setFontSize((prevFontSize) => Math.max(prevFontSize - 0.2, 0.5)); // Decrease font size by 0.2rem, with a minimum of 0.5rem
			}
		}
	};


	//The Editable DIV where we can write the text
	let contentEditable = contentRef.current;
	useEffect(() => {
		contentEditable = contentRef.current;
		if (text === "" && contentEditable) {
			contentEditable.textContent = "\u200B"
			contentEditable.style.opacity = "0.5"
		} else if (contentEditable) {
			contentEditable.textContent = ""
			contentEditable.textContent = text
			contentEditable.style.opacity = "1"
		}
	
		fixCursorPosition();
		adjustFontSize();
	});


	//Fixing the scroll animation 
	const scrollRef = useRef(null);
  	const [currentIndex, setCurrentIndex] = useState(0);

	const handleScrollRight = () => {
		if (currentIndex < fontFamilies.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			const scrollWidth = scrollRef.current.scrollWidth / fontFamilies.length; // Calculate width per font
			scrollRef.current.scrollBy({
			left: scrollWidth,
			behavior: "smooth",
			});
		}
	};
	
	const handleScrollLeft = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
			const scrollWidth = scrollRef.current.scrollWidth / fontFamilies.length; // Calculate width per font
			scrollRef.current.scrollBy({
			left: -scrollWidth,
			behavior: "smooth",
			});
		}
	};

	//Handling Font Style Selection Screen
	const [fontSelectionScreenOpen, setFontSelectionScreenOpen] = useState(false)
	const [ isFontLightColor, setIsFontLightColor ] = useState(false)
	const [ isBackgroundLightColor, setIsBackgroundLightColor ] = useState(false)
	const [ fontColorPickerOpen, setFontColorPickerOpen ] = useState(false)
	const [ backgroundColorPickerOpen, setBackgroundColorPickerOpen ] = useState(false)
	useEffect(() => {
		setIsFontLightColor(isColorLight(fontColor))
	}, [backgroundColor, fontColor])

	useEffect(() => {
		setStory((prev) => ({
			...prev,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
		}));
	}, [fontColor, backgroundColor]);


	//Handling Font Color Picker
	const modalRef = useRef()
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target) && // Click is outside modal
				!event.target.closest(".font-color-button, .background-color-button") // Not on specific buttons
			) {
				setFontColorPickerOpen(false);
				setBackgroundColorPickerOpen(false);
			}
		};
	  
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, []);

	
	//Checking if the story is sharable or not for type === 'textStory'
	const [ sharable, setSharable ] = useState(false)
	useEffect(() => {
		const hasVisibleText = story.text.replace(/\u00A0/g, '').trim() !== ''; // Check if there's non-empty text
		if (hasVisibleText && story.backgroundColor !== '' && story.fontColor !== '' && story.text.length >= 3) {
			setSharable(true); // Enable the button
		} else {
			setSharable(false); // Disable the button
		}
	}, [story]);


	//Submitting the text story
	const [ loading, setLoading ] = useState(false)
	const handleSubmitTextStory = async() => {
		setLoading(true)
		const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/story/post`, story)
		setUsersLastStory(response.data.story)
		if(response.data.success) {
			setTextStoryModalOpen(false)
			setText('')
			setFontFamily('')
			setBackgroundColor('')
			setFontColor('')
			setTextAlignment('')
			setStory({
				...story,
                type: '',
                image: '',
                video: '',
                caption: '',
                text: '',
                fontFamily: 'radio',
                fontColor: '#ffffff',
                textAlignment: 'center', 
                fontSize: '1.8',
                backgroundColor: '#232323',
			})
			setLoading(false)
		}
	}

	return (
	<>
	{
		deviceType === 'mobile' ?
		<></> : 
		<>
			<div className='bg-black/70 w-[90%] max-w-[750px] h-[95%] rounded-2xl overflow-hidden flex flex-col items-center justify-center relative'>
				<div 
					className='absolute p-1.5 top-2 right-2 bg-[#fefefe] rounded-full cursor-pointer z-20'
					onClick={() => {
						setTextStoryModalOpen(false)
						setStory({
							...story,
							type: '',
							text: '',
							backgroundColor: '#232323',
						})
						setText('')
					}}
				>
					<svg viewBox="0 0 24 24" height="20" width="20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 5L5 19M5.00001 5L19 19" stroke="#232323" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
				</div>
				
				<div 
					className={`relative w-[320px] aspect-[9/16] rounded-2xl flex items-center justify-center p-4`}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: backgroundColor
					}}
					ref={containerRef}
				>


					{/* Text Story Options */}

					{/* Background Color Changing Button */}
					<div className='absolute top-[16px] left-[330px] z-20 flex flex-row items-center gap-3 background-color-button'>
						<div
							className='h-[30px] w-[30px] rounded-full flex flex-row items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out'
							style={{backgroundColor: backgroundColor}}
							onClick={() => {
								if(fontColorPickerOpen) {
									setFontColorPickerOpen(false)
									setBackgroundColorPickerOpen(true)
								} else {
									setBackgroundColorPickerOpen(!backgroundColorPickerOpen)
								}
							}}
						>
								<svg className='ml-[2px]' height="16" width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={isBackgroundLightColor ? '#111111' : '#ffffff'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paint-roller"><rect width="16" height="6" x="2" y="2" rx="2"/><path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect width="4" height="6" x="8" y="16" rx="1"/></svg>
						</div>
					</div>

					{/* Text Story Font Color Changing Button */}
					<div 
						className='absolute top-[56px] left-[330px] z-20 h-[30px] w-[30px] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out font-color-button'
						style={{backgroundColor: fontColor}}
						onClick={() => {
							if(backgroundColorPickerOpen) {
								setBackgroundColorPickerOpen(false)
								setFontColorPickerOpen(true)
							} else {
								setFontColorPickerOpen(!fontColorPickerOpen)
							}
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isFontLightColor ? '#111111' : '#ffffff'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
					</div>

					<div 
						ref={modalRef}
						className={`${ fontColorPickerOpen || backgroundColorPickerOpen ? 'scale-100 opacity-100 blur-none' : 'scale-0 opacity-0 blur-sm'} duration-300 ease-in-out absolute top-[96px] left-[100px] z-20`}
					>
						{
							fontColorPickerOpen && <HexColorPicker color={fontColor} onChange={setFontColor} />
						}
						{
							backgroundColorPickerOpen && <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
						}
					</div>
						
					{/* Font Changing Screen Opening Button */}
					<div 
						className='absolute top-[96px] left-[330px] z-20 h-[30px] w-[30px] rounded-full bg-[#ffffff] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out'
						onClick={() => setFontSelectionScreenOpen(!fontSelectionScreenOpen)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive"><path d="m3 15 4-8 4 8"/><path d="M4 13h6"/><circle cx="18" cy="12" r="3"/><path d="M21 9v6"/></svg>
					</div>

					{/* Text Alignment Changing Button */}
					<div 
						className='absolute top-[136px] left-[330px] z-20 h-[30px] w-[30px] rounded-full bg-[#ffffff] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out'
						onClick={() => {
							textAlignment === 'left' ? setTextAlignment('center') : textAlignment === 'center' ? setTextAlignment('right') : setTextAlignment('left')
						}}
					>
					{
						textAlignment === 'center' ? 
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-center"><path d="M17 12H7"/><path d="M18 18H5"/><path d="M21 6H3"/></svg> : textAlignment === 'left' ? 
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-left"><path d="M15 12H3"/><path d="M17 18H3"/><path d="M21 6H3"/></svg> : 
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-right"><path d="M21 12H9"/><path d="M21 18H7"/><path d="M21 6H3"/></svg>
					}
					</div>


					<div className="w-full h-full absolute flex items-center justify-center left-0 top-0 z-0 text-[#888888]">
						<div className={`${text === '/200B' || text === '' ? '' : 'hidden'} text-[1.5rem] kanit`}>
							Type your story...
						</div>
					</div>

					{/* Editable Text Area */}
					<div
						ref={contentRef}
						className={`${fontFamily} w-full h-full text-white text-center outline-none z-10`}
						contentEditable
						suppressContentEditableWarning
						onInput={handleInput}
						onKeyDown={(e) => {
							// Prevent backspace from deleting the placeholder
							if (text === "" && e.key === "Backspace") {
								e.preventDefault();
							}
						}}
						style={{
							color: `${fontColor}`,
							fontSize: `${fontSize}rem`,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							textAlign: `${textAlignment}`,
							whiteSpace: "pre-wrap",
							overflowWrap: "break-word",
							wordBreak: "break-word",
							lineHeight: 1.2,
							height: "100%",
						}}
					>
					
					</div>

					<div 
						className={` ${sharable ? 'bg-blue-600 hover:bg-blue-500 duration-200 ease-in-out  text-white cursor-pointer' : 'bg-[#efefef] text-[#555555]'} kanit absolute -bottom-[42px] right-0 px-6 py-1.5 rounded-xl`}
						onClick={() => {
							handleSubmitTextStory()
						}}	
					>
						Share
					</div>

					{/* Font Selection Screen */}
					<div className={` ${fontSelectionScreenOpen ? 'scale-100 blur-none opacity-100' : 'scale-0 blur-sm opacity-0'} duration-300 ease-in-out absolute w-full h-full rounded-2xl flex flex-col items-center justify-center z-20 backdrop-blur-lg`}>
						<div className='w-full kanit text-[#cdcdcd] px-6'>Select your font</div>
						<div className='relative w-full h-[60px] mt-4 flex flex-row justify-center'>
				
							<div 
								ref={scrollRef}
								className='w-[90%] h-[60px]  flex flex-row items-center gap-1 flex-shrink-0 overflow-x-auto flex-nowrap px-4' 	
								id='scrollHome'
							>
							{
								fontFamilies.map((font, index) =>
									<div 
										key={index} 
										className={`${font} ${font === fontFamily ? 'bg-black text-[#ffffff]' : 'bg-inherit text-white hover:bg-[#111111]'} my-auto duration-200 ease-in-out rounded-lg ${font === 'borel' ? 'pt-3' : 'py-1'} px-[20px] whitespace-nowrap cursor-pointer`}
										onClick={() => {
											setFontFamily(font)
											setStory({ ...story, fontFamily: font })
											setFontSelectionScreenOpen(false)
										}}	
									>
										{
											font === 'playwrite2' ? 'playwrite light' : font
										}
									</div>
									)
							}
							</div>

							{/* Right Arrow Button */}
							<div 
								className='absolute left-1 top-1.5 h-[30px] w-[30px] rounded-full bg-[#232323] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out'
								onClick={handleScrollLeft}
							>
								<svg className='w-[19px] h-[19px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
							</div>

							{/* Left Arrow Button */}
							<div 
								className='absolute right-1 top-1.5 h-[30px] w-[30px] pl-[1.5px] rounded-full bg-[#232323] flex items-center justify-center cursor-pointer hover:scale-110 duration-200 ease-in-out'
								onClick={handleScrollRight}	
							>
								<svg className='w-[19px] h-[19px]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
							</div>

						</div>
						<div 
							className='mt-2 px-6 pt-[6px] pb-[7px] bg-violet-600 rounded-xl text-[#ffffff] hover:bg-violet-500 duration-200 ease-in-out cursor-pointer kanit'
							onClick={() => {
								setFontSelectionScreenOpen(false);
							}}
						>
							Select
						</div>
					</div>
				</div>
				{/* LOADING ANIMATION SCREEN */}
				<div className={`${loading ? 'scale-100 opacity-100 blur-none' : 'scale-0 opacity-0 blur-xl'} duration-300 ease-in-out absolute w-full h-full left-0 top-0 flex items-center justify-center gap-4 z-30 bg-inherit backdrop-blur-xl rounded-2xl`}>
						<div className='text-white text-[1.2rem] kanit '>Your Story is being uploaded</div>
						<ScaleLoader 
							color='#ffffff'
							loading={loading}
							size={40}
						/>
					</div>
			</div>
		</>
	}
	</>
	)
}

export default TextStory