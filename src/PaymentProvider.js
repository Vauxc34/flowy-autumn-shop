import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const PaymentContext = createContext();

export const PaymentProvider = props => {

    const[tokenObject, setTokenObject] = useState({});
    const[isPaymentMade, setIsPaymentMade] = useState(false);
    const[transactionData, setTransactionData] = useState({});

    const getToken = async () => {
       await fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/token`, {
        method: 'GET'
       }).then(res => res.json()).then(data => setTokenObject(data.data))
    }

    useEffect(()=> {
        getToken();
    }, []);

    const paymentTransaction = async (data) => { 
        let result = await axios.post(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/payment`, data);
        setTransactionData(result.data.data);
        console.log(result.data.data)
        setIsPaymentMade(true);
    }

    return(
        <PaymentContext.Provider value={{tokenObject, paymentTransaction, isPaymentMade, setIsPaymentMade, transactionData, setTransactionData}}>
            {props.children}
        </PaymentContext.Provider>
    );
}