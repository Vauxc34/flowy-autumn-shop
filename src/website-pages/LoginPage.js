import React, { useState, useRef, useEffect } from 'react'
import { Link, redirect,  useNavigate  } from 'react-router-dom' 
import { toast } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const LoginPage = ({ 
  User,
  setUser,
  ToastContainer
}) => {

  const [userMail, setUserMail] = useState('')
  const [userPassword, setUserPassword] = useState('') 
  const navigate = useNavigate();

  const handleSetUser = (data) => {
      setUser(data.mess[0])
      if(data) {

        navigate('/')

      }  
  }

  const LogInNewUser = () => {

    fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}users/login`, {
      method: 'POST',  
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        mail: userMail,
        password: userPassword
      })
      }).then(res => res.status >= 401 ? toast.error('Wprowadzono zle dane') : res.json()).then(data =>  setUser(data.mess[0]))

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

      {User == null ?   <>
    
      <h1>🔑 Logowanie</h1>

      <div className='input-container' style={{ width: '90%' }} >
      <label>Adres e-mail</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
      </div>

      <div className='input-container' style={{ width: '90%' }} >
      <label>Hasło</label><input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
      </div>

      <input type="submit" className='site-btn' onClick={LogInNewUser} value={"Zaloguj się"}></input>

      {/*<div className='container-wrapped'>
        <input 
        type="submit" 
        className='site-btn google_col' 
        value={"Zaloguj się z G"}
        onClick={SignGoogle}
        ></input>
        <input 
        type="submit" 
        className='site-btn facebook_col' 
        onClick={SignFB} 
        value={"Zaloguj się z FB"}
        ></input>
        <h4>Powrót do <Link to='/rejestracja'>rejestracji</Link></h4>
  </div>*/}
   
    </> : <>

    <h4>Zostales zalgowany!</h4>
    <Link to="/"><h5>Przejdz na sklep</h5></Link>

    </>}   

    </div>
    <ToastContainer/>


    </div>

    </motion.section>

    </>

 
  )
}

export default LoginPage