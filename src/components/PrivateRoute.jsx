import React from 'react'
import { Navigate } from 'react-router-dom'
import {Navbar} from './index'

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        return (
            <>
                <Navbar usertype={user.usertype} />
                {children}
            </>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }

}

export default PrivateRoute