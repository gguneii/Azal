import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation  } from 'react-router-dom'
import FunctionalHeader from '../components/header/FunctionalHeader'

function Layout() {

    const location = useLocation();
    
        
    return (
        <>
            <FunctionalHeader  />
            <Outlet/>
        </>
  )
}

export default Layout