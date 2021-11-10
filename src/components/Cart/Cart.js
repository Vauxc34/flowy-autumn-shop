import React from 'react'

import Route from 'react-router-dom'

import { Router, Routes, Link } from 'react-router-dom'

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

    if(!cart.line_items) return 'Loading...'

    return (
        <div className="cart-itself">
            <h1>your shopping cart</h1>
            {!cart.line_items ? <EmptyCart/> : <FilledCart /> }
            <h1>Całość: 
                <p>
                {cart.subtotal.formatted_with_symbol}
                </p>
            </h1>
            <div className="container-for-a-cart-options">
            <input type="button" value="pusty koszyk" onClick={handleEmptyCart}/>
            <input component={Link} to='/checkout'  type="button" value="idź do kasy"/>

            </div>
        </div>
    )
}
