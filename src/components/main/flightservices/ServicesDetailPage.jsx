import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { DATA } from '../../../Context/DataContext';
import Breadcrumb from '../../Breadcrumb';

function ServicesDetailPage() {

    const { serviceId } = useParams(); 
    const { services } = useContext(DATA);

    const [ service, setService] = useState(null);

    useEffect(() => {
      const selectedService = services.find(service => service.id === serviceId); 
      setService(selectedService);
  }, [serviceId, services]);

    if (!service) {
        return null; 
    }

  return (
    <div className="offer-detail w-[70%] mx-auto my-12">
      <h1 className='text-[#01357e] text-[1.2em] py-3 border-b border-[#afdae4]  md:text-[1.7em]'>{service.shortdescription}</h1>
      <div>
        <div className='text-[#6e7583]  mx-auto my-6' dangerouslySetInnerHTML={{ __html: service.description }} ></div>
      </div>
    </div>
  )
}

export default ServicesDetailPage;
