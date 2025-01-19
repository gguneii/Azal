import React, { useContext } from 'react'
import { DATA } from '../../../Context/DataContext';
import { Link } from 'react-router-dom';



function SpecialOffer() {
    const { offers } = useContext(DATA);  
  return (
    <div>
          <div className='  md:w-[80%] justify-center items-center mx-auto my-3'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-[1.8em]  p-3'>Special offers</h3>
                    <Link to={`/offers`}><button className='bg-gray-100 text-[#01357e] p-3 m-2 rounded-lg'>View All</button></Link>
                </div>
                <ul className=' md:flex   justify-center items-center  '>
                  {
                      offers.slice(0, 2).map(item => (
                        <li id='card' key={item.id} className=' p-2  md:flex md:items-center  ' >
                              <div className=' object-cover rounded-xl  md:max-w-[350px] justify-center  ' >
                                <img src={item.image} alt={item.title} className=' object-cover  md:min-h-[200px]  w-full  rounded-lg  ' />  

                              </div>                            
                            <div  >
                                  <h5 className='m-3 text-[1.3em]  '>{item.title}</h5>
                                  <p className='text-[#6e7583] text-[0.9em] m-2  md:text-ellipsis overflow-hidden     h-[40px]  md:w-[150px]'>{item.shortdescription}</p>
                                <Link to={`/offers/${item.id}`} className='text-[#40b7de] m-3 text-[1.1em]  hover:underline '>Read More</Link>
                              </div>
                        </li>
                      ))
                  }
                </ul>
            </div>      
    </div>
  )
}

export default SpecialOffer