import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ContactForm = ({
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
                Host : "smtp.elasticemail.com",
                Username : "amalinowski575@gmail.com",
                Password : "A544B306F194EE26EB6D6E750942EFD05995",
                To : 'amalinowski575@gmail.com',
                From : "amalinowski575@gmail.com",
                Subject : "This is the subject",
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
                
            <h1>🙋‍♂️ Potrzebujesz pomocy?</h1>

            <div className='input-container'>
            <label>Twój adres e-mail</label><input type="email" value={userMail} onChange={(e) => setUserMail(e.target.value)}></input>
            </div>

            <div className='input-container'>
            <label>Twoje imię i nazwisko</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            </div>

            <div className='input-container'>
            <label>Numer telefonu (opcjonalne)</label><input type="phone" value={userPhone}  onChange={(e) => setUserPhone(e.target.value)}></input>
            </div>

            <div className='input-container textarea-container'>
            <label>Twoja wiadomość</label><textarea
            value={userMessage}  
            onChange={(e) => setUserMessage(e.target.value)}
            rows="15"
            ></textarea>
            </div>

            <input className='site-btn' type="submit" onClick={(e) => {SendingEmail(e)}} value="Wyślij wiadomość"></input>
                
            </form>
            <ToastContainer/>
          </div>
        </div>

    </motion.section>

    </>
  )
}

export default ContactForm