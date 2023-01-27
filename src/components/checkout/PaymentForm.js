import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';

import Review from './Review'

const PaymentForm = () => {

  return (
    <>
      <Review/>
      <Elements>
        <ElementsConsumer>
          <form className='stripe-card-area' >
            <CardElement />
            <br /> <br />
            <div className="checkout-btn-container">
              

            <button className='site-btn'>
            Back
            </button>

            <button className='site-btn' >
            Pay 435
            </button>

            </div>
          </form>
        
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;