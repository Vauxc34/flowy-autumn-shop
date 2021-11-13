import { useState, useEffect } from 'react'
import React from 'react'

import {useNavigate} from 'react-router-dom';

import { commerce } from '../../lib/commerce'
import { AddressForm } from './AddressForm'
import PaymentForm from './PaymentForm'
import { Confirmation } from './Confirmation'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setshippingData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (cart.id) {
          const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
    
              setCheckoutToken(token);
            } catch (error) {
              navigate.pushState('/');
            }
          };
    
          generateToken();
        }
      }, [cart]);
      
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
             <div className="container-for-payment-steps">  
             <div className="Container-for-h4">
                 <h4>Podsumowanie:</h4>
                 </div>
            <div className="payment-form-container">
             {steps.map((step) => ( 
             <div className="payment-form" key={step}>
                 <label className="step-payment" activeStep={0}></label>
                <label className="step-payment-name" >{step}</label> 
             </div>  
             ))}
             </div>
             </div>
             {activeStep == steps.length ? <Confirmation /> : checkoutToken && <Form />}
         </div>   
        </>
    )
}
