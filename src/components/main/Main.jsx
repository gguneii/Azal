import React from 'react'

import Slider from './Slider';
import SpecialOffer from './offers/SpecialOffer';
import Booking from '../header/Booking';
import GeneralOffers from './GeneralOffers';

function Main() {
  return (
    <div>
      <div>
          <Slider />
        < SpecialOffer />
        <GeneralOffers/>
      </div>
    </div>
  )
}

export default Main