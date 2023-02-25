import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Review from './Review'

const PaymentForm = () => {

  const location = useLocation()

  const [CreditCardNumber, setCreditCardNumber] = useState()

  const PayForIt = (e) => {  e.preventDefault()
     fetch('http://localhost:8080/pay/payment-basic', { method: "POST" }).then(data => console.log(data.json())) }
  
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