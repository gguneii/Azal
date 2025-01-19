import React from 'react'
import { FaSearch } from "react-icons/fa";

function ManageBooking() {
  return (
    <div className='w-full md:w-[80%] mx-auto sm:bg-white sm:rounded-lg md:flex md:p-1 mt-10 sm:mt-0'>

      <div className='md:flex mx-auto w-[90%] gap-2 md:w-[90%]'>
        <input
          type="text"
          className='w-full mx-auto rounded-lg m-3 p-3 md:p-1 border '
          placeholder='Last Name'
        />
        <input
          type="text"
          className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
          placeholder="Ticket (13 characters)"
          maxLength={13}
          onInput={(e) => {
            if (!/^\d*$/.test(e.target.value)) {
              e.target.value = e.target.value.replace(/\D/g, '');
            }
          }}
        />
      </div>
        <div className='w-full mx-auto md:w-[10%] p-4'>
          <button className='text-white bg-[#37A6DB] mx-auto p-3 rounded-xl w-full flex items-center justify-center '>
              <p className='md:hidden'>Search</p>
              <span className='m-3'><FaSearch /></span>
          </button>      
        </div>
  </div>
  )
}

export default ManageBooking