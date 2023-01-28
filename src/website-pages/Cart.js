import React from 'react'
import { useNavigate } from 'react-router-dom'

import {Link}  from 'react-router-dom'

import CartItem from '../components/cart/CartItem'

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
        <div className="cart-itself">
            
            <div className='cart-mess'>
            <h1>Twój koszyk z zakupami</h1>
            <h2>Wróć do <Link to='/'>produktów</Link></h2>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Produkt i jego szczegóły</h3>
                <h3>Cena</h3>
            </div>
            <hr className='product-line'></hr>
            
            <div className="container-for-a-cart-options">
            <h1>Całość: 
                
                <span>Każde zamówienie, VAT i inne podatki będzie miało doliczone</span>
            </h1>
            <button className="site-btn" onClick={GoPay}>Przejście do kasy</button>
            <button className="site-btn" onClick="">Opróżnij koszyk ❌</button>
            </div>
        </div>
    )
}
