import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { DATA } from '../../../Context/DataContext';
import Breadcrumb from '../../Breadcrumb';


function OfferDetailPage() {

    const { offerId } = useParams(); 
    const { offers } = useContext(DATA);

    const [offer, setOffer] = useState(null);

    useEffect(() => {
      const selectedOffer = offers.find(offer => offer.id === offerId); 
      setOffer(selectedOffer);
  }, [offerId, offers]);

      if (!offer) {
        return ;
      }
  return (
    <div className="offer-detail w-[70%] mx-auto my-12">
      <div>
        <h3 className='text-[#e44541] font-bold m-4  '>{offer.publishDate}</h3>
        <img src={`/${offer.image}`} alt={offer.title} className="offer-image w- mx-auto  m-2" />
        <div className='text-[#6e7583]  mx-auto my-6' dangerouslySetInnerHTML={{ __html: offer.description }} ></div>
      </div>
  </div>
  )
}

export default OfferDetailPage