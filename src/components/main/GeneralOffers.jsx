import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { DATA } from '../../Context/DataContext';

function GeneralOffers() {
        const { experience,services } = useContext(DATA);  
    

  return (
    <div>
          <div className='  md2:w-[80%] justify-center items-center mx-auto my-3'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-[1.8em]  p-3'>Our services</h3>
                </div>
                <ul className=' md2:flex  mx-auto md2:mx-0   justify-center items-center gap-3 '>
                  {
                      experience.slice(0, 1).map(item => (
                        <li id='card' key={item.id} className='   border rounded-xl m-3 pb-2 hover:border-2 hover:border-[#40b7de] hover:scale-105 transition-all' >
                              <div className=' object-cover rounded-xl  md2:max-w-[350px] justify-center  ' >
                                <img src={item.image} loading="lazy" alt={item.title} className=' object-cover  md2:min-h-[200px]  w-full rounded-t-lg' />  

                              </div>                                
                            <div  >
                                  <h5 className='m-3 text-[1.3em]  '>{item.title}</h5>
                                  <p className='text-[#6e7583] text-[0.9em] m-2  md:text-ellipsis overflow-hidden     h-[40px]  md:w-[150px]'>{item.shortdescription}</p>
                                <Link to={`/experience/${item.id}`} className='text-[#40b7de] m-3 text-[1.1em]  hover:underline '>Read More</Link>
                              </div>
                        </li>
                      ))
                  }
                  {
                      services.slice(0, 2).map(item => (
                        <li id='card' key={item.id} className='    border rounded-xl  m-3 pb-2 hover:border-[#40b7de] hover:scale-105 transition-all ' >
                              <div className=' object-cover rounded-xl  md2:max-w-[350px] justify-center  ' >
                                <img src={item.image} alt={item.title} className=' object-cover  md2:min-h-[200px]  w-full rounded-t-lg ' />  

                              </div>                            
                            <div  >
                                  <h5 className='m-3 text-[1.3em]  '>{item.title}</h5>
                                  <p className='text-[#6e7583] text-[0.9em] m-2  md:text-ellipsis overflow-hidden     h-[40px]  md:w-[150px]'>{item.shortdescription}</p>
                                <Link to={`/services/${item.id}`} className='text-[#40b7de] m-3 text-[1.1em]  hover:underline '>Read More</Link>
                              </div>
                        </li>
                      ))
                  }
                </ul>
            </div>      
    </div>
  )
}

export default GeneralOffers