import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* image's */

import HamburgerMenuSVG from '../images/hamburger-menu.svg'
import SomeLogo from '../images/logo-szersze.png'
import ArrowMenu from '../images/ChevronDown.svg'
import ProfileIcon from '../images/Profile.svg'
import CartIcon from '../images/Cart.svg'
import question_mark from '../images/question_mark.png'

export const Navbar = ({ User, UserCart }) => {
     
    const navigate = useNavigate()     
    const [HamburgerOpen, isHamburgerOpen] = useState(1)
    const [Hamburger, setHamburger] = useState('unactive-pop') 

    const HandleMenuOpen = () => {
        isHamburgerOpen(HamburgerOpen + 1)
        setHamburger('unactive-pop')
        if(HamburgerOpen%2) {
            setHamburger('active-pop')
        } else {
            setHamburger('unactive-pop')
        }
    }
    
    return (
        <>
        
        <div className="header">
            <img src={HamburgerMenuSVG} alt="hamburger" class="navbar_icon" onClick={HandleMenuOpen}/>
            <img src={SomeLogo} alt="logo" class="logo" onClick={() =>  navigate('/')}/>
                <ul class="desktop-options">
                    <li onClick={() =>  navigate('/')} class="nav-option">Strona główna {/*<img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/>*/}</li>
                    <li onClick={() => navigate('/produkty')} class="nav-option">Produkty</li>
                    <li onClick={() => navigate('/kontakt')} class="nav-option">Porozmawiaj z nami</li>
                </ul>
                <ul class="navigation-header">
                    <li class="nav-option" onClick={() =>  navigate('/twoj-profil')}>
                        <img src={ProfileIcon} alt="navbar ico" class="user_icon"/>
                        </li> 
                    <li class="nav-option" onClick={() =>  navigate('/koszyk')}><img src={CartIcon} alt="navbar ico" class="cart_icon"/></li>
                    <div className='quantity-navbar' dangerouslySetInnerHTML={{ __html: User ? JSON.parse(UserCart).length : 0 }}></div>
                </ul>
        </div>
        <div className={`header-mobile ${Hamburger}`}>
        <ul>
        <li onClick={() =>  navigate('/')} class="nav-option">Strona główna</li>
        <li onClick={() => navigate('/produkty')} class="nav-option">Produkty</li>
        <li onClick={() => navigate('/kontakt')} class="nav-option">Porozmawiaj z nami</li>
        </ul>
        </div>

        </>
    )

    

}


export default Navbar
