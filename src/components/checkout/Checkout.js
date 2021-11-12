import { useState, useEffect } from 'react'
import React from 'react'

import { commerce } from '../../lib/commerce'
import { AddressForm } from './AddressForm'
import { PaymentForm } from './PaymentForm'
import {Confirmation } from './Confirmation'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = ({cart}) => {

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)

    useEffect(() => {

    const generateToken = async() => {
        try{
            const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})

            console.log(token)

            setCheckoutToken(token)
        } catch (error) {

        }
    }

    generateToken()

    }, [])

    const Form = () => activeStep == 0
    ? <AddressForm checkoutToken={checkoutToken}/>
    : <PaymentForm/>

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
