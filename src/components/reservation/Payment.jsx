import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from './Stepper'
import Visa from '../../../public/Images/PaymentIcons/visa.svg'
import Amex from '../../../public/Images/PaymentIcons/amex.svg'
import Master from '../../../public/Images/PaymentIcons/master.svg'
import MasterSecure from '../../../public/Images/PaymentIcons/master-secure.svg'
import VisaSecure from '../../../public/Images/PaymentIcons/visa-secure.svg'

function Payment() {

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
    const navigate = useNavigate();
  

const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  
  const handlePayment = () => {
  if (!cardNumber.trim() || !expiryDate.trim() || !cvc.trim()) {return;}
  if (cardNumber.length !== 19) {return;}
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {return;}
  if (cvc.length !== 3) {return; }
  setPaymentConfirmed(true);
};

  return (
    <div className="bg-[#edf1f4] h-[100vh] pt-[100px] pb-8">
      <div><Stepper currentStep={4} /></div>
      <div className=" m-3 w-[90%] mx-auto my-3 ">
        {!paymentConfirmed ? ( 
          <div>
            <h1 className="text-[1.3em] font-semibold mb-5">Enter Card Information</h1>  
            <div className='bg-white rounded-lg p-3 border border-gray-400 md:w-[50%] md:mx-auto'>
              <div>
                <p className='my-2 font-bold workfontb'>Card number</p>
                <input
                type="text"
                className="w-[90%] h-[35px] rounded-md outline-none border-2 focus:border-[#37a6db] focus:ring-2 focus:ring-[#37a6db] p-2"
                placeholder="XXXX - XXXX - XXXX - XXXX"
                maxLength={19} 
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  const formattedValue = value.match(/.{1,4}/g)?.join("-") || ""; 
                  setCardNumber(formattedValue); 
                  e.target.value = formattedValue; 
                }}
              />
              </div>
              <div className='flex py-3 flex-wrap md:flex-nowrap'>
                <div className='my-3'>
                  <p className='font-bold workfontb'>Expired date</p>
                  <input
                        type="text"
                        className="border w-[40%] h-[35px] rounded-md outline-none focus:border-[#37a6db] focus:ring-2 focus:ring-[#37a6db] p-2 my-2"
                        placeholder="MM/YY"
                        maxLength={5} 
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, ""); 
                          if (value.length > 2) {
                            value = `${value.slice(0, 2)}/${value.slice(2)}`; 
                          }
                          setExpiryDate(value); 
                          e.target.value = value; 
                        }}
                      />
                </div>
                <div className='my-3'>
                  <p className='font-bold workfontb'>CVC</p>
                  <input
                    type="text"
                    className="border w-[40%] h-[35px] rounded-md outline-none focus:border-[#37a6db] focus:ring-2 focus:ring-[#37a6db] p-2 my-2"
                    placeholder="CVC"
                    maxLength={3} 
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setCvc(value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <button className='w-full rounded-lg text-[1.4em] bg-[#01357e] text-white mx-auto h-[50px] my-4 md:w-[40%]'
              onClick={() => handlePayment()}
              >Pay</button>
              <button className='w-full rounded-lg text-[1.1em] hover:border-2 hover:bg-white mx-auto h-[50px]  md:w-[40%]'>Cancel Payment</button>
            </div>
            <div className='flex justify-center mt-5'>
              <img src={Visa} alt="" />
              <img src={Amex} alt="" />
              <img src={Master} alt="" />
              <img src={MasterSecure} alt="" />
              <img src={VisaSecure} alt="" />
            </div>
        </div>) : ( <div className="text-center mt-32">
          <h2 className="text-2xl font-bold text-green-600">Payment Confirmed</h2>
          <p className="text-gray-700 my-4">
            Thank you for your payment. Your transaction has been successfully processed.
            </p>
            <button className=" w-[80%] mt-10 bg-green-600 py-4 text-[1.3em] rounded-lg text-white"
              onClick={() => navigate('/home')}
            >Return to Main Page</button>
        </div>
          )}
      </div>
    </div>
  )
}

export default Payment