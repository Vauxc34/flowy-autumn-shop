import React from 'react'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => { 

    return (

        <div className="cart-item-itself">
        
        <h4>{item.name}</h4>
        <span>{item.line_total.formatted_with_symbol}</span>

        <div className="container-of-btn">
        <input type="button" className="btn-" value="-" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}/>
        <input type="button" className="btn--" value="+" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}/>
        </div>
        <input type="button" className="delete-item-btn" value="delete this" onClick={() => onRemoveFromCart(item.id)}/>
        </div>
    )
}

export default CartItem
