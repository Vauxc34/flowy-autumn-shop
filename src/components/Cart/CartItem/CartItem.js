import React from 'react'

const CartItem = ({ item, handleUpdateCartQty, onRemoveFromCart }) => { 

    return (
        <>
        <div className="cart-item-itself">
        <div className="container-for-etc">
        
        <img className="product-image-cart" src={item.image.url} />
        
        <div className='row-for-etc'>

        <div className="container-for-item-name-h4">
        <h4>{item.name}</h4>
        <span>{item.line_total.formatted_with_symbol}</span>  
        </div>
        <div className="container-for-item-price-h4">
        <a onClick={() => onRemoveFromCart(item.id)}>remove</a>      
        <div className='quantity-box-container'>
        <p>Quantity</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} className='p__'>+</div>
        <span className='p_quantity-itself' dangerouslySetInnerHTML={{__html:item.quantity}} />
        <div onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} className='p__'>-</div>
        </div>
        </div>
        </div>
        </div>

        </div>

        </div>
        
        </div>
        <hr></hr>
        </>
    )
}

export default CartItem
