import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


function UserAuthProtected({ children }) {
    
    const role = localStorage.getItem('role')
    const location = useLocation()

    return (
        role !== 'admin' && role === 'user' && role !== 'chef' ? children : <Navigate to={'/signin'} state={{ from: location.pathname }} replace:true />
    )
}

export default UserAuthProtected