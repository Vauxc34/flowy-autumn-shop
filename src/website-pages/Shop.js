import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import { AuthThing, AuthSecond } from '../lib/config'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { i18n, i18next } from 'i18next'

/* page's */

import Products from './Products'
import ProductPage from './ProductPage'
import RegisterPage from './RegisterPage'
import Login from './LoginPage'
import PrivacyAndPolicy from './PrivacyAndPolicy'

/* page's */

/* component's */

import { Navbar } from '../components/Navbar'
import { Cart }  from "./Cart"
import { Checkout  } from '../components/checkout/Checkout'

/* component's */

/* image's */

import logoCandleAf from '../images/logo-web_footer.svg'
import ArrowMenu from '../images/ChevronDown.svg'
import ProfilePage from './ProfilePage'

/* image's */

const Shop = () =>  {

    const auth = getAuth()

    /* mobile menu */

    const [MobileMenu, setMobileMenu] = useState('navbar-menu')
    const [Opener, setOpener] = useState(1)

    const OpenMobileMenu = () => {
        setOpener(Opener + 1)
        setMobileMenu('navbar-menu opened')
        if(Opener % 2) {
            setMobileMenu('navbar-menu opened')
            setOpener(Opener - 1)
        } else {
            setMobileMenu('navbar-menu')
        }
    }

    /* mobile menu */

    /* register thing's */

  const [authListener, setAuthListener] = useState(null)

  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')
  const [user, setUser] = useState(null)

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
              })
            .catch(err => console.log(err.message))
        }
    }

    const SignGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, AuthThing)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(auth.currentUser)
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
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken; 
  })
  .catch((error) => { 
    const errorCode = error.code;
    const errorMessage = error.message; 
    const email = error.customData.email; 
    const credential = FacebookAuthProvider.credentialFromError(error); 
  });
    }

    const LoginU = () => {
      signInWithEmailAndPassword(auth, userMail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(auth.currentUser)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    
    }
    /* register thing's */

    console.log(user)

     return (

        <div class="wrapper">

        <Router>

            <Navbar
            user={user}
            />
            <div className={`${MobileMenu}`}>
            <ul>
                    <li class="nav-option"><img src={ArrowMenu} alt="arrow-menu" class="arrow-menu"/>Discovery</li>
                    <li class="nav-option">About</li>
                    <li class="nav-option">Contact us</li>
            </ul>
        </div>
            
            <Routes>

            <Route 
            exact path='/' 
            element={<Products/>}>
            </Route>

            <Route 
            exact path='/produkt/:id' 
            element={<ProductPage/>}>
            </Route>

            <Route 
            exact path='/koszyk' 
            element={<Cart/> }>
            </Route>

            <Route 
            exact path='/sposoby-dostawy-i-platnosci'
            element={<Checkout/>}>
            </Route>
            
            <Route 
            exact path="/rejestracja"
            element={<RegisterPage
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
            RegisterU={RegisterU}
            />}>
            </Route>

            <Route
            exact path="/logowanie"
            element={<Login
              SignGoogle={SignGoogle}
              SignFB={SignFB}
              userMail={userMail}
              setUserMail={setUserMail}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              LoginU={LoginU}
            />}
            >

            </Route>

            <Route 
            exact path="/twoj-profil"
            element={<ProfilePage
            user={user}
            />}>
            </Route>

            <Route 
            exact path="/polityka-prywatnosci"
            element={<PrivacyAndPolicy/>}>
            </Route>

            </Routes>
            
        <div class="footer">

            <hr class="footer-line" />
            <div class="footer-container-huge">

                <div class="footer-container">
                    <img src={logoCandleAf} alt="" class="logo-footer"/>
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
                    <select>
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

        </Router>

        </div>
    
        
     )

}

export default Shop

