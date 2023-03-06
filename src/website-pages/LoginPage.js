import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const RegisterPage = ({
  SignGoogle,
  SignFB,
  userMail,
  setUserMail,
  userPassword,
  setUserPassword,
  LoginU,
  ToastContainer
}) => {

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

    <h1>🔑 Logowanie</h1>

    <form onSubmit={handleSubmit}>

      <div className='input-container'>
      <label>Adres e-mail</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
      </div>

      <div className='input-container'>
      <label>Hasło</label><input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
      </div>

      <input type="submit" className='site-btn' onClick={LoginU} value={"Zaloguj się"}></input>

      <div className='container-wrapped'>
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
      </div>
    <ToastContainer/>
    </form>

    </div>

    </div>

    </motion.section>

    </>
  )
}

export default RegisterPage