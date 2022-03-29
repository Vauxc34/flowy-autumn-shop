import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../images/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* image's */

import HamburgerMenuSVG from '../../images/hamburger-menu.svg'
import SomeLogo from '../../images/logo.svg'
import ArrowMenu from '../../images/ChevronDown.svg'
import ProfileIcon from '../../images/Profile.svg'
import CartIcon from '../../images/Cart.svg'

export const Navbar = ({ totalItems }) => {

    const [HamburgerOpen, isHamburgerOpen] = useState(false)
    const [Hamburger, setHamburger] = useState('hide-hamburger')

    const HandleMenuOpen = () => {
        isHamburgerOpen(!HamburgerOpen)
        if(HamburgerOpen == true) {
            setHamburger('hamburger-menu-itself')
        } else {
            setHamburger('hide-hamburger')
        }
    }

    return (
        <>
        
        <div class="header">

            <img src={HamburgerMenuSVG} alt="" class="navbar_icon"/>

            <img src={SomeLogo} alt="logo" class="logo"/>
            
            
                <ul class="desktop-options">
                    <li class="nav-option">Discovery <img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/></li>
                    <li class="nav-option">About</li>
                    <li class="nav-option">Contact us</li>
                </ul>

            
                <ul class="navigation-header">
                    <li class="nav-option" ><img src={ProfileIcon} alt="" class="user_icon"/></li>
                    <li class="nav-option" ><img src={CartIcon} alt="" class="cart_icon"/></li>
                </ul>

        </div>

        </>
    )
}

export default Navbar
