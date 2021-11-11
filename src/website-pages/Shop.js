import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'

import Products from '../components/product/Products'
import { Navbar } from '../components/navbar/Navbar'
import { Cart } from '../components/Cart/Cart'
import { Checkout  } from '../components/checkout/Checkout'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
 
import '../styles/shop-itself.css'

const Shop = () =>  {

    const [products, setProducts] = useState([])
    const [cart,  setCart] = useState({})
    

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

    console.log(products)

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
            element={<Checkout />}>
            </Route>
            
            </Routes>

        </Router>

        </div>
    
        
     )

}

export default Shop

