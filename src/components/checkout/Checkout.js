import { useState, useEffect } from 'react'
import React from 'react'
import {useNavigate} from 'react-router-dom';

import { AddressForm } from './AddressForm'
import { Confirmation } from './Confirmation'
import PaymentForm from './PaymentForm'

import ArrowSteps from '../../images/arrow-steps.svg'
import CartImg from '../../images/Cart.svg'
import ArrowGreen from '../../images/ChevronDowngreen.svg'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = ({ User }) => {

  const [CartDetails, setCartDetails] = useState([])
  const [OverallPrice, setOverallPrice] = useState(0)

    useEffect(() => {
      if(User) {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${User.cartId}`, {
          method: 'GET',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }        
          }).then(res => res.json()).then(data => setCartDetails(JSON.parse(data.content[0][0].products))) 
      } else { }
    }, [])

    useEffect(() => {
      if(CartDetails) {
      let Test = CartDetails.map(item => { return { overall_price_for_item: item.price * item.quantity }})
      setOverallPrice((Test.reduce((a,v) =>  a = a + v.overall_price_for_item , 0 )))
      } else {  }
    }, [CartDetails]) 

    const [userBillingInfo, setUserBillingInfo] = useState([])
    const [SelectedRegions, setSelectedRegions] = useState('')
    const [PurchaseMethod, setPurchaseMethod] = useState([])

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const navigate = useNavigate()
      
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const setter = () => { setCheckoutToken(1) }

    useEffect(() => { setter() })

    const next = (data) => { nextStep() }

    const Form = () => activeStep == 0
    ? <AddressForm checkoutToken={checkoutToken} setCheckoutToken={setCheckoutToken} 
      next={next}
      userBillingInfo={userBillingInfo} 
      setUserBillingInfo={setUserBillingInfo}
      SelectedRegions={SelectedRegions}
      setSelectedRegions={setSelectedRegions}
      /> : <PaymentForm 
      userBillingInfo={userBillingInfo} 
      PurchaseMethod={PurchaseMethod} 
      checkoutToken={checkoutToken} 
      setActiveStep={setActiveStep}
      SelectedRegions={SelectedRegions}
      setSelectedRegions={setSelectedRegions}
      backStep={backStep} 
      nextStep={nextStep}
      OverallPrice={OverallPrice} User={User}/>

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
             <div className="Container-for-h4" style={{ width: '230px' }}>
                 <h4>Koszyk</h4>
                 <img src={ArrowSteps}></img>
                 <h4>Wysyłka</h4>
                 <img src={ArrowSteps}></img>
                 <h4>Płatność</h4>
              </div>
            <div className="payment-form-container"></div>
             </div>
             {activeStep == steps.length ? <Confirmation /> : checkoutToken && <Form />}
         </div>   
        </>
    )
}
