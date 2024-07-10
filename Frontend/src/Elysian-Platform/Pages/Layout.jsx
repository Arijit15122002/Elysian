import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/NavigationComp/ComputerNavBar'

import { UserContext } from '../../context/ContextAPI'

function Layout () {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}

export default Layout