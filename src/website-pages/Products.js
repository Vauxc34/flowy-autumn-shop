import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EffectCoverflow, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from 'framer-motion';

/* Images */

import ProfilePicTestimonial from '../images/img-1.svg'
import CheckmarkFeatures from '../images/checkmark-circle-outline 1.svg'
import ImageFeatures from '../images/image.svg'
import StarFilled from '../images/star-filled.svg'

/* Images */

const Products = ({products, onAddToCart, ProductList }) => {

    const navigate = useNavigate()

    return (
        <>
        <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        id="product_page">

        <div class="startup-screen">

            <div class="widget-description">
                <div class="description-box">
                    <h1>Drogeria Flowy</h1>
                    <p>
                        Perfumeria, biżuteria ogólnodostępna dostępna w niskich cenach 
                    </p>
                </div>
                <button class="site-btn">
                   Odkryj nasz katalog
                </button>
            </div>

        </div>

        <div class="products-list">

            <div class="description-box">
                <h1>Produkty</h1>
                <p>Order it for you or for your beloved ones</p>
            </div>


            <div class="product-grid">{ProductList.map(item =>  <div class="product-itself">
            <div onClick="" class="product-img" style={{ background: `url(${item.data.image})50%`, backgroundSize: '100%' }}></div>
            <div class="description-box-product" onClick={() => window.location.replace('/produkt/' + item.id)}>
            <h5 class="title-product" onClick={() => navigate(`/produkt/${item.id}`)}>{item.data.title}</h5>
            <span class="price-product">{item.data.price} zł</span>
            </div>
            </div>
            )}</div>

            <button class="site-btn">
                Zobacz więcej
            </button>

        </div>

        <div class="another-informations">

            <div class="another-information-container">

                <div class="description-box">
                    <h1>Czysto i <br/> elegancko</h1>
                    <p class="description-green">Dobór produktów pod ciebie i twoje potrzeby</p>
                </div>

                <img src={ImageFeatures} alt="" class="another-information-img-mobile"/>
                
                <ul class="features-list">
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Ekologiczne:</b>All recyclable materials, 0% CO2 emissions</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Sprawdzone:</b> 100% natural, human friendly ingredients </li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Ręcznie wytwarzane:</b> All candles are craftly made with love.</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>Długowieczne:</b> No more waste. Created for last long.</li>
                </ul>
    
                <button class="site-btn">
                    Zobacz więcej
                </button>

            </div>


            <div class="another-information-container">

                <img src={ImageFeatures} alt="" class="another-information-img"/>

            </div>
            

        </div>

        <div class="testimonials">

            <div class="description-box">
                <h1>Opinie o nas</h1>
                <p>Some quotes from our happy customers</p>
            </div>

            <div class="testimonials-carousel">

                <span>
                    <div class="testimonial-itself">


                        <img src={ProfilePicTestimonial} alt="" class=""/>

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


                        <img src={ProfilePicTestimonial} alt="" class=""/>

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


                        <img src={ProfilePicTestimonial} alt="" class=""/>

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
        </motion.section>
        </>
    )
}

export default Products
