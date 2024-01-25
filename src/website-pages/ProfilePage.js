import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logout_Img from '../images/logout.png'
import { ToastContainer } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const ProfilePage = ({ User, setUser }) => {

    let navigate = useNavigate()
    const [ProfilePic, setProfilePic]= useState('https://static-00.iconduck.com/assets.00/user-profile-icon-512x512-pdqa839q.png') 
    const [UserTransactions, setUserTransactions] = useState([])

    useEffect(() => {

      if(User) {

        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/user/${User.id}`, {
          method: 'GET',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }}).then(res => res.json()).then(data => setUserTransactions(data.content[0]))

      } else { }

    }, [])

    const TransactionTile = ({ item, idTrans }) => {

      let IndexItem = UserTransactions.findIndex(item => item.idTransaction == idTrans)

      const [AdditionalData, setAdditionalData] = useState([])
      const [OverallSingleDatas, setOverallSingleDatas] = useState('')

      useEffect(() => {
        if(User) {
          
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${User.cartId}`, {
          method: 'GET',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }        
          }).then(res => res.json()).then(data => setAdditionalData(JSON.parse(data.content[0][0].products))) 

        } else {  }
      }, [User])

      useEffect(() => {
        if(AdditionalData) {
          let Arr = AdditionalData.map(item => { return { 
            overall_price_for_item: item.price * item.quantity,
            quantity: item.quantity
           }})
           setOverallSingleDatas(Arr)
        } else {}
      }, [AdditionalData])
    
      return (

        <div className="container-for-etc">

          <div className='row-for-etc'>
            
          </div>

          <div className='row-for-etc' style={{ textAlign: 'right' }}>

          <div className="container-for-item-name-h4">
            <h4>Zamowienie: #{idTrans}</h4>
              {/*<span>Cena za calosc: {0} zl</span>   
            <h3>Ilość przedmiotow: {0}</h3>*/}
            </div>
          </div>
            </div>
      )

    }

    console.log(UserTransactions)
    
    const LogOut = () => {
      setUser(null)
  }
 
return (
    <>

    <motion.section id='profile'
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
    >


    <div className="wrapper-product">

    {User == null ? <div className="startup-screen" id="logout">
     <div className="widget-description">
       
       <form style={{ textAlign: 'center' }}>
           
       <h1>Nie zalogowano</h1>

       <img style={{ height: '17.5em', width: '15em', margin: '4vh', alignSelf: 'center' }} src={logout_Img}></img>

       <h2>Zaloguj się aby podejrzeć transakcję i reszte ciekawych dla ciebie rzeczy</h2>

       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>

       <button onClick={() =>  navigate("/logowanie") } style={{maxWidth: '40%', alignSelf: 'center', margin: '1em .5em .5em 0em' }} class="site-btn">Logowanie</button>
       <button onClick={() =>  navigate("/rejestracja") } style={{maxWidth: '40%', alignSelf: 'center', margin: '.5em .5em 0em 0em' }} class="site-btn">Rejestracja</button>

       </div>
      
     
       </form>
     
     </div>
    </div>  : <>

<div className='row-product'>
<img className='user-profile--' src={ProfilePic} />
<h1 className='product-title--'>{User.name} {User.surname}</h1>
<div className='product-parameters'>
<div className='container-for-a-parameters'>
<div>
<div>
<span className='parameter-itself'>
<p>
Twój adres email:
</p>
<p>
{User.mail}
</p>
</span>
 
<span className='parameter-itself'>
<p><button className='site-btn' style={{ margin: '.6em 0 .1em 0' }} onClick={LogOut}>Wyloguj się</button></p>
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

  {UserTransactions == [] ? <h2>Brak zamowien</h2>  : UserTransactions.map(item => <TransactionTile 
  item={item}
  idTrans={item.idTransaction}
  />)}
 
</div>

</div>

</div>

    </>}

    
    </div>

    <ToastContainer/>
    </motion.section>

    </>
)
}


export default ProfilePage