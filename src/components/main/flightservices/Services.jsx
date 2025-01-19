import React, { useContext } from 'react'
import { DATA } from '../../../Context/DataContext';

import { Link } from 'react-router-dom';



function Services() {
  const { services } = useContext(DATA);  


  return (
    <div className='w-full md:w-[70%] mx-auto'>
        <h1 className='text-[#01357e] text-[2em] p-3 border-b border-[#afdae4]  w-[80%] mx-auto m-4 font-semibold'>Services</h1>
      <ul>
        {services.map(item => (
          <li key={item.id} className=' mx-auto w-[80%]'>
            <Link to={`/services/${item.id}`}  className=' my-5  md:flex items-center '>
                <img src={`${item.image}`} alt={item.title} className=' rounded-lg  md:min-w-[350px] max-h-[200px] ' />
                <div className='m-3'>
                  <h3 className='font-semibold my-3 mx-1 text-[1.2em] md:text-[1.4em]'>{ item.title}</h3>
                  <p className='text-[#6e7583] text-[0.8em] mx-1 md:text-[0.9em] max-w-[350px]'>{item.shortdescription}</p>
                </div>
            </Link>
          </li>
          ))
        }  
      </ul>
    </div>
  )
}

export default Services