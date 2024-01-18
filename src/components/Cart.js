import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import {Link}  from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

/* style stuff */

import { motion } from 'framer-motion'

/* style stuff */

export const Cart = ({ User, UserCart }) => {

    const navigate = useNavigate()
    const [CartArray, setCartArray] = useState('')  
    const [HideContent, setHideContent] = useState(false)
    const [newUserQuantity, setNewUserQuantity] = useState(1)

    useEffect(() => {
        if(User) {
            fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${User.cartId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => setCartArray(data.content[0][0].products))
        } else {
            console.log('no user')
        }
    }, [])

    const CleaningCart = () => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/cartU/${User.cartId}`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
              
              
            }).then(res => res.json()).then(toast.info('Czysto'))
            setHideContent(true)
    }
   
    const Item = ({idProd, quantityU}) => {
        
        const [singleProdDetails, setSingleProdDetails] = useState({});

        const RemovingProductInAcart = () => {    
        const items = JSON.parse(CartArray)
        let IndexActual = items.findIndex(x => x.id)
        setNewUserQuantity(newUserQuantity - 1) 
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
                method: 'POST',  
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    id: User.cartId,
                    Obj: idProd,
                    IndexO: IndexActual,
                    num_prod: quantityU - newUserQuantity 
                })
        }).then(res => res.json()).then(toast.success('Zmieniono stan w koszyk'))
        }

        const AdddingProductInAcart = () => {      
        const items = JSON.parse(CartArray)
        let IndexActual = items.findIndex(x => x.id) 
        setNewUserQuantity(newUserQuantity + 1)     
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
                method: 'POST',  
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    id: User.cartId,
                    Obj: idProd,
                    IndexO: IndexActual,
                    num_prod: quantityU + newUserQuantity 
                })
        }).then(res => res.json()).then(toast.success('Zmieniono stan w koszyk'))
        }  

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${idProd}`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              });
              const data = await response.json();
              setSingleProdDetails(data.prod);
             
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
            <img className="product-image-cart" src={singleProdDetails.image} />
            </div>
            <div className='row-for-etc'>
            <div className="container-for-item-name-h4">
            <h4>{singleProdDetails.name}</h4>
            <span></span>  
            </div>
            <div className="container-for-item-name-h4">

            {/* 
            
            <a className='site-btn'>usuń</a>      

            */}

            
            <div className='quantity-box-container'>
            <p>{singleProdDetails.price} zl</p>
            <div className='quantity-box'>
            <div className='select-item-quantity'>
            <div onClick={AdddingProductInAcart} className='p__'>+</div>
            <span className='p_quantity-itself'>{quantityU + newUserQuantity - 1}</span>
            <div onClick={RemovingProductInAcart} className='p__'>-</div>
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

            {CartArray == '' || HideContent ?  null : JSON.parse(CartArray).map(item => <Item idProd={item.id} quantityU={item.quantity}/>)}
            
            <div className="container-for-a-cart-options">
            <h1>Całość: <span>Każde zamówienie, VAT i inne podatki będzie miało doliczone</span></h1>

            {CartArray == '' ? <button className="site-btn" onClick={() => navigate('/')} >Wroc na sklep</button> : <>
            <button className="site-btn">Przejście do kasy</button>
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
