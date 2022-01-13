import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'

import Products from '../components/product/Products'
import ProductPage from './ProductPage'

import { Navbar } from '../components/navbar/Navbar'
import { Cart } from '../components/Cart/Cart'
import { Checkout  } from '../components/checkout/Checkout'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
 
import '../styles/shop-itself.css'

import footerBgc from './images/footer-bg.svg'

import SecondfooterBgc from './images/bg.svg'

import logoCandleAf from './images/logo-web_footer.svg'


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

        <div className="shop-itself-container">

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
            <div className="Footer-itself">
            <img className="Footer-itself_Img" src={footerBgc}></img>
            <div className="Footer-container">
            <hr></hr>
            <img src={logoCandleAf}></img>
            <p className="Footer-itself_p">Your natural candle made for your home and for your wellness.</p>
            <div className="Second-footer-container">
            <div className="Infos-container">
            <div className="Infos-widget">

            <p className="Infos-widget_p">Discovery</p>
            <span className="Infos-Widget_span">New season</span>
            <span className="Infos-Widget_span">Most searched</span>
            <span className="Infos-Widget_span">Most selled</span>

            <p className="Infos-widget_p">About</p>
            <span className="Infos-Widget_span">Help</span>
            <span className="Infos-Widget_span">Shipping</span>
            <span className="Infos-Widget_span">Affiliate</span>

            </div>
            <div className="Infos-widget">

            <p className="Infos-widget_p">Info</p>
            <span className="Infos-Widget_span">Contact Us</span>
            <span className="Infos-Widget_span">Privacy Policies</span>
            <span className="Infos-Widget_span">Terms &amp; Conditions</span>
    
            </div>
            </div>
            </div>
            </div>
            <div className="CopyrightContainer">
            <img className="Last-bgc"src={SecondfooterBgc}></img>
            <h3 className="FooterCopyright" >©Candleaf All Rights Reserved.</h3>
            </div>
            </div> 
        </Router>

        </div>
    
        
     )

}

export default Shop

