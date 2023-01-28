import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

/* image's */

import ProfilePic from '../images/profile-pic.webp'

/* */

const ProfilePage = ({ currentUser }) => {

    const [ProfilePic, setProfilePic]= useState('')
    const [userName, setUserName]= useState('')
    const [Mail, setMail]= useState('')
    const [RegistrationMethod, setRegistrationMethod] = useState('')
    const [PhoneNumber, setPhoneNumber] = useState('+48')
   
    const userSetter = () => {
    setProfilePic(currentUser?.photoURL)
    setUserName(currentUser?.displayName)
    setMail(currentUser?.providerData[0].email)
    setRegistrationMethod(currentUser?.providerData[0].providerId)
    }

    console.log(currentUser)

    useEffect(() => {userSetter()}, [userSetter])

    console.log(userName)

return (
    <>

    <section id='profile'>


    <div className="wrapper-product">

    <div className='row-product'>

    <img className='user-profile--' src={ProfilePic} />

    <h1 className='product-title--'>{userName}</h1>


    <div className='product-parameters'>



<div className='container-for-a-parameters'>


<div>



<div>

<span className='parameter-itself'>
    <p>
        Twój adres email:
    </p>
    <p>
      {Mail}
    </p>
</span>
<span className='parameter-itself'>
    <p>
    Numer telefonu:
    </p>
    <p>
    
    <input type='phone' value={PhoneNumber} maxLength='15' onChange={(e) => setPhoneNumber(e.target.value)}></input>
    </p>
</span>
<span className='parameter-itself'>
    <p>
       Zarejestrowany przez:
    </p>
    <p>
       {RegistrationMethod}
    </p>
</span>

</div>

</div>

</div>

    </div>
   

    <div className='container-for-etc-product'>

    <h3>Michał Matczak jest prawowitym właścicielem ziem Bieszczadzkich</h3>

    <h2>Ciekawostka dnia 🍬</h2>

    </div>

    </div>
    <div className='row-product'>

    <div className='product-parameters'>
        <h1>Historia zakupów</h1>
    </div>

    </div>
    </div>

    </section>

    </>
)
}


export default ProfilePage