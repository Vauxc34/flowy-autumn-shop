import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

/* Images */

import ProfilePicTestimonial from '../../images/img-1.svg'
import CheckmarkFeatures from '../../images/checkmark-circle-outline 1.svg'
import ImageFeatures from '../../images/image.svg'
import StarFilled from '../../images/star-filled.svg'

/* Images */



const Products = ({products, onAddToCart}) => {

    const navigate = useNavigate()

    return (

        <>

        <div class="startup-screen">

            <div class="widget-description">
                <div class="description-box">
                    <h1>🌱 <br/> The nature candle</h1>
                    <p>All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments </p>
                </div>
                <button class="site-btn">
                    Discovery our collection
                </button>
            </div>

        </div>

        <div class="products-list">

            <div class="description-box">
                <h1>Products</h1>
                <p>Order it for you or for your beloved ones</p>
            </div>


            <div class="product-grid">

        {products.map((item, key) => 
        
        
        <div class="product-itself" item={item.id} key={item}>
        <div onClick={() => {navigate(`/produkt/${item.id}`)}} class="product-img" style={{ background: `url(${item.image.url}) 50% 50% no-repeat` }}></div>
        <div class="description-box-product" onClick={() => onAddToCart(item.id, 1)}>
        <h5 class="title-product">{item.name}</h5>
        <span dangerouslySetInnerHTML={{__html: item.price.formatted_with_code }} class="price-product" />
        </div>
        
        </div>
        
        )}
                
            </div>

            <button class="site-btn">
                See more
            </button>

        </div>

        <div class="another-informations">

            <div class="another-information-container">

                <div class="description-box">
                    <h1>Clean and <br/> fragrant soy wax</h1>
                    <p class="description-green">Made for your home and for your wellness</p>
                </div>

                <img src={ImageFeatures} alt="" class="another-information-img-mobile"/>
                
                <ul class="features-list">
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Eco-sustainable:</b>All recyclable materials, 0% CO2 emissions</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Hyphoallergenic:</b> 100% natural, human friendly ingredients </li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Handmade:</b> All candles are craftly made with love.</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Long burning:</b> No more waste. Created for last long.</li>
                </ul>
    
                <button class="site-btn">
                    See more
                </button>

            </div>


            <div class="another-information-container">

                <img src={ImageFeatures} alt="" class="another-information-img"/>

            </div>
            

        </div>

        <div class="testimonials">

            <div class="description-box">
                <h1>Testimonials</h1>
                <p>Some quotes from our happy customers</p>
            </div>


            <div class="testimonials-carousel">

                <span>

                    <div class="testimonial-itself">


                        <img src={ProfilePicTestimonial} alt="" class="profile-pic"/>

                        <div class="stars-container">
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                        </div>

                        <div class="opinon-box">
                            <p>“I love it! No more air fresheners”</p>
                            <span>Luisa</span>
                        </div>

                    </div>  
                   
                </span>

                <span>
                    <div class="testimonial-itself">


                        <img src={ProfilePicTestimonial} alt="" class="profile-pic"/>

                        <div class="stars-container">
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                        </div>

                        <div class="opinon-box">
                            <p>“Raccomended for everyone”</p>
                            <span>Edoarto</span>
                        </div>

                    </div>  
                </span>

                <span>
                    <div class="testimonial-itself">


                        <img src={ProfilePicTestimonial} alt="" class="profile-pic"/>

                        <div class="stars-container">
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                            <img src={StarFilled} alt="" class="star-itself"/>
                        </div>

                        <div class="opinon-box">
                            <p>“Looks very natural, the smell is awesome”</p>
                            <span>Mart</span>
                        </div>

                    </div>  
                </span>

            </div>

        </div>

        <div class="products-list">

            <div class="description-box">
                <h1>Popular</h1>
                <p>Our top selling product that you may like</p>
            </div>


            <div class="product-grid">
               
        {products.map((item) => 
        
        <div class="product-itself" item={item.id}>
        <div onClick={() => {navigate(`/produkt/${item.id}`)}} class="product-img" style={{ background: `url(${item.image.url}) 50% 50% no-repeat` }} ></div>
        <div class="description-box-product" onClick={() => onAddToCart(item.id, 1)}>
        <h5 class="title-product">{item.name}</h5>
        <span dangerouslySetInnerHTML={{__html: item.price.formatted_with_code }} class="price-product" />
        </div>
        </div>
      
        )}

            </div>

            <button class="site-btn">
                See more
            </button>

        </div>

        </>
    )
}

export default Products
