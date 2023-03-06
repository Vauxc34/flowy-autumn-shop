import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Review from './Review'

const PaymentForm = ({userBillingInfo}) => {

  const location = useLocation()

  const [CreditCardNumber, setCreditCardNumber] = useState()

  const PayForIt = (e) => {  e.preventDefault()
     fetch('http://candle-af-shop.appspot.com/pay', { method: "POST" }).then(data => console.log(data.json())) }
  
     console.log(userBillingInfo)

  return (
    <>
    <Review 
    CreditCardNumber={CreditCardNumber} 
    setCreditCardNumber={setCreditCardNumber}
    />
        
          <form className='stripe-card-area' onSubmit={PayForIt} >
            
            <br /> <br />
            <div className="checkout-btn-container">
            <a onClick={() => window.location.href= "/"} style={{ textAlign: 'center' }} className='site-btn'>Powrót na stronę główną</a>
            <button  onClick={() => window.location.href= "/confirmation-order"} className='site-btn'>Zapłać</button>
            </div>
          </form>
        
    
    </>
  );
};

export default PaymentForm;