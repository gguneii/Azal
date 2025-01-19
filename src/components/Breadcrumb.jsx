import React from 'react';
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;

  const segments = pathname.split('/').filter((segment) => segment !== '');

  let url = '';

  const breadCrumbLinks = segments.map((segment, i) => {
    url += `/${segment}`;
    return (
      <React.Fragment key={i}>
        {i > 0 && <GoDotFill  size={10} className="mx-1 text-white" />}
        
        <Link to={url} className="text-white hover:underline">
          {segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')}
        </Link>
      </React.Fragment>
    );
  });


  const currentPage = segments.length > 0
  ? segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1).replace('-', ' ')
  : "Home";

  return (
    <nav aria-label="breadcrumb" className="flex w-full flex-col p-3 m-3 md:w-[80%] md:mx-auto">
      <ul className="breadcrumb flex items-center">
        <li>
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        {segments.length > 0 && <GoDotFill size={10} className="mx-1 text-white" />}
        {breadCrumbLinks}
      </ul>
      <div className='text-[2.6em] text-white workfont w-full text-left'>{currentPage}</div>
    </nav>
  );
};

export default Breadcrumb;
