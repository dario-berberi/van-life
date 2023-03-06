import React from "react"
import { Outlet, Navigate, useLocation } from "react-router-dom"

function AuthRequired() {
    const location = useLocation()
    const isLoggedIn = localStorage.getItem("loggedin")
    if (!isLoggedIn) {
        //replace same as replace= {true} removes from the browser history path
       return <Navigate to="/login" state={{message: "You must log in first!", from: location.pathname}} replace/>
    }
   
    return <Outlet />
    
}

export default AuthRequired;