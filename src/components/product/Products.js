import React from 'react'
import Product from './Product'

import { Link } from 'react-router-dom'

const Products = ({products, onAddToCart}) => {
    
    return (
        <div className="product-page">
        <div className="Widget-container-first">
            
            <div className="BackdropWithDescription">
            <span>🌱</span>
            <h1>The nature candle</h1>
            <p>
                All handmade with natural soy wax, Candleaf is a companion for all your 
                pleasure moments
            </p>
            <button>
                <Link exact path to='/sklep'>Discovery our collection</Link>
            </button>
            </div>

            </div>
        {products.map((product) => (
            
            <Product product={product} onAddToCart={onAddToCart}/>
            
        ))}
        
        </div>
       
    )
}

export default Products
