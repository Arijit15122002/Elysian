import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import './ComputerSideNavigation.css'

function ComputerSideNavigation () {

    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)

    return (
    <>
        <div className='flex flex-col parent-div py-2 h-auto rounded-3xl border-[3px] border-[#ffffff00] gap-6 px-2 bg-[#232323]'>
        
            <NavLink to={"/feed"} className={({isActive}) => {
                isActive ? setActive1(true) : setActive1(false)
                return `${isActive ? 'bg-white text-[#232323]' : 'hover:bg-black text-[#ffffff]'} px-2 py-3 rounded-[18px] w-full flex flex-row items-center duration-300 ease-in-out`
            }}>
                <div className='w-[1.6rem] h-[1.6rem] -ml-[5px]'>
                    <svg className='w-[2rem] h-[2rem] -mt-[4px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M9 20H7C5.89543 20 5 19.1046 5 18V10.9199C5 10.336 5.25513 9.78132 5.69842 9.40136L10.6984 5.11564C11.4474 4.47366 12.5526 4.47366 13.3016 5.11564L18.3016 9.40136C18.7449 9.78132 19 10.336 19 10.9199V18C19 19.1046 18.1046 20 17 20H15M9 20V14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V20M9 20H15" stroke={active1 ? "#232323" : "#ffffff" } stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                </div>
                <div className='text-div itim pl-[12px]'>
                    HOME
                </div>

            </NavLink>

            <NavLink to={"/search"} className={({isActive}) => {
                isActive ? setActive2(true) : setActive2(false)
                return `${isActive ? 'bg-white text-[#232323]' : 'hover:bg-black text-[#ffffff]'} px-2 py-3 rounded-[18px] w-full flex flex-row items-center duration-200 ease-in-out`
            }}>
                <div className='w-[1.6rem] h-[1.6rem] -ml-[1px]'>
                    <svg className='w-[1.6rem] h-[1.6rem] -mt-[1px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={active2 ? "#232323" : "#ffffff" } stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <div className='text-div itim pl-[8px]'>
                    SEARCH
                </div>
            </NavLink>

            <NavLink to={"/notifications"} className={({isActive}) => {
                isActive ? setActive3(true) : setActive3(false)
                return `${isActive ? 'bg-white text-[#232323]' : 'hover:bg-black text-[#ffffff]'} px-2 py-3 rounded-[18px] w-full flex flex-row items-center duration-300 ease-in-out`
            }}>
                <div className='w-[1.6rem] h-[1.6rem] -ml-[1px]'>
                    <svg className='w-[1.6rem] h-[1.6rem]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke={active3 ? "#232323" : "#ffffff" } stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke={active3 ? "#232323" : "#ffffff" } stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke={active3 ? "#232323" : "#ffffff" } stroke-width="1.2" stroke-miterlimit="10"></path> </g></svg>
                </div>
                <div className='text-div itim pl-[9px]'>
                    NOTIFICATIONS
                </div>
            </NavLink>

            <NavLink to='/explore' className={({isActive}) => {
                isActive ? setActive4(true) : setActive4(false)
                return `${isActive ? 'bg-white text-[#232323]' : 'hover:bg-black text-[#ffffff]'} px-2 py-3 rounded-[18px] w-full flex flex-row items-center duration-300`
            }}>
                <div className='w-[1.6rem] h-[1.6rem]'>
                    <svg className='w-[1.4rem] h-[1.4drem]' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke={active4 ? "#232323" : "#ffffff" } stroke-width="0.0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z" stroke-width='0.0' stroke={active4 ? "#232323" : "#ffffff" } fill={active4 ? "#232323" : "#ffffff" } ></path> </g></svg>
                </div>
                <div className='text-div itim pl-[7px]'>
                    EXPLORE
                </div>
            </NavLink>

        </div>

        

    </>
    )
}

export default ComputerSideNavigation