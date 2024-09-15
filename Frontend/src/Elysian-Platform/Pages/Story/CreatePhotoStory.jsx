import React from 'react'
import { useSelector } from 'react-redux'

function CreatePhotoStory () {

    const deviceType = useSelector(state => state.device.deviceType)

    return (
    <>
    {
        deviceType === 'mobile' ? 
        <>
            
        </> : <>

        </>
    }
    </>
    )
}

export default CreatePhotoStory