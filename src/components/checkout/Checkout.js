import { useState } from 'react'
import React from 'react'

import { AddressForm } from './AddressForm'
import { PaymentForm } from './PaymentForm'
import {Confirmation } from './Confirmation'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0)



    const Form = () => activeStep == 0
    ? <AddressForm/>
    : <PaymentForm/>

    return (
        <>
         <div className="checkout-itself">
             <h4>Podsumowanie:</h4>
             <div className="container-for-payment-steps">  
             {steps.map((step) => ( 
             <div className="payment-form" key={step}>
                 <label className="step-payment" activeStep={0}></label>
                <label className="step-payment-name" >{step}</label> 
             </div>  
             ))}
             </div>
             {activeStep == steps.length ? <Confirmation /> : <Form />}
         </div>   
        </>
    )
}
