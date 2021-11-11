import React from 'react'

import logo from './images/logo.png'

import { Link, useLocation } from 'react-router-dom'

export const Navbar = ({ totalItems }) => {

    const location = useLocation()

    return (
        
        <div className="navbar-itself">
    

            <img src={logo} component={Link} to/>
            <div className='navigation-options-bar'>
            <ul>
                <li><Link className="option -second" to="/sklep">go to home page</Link></li>
                <li><Link className="option -one" to="/cart">to cart</Link></li>
            </ul>
            </div>
            <div className="cart-icon">
                <p className="nmbr-items" dangerouslySetInnerHTML={{__html:totalItems}} />
            </div>
            
        </div>
    )
}

export default Navbar
