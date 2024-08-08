import React from 'react'

import ScaleLoader from "react-spinners/ScaleLoader";

export const Loader = () => {
    return (
        <>
            <div className={` h-[100svh] w-full bg-white absolute z-40 flex flex-row items-center justify-center`}>
			<ScaleLoader 
				color='#232323'
				loading={true}
				size={40}
			/>
			</div>
        </>
    )
}