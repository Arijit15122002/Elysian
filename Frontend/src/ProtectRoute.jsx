import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from './context/ContextAPI'

function ProtectRoute ({ children, redirect = "/login" }) {

    const { userData } = useContext(UserContext)

    if( !userData.loggedIn ) {
        return <Navigate to={redirect} />
    }

    return children;

}

export default ProtectRoute