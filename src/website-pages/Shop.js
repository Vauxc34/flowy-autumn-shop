import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, addDoc, collection, getDocs, collectionGroup, query, onSnapshot, Firestore } from "firebase/firestore"; 
import { getDatabase, ref, push, set, orderByChild } from "firebase/database"
import { AnimatePresence } from 'framer-motion' 
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'; 
import Cookies from 'js-cookie'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import AnimatedPage from './AnimatedPage';
import { initReactI18next,  useTranslation } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18n, { use } from "i18next"
import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'

/* page's */

import Allproducts from './Allproducts';
import Products from './Products'
import ProductPage from './ProductPage'
import RegisterPage from './RegisterPage'
import ProfilePage from './ProfilePage'
import ContactForm from './ContactForm';
import Login from './LoginPage'
import PrivacyAndPolicy from './PrivacyAndPolicy'

/* page's */

/* component's */

import { Navbar } from "../components/Navbar"
import { Cart } from "../components/Cart"
import { Checkout  } from "../components/checkout/Checkout"

/* component's */

/* image's */

import logoFlowyAutumn from '../images/logo-szersze-biale.png'
import ArrowMenu from '../images/ChevronDown.svg'

/* image's */

const Shop = () =>  { 

    const ToastMessReg = () => toast.success('Pomyślnie zarejestrowano 🥳')

    /* mobile menu */

    const [MobileMenu, setMobileMenu] = useState('navbar-menu') 

    /* mobile menu */

/* register thing's */

  const [User, setUser] = useState(null)  
  const [UserCart, setUserCart] = useState([])
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')  
    
  useEffect(() => {
    const data = localStorage.getItem('User');
    const cart_data = localStorage.getItem('UserCart')
    if(data) {
      setUser(JSON.parse(data))
      setUserCart(JSON.parse(cart_data))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('User', JSON.stringify(User))
    localStorage.setItem('UserCart', JSON.stringify(UserCart))
  }) 

/* register thing's */
  
/* cart */

const [QuantityCartUser, setQuantityCartUser] = useState(0)

const FetchCart = () => { 
  fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${User.cartId}`, {
      method: 'GET',  
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }        
      }).then(res => res.json()).then(data => setUserCart(data.content[0][0].products))
     // let RightProdData = JSON.parse(UserCart.products)
      // setQuantityCartUser(RightProdData.length)

      console.log(JSON.parse(UserCart).length)
}  

useEffect(() => {
  if(User) {
    FetchCart()
  } else {}
}, [User])



/* cart */

/* product's */

     return (

        <div class="wrapper">
            <Navbar User={User} QuantityCartUser={QuantityCartUser} UserCart={UserCart}/>
            <div className={`${MobileMenu}`}>
            <ul>
                    <li class="nav-option"><img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/>Discovery</li>
                    <li class="nav-option">About</li>
                    <li class="nav-option">Contact us</li>
            </ul>
        </div>
<AnimatePresence>
<AnimatedPage 
User={User}
setUser={setUser}
ToastMessReg={ToastMessReg} 
userName={userName}
setUserName={setUserName}
userMail={userMail}
setUserMail={setUserMail}
userPassword={userPassword}
setUserPassword={setUserPassword}
userPasswordRepeat={userPasswordRepeat}
setUserPasswordRepeat={setUserPasswordRepeat}
ToastContainer={ToastContainer}   
toast={toast} 
/>

</AnimatePresence>
        <div class="footer">

            <hr class="footer-line" />
            <div class="footer-container-huge">

                <div class="footer-container">
                    <img src={logoFlowyAutumn} alt="" class="logo-footer"/>
                    <span class="footer-text" >Your natural candle made for your home and for your wellness.</span>    
                </div>
                <div class="footer-container-second">
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">Zakładki</li>
                    <li><Link to='/'>Strona główna</Link></li>
                    {User ? null : <li><Link to='/rejestracja'>Zarejestruj się</Link></li>}
                    <li><Link to='/twoj-profil'>Twój profil</Link></li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">Informacje</li>
                    <li><Link to='/kontakt'>Kontakt z nami</Link></li>
                    <li><Link to='/polityka-prywatnosci'>Polityka prywatności</Link></li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">Język strony</li>
                    <select name="langugage_change" id="langugage_change">
                     
                        <option>Polski (Słowiański)</option>
                        <option>Angielski (Brytyjski)</option>
                      
                    </select>
                    </ul>    
                </div>

            </div>
            
        </div>
        <div class="footer-credits">
            <span class="copyright-text">
                <a id="company_name">STJÄRNFLOCKA®</a> Wszelkie prawa zastrzeżone dla <a id="creator_1">@fox45</a> i <a id="creator_2">@dawid-karolczak</a>.
            </span>
        </div>

        </div>
    
     )

}

export default Shop

