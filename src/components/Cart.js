import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import {Link}  from 'react-router-dom'

import CartItem from './CartItem'

export const Cart = () => {

    const navigate = useNavigate()

    const EmptyCart = () => (
        <></>
    )

    const FilledCart = () => (
        <></>
    )

    function GoPay() {
        navigate('/sposoby-dostawy-i-platnosci')
    }
        
    return (
        <motion.div className="cart-itself"
        initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
        >
            
            <div className='cart-mess'>
            <h1>Twój koszyk z zakupami</h1>
            <h2>Wróć do <Link to='/'>produktów</Link></h2>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Produkt i jego szczegóły</h3>
                <h3>Cena</h3>
            </div>
            <hr className='product-line'></hr>

            <div className="cart-item-itself">
        <div className="container-for-etc">

        <div className='row-for-etc'>
        <img className="product-image-cart" src="https://images.unsplash.com/photo-1676056583299-f9aa9300b9db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
        </div>
        
        <div className='row-for-etc'>

        <div className="container-for-item-name-h4">
        <h4>Lorem ipsum thing</h4>
        <span>9.99 zł</span>  
        </div>
        <div className="container-for-item-name-h4">
        <a className='site-btn'>usuń</a>      
        <div className='quantity-box-container'>
        <p>Ilość</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div className='p__'>+</div>
        <span className='p_quantity-itself'>34</span>
        <div className='p__'>-</div>
        </div>
        </div>
        </div>
        </div>

        </div>

            </div></div> 
            
            <div className="container-for-a-cart-options">
            <h1>Całość: 
                
                <span>Każde zamówienie, VAT i inne podatki będzie miało doliczone</span>
            </h1>
            <button className="site-btn" onClick={GoPay}>Przejście do kasy</button>
            <button className="site-btn" onClick="">Opróżnij koszyk ❌</button>
            </div>
        </motion.div>
    )
}
