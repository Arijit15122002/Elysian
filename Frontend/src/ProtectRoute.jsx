import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectRoute ({ children, redirect = "/login" }) {

    const loggedIn = useSelector(state => state.auth.loggedIn)

    if( !loggedIn ) {
        return <Navigate to={redirect} />
    }

    return children;

}

export default ProtectRoute