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

export const Navbar = ({ 
    itemsQuantity,
    setItemsQuantity,
    OpenMobileMenu, 
    User,
    setUser,
}) => {
     
    const navigate = useNavigate()     
    const [HamburgerOpen, isHamburgerOpen] = useState(1)
    const [Hamburger, setHamburger] = useState('unactive-pop')
    const [UserName, setUserName] = useState('test')
    const [ProfileUser, setProfileUser] = useState('test')

    const HandleMenuOpen = () => {
        isHamburgerOpen(HamburgerOpen + 1)
        setHamburger('unactive-pop')
        if(HamburgerOpen%2) {
            setHamburger('active-pop')
        } else {
            setHamburger('unactive-pop')
        }
    }
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
        navigate('/kontakt')
    }

    const LogOut = () => {
        setUser(null)
    }

    useEffect(() => {
        if(User) {
            setUserName("Witaj, " + User?.name)
            setProfileUser(User ? `https://static-00.iconduck.com/assets.00/user-profile-icon-512x512-pdqa839q.png` : question_mark)
        } else {
            setUserName('Nie zalogowano')
        }
    }, [User])

    return (
        <>
        
        <div className="header">
            <img src={HamburgerMenuSVG} alt="hamburger" class="navbar_icon" onClick={HandleMenuOpen}/>
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
                        {/*<div className='popup-navbar first_bar'>
                        <img className='profile-pic' src={User ? ProfileUser :  question_mark} />
                        <h4>{UserName}</h4>
                        
                        {User == null ? null : <button onClick={LogOut} style={{maxWidth: '40%', alignSelf: 'center', margin: '1em .5em .5em 0em', fontSize: '10px', padding: '1em' }} class="site-btn">Wyloguj sie</button> }

    </div>*/}
                    <li class="nav-option" onClick={GoToCart}><img src={CartIcon} alt="navbar ico" class="cart_icon"/></li>
                    <div className='quantity-navbar' dangerouslySetInnerHTML={{ __html: itemsQuantity}}></div>
                </ul>
        </div>
        <div className={`header-mobile ${Hamburger}`}>
        <ul>
        <li onClick={GoToMainPage} class="nav-option">Strona główna</li>
        <li onClick={GoToProducts} class="nav-option">Produkty</li>
        <li onClick={GoToContact} class="nav-option">Porozmawiaj z nami</li>
        </ul>
        </div>

        </>
    )

    

}


export default Navbar
