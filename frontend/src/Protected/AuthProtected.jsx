import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function AuthProtected({children}) {
    const {username} = useSelector((state)=> state.auth)
    
    const location = useLocation()
  return (
    
      username === null ?  children : <Navigate to={'/'} state={{ from: location.pathname }} replace:true />  
    
  )
}

export default AuthProtected
