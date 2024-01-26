import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import "swiper/css";
import "swiper/css/pagination";
import { motion } from 'framer-motion';

/* Images */

import ProfilePicTestimonial from '../images/img-1.svg'
import CheckmarkFeatures from '../images/checkmark-circle-outline 1.svg'
import ImageFeatures from '../images/image.svg'
import StarFilled from '../images/star-filled.svg'

/* Images */

const Products = ({  onAddToCart, Language, Polish, English }) => {

    const [ProductList, setProductList] = useState([ 
        {
          id: 1,
          data:{
            title: 'lorem ipsum', quantity: 34, price: 9.99, category: "książki"
          }
        },
        { 
          id: 2,
          data:{
            title: 'lorem ipsum', quantity: 34, price: 9.99, category: "książki"
          }
        },
        {
          id: 3,
          data:{
            title: 'lorem ipsum', quantity: 34, price: 9.99, category: "rolki"
          }
        }
    ])

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products`, {
            method: 'GET',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }}).then(res => res.json()).then(data => setProductList(data.prod))

    }, [])

    return (
        <>
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} id="product_page">

        <div class="startup-screen">

            <div class="widget-description">
                <div class="description-box">
                    <h1>{Language == 'PL' ? Polish.product_header : Language == 'EN' ? English.product_header : 'Produkty' }</h1>
                    <p>
                    {Language == 'PL' ? Polish.product_paragraph : Language == 'EN' ? English.product_paragraph : 'Zamów dla siebie lub dla swoich bliskich' } 
                    </p>
                </div>
                <button onClick={() => navigate('/produkty')} class="site-btn">
                {Language == 'PL' ? Polish.product_button : Language == 'EN' ? English.product_button : 'Odkryj nasz katalog' } 
                </button>
            </div>

        </div>

        <div class="products-list">

            <div class="description-box">
                <h1>

                {Language == 'PL' ? Polish.subheader_2 : Language == 'EN' ? English.subheader_2 : 'Znajdz najlepsze' }
                </h1>
                {/*<p>Order it for you or for your beloved ones</p>*/}
            </div>

            <div class="product-grid">{ProductList.map(item =>  <div class="product-itself">
            <div onClick="" class="product-img" style={{ background: `url(${item.image})50%`, backgroundSize: '100%' }}></div>
            <div class="description-box-product" onClick={() => window.location.replace('/produkt/' + item.id)}>
            <h5 class="title-product" onClick={() => navigate(`/produkt/${item.id}`)}>{item.name}</h5>
            <span class="price-product">{item.price} zł</span>
            </div>
            </div>
            )}</div>

            {/*<button class="site-btn">
                Zobacz więcej
    </button>*/}

        </div>

        <div class="another-informations">

            <div class="another-information-container">

                <div class="description-box">
                    <h1>{Language == 'PL' ? Polish.advertisment_header : Language == 'EN' ? English.advertisment_header : 'Czysto i elegancko' }</h1>
                    <p class="description-green">{Language == 'PL' ? Polish.advertisment_paragraph : Language == 'EN' ? English.advertisment_paragraph : 'Dobór produktów pod ciebie i twoje potrzeby' }</p>
                </div>

                <img src={ImageFeatures} alt="" class="another-information-img-mobile"/>
                
                <ul class="features-list">
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>{Language == 'PL' ? Polish.advertisment_head_1 : Language == 'EN' ? English.advertisment_head_1 : 'Ekologiczne' }: </b> {Language == 'PL' ? Polish.advertisment_paragraph_1 : Language == 'EN' ? English.advertisment_paragraph_1 : 'Wszystkie materiały nadające się do recyklingu, 0% emisji CO2' }</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>{Language == 'PL' ? Polish.advertisment_head_2 : Language == 'EN' ? English.advertisment_head_2 : 'Sprawdzone' }: </b> {Language == 'PL' ? Polish.advertisment_paragraph_2 : Language == 'EN' ? English.advertisment_paragraph_2 : 'W 100% naturalne, przyjazne dla człowieka składniki' }</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>{Language == 'PL' ? Polish.advertisment_head_3 : Language == 'EN' ? English.advertisment_head_3 : 'Ręcznie wytwarzane' }: </b> {Language == 'PL' ? Polish.advertisment_paragraph_3 : Language == 'EN' ? English.advertisment_paragraph_3 : 'Wszystkie świece są ręcznie wykonane z miłością' }</li>
                    <li class="feature"> <img src={CheckmarkFeatures} alt="" class="checkmark"/><b>{Language == 'PL' ? Polish.advertisment_head_4 : Language == 'EN' ? English.advertisment_head_4 : 'Długowieczne' }: </b> {Language == 'PL' ? Polish.advertisment_paragraph_4 : Language == 'EN' ? English.advertisment_paragraph_4 : 'Nigdy więcej odpadów. Stworzony na długo' }</li>
                </ul>
    
                {/*<button class="site-btn">Zobacz więcej</button>*/}

            </div>


            <div class="another-information-container">

                <img src={ImageFeatures} alt="" class="another-information-img"/>

            </div>
            

        </div>

        <div class="testimonials">

            <div class="description-box">
                <h1>{Language == 'PL' ? Polish.opinion_header : Language == 'EN' ? English.opinion_header : 'Opinie o nas' }</h1>
                <p>{Language == 'PL' ? Polish.opinion_paragraph : Language == 'EN' ? English.opinion_paragraph : 'Parę zdań od klientów dla nas' }</p>
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
