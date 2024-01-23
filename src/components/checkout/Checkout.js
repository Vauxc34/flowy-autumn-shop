import { useState, useEffect } from 'react'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddressForm } from './AddressForm'
import { Confirmation } from './Confirmation'
import PaymentForm from './PaymentForm'
import { ShipingForm } from './ShipingForm'

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
    const [PurchaseMethod, setPurchaseMethod] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [isPromoCodeAdded, setIsPromoCodeAdded] = useState(false)

    useEffect(() => {
        const isPassed = localStorage.getItem('isPromoCodeAdded');
        if(isPassed) {
          setIsPromoCodeAdded(JSON.parse(isPassed))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isPromoCodeAdded', isPromoCodeAdded)
    }) 

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
 
    const next = (data) => { nextStep() }
  
    const CouponCode = ({idProd, Price, Quantity, item}) => {

      const [PromoCode, setPromoCode] = useState('')

      const SingleItem = ({idProd, Price, Quantity, item}) => {

        const [SingleData, setSingleData] = useState({})

        useEffect(() => { 
          if(idProd) {
            fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${idProd}`, {
              method: 'GET',  
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }        
              }).then(res => res.json()).then(data => setSingleData(data.prod)) 
          }
        }, [])

        return (
          <div className='item-coupon'>
                  <div className="container-for-etc" style={{ flexWrap: 'no-wrap', display: 'grid', gridTemplateColumns: 'auto auto' }}>
   <div className='row-for-etc'>
   <div className="product-image-cart" style={{ backgroundImage: `url(${SingleData.image})` }}></div>
   </div>
   
   <div className='row-for-etc' style={{ flexWrap: 'no-wrap' }}>
   <div className="container-for-item-name-h4" style={{ justifyContent: 'flex-start' }}>
   <h4>{SingleData.name}</h4>   
   <h3  style={{ margin: '0px 0', padding: '0' }}>Cena: {Price}</h3>
   <h2  style={{ margin: '5px 0', padding: '5px' }}>Ilość: {Quantity}</h2>
   </div>
   </div>
                  </div>  
          </div>
        )

      }

      const ApplyCoupon = () => {         
      if(PromoCode == 'CUT50' && isPromoCodeAdded == false) {

        setIsPromoCodeAdded(true)

        function replaceValues(object) {
          return {
            id: object.id,
            quantity: object.quantity, 
            price: Math.floor(object.price /2)
          };
        }

        let newArray = CartDetails.map(replaceValues);   
        let Query = `UPDATE carts SET products = '${JSON.stringify(newArray)}' WHERE idUser = ${User.id}`

        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/coupon`, {
          method: 'POST',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            Query: Query
          })})

          
          toast.success('Zanizono cene')

      } else if (PromoCode == 'CUT75' && isPromoCodeAdded == false) {

        function replaceValues(object) {
          return {
            id: object.id,
            quantity: object.quantity, 
            price: Math.floor(object.price /3)
          };
        }

        let newArray = CartDetails.map(replaceValues);   
        let Query = `UPDATE carts SET products = '${JSON.stringify(newArray)}' WHERE idUser = ${User.id}`

        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/coupon`, {
          method: 'POST',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            Query: Query
          })})

          setIsPromoCodeAdded(true)
          toast.success('Zanizono cene')

      } else if (isPromoCodeAdded == true) {

        toast.error('Juz wykorzystano kod')

      } else {

        toast.error('Nie wpisano kodu')

      }
      }

      return (

        <div class="startup-screen coupon-area" style={{ background: "rgba(200, 37, 135, 0.1215686275)" }}>

        <div class="widget-description" style={{ margin: '-4em 0px 0em', padding: '20px 0em' }}>
            <div class="description-box">
                <h1 style={{ margin: '20px 0 0px' }}>Masz znizke?</h1>

                <div style={{ display: 'flex', 
                flexDirection: 'column',
                width: '110%', 
                margin: '20px' }}>

                  {CartDetails.map(item => <SingleItem idProd={item.id} Price={item.price} Quantity={item.quantity} item={item} /> )} 

                  <hr></hr>

                  <h3 style={{ 
                    display: 'flex', 
                    margin: '.5em 0em',
                    justifyContent: 'space-between',
                    padding: 0
                     }}>Calosc: <h4>{OverallPrice}</h4></h3>

                  <hr></hr>

                  <div style={{ display: 'flex', margin: '20px 0' }}>
                  <input 
                  placeholder='PROMO15' 
                  maxLength={8} 
                  onChange={(e) => { setPromoCode(e.target.value)
                  }}
                  value={PromoCode}
                  className="input-form-address" style={{ margin: '0', height: '100%', textTransform: 'uppercase' }} required />
                  <button onClick={ApplyCoupon} class="site-btn" style={{ fontSize: '14px', height: '40px' }}>Dodaj kod</button>
                  </div>
                  

                </div>
            

            </div>

         
        </div>

    </div>

      )

    }

    const Form = () => <div className="checkout-splash-screen"> {activeStep == 0 ? <AddressForm 
      checkoutToken={checkoutToken} 
      setCheckoutToken={setCheckoutToken} 
      nextStep={nextStep}
      next={next}
      userBillingInfo={userBillingInfo} 
      setUserBillingInfo={setUserBillingInfo}
      /> : activeStep == 1 ? <ShipingForm 
      next={next}
      nextStep={nextStep}
      setActiveStep={setActiveStep} 
      userBillingInfo={userBillingInfo} 
      setUserBillingInfo={setUserBillingInfo} 
      /> : <PaymentForm 
      userBillingInfo={userBillingInfo} 
      PurchaseMethod={PurchaseMethod} 
      checkoutToken={checkoutToken} 
      setActiveStep={setActiveStep} 
      backStep={backStep} 
      nextStep={nextStep}
      OverallPrice={OverallPrice} 
      User={User}/>}
      <div style={{ width: '100vw' }}>

      <CouponCode/>

      </div>
      </div>

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
                 <h4 style={{ fontWeight: activeStep == 0 ? 600 : 400 }}>Koszyk</h4>
                 <img src={ArrowSteps}></img>
                 <h4 style={{ fontWeight: activeStep == 1 ? 600 : 400 }}>Wysyłka</h4>
                 <img src={ArrowSteps}></img>
                 <h4 style={{ fontWeight: activeStep == 2 ? 600 : 400 }} >Płatność</h4>
              </div>
            <div className="payment-form-container"></div>
             </div>
             {activeStep == 3 ? <Confirmation /> : <Form />}
         </div>   
        </>
    )
}
