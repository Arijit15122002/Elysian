import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Navbar from '../Components/NavigationComp/ComputerNavBar'

import { useSelector } from 'react-redux'

function Layout () {

    const loggedIn = useSelector(state => state.auth.loggedIn)

    if( loggedIn ) {
        return <Navigate to="/feed" />
    }

    const deviceType = useSelector(state => state.device.deviceType)

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}

export default Layout