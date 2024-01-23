import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import {Link}  from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

export const Cart = ({ User, UserCart, setQuantityCartUser, QuantityCartUser }) => {

    const navigate = useNavigate() 
    const [HideContent, setHideContent] = useState(false)
    const [newUserQuantity, setNewUserQuantity] = useState(1)
    const [OverallPrice, setOverallPrice] = useState(0) 
    const [CartArray, setCartArray] = useState('')

    useEffect(() => {
        if(UserCart) { 
          let Arr = JSON.parse(UserCart).map(item => { return { overall_price_for_item: item.price * item.quantity }})
          setOverallPrice((Arr.reduce((a,v) =>  a = a + v.overall_price_for_item , 0 ))) 
        } else {  }
    }, [UserCart])

    useEffect(() => {
        if(User) {
          fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${User.cartId}`, {
            method: 'GET',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }        
            }).then(res => res.json()).then(data => setCartArray(data.content[0][0].products)) 
        } else {  }
    }, [UserCart])

    const CleaningCart = () => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/cartU/${User.cartId}`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }}).then(res => res.json()).then(toast.info('Czysto'))
              setQuantityCartUser(0)
              setOverallPrice(0)
              setHideContent(true)
    }
   
    const Item = ({idProd, quantityU, PPrice}) => {
        
        const [singleProdDetails, setSingleProdDetails] = useState({}); 

        const RemovingProductInAcart = async () => {   
          
          try {
            
            const items = JSON.parse(UserCart)
            let IndexActual = items.findIndex(x => x.id == idProd)   
    
            setNewUserQuantity(newUserQuantity - 1)   
            await axios.post(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
              id: User.cartId,
              Obj: idProd,
              IndexO: IndexActual,
              num_prod: quantityU - 1,
              price: PPrice
            })
            .then((response) => {
              toast.success('Zmieniono stan w koszyku')
              window.location.reload()
            }, (error) => {
              toast.log(error);
            });

            

          } catch (e) {  toast.error(e) } 
        }

        const AdddingProductInAcart = async () => {      
        const items = JSON.parse(UserCart)
        let IndexActual = items.findIndex(x => x.id == idProd) 
        let ItemActual = items.find(x => x.id == idProd)
        
        setNewUserQuantity(newUserQuantity + 1)     
        await axios.post(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
          id: User.cartId,
          Obj: idProd,
          IndexO: IndexActual,
          num_prod: quantityU + 1,
          price: PPrice
        })
        .then((response) => {
          toast.success('Zmieniono stan w koszyku')
          window.location.reload()
        }, (error) => {
          toast.log(error);
        });
        }  

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${idProd}`).then
              (response => setSingleProdDetails(response.data.prod))
               
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          };
      
          fetchData();
        }, [idProd]); 
        
        return (

            <div className="cart-item-itself">
            <div className="container-for-etc">
            <div className='row-for-etc'>
            <div className="product-image-cart" style={{ backgroundImage: `url(${singleProdDetails.image})` }}></div>
            </div>
            <div className='row-for-etc'>
            <div className="container-for-item-name-h4">
            <h4>{singleProdDetails.name}</h4>
            <span></span>  
            </div>
            <div className="container-for-item-name-h4">

            {/* <a className='site-btn'>usuń</a> */}
            
            <div className='quantity-box-container'>
            <p>{singleProdDetails.price} zl</p>
            <div className='quantity-box'>
            <div className='select-item-quantity'>
               
              <div onClick={AdddingProductInAcart} value="+" className='p__'>+</div>
              <span className='p_quantity-itself' >{quantityU}</span> 
              <div onClick={RemovingProductInAcart} value="-" className='p__' >-</div>
               
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>

        )
 

    } 

    return (
        <motion.div className="cart-itself" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {User ? <>

            <div className='cart-mess'>
            <h1>Twój koszyk z zakupami</h1>
            <h2>Wróć do <Link to='/'>produktów</Link></h2>
            </div>

            <div className='label-for-cart-prod'>
                <h3>Produkt i jego szczegóły</h3>
                <h3>Cena</h3>
            </div>
            <hr className='product-line'></hr>

            {UserCart == '' || HideContent ?  null : JSON.parse(UserCart).map(item => <Item idProd={item.id} quantityU={item.quantity} PPrice={item.price}/>)}
            
            <div className="container-for-a-cart-options">
            <h1>Całość: {UserCart != '' ? OverallPrice : 0} zl<span>Każde zamówienie, VAT i inne podatki będzie miało doliczone</span></h1>

            {UserCart == '' ? <button className="site-btn" onClick={() => navigate('/')} >Wroc na sklep</button> : <>
            <button className="site-btn" onClick={() => navigate('/sposoby-dostawy-i-platnosci')}>Przejście do kasy</button>
            <button className="site-btn" onClick={CleaningCart}>Opróżnij koszyk ❌</button>
            </> }
            
            </div>
            </> : <>

        <div className="startup-screen" id="logout">
        <div className="widget-description">
       
       <form style={{ textAlign: 'center' }}>
           
       <h1>Zaloguj sie</h1>

       {/*<img style={{ height: '17.5em', width: '15em', margin: '4vh', alignSelf: 'center' }} src=''></img>*/}

       <h2>w celu dokonania zakupow</h2>

       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>

       <button onClick={() =>  navigate("/logowanie") } style={{maxWidth: '50%', alignSelf: 'center', margin: '1em .5em .5em 0em', padding: '.5em' }} class="site-btn">Logowanie</button>
       <button onClick={() =>  navigate("/rejestracja") } style={{maxWidth: '50%', alignSelf: 'center', margin: '.5em .5em 0em 0em', padding: '.5em' }} class="site-btn">Rejestracja</button>

       </div>
      
     
       </form>
     
     </div>
    </div>

            </>
 
            }


            <ToastContainer/>
        </motion.div>
    )
}
