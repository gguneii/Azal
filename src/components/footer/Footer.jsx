import React from 'react'
import { useState} from 'react';
import AzBusiness from '../../assets/Icons/Azbusiness.svg'
import Goverment from '../../assets/Icons/Govermentservices.svg'
import Miles from '../../assets/Icons/AzalaMiles.svg'
import Azerbaijan from '../../assets/Icons/Azerbaijan.svg'
import { FaFacebookF } from "react-icons/fa6";

import appstore from '../../assets/Icons/appstore.svg'
import playstore from '../../assets/Icons/playstore.svg'

import { IoIosArrowDown } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";



function Footer() {

  const [dropdown, setOpenDropdown] = useState(null);


  const handleToggle = (dropdownName) => {
    setOpenDropdown(dropdown === dropdownName ? null : dropdownName);
};


  return (
    < >
      <section id='footer' className='bg-[#01357e] w-[100%]'>
        <div className=' flex flex-col  sm:flex-col-reverse     '>
          <div className='w-full mx-auto mb-3'>
            <ul className='text-white p-2 sm:flex-wrap sm:flex sm:w-[80%] sm:mx-auto sm:justify-center md:w-[80%] md:border-t md:border-[#FFFFFF19] '>
              <li  className='  items-center workfontb text-[1.1em]  w-full justify-between p-4  cursor-pointer sm:w-[50%] md:w-[22.5%]'>
                <span className=' flex w-full items-center justify-between'>Information
                  <button
                    onClick={() => handleToggle('Information')} 
                    className={`transition-transform duration-300 p-2 ${dropdown === 'Information' ? 'rotate-180' : ''} sm:hidden `}
                  >
                    <IoIosArrowDown size={25} color='#809abf' />
                  </button>
                </span>
               <ul className={` ${ dropdown === 'Information' ? 'h-auto' : 'h-0'}   overflow-hidden   duration-300 border-b border-[#FFFFFF19] sm:h-auto sm:border-0`}>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">General informations</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Baggage Information </a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Fare rules</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Travelling with children and pregnant</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Travelling with pets</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Unwanted passengers</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Overbooking</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Dangerous objects</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Pricing Policy</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">AZAL Cargo</a></li>
                </ul>
              </li>
              <li className='flex flex-col p-4 workfontb text-[1.1em]  w-full   sm:w-[50%] md:w-[22.5%]'> <span>Azal Miles</span> 
                <ul className='text-[#b3c2d8] py-2 workfontn text-[0.8em]  w-[60%]'>
                  <li
                    onClick={() => handleToggle('Discover')} 
                    className='flex justify-between py-2 active:border-b'>
                    Discover <IoIosArrowDown size={25} color='#809abf' />
                  </li>
                    <ul className={`${dropdown === 'Discover' ? 'h-auto' : 'h-0'} overflow-hidden text - [0.8em]`}>
                      <li className='p-1'>Program content</li>
                      <li className='p-1'>Program statuses</li>
                      <li className='p-1'>Terms and conditions</li>
                      <li className='p-1'>FAQ</li>
                    </ul>
                  <li
                    onClick={() => handleToggle('Earn')} 
                    className='flex justify-between py-2'>
                    Earn miles <IoIosArrowDown size={25} color='#809abf' /> 
                  </li>
                    <ul className={`${dropdown === 'Earn' ? 'h-auto' : 'h-0'} overflow-hidden text - [0.8em]`}>
                      <li className='p-1'>Earn from flight</li>
                      <li className='p-1'>Other earning methods</li>
                    </ul>
                  <li
                    onClick={() => handleToggle('Spend')} 
                    className='flex justify-between py-2'>
                    Spend miles <IoIosArrowDown size={25} color='#809abf' /> 
                  </li>
                  <ul className={`${dropdown === 'Spend' ? 'h-auto' : 'h-0'} overflow-hidden text - [0.8em]`}>
                      <li className='p-1'>Award ticket</li>
                      <li className='p-1'>Other spending methods</li>
                    </ul>
                  </ul>
              </li>
              <li className=' items-center workfontb text-[1.1em]  w-full justify-between p-4 sm:w-[50%] md:w-[22.5%]'>
                <span className=' flex w-full items-center justify-between'>
                  Azerbaijan Airlines
                  <button
                    onClick={() => handleToggle('Airlines')}
                    className={`transition-transform duration-300 ${dropdown === 'Airlines' ? 'rotate-180' : ''} sm:hidden`}><IoIosArrowDown size={25} color='#809abf' />
                  </button>
                </span>
                <ul className={` ${ dropdown === 'Airlines' ? 'h-auto' : 'h-0'} overflow-hidden  duration-300 border-b border-[#FFFFFF19] py-1 sm:h-auto sm:border-0`}>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">About us</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Supervisory Board of AZAL</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Latest news</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Our fleet</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Career</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Help Center</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Write us</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Mobile apps</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Our partners</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Blog</a></li>
                </ul>
              </li>
              <li className=' items-center workfontb text-[1.1em]  w-full justify-between p-4 border-b border-[#FFFFFF19] sm:w-[50%] sm:border-0 md:w-[22.5%]'>
                <span className=' flex w-full items-center justify-between'> Corporation informations
                  <button
                  onClick={() => handleToggle('Corporation')}
                    className={`transition-transform duration-300 ${dropdown === 'Corporation' ? 'rotate-180' : ''} sm:hidden`} ><IoIosArrowDown size={25} color='#809abf' />
                  </button>
                </span>
                <ul className={` ${dropdown === 'Corporation' ? 'h-auto' : 'h-0'} py-2 overflow-hidden  duration-300  sm:h-auto sm:border-0`}>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Group transportations</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Sales offices</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Office & Representation Offices</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Visiting days</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Press Room</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Subdivisions</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Financial reports</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Information for agents</a></li>
                  <li className='text-[#b3c2d8] workfontn text-[0.8em] p-1'><a href="">Against human trafficking</a></li>
                </ul>
              </li>

            </ul>
          </div>
          <div className='flex gap-3 w-[100%]  flex-col m-2 p-2 items-center mx-auto sm:justify-center sm:flex-row sm:flex-wrap '>
            <div className='flex items-center '>
              <span className=' p-2 md:mx-5 md:border-r md:border-[#FFFFFF19] md:h-[90px] md:items-center  md:flex'>
                <a href="https://azranking.az/en">
                  <img src={AzBusiness} className='min-w-[100px] md:w-[200px] ' alt="Az" />
                </a>
              </span>
              <span className='p-3 md:mx-5 md:border-r md:border-[#FFFFFF19] md:h-[90px] md:items-center md:justify-center md:flex'>
                <a href="https://www.dxr.az/?lang=az">
                  <img src={Goverment} className='min-w-[100px]' alt="Az" />
                </a>
              </span>
            </div>
            <div className='flex items-center '>
              <span className='p-3  md:border-r md:border-[#FFFFFF19] md:h-[90px] md:items-center  md:-center md:flex'>
                <a href="#">
                  <img src={Miles} className='min-w-[100px] ' alt="Az" />
                </a>
              </span>
              <span className='p-3 md:mx-5  md:h-[90px] md:items-center md:flex'>
                <a href="https://azerbaijan.travel/?hl=en">
                  <img src={Azerbaijan} className='min-w-[100px]' alt="Az" />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className='md:flex md:w-full md:mx-auto items-center'>
          <ul className='flex gap-1 sm:gap-2 mx-auto w-[90%] justify-center '>
            <li className='rounded-full bg-white'><a href="https://www.facebook.com/AzerbaijanAirlines"  target='_blank'><FaFacebookF className=' w-8 h-8  p-2 md:w-10 md:h-10' color='#01357e'/></a></li>
            <li className='rounded-full bg-white' ><a href="https://www.instagram.com/azerbaijanairlines/" target='_blank'><BiLogoInstagramAlt  className=' w-8 h-8  p-2  md:w-10 md:h-10'  color='#01357e' /></a></li>
            <li className='rounded-full bg-white'><a href="https://www.tiktok.com/@azerbaijanairlines" target='_blank'><AiFillTikTok  className=' w-8 h-8  p-2  md:w-10 md:h-10'  size={15} color='#01357e' /></a></li>
            <li className='rounded-full bg-white'><a href="https://www.youtube.com/AzerbaijanAirlinesOfficial" target='_blank'><FaYoutube  className=' w-8 h-8  p-2  md:w-10 md:h-10'   size={15} color='#01357e' /></a></li>
            <li className='rounded-full bg-white' ><a href="https://x.com/AzalOfficial" target='_blank'><FaXTwitter  className=' w-8 h-8  p-2  md:w-10 md:h-10'   size={15} color='#01357e' /></a></li>
            <li className='rounded-full bg-white'><a href="https://www.linkedin.com/company/azerbaijan-airlines/" target='_blank'><FaLinkedin  className=' w-8 h-8  p-2  md:w-10 md:h-10'  size={15} color='#01357e'  /></a></li>
            <li className='rounded-full bg-white'><a href="https://www.whatsapp.com/channel/0029Va7xPOP2UPBQI3EBdi28" target='_blank'><FaSquareWhatsapp  className=' w-8 h-8  p-2  md:w-10 md:h-10'   color='#01357e'/></a></li>
          </ul>
          <div className='flex w-[90%] mx-auto justify-center m-4 gap-3'> 
            <a href="https://apps.apple.com/us/app/azal-book-flight-ticket/id1451475994" target="_blank"> <img src={appstore} alt="Appstore" /></a>
            <a href="https://play.google.com/store/apps/details?id=az.azal.app&pli=1" target="_blank"> <img src={playstore} alt="PlayStore" /></a>
          </div>
        </div>
        <div className=' w-[90%] p-3  mx-auto  text-[#b3c2d8]   sm:w-full sm:flex sm:justify-center sm:items-center  '>
          <p className='sm:w-[45%]'>© 2024 Azerbaijan Airlines - All rights reserved</p>
          <span className=' flex w-full items-center  sm:w-[45%]'>
            <a href="" className='p-2'>Help Center</a>
            <a href="" className='p-2'>Privacy Policy</a>
          </span>
        </div>
      </section>
    </>
  )
}

export default Footer