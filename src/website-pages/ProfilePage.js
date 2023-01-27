import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

/* image's */

import ProfilePic from '../images/profile-pic.webp'

/* */

const ProfilePage = ({ user }) => {

    const [ProfilePic, setProfilePic]= useState('')
    const [userName, setUserName]= useState('')
    const [Mail, setMail]= useState('')
    const [RegistrationDate, setRegistrationDate] = useState('')
    const [RegistrationDay, setRegistrationDay] = useState('')
   
    const userSetter = async () => {
        setProfilePic(user.photoURL)
        setUserName(user.displayName)
        setMail(user.reloadUserInfo.email)
        setRegistrationDate(user.metadata.creationTime)
    }


    useEffect(() => {userSetter()}, [userSetter])

    console.log(RegistrationDay)
    

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
    +48 533 432 245
    </p>
</span>
<span className='parameter-itself'>
    <p>
        Data rejestracji:
    </p>
    <p>
       {RegistrationDate}
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
        <h1>Zakupione i nieopłacone</h1>
    </div>

    </div>
    </div>

    </section>

    </>
)

}

export default ProfilePage