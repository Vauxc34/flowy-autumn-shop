import React from 'react'

import {Link}  from 'react-router-dom'

import CartItem from './CartItem/CartItem'

export const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const EmptyCart = () => (
        <h2 style="color:white;">kup se coś, <Link to='/'>ok?</Link></h2>
    )

    const FilledCart = () => (
        <>
        <div className="container-of-filled-cart">
            {cart.line_items.map((item) => (
                <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
            ))}
        </div>
        </>
    )

    if(!cart.line_items) return <div className="else-message-container">
        <h1>Nie znaleziono przedmiotów w twoim koszyku</h1>
        </div>
        
    return (
        <div className="cart-itself">
            
            <div className='cart-mess'>
            <h1>Your cart items</h1>
            <a>Back to shopping</a>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Product</h3>
                <h3>Price</h3>
            </div>
            <hr className='product-line'></hr>

            {!cart.line_items ? <EmptyCart/> : <FilledCart /> }
            <div className="container-for-a-cart-options">
            <h1>Sub-total: 
                <p>
                {cart.subtotal.formatted_with_symbol}
                </p>
                <span>Tax and shipping cost will be calculated later</span>
            </h1>
            <button className="site-btn" ><Link to='/sposoby-dostawy-i-platnosci'>idź do kasy</Link></button>
            <button className="site-btn" onClick={handleEmptyCart}>pusty koszyk</button>
            </div>
        </div>
    )
}
