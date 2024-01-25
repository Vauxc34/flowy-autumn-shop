import React, { useState, useRef } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const RegisterPage = ({
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

      toast.error('Nie uzupelniles pol')
 
    }if(userPassword != userPasswordRepeat) {

      toast.error('Haslo sie nie zgadza')

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
    }).then(res => res.status >= 400 ? toast.error('Nie mozna sie zalogowac') : res.json() )
    .then(toast.success('Zarejestrowano')).then(fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}users/${NewUserId.current}`, {
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
    })})).then(navigate('/')))}
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
    
<h1>🔑 Rejestracja</h1>

<form onSubmit={handleSubmit}>
<div className='input-container'>
<label>Imię</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
</div>

<div className='input-container'>
<label>Nazwisko</label><input type="text" value={userSurname} onChange={(e) => setUserSurname(e.target.value)}></input>
</div>

<div className='input-container'>
<label>Adres e-mail</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
</div>

<div className='input-container'>
<label>Hasło</label><input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
</div>

<div className='input-container'>
<label>Powtórz hasło</label><input type="password" value={userPasswordRepeat} onChange={(e) => setUserPasswordRepeat(e.target.value)}></input>
</div>

<input type="submit" className='site-btn' onClick={RegisterNewUser} value={"Zarejestruj się"}></input>

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




</> : <h4>Nie znaleziono 404</h4>   }

</div>
</div>
    </motion.section>

    </>
  )
}

export default RegisterPage