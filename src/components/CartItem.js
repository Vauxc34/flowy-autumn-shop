import React from 'react'

const CartItem = () => { 

    return (
        <>
        <div className="cart-item-itself">
        <div className="container-for-etc">
        
        <img className="product-image-cart" src="" />
        
        <div className='row-for-etc'>

        <div className="container-for-item-name-h4">
        <h4>Lorem ipsum thing</h4>
        <span>43423</span>  
        </div>
        <div className="container-for-item-price-h4">
        <a>remove</a>      
        <div className='quantity-box-container'>
        <p>Quantity</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div className='p__'>+</div>
        <span className='p_quantity-itself' />
        <div className='p__'>-</div>
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
