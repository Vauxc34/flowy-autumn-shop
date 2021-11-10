import React from 'react'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => { 

    return (

        <div>
            
        <h4>{item.name}</h4>
        <h4>{item.line_total.formatted_with_symbol}</h4>

        <div className="container-of-btn">
        <input type="button" value="-" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}/>
        <input type="button" value="+" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}/>
        <input type="button" value="delete this" onClick={() => onRemoveFromCart(item.id)}/>
        </div>

        </div>
    )
}

export default CartItem
