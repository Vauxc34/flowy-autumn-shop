import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import {Link}  from 'react-router-dom'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

export const Cart = ({ User }) => {

    const navigate = useNavigate()

    const [CartArray, setCartArray] = useState([])

    function GoPay() {
        navigate('/sposoby-dostawy-i-platnosci')
    }

    return (
        <motion.div className="cart-itself" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {User ? <>
            


                <div className='cart-mess'>
            <h1>Twój koszyk z zakupami</h1>
            <h2>Wróć do <Link to='/'>produktów</Link></h2>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Produkt i jego szczegóły</h3>
                <h3>Cena</h3>
            </div>
            <hr className='product-line'></hr>

            {/*

                 <div className="cart-item-itself">
        <div className="container-for-etc">

        <div className='row-for-etc'>
        <img className="product-image-cart" src='' />
        </div>
        
        <div className='row-for-etc'>

        <div className="container-for-item-name-h4">
        <h4>nazwa produktu</h4>
        <span>99</span>  
        </div>
        <div className="container-for-item-name-h4">
        <a className='site-btn'>usuń</a>      
        <div className='quantity-box-container'>
        <p>99 zl</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div className='p__'>+</div>
        <span className='p_quantity-itself'>99</span>
        <div className='p__'>-</div>
        </div>
        </div>
        </div>
        </div>

        </div>

</div>
            </div> 

            */}

            
            
            <div className="container-for-a-cart-options">
            <h1>Całość: 
                
                <span>Każde zamówienie, VAT i inne podatki będzie miało doliczone</span>
            </h1>
            <button className="site-btn">Przejście do kasy</button>
            <button className="site-btn" onClick="">Opróżnij koszyk ❌</button>
            </div>

            </> :  <>

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

</>
 
            }



        </motion.div>
    )
}
