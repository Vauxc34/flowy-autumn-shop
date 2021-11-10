import React, {useState, useEffect} from 'react'
import { commerce } from '../lib/commerce'

import Products from '../components/product/Products'
import { Navbar } from '../components/navbar/Navbar'
import { Cart } from '../components/Cart/Cart'

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
        const item = await commerce.cart.add(productId, quantity)

        setCart(item.cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity })

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId)

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

            <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart} />}>
            </Route>

            <Route exact path='/cart' element={<Cart cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart} 
            handleEmptyCart={handleEmptyCart}
            /> }>
            </Route>
            
            </Routes>

        </Router>

        </div>
    
        
     )

}

export default Shop

