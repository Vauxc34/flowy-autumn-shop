import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logout_Img from '../images/logout.png'
import { ToastContainer } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

const OrderView = ({ 
  User, 
  Language, 
  English, 
  Polish
}) => {

  const [UserTransactions, setUserTransactions] = useState([])
  const [SingleTransaction, setSingleTransaction] = useState([]) 
  const [SingleTransactionProducts, setSingleTransactionProducts] = useState([]) 
  const [OverallPrice, setOverallPrice] = useState(0)
  const [OverallQuantity, setOverallQuantity] = useState(0)
 
  let location = useLocation()
  const TransactionLink = location.pathname.split('/', 3)[2]
  let navigate = useNavigate()

  const GetItemIndex = (items) => {
    return UserTransactions.findIndex(item => item.idTransaction == TransactionLink);
  }
  
  useEffect(() => {
    if(User) {      
      fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/user/${User.id}`, {
        method: 'GET',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setUserTransactions(data.content[0]))
    } else {  }
  }, [User])  

  useEffect(() => {
    const foundIndex = GetItemIndex(UserTransactions, TransactionLink);
    if(foundIndex == -1) { } else {
      setSingleTransactionProducts(JSON.parse(UserTransactions[foundIndex].products)) 
      setSingleTransaction(UserTransactions[foundIndex]) 
    }        
  }, [UserTransactions, TransactionLink])

  const TransactionTile = ({ item }) => {      

      const [singleProdDetails, setSingleProdDetails] = useState([])
      const [SecondAdditionalData, setSecondAdditionalData] = useState([])

      useEffect(() => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${item.id}`, {
          method: 'GET',  
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
      }}).then(res => res.json()).then(data => setSingleProdDetails(data.prod))
      }, [])

      useEffect(() => {
        if(SingleTransactionProducts != []) { 
          let Arr = SingleTransactionProducts.map(item => { return { 
            overall_price_for_item: item.price * item.quantity,
            overall_quantity: item.quantity,
          }})
          setOverallPrice((Arr.reduce((a,v) =>  a = a + v.overall_price_for_item , 0 ))) 
          setOverallQuantity((Arr.reduce((a,v) =>  a = a + v.overall_quantity , 0 ))) 
        } else {  }
      }, [SingleTransactionProducts])
    
      return (
        <>
        
        <div className="cart-item-itself">
        <div className="container-for-etc" style={{ width: '100%' }}>
          <div className='row-for-etc'>
            <div className="product-image-cart" style={{ 
            borderBottomRightRadius: '50px', 
            backgroundImage: `url(
              ${singleProdDetails && singleProdDetails.image ?  singleProdDetails.image  : 
                'https://placehold.co/150x150/purple/white' })` }}></div>
          </div>
          <div className='row-for-etc' style={{ width: window.innerWidth < 600 ? '100%' : '50%' }} >
            <div className="container-for-item-name-h4" style={{ alignItems: 'flex-end', textAlign: 'end' }}>
              {singleProdDetails && singleProdDetails.name ? (
                <h4>{singleProdDetails.name}</h4>
              ) : (
                <p>Loading...</p>
              )}
              <span></span>
            </div>
            <div className="container-for-item-name-h4" style={{ alignItems: 'flex-end', textAlign: 'end' }}>
              {/* <a className='site-btn'>usuń</a> */}
              <div className='quantity-box-container' style={{ alignSelf: 'end' }}>
                {singleProdDetails && singleProdDetails.price ? (
                  <p>{Language == 'PL' ? Polish.price : Language == 'EN' ? English.price : 'Cena' }: {singleProdDetails.price} zl</p>
                ) : (
                  <p>Loading...</p>
                )}
                <div className='quantity-box' style={{ alignItems: 'center' }}>
                  <h4 style={{ margin: '0 10px' }}>
                  {Language == 'PL' ? 'Ilosc w koszyku' : Language == 'EN' ? 'Quantity in a cart' : 'Ilosc w koszyku' }
                    : </h4>
                  <div className='select-item-quantity'>
                    <span className='p_quantity-itself' style={{ border: '1.25px solid pink' }} >{item.quantity}</span> 
                  </div>
                </div>
              </div>

              <div className='quantity-box-container' style={{ alignSelf: 'end' }}>
                {singleProdDetails && singleProdDetails.EAN ? (
                  <p>EAN: {singleProdDetails.EAN}</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className='quantity-box-container' style={{ alignSelf: 'end' }}>
                {singleProdDetails && singleProdDetails.EAN ? (
                  <p>SKU: {singleProdDetails.EAN}</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="container-for-item-name-h4" style={{ alignItems: 'flex-end', textAlign: 'end' }}>
              {singleProdDetails && singleProdDetails.id ? (
                <h2 style={{ cursor: 'pointer' }}><a onClick={() => navigate(`/produkt/${singleProdDetails.id}`)}>
                  {Language == 'PL' ? 'Zobacz produkt' : Language == 'EN' ? 'View product' : 'Zobacz produkt' }
                  </a></h2>
              ) : (
                <p>Loading...</p>
              )}
              <span></span>
            </div>

            </div>
          </div>
        </div>
        </div>
        
        </>

      )

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

<div className='row-product' style={{ padding: '4em 1em 0em 1em' }}>  
<div className='product-parameters'>
<h1>{Language == 'PL' ? 'Twoje zamowienie' : Language == 'EN' ? 'Your order' : 'Twoje zamowienie' }</h1>
<div className="orders-list">
  {SingleTransactionProducts == [] ? <h2>Brak zamowien</h2> : SingleTransactionProducts.map(item => <TransactionTile item={item} />)}
</div>
</div>
</div>
<div className='row-product' style={{ padding: '4em 1em 0em 1em' }}>
<div className='product-parameters'>
<div className='container-for-a-parameters'>
<div>
<div>
<span className='parameter-itself'>
<p>
{Language == 'PL' ? 'Numer zamowienia' : Language == 'EN' ? 'Order number' : 'Numer zamowienia' }:</p>
<p>
#{SingleTransaction.idTransaction}
</p>
</span>
<span className='parameter-itself'>
<p>
{Language == 'PL' ? 'Sposob zaplaty' : Language == 'EN' ? 'Payment method' : 'Sposob zaplaty' }:</p>
<p>
{SingleTransaction.payment_method == "credit_card" && Language == 'PL' ? 'Karta kredytowa' :
SingleTransaction.payment_method == "credit_card" && Language == 'EN' ? 'Credit Cart' : 
'Sposob zaplaty'}
</p>
</span>
<span className='parameter-itself'>
<p>
Status</p>
<p style={{ color: 'green' }}>
{SingleTransaction.finalized == 'success' && Language == 'PL' ? 'Zaplacono' 
: SingleTransaction.finalized == 'success' && Language == 'EN' ? 'Paid' : 
'Nieznany' }
</p>
</span>
<span className='parameter-itself'>
<p>
{Language == 'PL' ? 'Zakupiono' : Language == 'EN' ? 'Purchased' : 'Zakupiono' }:</p>
<p>
{SingleTransaction.createdAt}
</p>
</span>

<span className='parameter-itself'>
  <p>{Language == 'PL' ? 'Ilosc przedmiotow' : Language == 'EN' ? 'Number of overall items'  : 'Ilosc przedmiotow' }:</p>
<h2>{OverallQuantity}</h2>
</span>

<span className='parameter-itself'>
  <p>{Language == 'PL' ? Polish.overall : Language == 'EN' ? English.overall  : 'Calosc' }:</p>
<h2>{OverallPrice} zl</h2>
</span>

<span className='parameter-itself'>
<p><button className='site-btn' style={{ margin: '.6em 0 .1em 0' }} onClick={() => navigate('/twoj-profil')} >{Language == 'PL' ? 'Cofnij' : Language == 'EN' ? 'Back' : 'Cofnij' }</button></p>
</span>
</div>
</div>
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


export default OrderView