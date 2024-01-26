import React, { useState } from 'react'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const ContactForm = ({
    Language, 
    English, 
    Polish,
    userName,
    setUserName,
    userMail,
    setUserMail,
    ToastContainer,
    toast
}) => {

  const [userPhone, setUserPhone] = useState('')
  const [userMessage, setUserMessage] = useState('')

  const SendingEmail = (e) => {
    let MailInfo = () => toast("Jesteśmy w kontakcie!")
    if(userName == ""|| 
    userMail == "" || 
    userPhone == "" || 
    userMessage == "") {
            e.preventDefault()
            MailInfo = toast.error('Nie uzupełniono wszystkich pól formularza');
        } else {
            e.preventDefault()
            MailInfo = toast?.success('Wysłano pomyślnie wiadomość!');
            window.Email.send({
                Host : process.env.REACT_APP_HOST_MAIL,
                Username : process.env.REACT_APP_MAIL_MAIL,
                Password : process.env.REACT_APP_HOST_PASSWORD,
                To : process.env.REACT_APP_MAIL_MAIL,
                From : process.env.REACT_APP_MAIL_MAIL,
                Subject : `New message from the - ${userMail}`,
                Body : userMessage + userName + userPhone + userMail,
            }).then(message => MailInfo()
        )}
  }

  return (
    <>
    
    <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    id="contact">

    <div className="startup-screen">
          <div className="widget-description">
            
            <form>
                
            <h1>🙋‍♂️ {Language == 'PL' ? Polish.contact_form_header : Language == 'EN' ? English.contact_form_header : 'Potrzebujesz pomocy?' }</h1>

            <div className='input-container'>
            <label>{Language == 'PL' ? Polish.input_form_text_1 : Language == 'EN' ? English.input_form_text_1 : 'Twój adres e-mail' }</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
            </div>

            <div className='input-container'>
            <label>{Language == 'PL' ? Polish.input_form_text_2 : Language == 'EN' ? English.input_form_text_2 : 'Twoje imię i nazwisko' }</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            </div>

            <div className='input-container'>
            <label>{Language == 'PL' ? Polish.input_form_text_3 : Language == 'EN' ? English.input_form_text_3 : 'Numer telefonu (opcjonalnie)' }</label><input type="phone" value={userPhone}  onChange={(e) => setUserPhone(e.target.value)}></input>
            </div>

            <div className='input-container textarea-container'>
            <label>{Language == 'PL' ? Polish.input_form_text_4 : Language == 'EN' ? English.input_form_text_4 : 'Twoja wiadomość' }</label><textarea
            value={userMessage}  
            onChange={(e) => setUserMessage(e.target.value)}
            rows="15"
            ></textarea>
            </div>

            <input className='site-btn' type="submit" onClick={(e) => {SendingEmail(e)}} value={Language == 'PL' ? Polish.input_form_text_5 : Language == 'EN' ? English.input_form_text_5 : 'Wyślij wiadomość' }></input>
                
            </form>
            <ToastContainer/>
          </div>
        </div>

    </motion.section>

    </>
  )
}

export default ContactForm