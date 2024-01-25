import React, {useState, useEffect, useContext } from 'react' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AnimatePresence } from 'framer-motion' 
import { Link } from 'react-router-dom' 

/* pages */

import AnimatedPage from './AnimatedPage'; 
 
/* component's */

import Navbar from "../components/Navbar" 

/* component's */

/* image's */

import logoFlowyAutumn from '../images/logo-szersze-biale.png'
import ArrowMenu from '../images/ChevronDown.svg'

/* image's */

import { CartContext } from '../CartProvider'

const Shop = () =>  { 

/* register thing's */

  const [User, setUser] = useState(null)  
  const [UserCart, setUserCart] = useState('')
  const [userName, setUserName] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')  
  const ToastMessReg = () => toast.success('Pomyślnie zarejestrowano 🥳')
 
  useEffect(() => {
    const data = localStorage.getItem('User');
    if(data) {
      setUser(JSON.parse(data))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('User', JSON.stringify(User))
  })   
  
/* cart */

  const cartContext = useContext(CartContext);
  const { FetchCart } = cartContext;

  useEffect(() => {
  if(User) { FetchCart(User.cartId) } else {}
  }, [User])

/* cart */

/* product's */

     return (

        <div class="wrapper">
            <Navbar User={User}/>
            <div className='navbar-menu'>
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
UserCart={UserCart}
setUserCart={setUserCart}
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
toast={toast}/>
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
                <a id="company_name">STJÄRNFLOCKA®</a> Wszelkie prawa zastrzeżone dla <a id="creator_1">@fox45</a>
            </span>
        </div>

        </div>
    
     )

}

export default Shop

