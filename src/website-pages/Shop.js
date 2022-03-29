import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'

import Products from '../components/product/Products'
import ProductPage from './ProductPage'

import { Navbar } from '../components/navbar/Navbar'
import { Cart } from '../components/Cart/Cart'
import { Checkout  } from '../components/checkout/Checkout'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import footerBgc from '../images/footer-bg.svg'

import SecondfooterBgc from '../images/bg.svg'

import logoCandleAf from '../images/logo-web_footer.svg'


const Shop = () =>  {

    const [products, setProducts] = useState([])
    const [cart,  setCart] = useState({})
    const [order,  setOrder] = useState({})
    const [errorMessage,  setErrorMessage] = useState('')
    
    const fetchProducts = async() => {

    const { data } = await commerce.products.list();

    setProducts(data)

    }

    const FetchCart = async() => {
        setCart(commerce.cart.retrieve())
    }

    const handleAddToCart = async(productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)

        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)

        setCart(cart)
    }

    const handleEmptyCart = async() => {
        const {cart} = await commerce.cart.empty()

        setCart(cart)

    }

    useEffect(() => {
        fetchProducts()
        FetchCart()
    }, [])

    const refreshCart = async() => {
        const newCart = await commerce.cart.refresh()

        setCart(newCart)

    }

    const handleCaptureCheckout = async( checkoutTokenId, newOrder ) => {

        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }

     return (

        <div class="wrapper">

        <Router>

            <Navbar totalItems={cart.total_items} />
            
            <Routes>

            <Route 
            exact path='/sklep' 
            element={<Products 
            products={products} 
            onAddToCart={handleAddToCart} />}>
            </Route>

            <Route 
            exact path='/produkt' 
            element={<ProductPage 
            products={products} 
            onAddToCart={handleAddToCart} 
            handleRemoveFromCart={handleRemoveFromCart}
            />}>
            </Route>

            <Route 
            exact path='/cart' 
            element={<Cart cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart} 
            handleEmptyCart={handleEmptyCart}
            /> }>
            </Route>

            <Route 
            exact path='/checkout'
            element={<Checkout 
            cart={cart} 
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
            />}>
            </Route>
            
            </Routes>
            
        <div class="footer">

            <hr class="footer-line" />
            <div class="footer-container-huge">

                <div class="footer-container">
                    <img src={logoCandleAf} alt="" class="logo-footer"/>
                    <span class="footer-text" >Your natural candle made for your home and for your wellness.</span>    
                </div>
                <div class="footer-container-second">
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">Discovery</li>
                    <li>New season</li>
                    <li>Most searched</li>
                    <li>Most selled</li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">Info</li>
                    <li>Contact Us</li>
                    <li>Privacy Policies</li>
                    <li>Terms & Conditions</li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">About</li>
                    <li>Help</li>
                    <li>Shipping</li>
                    <li>Affiliate</li>
                    </ul>    
                </div>

            </div>
            
        </div>
        <div class="footer-credits">
            <span class="copyright-text">
                ©Candleaf All Rights Reserved.
            </span>
        </div>

        </Router>

        </div>
    
        
     )

}

export default Shop

