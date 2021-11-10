import { useState } from 'react'
import React from 'react'

const steps = ['Shippting address', 'Payment Details']

export const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0)

    return (
        <>
         <div className="checkout-itself">
             <h4>Podsumowanie:</h4>  
             {steps.map((step) => ( 
             <form key={step}>
                 <label activeStep={0}></label>
                <label>{step}</label> 
             </form>  
             ))}
         </div>   
        </>
    )
}
