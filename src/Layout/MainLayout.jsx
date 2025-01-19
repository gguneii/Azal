import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import HeroHeader from '../components/header/HeroHeader'
import smt from '../../public/Images/plane.jpg'
import Breadcrumb from '../components/Breadcrumb'
import Booking from '../components/header/Booking'
import HeaderTabs from '../components/header/HeaderTabs'


function MainLayout() {
    
    const location = useLocation();
    
    const getHeroContent = () => {
        if (location.pathname === "/" || location.pathname === "/home") {
          return {
            backgroundClass: "bg-[#01357e] sm:bg-[url('/Images/plane.jpg')] min-h-[70vh]  ", 
            content: (
              <div className='mt-3' >
                <HeaderTabs />
              </div>
            ),
          };
        } else {
          return {
            backgroundClass: " bg-[url('/Images/default-bg.jpg')]  min-h-[50vh] ", 
            content: (
              <div className='absolute bottom-4 w-full '>
                <Breadcrumb />
              </div>
            ),
          };
        }
      };

      const { backgroundClass, content } = getHeroContent();

    
    
  return (
    <>
        <HeroHeader backgroundClass={backgroundClass} >{ content}</HeroHeader>
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout