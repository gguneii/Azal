import React, { useContext,useState } from 'react'
import { DATA } from '../../../Context/DataContext';

import { Link } from 'react-router-dom';
import SkeletonLoader from '../SkeletonLoader';



function Experience() {
  const { experience } = useContext(DATA);  

  

    
    
  if (!experience || experience.length === 0) {
    return (
        <div className="w-full md:w-[70%] mx-auto">
          <h1 className='text-[#01357e] text-[2em] p-3 border-b border-[#afdae4] w-[80%] mx-auto m-4 font-semibold'>
            On-Board Experience
          </h1>
          <ul>
            {[...Array(2)].map((_, index) => (  
              <li key={index} className="mx-auto w-[80%]">
              <SkeletonLoader />
            </li>
            ))}
          </ul>
        </div>
      );
    }

    
  return (
    <div className='w-full md:w-[70%] mx-auto'>
        <h1 className='text-[#01357e] text-[2em] p-3 border-b border-[#afdae4]  w-[80%] mx-auto m-4 font-semibold'>On-Board Experience</h1>
      <ul>
        {experience.map(item => (
          <li key={item.id} className=' mx-auto w-[80%]'>
            <Link to={`/on-board-experience/${item.id}`}  className=' my-5  md:flex items-center '>
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

export default Experience