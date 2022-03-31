import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
/* image's */

import prodctPageImage from '../images/prodct-page-image.svg'

/* */

const ProductPage = ({products, onAddToCart, onUpdateCartQty, item}) => {

    const [NameProduct, setNameProduct] = useState('')
    const [DescProduct, setDescProduct] = useState('')
    const [PriceProduct, setPriceProduct] = useState('')

    const [onPageProduct, setOnPageProduct] = useState({
        name: 'Lorem ipsum',
        img: 'basic.jpg',
        description: 'Lorem ipsum',
        price: '9.99',
    })

    const location = useLocation()

    useEffect(() => {

        const ProductSetter = async () => {
            
            await setOnPageProduct({
                name: products.find(item => item.id == location.pathname.split('/')[2]).name,
                description: products.find(item => item.id == location.pathname.split('/')[2]).description,
                price: products.find(item => item.id == location.pathname.split('/')[2]).price.formatted_with_symbol,
            })

            


        }

        ProductSetter()
    }, [])

    console.log(products.find(item => item.id == location.pathname.split('/')[2]))

return (
    <>

    <div className="wrapper-product">

    <div className='row-product'>

    <h1 className='product-title-- medium-hide'>{onPageProduct.name}</h1>
    
    <img className='product-image--' src={prodctPageImage} />

    <div className='container-for-etc-product mobile-hide'>

    <h3>All hand-made with natural soy wax, Candleaf is made for your pleasure moments</h3>

    <h2>🚚 FREE SHIPPING</h2>

    </div>

    </div>
    <div className='row-product'> 

    <h1 className='product-title-- mobile-hide'>{onPageProduct.name}</h1>

    <div className='row-for-smaller-containers'>
    <div className='container-for-product-option'>
        
        <span className='price-etc'>{onPageProduct.price}</span>

        <div className='quantity-box-container'>
        <p>Quantity</p>
        <div className='quantity-box'>
        <div className='select-item-quantity'>
        <div  className='p__'>
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
            <div className='product-option-title'><input type="checkbox" /><span> One time purchase</span></div>
        </div>

        <div className='product-option-itself'>

        

        <p dangerouslySetInnerHTML={{__html: DescProduct }}></p>

        <div className='product-option-title'><input type="checkbox" /> <span>Subscribe and delivery every </span></div>
        <p>
            Subscribe now and get the 10% of discount on every recurring order. The discount will
            be applied at checkout. See details
        </p>
        
        </div>

        <button className='site-btn'>+ Add to cart</button>

    </div>
    </div>

    <div className='product-parameters'>

        <span className='parameter-itself'>
            <p>Wax: </p>
            <p> Top grade Soy Vax that delivers a smoke less, consistent burn</p>
        </span>

        <span className='parameter-itself'>
            <p>
                Fragrance:
            </p>
            <p>
               Premium quality ingredients with natural essential oils
            </p>
        </span>

        <div className='container-for-a-parameters'>
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

    </div>

    </div>

    <div className='container-for-etc-product medium-hide'>

    <h3>All hand-made with natural soy wax, Candleaf is made for your pleasure moments</h3>

    <h2>🚚 FREE SHIPPING</h2>

    </div>

    </div>

    </>
)

}

export default ProductPage