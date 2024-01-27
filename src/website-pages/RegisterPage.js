import React, { useState, useRef } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const RegisterPage = ({
  Language,
  Polish,
  English,
  ToastContainer,
  setUser,
  User
}) => {

  const navigate =  useNavigate()

  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('')
  const NewUserId = useRef(Math.floor(Math.random() * 999))
  const NewCartId = useRef(Math.floor(Math.random() * 999))

  const RegisterNewUser = () => {
    if(userName == '' || userSurname == '' || userMail == '' || userPassword == '' || userPasswordRepeat == '') {

      toast.error(Language == 'PL' ? 'Nie uzupelniles pol' : Language == 'EN' ? 'You dont fill fields' : 'Nie uzupelniles pol')
 
    }if(userPassword != userPasswordRepeat) {

      toast.error(Language == 'PL' ? 'Haslo sie nie zgadza' : Language == 'EN' ? 'Password is not correct' : 'Haslo sie nie zgadza')

    } else {
    fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}users/`, {
    method: 'POST',  
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
          id: NewUserId.current,
          name: userName,
          surname: userSurname, 
          mail: userMail,
          password: userPassword,
          role: "client",
          cartId: NewCartId.current
    })
    }).then(res => res.status >= 400 ? toast.error(Language == 'PL' ? 'Nie mozna sie zalogowac' : Language == 'EN' ? 'You cannot log in' : 'Nie mozna sie zalogowac') : res.json() )
    .then(toast.success(Language == 'PL' ? 'Zarejestrowano' : Language == 'EN' ? 'You succesfuly registered' : 'Zarejestrowano')).then(fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}users/${NewUserId.current}`, {
        method: 'GET',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json()).then(data => setUser(data.content[0][0])).then(fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${NewUserId.current}`, {
          method: 'POST',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
            id: NewCartId.current,
            products: [], 
            payment_method: "not_selected",
            amount_of_money: 0
    })})))}
  }

  const handleSubmit = async e => {
    e.preventDefault()
  }

  return (
    <>
    
    <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    id='register'>

    <div className='startup-screen'>

    <div className='widget-description'>

      {User == null  ? <>
    
<h1>🔑 {Language == 'PL' ? Polish.register_button_1 : Language == 'EN' ? English.register_button_1 : 'Rejestracja' }</h1>

<form onSubmit={handleSubmit}>
<div className='input-container'>
<label>{Language == 'PL' ? Polish.input_form_text_2_1 : Language == 'EN' ? English.input_form_text_2_1 : 'Imię' }</label><input type="text" value={userName}  minLength={3} onChange={(e) => setUserName(e.target.value)}></input>
</div>

<div className='input-container'>
<label>{Language == 'PL' ? Polish.input_form_text_2_2 : Language == 'EN' ? English.input_form_text_2_2 : 'Nazwisko' }</label><input type="text" value={userSurname} minLength={3} onChange={(e) => setUserSurname(e.target.value)}></input>
</div>

<div className='input-container'>
<label>{Language == 'PL' ? Polish.input_form_text_1 : Language == 'EN' ? English.input_form_text_1 : 'Adres e-mail' }</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
</div>

<div className='input-container'>
<label>{Language == 'PL' ? Polish.input_form_text_6_1 : Language == 'EN' ? English.input_form_text_6_1 : 'Hasło' }</label><input type="password" pattern="[^0-9]*" value={userPassword} minLength={8} onChange={(e) => setUserPassword(e.target.value)}></input>
</div>

<div className='input-container'>
<label>{Language == 'PL' ? Polish.input_form_text_6_2 : Language == 'EN' ? English.input_form_text_6_2 : 'Powtórz hasło' }</label><input type="password" pattern="[^0-9]*" value={userPasswordRepeat} minLength={8} onChange={(e) => setUserPasswordRepeat(e.target.value)}></input>
</div>

<input type="submit" className='site-btn' onClick={RegisterNewUser} value={Language == 'PL' ? Polish.register_button_2 : Language == 'EN' ? English.register_button_2 : 'Zarejestruj się' }></input>

{/*<div className='container-wrapped'>
<input 
type="submit" 
className='site-btn google_col' 
value={"Zaloguj się z G"} 
></input>
<input type="submit" className='site-btn facebook_col' value={"Zaloguj się z FB"}></input>
<h4>Posiadasz konto? <Link to='/logowanie'>Zaloguj się</Link></h4>
</div>*/}
<ToastContainer/>
</form>

</> : User ? <>
<h4>{Language == 'PL' ? 'Zarejestrowano' : Language == 'EN' ? 'You succesfully registered' : 'Zarejestrowano' }</h4>
<Link to="/"><h5>{Language == 'PL' ? Polish.login_confirmation_subtitle_1 : Language == 'EN' ? English.login_confirmation_subtitle_1 : 'Przejdz na sklep' }</h5></Link>
</> : <h4>{Language == 'PL' ? 'Nie znaleziono' : Language == 'EN' ? 'Not found' : 'Nie znaleziono' } 404</h4>   }

</div>
</div>
    </motion.section>

    </>
  )
}

export default RegisterPage