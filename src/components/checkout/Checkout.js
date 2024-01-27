import { useState, useEffect, useContext } from 'react'
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import { AddressForm } from './AddressForm'
import { Confirmation } from './Confirmation'
import PaymentForm from './PaymentForm'
import { ShipingForm } from './ShipingForm'
import { CartContext } from '../../CartProvider';

import ArrowSteps from '../../images/arrow-steps.svg'
import CartImg from '../../images/Cart.svg'
import ArrowGreen from '../../images/ChevronDowngreen.svg'

const steps = ['Adres dostawy', 'Szczegóły płatności']

export const Checkout = ({ User, Language, English, Polish }) => {

  let OrderActualId =  Math.floor(Math.random() * 9999)

  const [OverallPrice, setOverallPrice] = useState(0)
  const cartContext = useContext(CartContext);
  const { FetchCart, userCartContent, ApplyingCouponFunction, GettingInfoAboutCart, isCouponApplied } = cartContext;

    useEffect(() => {
      if(User) {
        FetchCart(User.cartId) 
      } else { }
    }, [])

    useEffect(() => {
      if(userCartContent) {
      let Test = userCartContent.map(item => { return { overall_price_for_item: item.price * item.quantity }})
      setOverallPrice((Test.reduce((a,v) =>  a = a + v.overall_price_for_item , 0 )))
      } else {  }
    }, [userCartContent]) 

    const [userBillingInfo, setUserBillingInfo] = useState([])
    const [PurchaseMethod, setPurchaseMethod] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
 
    const next = (data) => { nextStep() }
  
    const CouponCode = ({idProd, Price, Quantity, item}) => {

      const [PromoCode, setPromoCode] = useState('')

      const SingleItem = ({idProd, Price, Quantity, item}) => {

        const [SingleData, setSingleData] = useState({})

        useEffect(() => { 
   
            fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${idProd}`, {
              method: 'GET',  
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }        
              }).then(res => res.json()).then(data => setSingleData(data.prod)) 
   
        }, [idProd])

        return (
          <div className='item-coupon'>
   <div className="container-for-etc" style={{ flexWrap: 'no-wrap', display: 'grid', gridTemplateColumns: 'auto auto' }}>
   <div className='row-for-etc'>
   <div className="product-image-cart" style={{ backgroundImage: `url(${SingleData.image})` }}></div>
   </div>
   
   <div className='row-for-etc' style={{ flexWrap: 'no-wrap' }}>
   <div className="container-for-item-name-h4" style={{ justifyContent: 'flex-start' }}>

   <h4 className='container-for-item-name-h4'>
   <h4 style={{ textAlign: 'right' }}>{SingleData.name}</h4>               
  </h4>
  <h4 className='container-for-item-name-h4'>
  <h3  style={{ margin: '0px 0', padding: '0' }}>{Language == 'PL' ? Polish.price : Language == 'EN' ? English.price : 'Cena' }: {Price}</h3>
  </h4>
  <h4 className='container-for-item-name-h4'>
  <h2>{Language == 'PL' ? Polish.quantity : Language == 'EN' ? English.quantity : 'Ilość' }: {Quantity}</h2>
  </h4>
   </div>
   </div>
        </div>  
          </div>
        )

      }

      useEffect(() => {
        if(User) {
          GettingInfoAboutCart(User.cartId)
        }
      }, [User])

      const ApplyCoupon = () => {   
        if(PromoCode == 'CUT50' && isCouponApplied == 0) {

          function replaceValues(object) {
            return {
              id: object.id,
              quantity: object.quantity, 
              price: Math.floor(object.price /2)
            };
          }
  
          let newArray = userCartContent.map(replaceValues);   
          let Query = `UPDATE carts SET products = '${JSON.stringify(newArray)}', coupon_applied= 1 WHERE idUser = ${User.id}`
          ApplyingCouponFunction(Query)

          toast.success(Language == 'PL' ? 'Uzyto kodu' : Language == 'EN' ? 'You used code' : 'Uzyto kodu')
          window.location.reload()

        } else if (PromoCode == 'CUT75' && isCouponApplied == 0) {

          function replaceValues(object) {
            return {
              id: object.id,
              quantity: object.quantity, 
              price: Math.floor(object.price /3)
            };
          }
  
          let newArray = userCartContent.map(replaceValues);   
          let Query = `UPDATE carts SET products = '${JSON.stringify(newArray)}', coupon_applied= 1 WHERE idUser = ${User.id}`
          ApplyingCouponFunction(Query)

          toast.success(Language == 'PL' ? 'Uzyto kodu' : Language == 'EN' ? 'You used code' : 'Uzyto kodu')
          window.location.reload()

        } else if (PromoCode != 'CUT50' || PromoCode != 'CUT75' && isCouponApplied == 0) { toast.error(Language == 'PL' ? 'Wprowadzono zly kod' : Language == 'EN' ? 'You entered wrong code' : 'Wprowadzono zly kod')} else if (isCouponApplied == 1) { toast.error(Language == 'PL' ? 'Uzyto kodu' : Language == 'EN' ? 'You used code' : 'Uzyto kodu')}
      }

      return (

        <div class="startup-screen coupon-area" style={{ background: "rgba(200, 37, 135, 0.1215686275)" }}>

        <div class="widget-description" style={{ margin: '-4em 0px 0em', padding: '20px 0em' }}>
            <div class="description-box">
                <h1 style={{ margin: '20px 0 0px' }}> {Language == 'PL' ? Polish.discount_header : Language == 'EN' ? English.discount_header : 'Masz znizke?' }</h1>

                <div style={{ display: 'flex', 
                flexDirection: 'column',
                width: window.innerWidth < 900 ? 'unset' : '110%', 
                margin: '20px' }}>

                  {userCartContent.map(item => <SingleItem idProd={item.id} Price={item.price} Quantity={item.quantity} item={item} /> )} 

                  <hr></hr>

                  <h3 style={{ 
                    display: 'flex', 
                    margin: '.5em 0em',
                    justifyContent: 'space-between',
                    padding: 0
                     }}>{Language == 'PL' ? Polish.overall : Language == 'EN' ? English.overall : 'Calosc' }
                     : <h4>{OverallPrice}</h4></h3>

                  <hr></hr>

                  <div style={{ display: 'flex', margin: '20px 0' }}>
                  <input 
                  placeholder='PROMO15' 
                  maxLength={8} 
                  onChange={(e) => { setPromoCode(e.target.value) }}
                  value={PromoCode}
                  className="input-form-address" style={{ margin: '0', height: '100%', textTransform: 'uppercase' }} required />
                  <button onClick={ApplyCoupon} class="site-btn" style={{ fontSize: '14px', height: '40px' }}>
                  {Language == 'PL' ? Polish.discount_btn : Language == 'EN' ? English.discount_btn : 'Dodaj kod' }</button>
                  </div>
                  

                </div>
            

            </div>

         
        </div>

    </div>

      )

    }

    const Form = () => <div className="checkout-splash-screen" 
    style={{ flexDirection: `${window.innerWidth < 599 ? 'column' : activeStep == 3 ? 'column' : 'row'}` }}
    > {activeStep == 0 ? <AddressForm 
      Language={Language}
      English={English}
      Polish={Polish}
      checkoutToken={checkoutToken} 
      setCheckoutToken={setCheckoutToken} 
      nextStep={nextStep}
      next={next}
      userBillingInfo={userBillingInfo} 
      setUserBillingInfo={setUserBillingInfo}
      /> : activeStep == 1 ? <ShipingForm 
      Language={Language}
      English={English}
      Polish={Polish}
      next={next}
      nextStep={nextStep}
      setActiveStep={setActiveStep} 
      userBillingInfo={userBillingInfo} 
      setUserBillingInfo={setUserBillingInfo} 
      /> : <PaymentForm 
      Language={Language}
      English={English}
      Polish={Polish}
      OrderActualId={OrderActualId}
      userBillingInfo={userBillingInfo} 
      PurchaseMethod={PurchaseMethod} 
      checkoutToken={checkoutToken} 
      setActiveStep={setActiveStep} 
      backStep={backStep} 
      nextStep={nextStep}
      OverallPrice={OverallPrice} 
      User={User}/>}
      <div style={{ width: '100vw', display: `${activeStep == 3 ? 'none' : 'flex'}` }}>
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
                 <h4 style={{ fontWeight: activeStep == 0 ? 600 : 400 }}>{Language == 'PL' ? Polish.cart : Language == 'EN' ? English.cart : "Koszyk"}</h4>
                 <img src={ArrowSteps}></img>
                 <h4 style={{ fontWeight: activeStep == 1 ? 600 : 400 }}>{Language == 'PL' ? Polish.shipment : Language == 'EN' ? English.shipment : "Wysyłka"}</h4>
                 <img src={ArrowSteps}></img>
                 <h4 style={{ fontWeight: activeStep == 2 ? 600 : 400 }} >{Language == 'PL' ? Polish.payment : Language == 'EN' ? English.payment : "Płatność"}</h4>
              </div>
            <div className="payment-form-container"></div>
             </div>
             {<Form />}
         </div>   
        </>
    )
}
