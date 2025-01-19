import React from 'react';
import Header from './Header';



const HeroHeader = ({ children, backgroundClass }) => {
  return (
    <div className={` bg-cover bg-center relative ${backgroundClass}`}>
      <div className="top-0 w-full">
        <Header />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default HeroHeader;
