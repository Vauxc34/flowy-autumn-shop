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
import { LanguageContext } from '../LanguageProvider';

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

  const languageContext = useContext(LanguageContext);
  const {  Language, Polish, English, SetterActualLanguage  } = languageContext;

  useEffect(() => {
  if(User) { FetchCart(User.cartId) } else {}
  }, [User])

/* cart */

/* product's */

     return (

        <div class="wrapper">
            <Navbar User={User}/>
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
                    <span class="footer-text" >{Language == 'PL' ? Polish.slogan_text : Language == 'EN' ? English.slogan_text : "Wszystkie niezbędne akcesoria w niskich cenach."}</span>    
                </div>
                <div class="footer-container-second">
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">{Language == 'PL' ? Polish.footer_heading_1 : Language == 'EN' ? English.footer_heading_1 : 'Zakładki' }</li>
                    <li><Link to='/'>{Language == 'PL' ? Polish.footer_list_1_1 : Language == 'EN' ? English.footer_list_1_1 : 'Strona główna' }</Link></li>
                    {User ? null : <li><Link to='/rejestracja'>{Language == 'PL' ? Polish.footer_list_1_2 : Language == 'EN' ? English.footer_list_1_2 : 'Zarejestruj się' }</Link></li>}
                    <li><Link to='/twoj-profil'>{Language == 'PL' ? Polish.footer_list_1_3 : Language == 'EN' ? English.footer_list_1_3 : 'Twój profil' }</Link></li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">{Language == 'PL' ? Polish.footer_heading_2 : Language == 'EN' ? English.footer_heading_2 : 'Informacje' }</li>
                    <li><Link to='/kontakt'>{Language == 'PL' ? Polish.footer_list_2_1 : Language == 'EN' ? English.footer_list_2_1 : 'Kontakt z nami' }</Link></li>
                    <li><Link to='/polityka-prywatnosci'>{Language == 'PL' ? Polish.footer_list_2_2 : Language == 'EN' ? English.footer_list_2_2 : 'Polityka prywatności' }</Link></li>
                    </ul>
                    <ul class="footer-nav-links">
                    <li class="footer-nav-main">{Language == 'PL' ? Polish.footer_heading_3 : Language == 'EN' ? English.footer_heading_3 : 'Język strony' }</li>
                    <select name="langugage_change" id="langugage_change" onChange={(e) => SetterActualLanguage(e)} value={Language}>
                        <option value={"PL"}>Polski (Słowiański)</option>
                        <option value={"EN"}>English (Brytyjski)</option>
                    </select>
                    </ul>    
                </div>

            </div>
            
        </div>
        <div class="footer-credits">
            <span class="copyright-text">
                <a id="company_name">STJÄRNFLOCKA®</a>{Language == 'PL' ? Polish.rights_reserved_text : Language == 'EN' ? English.rights_reserved_text : ' Wszelkie prawa zastrzeżone dla' }<a id="creator_1"> @fox45</a>
            </span>
        </div>

        </div>
    
     )

}

export default Shop

