import React from 'react'
import { useSelector } from 'react-redux'

function CreatePhotoStory () {

    const deviceType = useSelector(state => state.device.deviceType)

    return (
    <>
    {
        deviceType === 'mobile' ? 
        <>
            <div className='kanit text-[#777777] text-[1.3rem] py-3 px-10'>
                Create a Photo Story
            </div>

            <div>
                
            </div>
        </> : <>

        </>
    }
    </>
    )
}

export default CreatePhotoStory