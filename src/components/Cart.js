import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom' 
import {Link}  from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

import { CartContext } from '../CartProvider'

export const Cart = ({ User, Language, English, Polish }) => {

    const navigate = useNavigate() 
    const [HideContent, setHideContent] = useState(false)
    const [OverallPrice, setOverallPrice] = useState(0) 

    const cartContext = useContext(CartContext);
    const { FetchCart, 
      userCartContent, 
      RemovingProductInAcartFunction,
      AdddingProductInAcartFunction,
      CleaningCartFunction,
    } = cartContext;

    useEffect(() => {
      if(User) { FetchCart(User.cartId) } else {}
    }, [User]) 

    useEffect(() => {
        if(userCartContent != []) { 
          let Arr = userCartContent.map(item => { return { overall_price_for_item: item.price * item.quantity }})
          setOverallPrice((Arr.reduce((a,v) =>  a = a + v.overall_price_for_item , 0 ))) 
        } else {  }
    }, [userCartContent])

    const CleaningCart = () => {
      CleaningCartFunction(User.cartId)
      setHideContent(true)
      setOverallPrice(0)
    }
   
    const Item = ({idProd, quantityU, PPrice}) => {
        
        const [singleProdDetails, setSingleProdDetails] = useState({}); 

        const RemovingProductInAcart = () => {   
          let CartId = User.cartId
          let IdProduct = idProd
          let foundIndex = userCartContent.findIndex(x => x.id == idProd)   
          let QuantityUserProd = quantityU
          let ProductPrice = PPrice
          RemovingProductInAcartFunction(CartId, IdProduct, foundIndex, QuantityUserProd, ProductPrice)
        }

        const AdddingProductInAcart = async () => { 
          let CartId = User.cartId
          let IdProduct = idProd
          let foundIndex = userCartContent.findIndex(x => x.id == idProd)   
          let QuantityUserProd = quantityU
          let ProductPrice = PPrice
          AdddingProductInAcartFunction(CartId, IdProduct, foundIndex, QuantityUserProd, ProductPrice)
        }  

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${idProd}`).then
              (response => setSingleProdDetails(response.data.prod))
               
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          };
      
          fetchData();
        }, [idProd]); 
        
        return (

            <div className="cart-item-itself">
            <div className="container-for-etc">
            <div className='row-for-etc'>
            <div className="product-image-cart" style={{ backgroundImage: `url(${singleProdDetails.image})` }}></div>
            </div>
            <div className='row-for-etc'>
            <div className="container-for-item-name-h4">
            <h4>{singleProdDetails.name}</h4>
            <span></span>  
            </div>
            <div className="container-for-item-name-h4">

            {/* <a className='site-btn'>usuń</a> */}
            
            <div className='quantity-box-container'>
            <p>{singleProdDetails.price} zl</p>
            <div className='quantity-box'>
            <div className='select-item-quantity'>
               
              <div onClick={AdddingProductInAcart} value="+" className='p__'>+</div>
              <span className='p_quantity-itself' >{quantityU}</span> 
              <div onClick={RemovingProductInAcart} value="-" className='p__' >-</div>
               
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

        )
 

    } 

    return (
        <motion.div className="cart-itself" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {User ? <>
            <div className='cart-mess'>
            <h1>{Language == 'PL' ? Polish.cart_details_big_heading : Language == 'EN' ? English.cart_details_big_heading : 'Twój koszyk z zakupami' }</h1>
            <h2>
            {Language == 'PL' ? 'Wróć do' : Language == 'EN' ? "Back to"  : 'Wróć do' }
               <Link to='/'> 
               {Language == 'PL' ? ' produktów' : Language == 'EN' ? " products"  : ' produktów' }</Link></h2>
            </div>
            <div className='label-for-cart-prod'>
                <h3>{Language == 'PL' ? Polish.cart_details_heading_1 : Language == 'EN' ? English.cart_details_heading_1 : 'Produkt i jego szczegóły' }</h3>
                <h3>{Language == 'PL' ? Polish.price : Language == 'EN' ? English.price : 'Cena' }</h3>
            </div>
            <hr className='product-line'></hr>
            {HideContent ? null : userCartContent.map(item => <Item idProd={item.id} quantityU={item.quantity} PPrice={item.price}/>)}
            <div className="container-for-a-cart-options">
            <h1>{Language == 'PL' ? Polish.overall : Language == 'EN' ? English.overall : 'Całość' }: {User ? OverallPrice : 0} zl<span>
            {Language == 'PL' ? Polish.overall_subheader : Language == 'EN' ? English.overall_subheader : 'Każde zamówienie, VAT i inne podatki będzie miało doliczone' }</span></h1>

            {HideContent || userCartContent.length == 0 ? <button className="site-btn" onClick={() => navigate('/')} >
            {Language == 'PL' ? 'Wroc na sklep' : Language == 'EN' ? 'Back to the store' : 'Wroc na sklep' }
            </button> : <>
            <button className="site-btn" onClick={() => navigate('/sposoby-dostawy-i-platnosci')}>
            {Language == 'PL' ? Polish.cart_go_into_btn : Language == 'EN' ? English.cart_go_into_btn : 'Przejście do kasy' }</button>
            <button className="site-btn" onClick={CleaningCart}>
            {Language == 'PL' ? Polish.deletion_cart : Language == 'EN' ? English.deletion_cart : 'Opróżnij koszyk' } ❌</button>
            </> }
            
            </div>
            </> : <>

        <div className="startup-screen" id="logout">
        <div className="widget-description">
       
       <form style={{ textAlign: 'center' }}>
           
       <h1>Zaloguj sie</h1>

       {/*<img style={{ height: '17.5em', width: '15em', margin: '4vh', alignSelf: 'center' }} src=''></img>*/}

       <h2>w celu dokonania zakupow</h2>

       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>

       <button onClick={() =>  navigate("/logowanie") } style={{maxWidth: '50%', alignSelf: 'center', margin: '1em .5em .5em 0em', padding: '.5em' }} class="site-btn">Logowanie</button>
       <button onClick={() =>  navigate("/rejestracja") } style={{maxWidth: '50%', alignSelf: 'center', margin: '.5em .5em 0em 0em', padding: '.5em' }} class="site-btn">Rejestracja</button>

       </div>
      
     
       </form>
     
     </div>
    </div>

            </>}

            <ToastContainer/>
        </motion.div>
    )
}
