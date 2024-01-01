import React from 'react'
import { Navigate} from 'react-router-dom'
import {Navbar} from './index'

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('jsuser'))
    const url = window.location.href.split('/');
    if(user.usertype === 0 && url[3].length > 0) {
        window.location.href = '/'
        return
    }
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