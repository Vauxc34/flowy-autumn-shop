import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logout_Img from '../images/logout.png'
import { ToastContainer } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const ProfilePage = ({ 
  User, 
  setUser,
  Language, 
  English, 
  Polish
}) => {

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
            <h4>{Language == 'PL' ? Polish.order : Language == 'EN' ? English.order : 'Zamowienie' }: #{idTrans}</h4>
              {/*<span>Cena za calosc: {0} zl</span>   
            <h3>Ilość przedmiotow: {0}</h3>*/}
            </div>
          </div>
            </div>
      )

    }

    //console.log(UserTransactions)
    
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
       <h1>{Language == 'PL' ? Polish.login_unlogged : Language == 'EN' ? English.login_unlogged : 'Nie zalogowano' }</h1>
       <img style={{ height: '17.5em', width: '15em', margin: '4vh', alignSelf: 'center' }} src={logout_Img}></img>
       <h2>{Language == 'PL' ? Polish.login_unlogged_paragraph : Language == 'EN' ? English.login_unlogged_paragraph : ' Zaloguj się aby podejrzeć transakcję i reszte ciekawych dla ciebie rzeczy' }</h2>
       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>
       <button onClick={() =>  navigate("/logowanie") } style={{maxWidth: '40%', alignSelf: 'center', margin: '1em .5em .5em 0em' }} class="site-btn">
       {Language == 'PL' ? Polish.login_button_1 : Language == 'EN' ? English.login_button_1 : 'Logowanie' }</button>
       <button onClick={() =>  navigate("/rejestracja") } style={{maxWidth: '40%', alignSelf: 'center', margin: '.5em .5em 0em 0em' }} class="site-btn">
       {Language == 'PL' ? Polish.register_button_1 : Language == 'EN' ? English.register_button_1 : ' Rejestracja' }</button>
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
{Language == 'PL' ? Polish.your_address_mail : Language == 'EN' ? English.your_address_mail : 'Twój adres email' }:</p>
<p>
{User.mail}
</p>
</span>
 
<span className='parameter-itself'>
<p><button className='site-btn' style={{ margin: '.6em 0 .1em 0' }} onClick={LogOut}>{Language == 'PL' ? Polish.logout_button_1 : Language == 'EN' ? English.logout_button_1 : 'Wyloguj się' }</button></p>
</span>
</div>

</div>

</div>

</div>

<div className='container-for-etc-product'>

<h3>Michał Matczak jest prawowitym właścicielem ziem Bieszczadzkich</h3>

<h2>{Language == 'PL' ? Polish.fun_fact : Language == 'EN' ? English.fun_fact : 'Ciekawostka dnia' } 🍬</h2>

</div>

</div>
<div className='row-product'>

<div className='product-parameters'>
<h1>{Language == 'PL' ? Polish.story : Language == 'EN' ? English.story : 'Historia zakupów' }</h1>

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