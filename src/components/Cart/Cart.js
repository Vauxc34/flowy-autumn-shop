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
        <h1>Możliwe, że zapomniałeś czegoś dodać do koszyka ;)</h1>
        </div>
        
    return (
        <div className="cart-itself">
            <img className="product-image" />
            
            <h1>Your cart items</h1>
            <a>Back to shopping</a>

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
            </h1>
            <span>Tax and shipping cost will be calculated later</span>
            <button className="checkout-btns first" ><Link to='/checkout'>idź do kasy</Link></button>
            <button className="checkout-btns first" onClick={handleEmptyCart}>pusty koszyk</button>
            </div>
        </div>
    )
}
