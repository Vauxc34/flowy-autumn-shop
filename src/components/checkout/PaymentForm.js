import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 

/* parts */

import { PaymentGate } from './PaymentGate';

/* */

import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent'; 
import Divider from '@mui/joy/Divider'; 
import Typography from '@mui/joy/Typography';  
import InfoOutlined from '@mui/icons-material/InfoOutlined';

/* */

const PaymentForm = ({ 
  Language, 
  English,
  Polish,
  userBillingInfo,  
  setActiveStep, 
  OverallPrice,  
  User }) => {

  return (
    <> 
        
            <ul>
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
      {Language == 'PL' ? Polish.payment_header : Language == 'EN' ? English.payment_header : "Zaplac za zakupy" }
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
Language={Language}
English={English}
Polish={Polish}
OverallPrice={OverallPrice}
userBillingInfo={userBillingInfo}
setActiveStep={setActiveStep}
User={User}/>

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