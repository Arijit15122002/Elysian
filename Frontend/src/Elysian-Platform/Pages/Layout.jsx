import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import RegistrationNavbar from '../Components/NavigationComp/RegistrationNavbar'

import { useSelector } from 'react-redux'

function Layout () {

    const loggedIn = useSelector(state => state.auth.loggedIn)

    if( loggedIn ) {
        return <Navigate to="/feed" />
    }

    const deviceType = useSelector(state => state.device.deviceType)

    return (
        <>
            <RegistrationNavbar />
            <Outlet />
        </>
    )

}

export default Layout