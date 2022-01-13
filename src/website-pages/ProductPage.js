import React, {useState, useEffect} from 'react-dom'

/* image's */

import prodctPageImage from './images/prodct-page-image.svg'

/* */

const ProductPage = ({ products, product }) => {

    console.log(products)

return (
    <>

    <div className="product-page-main-container">

    <h1 className='product-title--'>Spiced Mint Candleaf®</h1>
    
    <img className='product-image--' src={prodctPageImage} />

    <div className='container-for-product-option'>
        
        <span className='price-etc'>$ 9.99</span>

        <div className='quantity-box-container'>
        <p>Quantity</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div className='p__'>
            +
        </div>
        <span className='p_quantity-itself'>0</span>
        <div className='p__'>
            -
        </div>
        </div>
        </div>
        </div>

    </div>

    <div className='container-for-product-delivery'>
        
        <div className='product-option-itself'>
        <input type="checkbox" /> <span>One time purchase</span>
        </div>

        <div className='product-option-itself'>

        <input type="checkbox" /> <span>Subscribe and delivery every </span>
        <p>
            Subscribe now and get the 10% of discount on every recurring order. The discount will
            be applied at checkout. See details
        </p>
        
        </div>

    </div>

    <input type="button" value="+ Add to cart" />

    <div className='product-parameters'>

        <span className='parameter-itself'>
            <p>
                Wax:
            </p>
            <p>
                Top grade Soy Vax that delivers a smoke less, consistent burn
            </p>
        </span>

        <span className='parameter-itself'>
            <p>
                Fragrance:
            </p>
            <p>
               Premium quality ingredients with natural essential oils
            </p>
        </span>

        <span className='parameter-itself'>
            <p>
                Burning Time:
            </p>
            <p>
               70 - 75 hours
            </p>
        </span>

        <span className='parameter-itself'>
            <p>
                Dimension:
            </p>
            <p>
               10cm - 5cm
            </p>
        </span>

        <span className='parameter-itself'>
            <p>
                Weight:
            </p>
            <p>
               400g
            </p>
        </span>

        </div>

    <h3>All hand-made with natural soy wax, Candleaf is made for your pleasure moments</h3>

    <h2>🚚 FREE SHIPPING</h2>

    </div>

    </>
)

}

export default ProductPage