import React, { useState, useRef } from 'react';
import Booking from './Booking';
import CheckIn from './CheckIn';
import FlightStatus from './FlightStatus';
import ManageBooking from './ManageBooking';

function HeaderTabs() {
  const [activeTab, setActiveTab] = useState('Book a flight'); 
  const tabs = ['Book a flight', 'Check-in', 'Manage booking', 'Flight status'];
  const tabRefs = useRef([]);
    
  const handleTabClick = (tab, index) => {
    setActiveTab(tab);

    if (window.innerWidth < 710 && tabRefs.current[index]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[index];
      const scrollContainer = document.querySelector('.tab-container');
      scrollContainer.scrollTo({
        left: offsetLeft - scrollContainer.clientWidth / 2 + offsetWidth / 2,
        behavior: "smooth",
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Book a flight":
        return <Booking />;
      case "Check-in":
        return <CheckIn />;
      case "Manage booking":
        return <ManageBooking />;
      case "Flight status":
        return <FlightStatus />;
      default:
        return null;
    }
  };

    
  return (
    <div className='sm:mt-[80px]'>
        <div className="flex  overflow-hidden w-full tab-container md:w-[80%] mx-auto">
            {tabs.map((tab, index) => (
                <button
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => handleTabClick(tab, index)}
                    className={`mx-1 rounded-lg p-3   font-semibold sm:rounded-none sm:rounded-t-lg 
                         ${  activeTab === tab ? " text-[#01357E] bg-white " : " bg-[#042d68] text-white"}
                        `}
                >
                <span className="whitespace-nowrap">{tab}</span>
                </button>
            ))}
          </div>
        <div>
              {renderContent()}
        </div>  
    </div>
  );

}

export default HeaderTabs;