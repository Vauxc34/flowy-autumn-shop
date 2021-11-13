import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'

import Products from '../components/product/Products'
import { Navbar } from '../components/navbar/Navbar'
import { Cart } from '../components/Cart/Cart'
import { Checkout  } from '../components/checkout/Checkout'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
 
import '../styles/shop-itself.css'

import logoReact from './images/footer-logo.png'

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
            element={<Products products={products} 
            onAddToCart={handleAddToCart} />}>
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
            <div className="Footer-container"></div>
            <p>stworzone dzieki technologi</p>
            <span>ReactJS</span>
            <img src={logoReact}/>
            </div>

        </Router>

        </div>
    
        
     )

}

export default Shop

