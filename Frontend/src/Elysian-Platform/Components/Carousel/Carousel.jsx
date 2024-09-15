import React, { useState } from 'react'

function Carousel ({ images }) {

    const [ slideNumber, setSlideNumber ] = useState(0)

    const leftSlide = () => {
        setSlideNumber(slideNumber > 0 ? slideNumber - 1 : images.length - 1)
    }

    const rightSlide = () => {
        setSlideNumber(slideNumber < images.length - 1 ? slideNumber + 1 : 0)
    }

  return (
    <div className='w-full h-full bg-cover bg-center duration-200 ease-in-out rounded-xl relative cursor-pointer' 
        style={{
            backgroundImage: `url(${images[slideNumber]})`  ,
        }}
    >
        
        <div 
            className='absolute left-[-14px] top-[45%] p-1 bg-white/80 backdrop-blur-sm rounded-full cursor-pointer'
            onClick={leftSlide}
        >
            <svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#232323" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>
        <div 
            className='absolute right-[-14px] top-[45%] p-1 bg-white/80 backdrop-blur-sm rounded-full cursor-pointer'
            onClick={rightSlide}
        >
            <svg className='w-[20px] h-[20px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#232323" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>

        <div className='w-full flex flex-row gap-1 justify-center top-[92%] absolute'>
        {
            images.map((image, index) => (
                <div className={`${ slideNumber === index ? 'bg-white' : 'bg-[#aaaaaa]' } h-[7px] w-[7px] rounded-full duration-200 ease-in-out`} />
            ))
        }
        </div>
    </div>
  )
}

export default Carousel