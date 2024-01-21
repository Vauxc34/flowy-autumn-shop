import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

/* */

import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent'; 
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';  
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

/* */

const PaymentForm = ({ 
  userBillingInfo, 
  SelectedRegions,
  setSelectedRegions,
  setActiveStep, 
  OverallPrice, 
  User }) => {

  const [CartArray, setCartArray] = useState([])
  const [NameLastName, setNameLastName] = useState('')
  const [CreditCardNumber, setCreditCardNumber] = useState('')
  const [ExpireDate, setExpireDate] = useState('')
  const [CVV, setCVV] = useState('')
   
  useEffect(() => {
      fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/812`, {
        method: 'GET',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }        
        }).then(res => res.json()).then(data => setCartArray(data.content[0][0].products)) 
  }, []) 

  {/**

   - TEST DATA -

     creditCardDetailsCardholderName:  "Andrzej Moskiewicz",
      creditCardDetailsNumber: "4111 1111 1111 1111",
      creditCardDetailsExpirationDate: "09/23",
      creditCardDetailsCvv: "123"

*/}

  const PayForIt = (e) => {  e.preventDefault()
     fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}/pay/payment`, { 
      method: "POST",
      body: JSON.stringify({
      orderId: Math.floor(Math.random() * 999),
      amount: OverallPrice,
      idUser:  User.id,
      firstName: userBillingInfo.firstName,
      lastName: userBillingInfo.lastName,
      company:  "FlowyAutumn",
      email: userBillingInfo.email,
      website: "www.flowyshopy.net",
      phone: userBillingInfo.phone,
      fax: "",
      creditCardDetailsCardholderName:  NameLastName,
      creditCardDetailsNumber: CreditCardNumber,
      creditCardDetailsExpirationDate: ExpireDate,
      creditCardDetailsCvv: CVV,
      billingDetailsFirstName: userBillingInfo.firstName,
      billingDetailsLastName: userBillingInfo.lastName,
      billingDetailsStreetAddress: userBillingInfo.address1,
      billingDetailsLocality: "Poland",
      billingDetailsRegion:  SelectedRegions,
      billingDetailsPostalCode: userBillingInfo.zip
    })
    }).then(data => console.log(data.json()))}


    //window.location.href= "/confirmation-order"

  return (
    <> 
        
            <ul>
                {/* <h3>Zamówione przedmioty</h3>

            <div className='items-review' style={{ margin: '15px' }}>
               CartArray != [] ? null : JSON.parse(CartArray).map(item =>  
                  <ul>
                  <li>{item.id}</li>
                  <li>ilość towaru:{item.quantity}</li>
                  <li>Łączna cena: 0</li>
                  </ul>
                )
            </div>
            */}
            <span>
            <form className="address-form">

            <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto', 
        overflow: 'auto',
        resize: 'horizontal',
        width: '100%'
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Zaplac za zakupy
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Imie i nazwisko wlasciciela karty</FormLabel>
          <Input placeholder="Wypelnij pola" value={NameLastName} onChange={(e) => setNameLastName(e.target.value)} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Numer karty kredytowej</FormLabel>
          <Input endDecorator={<CreditCardIcon />} value={CreditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Data wygasniecia</FormLabel>
          <Input endDecorator={<CreditCardIcon />} value={ExpireDate} onChange={(e) => setExpireDate(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input endDecorator={<InfoOutlined />} value={CVV} onChange={(e) => setCVV(e.target.value)} />
        </FormControl>
        <CardActions sx={{ gridColumn: '1/-1' }} style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>

          {NameLastName == '' || CreditCardNumber == '' || ExpireDate == '' || CVV == '' ? 
          <button style={{ 
          padding: "10px 20px", 
          margin: 'unset',
            backgroundColor: "#7a7a7a" }} onClick={(e) => e.preventDefault()} className='site-btn'>Nie wprowadzono danych</button>
                      : <div style={{ display: 'flex' }}>
                       <button onClick={PayForIt} style={{ padding: "10px 20px", margin: 'unset' }} className='site-btn'>Zapłać</button>
                       <button onClick={() => setActiveStep(0)} style={{ 
                      padding: "10px 20px", 
                      margin: '0px 10px', 
                      textAlign: 'center' }} className='site-btn'>Cofnij</button>
            
                        </div>}
     

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0px 0px' }}>
            <h1>Całość: {OverallPrice} zł</h1>
            </div>

        </CardActions>
      </CardContent>
            </Card>

            </form>
            </span>
            
            </ul>
    </>
  );
};

export default PaymentForm;