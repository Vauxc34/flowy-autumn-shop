import { useState, useEffect } from 'react'
import React from 'react'
import {useNavigate} from 'react-router-dom';

import { AddressForm } from './AddressForm'
import PaymentForm from './PaymentForm'
import { Confirmation } from './Confirmation'

import ArrowSteps from '../../images/arrow-steps.svg'

import CartImg from '../../images/Cart.svg'
import ArrowGreen from '../../images/ChevronDowngreen.svg'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setshippingData] = useState({})
    const navigate = useNavigate()
      
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setshippingData(data)

        nextStep()
    }

    const Form = () => activeStep == 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}  />

    return (
        <>
         <div className="checkout-itself">
           <div className='baner-checkout'>
            
            <img src={CartImg}></img>
             <h2>Twoje zamówienia</h2>
             <img src={ArrowGreen}></img>
             <span>9.99</span>
           </div>
             <div className="container-for-payment-steps">  
             <div className="Container-for-h4">
                 <h4>Koszyk</h4>
                 <img src={ArrowSteps}></img>
                 <h4>Wysyłka</h4>
                 <img src={ArrowSteps}></img>
                 <h4>Płatność</h4>
              </div>
            <div className="payment-form-container">
             
             </div>
             </div>
             {activeStep == steps.length ? <Confirmation /> : checkoutToken && <Form />}
         </div>   
        </>
    )
}
