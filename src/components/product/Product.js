import React from 'react'

export const Product = ({product, onAddToCart}) => {

    console.log(product)

    return (
        <>
        {/*<div class="product-itself" item={product.id}>
        <div class="product-img" style={{ background: product.image.url }} ></div>
        <div class="description-box-product" onClick={() => onAddToCart(product.id, 1)}>
        <h5 class="title-product">{product.name}</h5>
        <span dangerouslySetInnerHTML={{__html: product.price.formatted_with_code }} class="price-product" />
        </div>
        </div> */}
        </>
    )
}

export default Product