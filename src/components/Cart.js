import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import {Link}  from 'react-router-dom'

import CartItem from './CartItem'

export const Cart = () => {

    let idUser = 'qcC6uukDcp0yS7BkK0bf'
    let idItem = '2gAxrck3XnTpZv0cZLbV'

    const navigate = useNavigate()

    const [CartArray, setCartArray] = useState([])

    function GoPay() {
        navigate('/sposoby-dostawy-i-platnosci')
    }
    
    useEffect(() => {
    fetch('http://localhost:8080/cart/see-cart/' + idUser, {method: 'POST'}).then(data =>  data.json()).then(some => setCartArray(some))
    }, [CartArray])

    return (
        <motion.div className="cart-itself" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='cart-mess'>
            <h1>Twój koszyk z zakupami</h1>
            <h2>Wróć do <Link to='/'>produktów</Link></h2>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Produkt i jego szczegóły</h3>
                <h3>Cena</h3>
            </div>
            <hr className='product-line'></hr>

            {CartArray.map(item => <div className="cart-item-itself">
        <div className="container-for-etc">

        <div className='row-for-etc'>
        <img className="product-image-cart" src={item._fieldsProto.ImageProd.stringValue} />
        </div>
        
        <div className='row-for-etc'>

        <div className="container-for-item-name-h4">
        <h4>{item._fieldsProto.NameProduct.stringValue}</h4>
        <span>{item._fieldsProto.ProdQuantity.stringValue}</span>  
        </div>
        <div className="container-for-item-name-h4">
        <a className='site-btn'>usuń</a>      
        <div className='quantity-box-container'>
        <p>{item._fieldsProto.PriceProduct.stringValue}</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div className='p__'>+</div>
        <span className='p_quantity-itself'>{item._fieldsProto.ProdQuantity.integerValue}</span>
        <div className='p__'>-</div>
        </div>
        </div>
        </div>
        </div>

        </div>

</div>
            </div> )}
            
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
