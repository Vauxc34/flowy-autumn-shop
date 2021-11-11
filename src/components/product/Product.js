import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export const Product = ({product, onAddToCart}) => {

    console.log(product)

    return (

        
        <>
        <div className="item" item={product.id}>
        <img className="product-image" src={product.image.url} />
        <div className="product-container">
        <p dangerouslySetInnerHTML={{__html: product.description }} />
        <div className="container-for-cart-btn">

        <div className="btn" onClick={() => onAddToCart(product.id, 1)}>
        <FontAwesomeIcon className="icon shopping" icon={faShoppingCart} />
        </div>
        <div className="btn" onClick={() => onAddToCart(product.id, 1)}>
        <FontAwesomeIcon className="icon shopping" icon={faHeart} />
        </div>

        </div>
        
        </div>
        <div className="container-for-desc-item">
        <h1>{product.name}</h1>
        </div>
        </div>
        
        </>
    )
}

export default Product