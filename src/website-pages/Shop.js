import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc, addDoc, collection, getDocs, collectionGroup, query, onSnapshot } from "firebase/firestore"; 
import { getDatabase, ref, push, set, orderByChild } from "firebase/database";
import { db } from '../lib/config'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth';
import { AuthThing, AuthSecond } from '../lib/config'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { i18n, i18next } from 'i18next'

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

import logoCandleAf from '../images/logo-web_footer.svg'
import ArrowMenu from '../images/ChevronDown.svg'


/* image's */

const Shop = () =>  {

    const auth = getAuth()

    //const navigate = useNavigate()

    const ToastMessReg = () => toast.success('Pomyślnie zarejestrowano 🥳')

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
      console.log("Document written with ID: ", docRef.id);
    }
  useEffect(() => {
    const data = localStorage.getItem('currentUser');
    if(data) {
      setCurrentUser(JSON.parse(data))
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    console.log(localStorage)
  })
/* register thing's */

/* product's */

  const [ProductList, setProductList] = useState([ 
  {
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99,
    }
  },
  {
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99 
    }
  },
  {
    data:{
      title: 'lorem ipsum', quantity: 34, price: 9.99 
    }
  }
  ,])

  useEffect(() => {
   const q = query(collection(db, 'products'))
   onSnapshot(q, (querySnapshot) => {
    setProductList(querySnapshot.docs.map(doc => ({
      id: doc.id, 
      data: doc.data()
     })))
   })
  }, []); 

  console.log(ProductList)

/* product's */

     return (

        <div class="wrapper">

        <Router>

            <Navbar currentUser={currentUser}/>
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
            element={<Products ProductList={ProductList}/>}>
            </Route>

            <Route 
            exact path='/produkt/:id' 
            element={<ProductPage ProductList={ProductList}/>}>
            </Route>

            <Route
            exact path="/produkty"
            element={<Allproducts ProductList={ProductList}/>}
            >
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
              ToastContainer={ToastContainer}
            />}
            >

            </Route>

            <Route 
            exact path="/twoj-profil"
            element={<ProfilePage
            currentUser={currentUser}
            
            />}>
            </Route>

            <Route
            exact path='/kontakt' 
            element={<ContactForm
              userName={userName}
              setUserName={setUserName}
              userMail={userMail}
              setUserMail={setUserMail}
              ToastContainer={ToastContainer}
              toast={toast}
            />}
            >
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

