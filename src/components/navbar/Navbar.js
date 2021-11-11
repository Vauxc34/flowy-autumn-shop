import React from 'react'

import logo from './images/logo.png'

import { Link, useLocation } from 'react-router-dom'

export const Navbar = ({ totalItems }) => {

    const location = useLocation()

    

    return (
        
        <div className="navbar-itself">
    

            <img src={logo} component={Link} to/>
            
            
            <div className="cart-icon">
                <Link to="/cart">to cart</Link>
                <Link to="/sklep">go to home page</Link>
                <p className="nmbr-items" dangerouslySetInnerHTML={{__html:totalItems}} />
            </div>
            
        </div>
    )
}

export default Navbar
