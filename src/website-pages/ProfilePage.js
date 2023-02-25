import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProfilePage = ({ currentUser }) => {

    /* Profile things */

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

    //console.log(currentUser)

    useEffect(() => {userSetter()}, [userSetter])

    //console.log(userName)

    /* Profile things */

    /* Order's things */

    const [TransactionList, setTransactionList] = useState([
        {test: 'test'}, 
        {test: 'test'}
    ])

    useEffect(() => {
    fetch('http://localhost:8080/orders/transaction-list', {method: 'POST'}).then(data => data.json()).then(data => setTransactionList(data))
    }, [TransactionList])

    /* Order's things */

return (
    <>

    <motion.section id='profile'
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
    >


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

        <div className="orders-list">
        {TransactionList.map(item => <>
            <div className="container-for-etc">
    
            <div className='row-for-etc'>
            <img className="product-image-cart" src='https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg' />
            </div>
            
            <div className='row-for-etc'>
    
            <div className="container-for-item-name-h4">
            <h4>Lorem ipsum item</h4>
            <span>Cena: 9.99</span>  
            <h3>Ilość: 1</h3>
            </div>
    
            </div>
            </div>
        </>)}
        </div>

    </div>

    </div>
    </div>

    </motion.section>

    </>
)
}


export default ProfilePage