import React from 'react'

export const Product = ({product, onAddToCart}) => {

    console.log(product)

    return (
        
        <div className="item" item={product.id}>
        <div className="product-container">
        <img className="product-image" /* src={product.image} */ />
        <h1>{product.name}</h1>
        <p dangerouslySetInnerHTML={{__html: product.description }} />
        <div className="cart-btn" onClick={() => onAddToCart(product.id, 1)}></div>
        </div> 
        </div>
        
    )
}

export default Product