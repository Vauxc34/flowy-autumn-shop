import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from './images/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* image's */

import HamburgerMenuSVG from './images/hamburger-menu.svg'

export const Navbar = ({ totalItems }) => {

    const location = useLocation()

    return (
        
        <div className="navbar-itself">
            <div className="container-for-icons">
            <div className="---icon hamburger-menu">
            <img src={HamburgerMenuSVG} ></img>
            </div>
            </div>
            <div className="img-container">
            <img src={logo} component={Link} to/>
            <Link className="-hidden-shop" to="/sklep">▇▇▇▇</Link>
            </div>
            <div className='navigation-options-bar'>
            <ul>
                <li><Link className="option -second" to="/sklep">Sklep<FontAwesomeIcon className="icon shopping-home" icon={faStore} /></Link></li>
                <li><Link className="option -one" to="/cart">Koszyk<FontAwesomeIcon className="icon shopping-cart" icon={faShoppingBasket} /></Link></li>
            </ul>
            </div>
            <div className="container-for-icons second">
            <div className="---icon">
                <FontAwesomeIcon className="icon cart-ico" icon={faShoppingBag} />
                <p className="nmbr-items" dangerouslySetInnerHTML={{__html:totalItems}} />
                <Link className="option -hidden" to="/cart">▇</Link>
            </div>
            <div className="---icon">
                <FontAwesomeIcon className="icon menu-ico" icon={faUser} />
            </div>
            </div>
            
        </div>
    )
}

export default Navbar
