import React, { useState } from 'react';

function CheckIn() {
  const [selected, setSelected] = useState('reservation'); 

  return (
    <div className='w-full md:w-[80%] mx-auto sm:bg-white sm:rounded-lg '>
      <div className='flex w-[90%] mx-auto my-3 sm:my-0 sm:pt-5 '>
        <button
          className={`${
            selected === 'reservation' ? 'border-[#37A6DB] text-[#37A6DB]' : 'bg-white text-black'
          } rounded-l-lg h-16 px-4 border w-full text-[0.8em] sm:text-[1em] bg-white`}
          onClick={() => setSelected('reservation')}
        >
          By Reservation Number
        </button>
        <button
          className={`${
            selected === 'ticket' ? 'border-[#37A6DB] text-[#37A6DB]' : 'bg-white text-black'
          } rounded-r-lg h-16 px-4 border w-full text-[0.8em] sm:text-[1em] bg-white`}
          onClick={() => setSelected('ticket')}
        >
          By Ticket Number
        </button>
      </div>
      <div className='md:flex mx-auto w-[90%] gap-2'>
        <input
          type="text"
          className='w-full mx-auto rounded-lg m-3 p-3 border '
          placeholder='Last Name (in Latin)*'
        />
        {selected === 'reservation' ? (
          <input
            type="text"
            className='w-full mx-auto rounded-lg m-3 p-3 border'
            placeholder='Reservation Number*'
          />
        ) : (
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
        )}
      </div>
        <div className='w-full mx-auto md:w-[70%] p-4'>
            <button className='text-white bg-[#37A6DB] mx-auto p-3 rounded-xl w-full'>
            Search
            </button>      
        </div>
    </div>
  );
}

export default CheckIn;
