import { NavLink, Outlet } from 'react-router-dom'
import React from 'react'


import Navbar from '../components/Navbar/Navbar'

const ProtectedRoutes = () => {


    // if(!token){
    //     return <div>
    //         <h1>Unauthorise!!!</h1>
    //         <span>
    //             <NavLink to="/login" >Login</NavLink> to gain access
    //         </span>
    //     </div>
    // }
  return (
    <>
    <Outlet />
    <Navbar />
    </>
  )
}

export default ProtectedRoutes