import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../Components/NavbarElysian'

function Layout () {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}

export default Layout