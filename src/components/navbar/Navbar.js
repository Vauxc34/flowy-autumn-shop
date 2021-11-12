import React from 'react'

import logo from './images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { Link, useLocation } from 'react-router-dom'

export const Navbar = ({ totalItems }) => {

    const location = useLocation()

    return (
        
        <div className="navbar-itself">
    
            <div className="img-container">
            <img src={logo} component={Link} to/>
            </div>
            <div className='navigation-options-bar'>
            <ul>
                <li><Link className="option -second" to="/sklep">Sklep<FontAwesomeIcon className="icon shopping-home" icon={faStore} /></Link></li>
                <li><Link className="option -one" to="/cart">Koszyk<FontAwesomeIcon className="icon shopping-cart" icon={faShoppingBasket} /></Link></li>
            </ul>
            </div>
            <div className="container-for-icons">
            <div className="favourite-icon">
                <FontAwesomeIcon className="icon heart-ico" icon={faHeart} />
            </div>
            <div className="cart-icon">
                <FontAwesomeIcon className="icon cart-ico" icon={faShoppingBag} />
                <p className="nmbr-items" dangerouslySetInnerHTML={{__html:totalItems}} />
            </div>
            </div>
            
        </div>
    )
}

export default Navbar
