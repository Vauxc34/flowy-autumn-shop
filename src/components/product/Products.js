import React from 'react'
import Product from './Product'

const Products = ({products, onAddToCart}) => {
    
    return (
        <div className="product-page">
        
        {products.map((product) => (
            
            <Product product={product} onAddToCart={onAddToCart}/>
            
        ))}
        
        </div>
       
    )
}

export default Products
