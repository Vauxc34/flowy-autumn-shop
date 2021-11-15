import React from 'react'
import Product from './Product'

import { Link } from 'react-router-dom'

import ImageSecondary from '../../website-pages/images/image.svg'

import FeatureOne from '../../website-pages/images/feature1.svg'
import FeatureTwo from '../../website-pages/images/feature2.svg'
import FeatureThree from '../../website-pages/images/feature3.svg'
import FeatureFour from '../../website-pages/images/feature4.svg'

import BgFirstSection from '../../website-pages/images/bg-image.svg'
import BgThirdSection from '../../website-pages/images/section-bg.svg'


const Products = ({products, onAddToCart}) => {
    
    return (
        <div className="product-page">
        <div className="Widget-container-first">
            <img className="Background First-Section" src={BgFirstSection} ></img>
            <div className="BackdropWithDescription _first">
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
        <div className="Widget-container-second">

        <h1>Products</h1>

        <p>Order it for you or for your beloved ones </p>

        {products.map((product) => (
            
            <Product product={product} onAddToCart={onAddToCart}/>
            
        ))}

        <button>
            <Link exact path to='/sklep'>See more</Link>
        </button>

        </div>    
        
        <div className="Widget-container-third">
            <div className="Background First-Section__" /* src={BgThirdSection} */></div>
            <div className="BackdropWithDescription _second">
            <h1>Clean and</h1>
            <h1>fragrant soy wax</h1>
            <span>
                Made for your home and for your wellness
            </span>
            
            <img src={ImageSecondary}></img>
            
            <div className="FeaturesContainer">
            <img className="feature-details" src={FeatureOne}></img>
            <img className="feature-details" src={FeatureTwo}></img>
            <img className="feature-details" src={FeatureThree}></img>
            <img className="feature-details" src={FeatureFour}></img>
            </div>

            <button>
                <Link exact path to='/sklep'>See more</Link>
            </button>
            </div>

        </div>

        <div className="Widget-container-Fourth">

            <div className="BackdropWithDescription _third">
            <h1>Testimonials</h1>
            <span>Some quotes from our happy customers</span>

            </div>

        </div>

        <div className="Widget-container-second">

        <h1>Products</h1>

        <p>Order it for you or for your beloved ones </p>

        {products.map((product) => (
            
            <Product product={product} onAddToCart={onAddToCart}/>
            
        ))}

        <button>
            <Link exact path to='/sklep'>See more</Link>
        </button>

        </div>  
        
        </div>
    )
}

export default Products
