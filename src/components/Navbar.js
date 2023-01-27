import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import logo from '../images/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* image's */

import HamburgerMenuSVG from '../images/hamburger-menu.svg'
import SomeLogo from '../images/logo.svg'
import ArrowMenu from '../images/ChevronDown.svg'
import ProfileIcon from '../images/Profile.svg'
import CartIcon from '../images/Cart.svg'

export const Navbar = ({ totalItems, OpenMobileMenu, user }) => {

    const navigate = useNavigate()

    const [HamburgerOpen, isHamburgerOpen] = useState(false)
    const [Hamburger, setHamburger] = useState('hide-hamburger')

    const [UserName, setUserName] = useState(user)

    function GoToMainPage() {
        navigate('/')
    }
    function GoToCart() {
        navigate('/koszyk')
    }
    function GoToProfile() {
        navigate('/twoj-profil')
    }
    function GoToProducts() {
        navigate('/produkty')
    }
    function GoToContact() {
        navigate('/skontatuj-sie')
    }

    useEffect(() => {
        if(user) {
            setUserName("Witaj, " + user.displayName)
           
        } else {
            setUserName('Nie zalogowano')
        }
    })

    return (
        <>
        
        <div class="header">
            <img src={HamburgerMenuSVG} alt="" class="navbar_icon" onClick={OpenMobileMenu}/>
            <img src={SomeLogo} alt="logo" class="logo" onClick={GoToMainPage}/>
                <ul class="desktop-options">
                    <li onClick={GoToMainPage} class="nav-option">Strona główna {/*<img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/>*/}</li>
                    <li onClick={GoToProducts} class="nav-option">Produkty</li>
                    <li onClick={GoToContact} class="nav-option">Porozmawiaj z nami</li>
                </ul>
                <ul class="navigation-header">
                    <li class="nav-option" onClick={GoToProfile}>
                        <img src={ProfileIcon} alt="navbar ico" class="user_icon"/>
                        </li>
<div className='popup-navbar first_bar'>
<img className='profile-pic' src='' />
<h4>{UserName}</h4></div>
                    <li class="nav-option" onClick={GoToCart}><img src={CartIcon} alt="navbar ico" class="cart_icon"/></li>
<div className='popup-navbar second_bar'>
<img className='profile-pic' src='' />
<h4>Anthony Barbara</h4> </div>
                    <div className='quantity-navbar' dangerouslySetInnerHTML={{ __html: totalItems}}></div>
                </ul>
        </div>
       

        

        </>
    )
}

export default Navbar
