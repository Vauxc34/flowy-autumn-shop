import React from 'react'

export const Product = ({product, onAddToCart}) => {

    console.log(product)

    return (
        <>
        <div className="item" item={product.id}>
        <img className="product-image" /* src={product.image} */ />
        <div className="product-container">
        <div className="container-for-desc-item">
        <h1>{product.name}</h1>
        <p dangerouslySetInnerHTML={{__html: product.description }} />
        </div>
        <div className="container-for-cart-btn">

        <div className="cart-btn" onClick={() => onAddToCart(product.id, 1)}>

        </div>

        </div>
        
        </div>
         
        </div>
        
        </>
    )
}

export default Product