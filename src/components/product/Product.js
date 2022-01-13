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
        <div className="product-container" onClick={() => onAddToCart(product.id, 1)}>
        <h1>{product.name}</h1>
        <span dangerouslySetInnerHTML={{__html: product.price.formatted_with_code }} />
        {/*<p dangerouslySetInnerHTML={{__html: product.description }} />*/}
        {/*<div className="btn" onClick={() => onAddToCart(product.id, 1)}>
        <FontAwesomeIcon className="icon shopping" icon={faHeart} />
        </div>*/}
        </div>
        
        </div>
        
        </>
    )
}

export default Product