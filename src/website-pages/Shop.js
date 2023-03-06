import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, addDoc, collection, getDocs, collectionGroup, query, onSnapshot } from "firebase/firestore"; 
import { getDatabase, ref, push, set, orderByChild } from "firebase/database";
import { AnimatePresence } from 'framer-motion'
import { db } from '../lib/config'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';
import { AuthThing, AuthSecond } from '../lib/config'
import Cookies from 'js-cookie'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import AnimatedPage from './AnimatedPage';
import { initReactI18next,  useTranslation } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next"
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

    const auth = getAuth()

    const location = useLocation()
    let idUser = "qcC6uukDcp0yS7BkK0bf"   

    const ToastMessReg = () => toast.success('Pomyślnie zarejestrowano 🥳')

    /* mobile menu */

    const [MobileMenu, setMobileMenu] = useState('navbar-menu')
    const [Opener, setOpener] = useState(1)
    const [itemsQuantity, setItemsQuantity] = useState(0)
    useEffect(() => { fetch('https://candle-af-shop.appspot.com/cart/see-cart/' + idUser, {method: 'POST'}).then(data =>  data.json()).then(dat => setItemsQuantity(dat.length))})

    /* mobile menu */

/* register thing's */
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')
  const [currentUser, setCurrentUser] = useState(null)

    const validatePassword = () => {
    let isValid = true
    if (userPassword !== '' && userPasswordRepeat !== ''){
      if (userPassword !== userPasswordRepeat) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
    }
    const RegisterU = () => {
        setError('')
        if(validatePassword()) {
            createUserWithEmailAndPassword(auth, userMail, userPassword)
            .then((res) => {
                console.log(res.user)
                setCurrentUser(res.user)
                toast.success('Pomyślnie zarejestrowano 🥳')
              })
            .catch(err => toast.error(err.message))
        }
    }
    const SignGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, AuthThing)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setCurrentUser(result.user)
        toast.success('Pomyślnie zalogowano 😃')

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    const SignFB = () => {
      signInWithPopup(auth, AuthSecond)
  .then((result) => {
    const user = result.user;
    setCurrentUser(result.user)
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken; 
    toast.success('Pomyślnie zalogowano 😃')
    
  })
  .catch((error) => { 
    const errorCode = error.code;
    const errorMessage = error.message; 
    const email = error.customData.email; 
    const credential = FacebookAuthProvider.credentialFromError(error); 
    toast.error(errorMessage + errorCode)
  });
    }
    const LoginU = () => {
      signInWithEmailAndPassword(auth, userMail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user)
        toast.success('Pomyślnie zalogowano 😃')
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message)
      });
    
    }    
    const DatabaseAddUser = async () => { 
      const docRef = await addDoc(collection(db, "users"), {
        UserNickName: userName,
        UserEmail: userMail,
        Password: userPassword,
        LoggedTrought: "SitePage",
        Gender: "Men",
        Age: 23,
      });
      //console.log("Document written with ID: ", docRef.id);
    }
  useEffect(() => {
    const data = localStorage.getItem('currentUser');
    if(data) {
      setCurrentUser(JSON.parse(data))
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    //console.log(localStorage)
  })
/* register thing's */

/* product's */

  const [ProductList, setProductList] = useState([ 
  {
    id: 1,
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99, category: "książki"
    }
  },
  { 
    id: 2,
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99, category: "książki"
    }
  },
  {
    id: 3,
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99, category: "rolki"
    }
  }
  ])

  /* categorie's */

const [allData, setData] = useState(ProductList)

const generateCategoryDropdown = () => {
return [...new Set(ProductList.map((item) => item.main_category))]
}
/* categorie's */

  useEffect(() => {
    fetch('http://candle-af-shop.appspot.com/products/').then(data => data.json()).then(products => setProductList(products));
  }, []); 
  useEffect(() => {
    fetch('https://candle-af-shop.appspot.com/products/').then(data => data.json()).then(products => setData(products));
   }, []); 

   const handleFilterCategory = (category) => {
    const filteredData = ProductList.filter((item) => {
      if (item.main_category === category) {
        return item;
      }
    });
    setData(filteredData);
};

/* product's */

     return (

        <div class="wrapper">
            <Navbar 
            currentUser={currentUser} 
            itemsQuantity={itemsQuantity} 
            setItemsQuantity={setItemsQuantity}
            />
            <div className={`${MobileMenu}`}>
            <ul>
                    <li class="nav-option"><img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/>Discovery</li>
                    <li class="nav-option">About</li>
                    <li class="nav-option">Contact us</li>
            </ul>
        </div>
<AnimatePresence>
<AnimatedPage
ProductList={ProductList}
ToastMessReg={ToastMessReg}
SignGoogle={SignGoogle}
SignFB={SignFB}
userName={userName}
setUserName={setUserName}
userMail={userMail}
setUserMail={setUserMail}
userPassword={userPassword}
setUserPassword={setUserPassword}
userPasswordRepeat={userPasswordRepeat}
setUserPasswordRepeat={setUserPasswordRepeat}
DatabaseAddUser={DatabaseAddUser}
RegisterU={RegisterU}
ToastContainer={ToastContainer}
currentUser={currentUser}
LoginU={LoginU}
categories={generateCategoryDropdown()}
onFilterCategory={handleFilterCategory}
toast={toast}
allData={allData}
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
                    <li><Link to='/rejestracja'>Zarejestruj się</Link></li>
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

