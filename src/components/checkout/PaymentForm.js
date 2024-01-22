import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

import { PaymentGate } from './PaymentGate';

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

<PaymentGate 
OverallPrice={OverallPrice}
userBillingInfo={userBillingInfo}
setActiveStep={setActiveStep}
/>

        <CardActions sx={{ gridColumn: '1/-1' }} style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
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