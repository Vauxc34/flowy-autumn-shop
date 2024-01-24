import React, {useEffect, useContext, useState} from 'react' 
import { PaymentContext } from '../../PaymentProvider'
import { CartContext } from '../../CartProvider';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

import CheckIcon from '@mui/icons-material/Check';

export const PaymentGate = ({ 
    props, 
    OverallPrice, 
    userBillingInfo, 
    setActiveStep, 
    User, 
    OrderActualId }) => {

    let navigate = useNavigate()
    const paymentContext = useContext(PaymentContext);
    const cartContext = useContext(CartContext);
    const {tokenObject, paymentTransaction, isPaymentMade, setIsPaymentMade, transactionData, setTransactionData} = paymentContext;
    const { CleaningCartFunction, userCartContent, ApplyingCouponFunction } = cartContext    

    useEffect(()=> { renderPayment() });

    let ArrayQueries = [{ query: ", (2, 40 - 4)" }]
    let QuantityArray = userCartContent.map(item => { return item.quantity })
    let NewQueryArray = userCartContent.slice(0).map((item, index) => { return `${index === 0 ? '' : ','} (${item.id}, ${QuantityArray[index]} - ${item.quantity})` })
    let resultString = NewQueryArray.join('')
    resultString = resultString.substring(1)

    const DeletionExistedProducts = () => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/deletion`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                FirstProdId: ArrayQueries[0].id, 
                QuantityFirstProd: ArrayQueries[0].quantity, 
                NextQuery: resultString,
            })  
            }).then(res => res.json())
    }
    
    const renderPayment = () => {
        let token = tokenObject;
        let authorization = token;
        var form = document.querySelector('#cardForm');
        window.braintree.client.create({
            authorization: authorization
        }, (err, clientInstance)=> {
        if(err){
            console.log(err);
            return;
        }
        createHostedFields(clientInstance, form);
        });
        const createHostedFields = (clientInstance, form) => {
        window.braintree.hostedFields.create({
            client: clientInstance,
            styles: {
                'input': {
                'font-size': '16px',
                'font-family': 'courier, monospace',
                'font-weight': 'lighter',
                'color': '#ccc'
                },
                ':focus': {
                'color': 'black'
                },
                '.valid': {
                'color': '#8bdda8'
                }
            },
            fields: {
                number: {
                selector: '#card-number',
                placeholder: '4111 1111 1111 1111'
                },
                cvv: {
                selector: '#cvv',
                placeholder: '123'
                },
                expirationDate: {
                selector: '#expiration-date',
                placeholder: 'MM/YYYY'
                }
            }
            }, function (err, hostedFieldsInstance) {
                var teardown = function (event) {
                    event.preventDefault();
                    var formIsInvalid = false;
                    if (formIsInvalid) { toast.error("Card input is not valid"); return }
                    hostedFieldsInstance.tokenize({ 
                        cardholderName: $('#cc-name').val()
                        }, 
                        function(err, payload) {  
                            if(payload.nonce) {
                                setActiveStep(3)
                                DeletionExistedProducts()
                                CleaningCartFunction(User.cartId)
                            }

                            paymentTransaction({
                                orderId: Math.floor(Math.random() * 9999),
                                products: userCartContent,
                                amount: OverallPrice,
                                currencyIsoCode: "PLN",
                                idUser: User.id,
                                payment_method: 'credit_card',
                                finalized: 'success',  
                                firstName: userBillingInfo.firstName,
                                lastName: userBillingInfo.lastName,
                                company: 'FlowyAutumn',
                                email: userBillingInfo.email,
                                website: 'www.flowyshopy.com',
                                phone: userBillingInfo.phone_number,
                                fax: 0,
                                billingDetailsFirstName: userBillingInfo.firstName,
                                billingDetailsLastName: userBillingInfo.lastName,
                                billingDetailsStreetAddress: userBillingInfo.address,
                                billingDetailsLocality: 'Poland',
                                billingDetailsRegion: userBillingInfo.region,
                                billingDetailsPostalCode: userBillingInfo.zip,
                                nonce: payload.nonce
                            });
                        }
                    );
            };
            form.addEventListener('submit', teardown, false);
        })}
    }
   
    return(
        <>
            {isPaymentMade? 
            <div className="demo-frame" style={{ width: '200%' }}>
            <div style={{ height: '100vh' }} className="startup-screen">
            <div className="widget-description" style={{ height: 'unset' }}>

            <CheckIcon style={{
                height: '50px',
                width: '50px',
                padding: '5px',
                margin: '5px',
                borderRadius: '50%',
                border: '2px solid green',
                color: 'green'
            }}/>
            <h1>Dziękujemy za zakupy w naszym sklepie!</h1>
                <h3 style={{ display: 'flex' }}>Zamowienie: &nbsp;<h4>#{transactionData.transaction !== undefined ? transactionData.transaction.id: 'N/A'}</h4></h3>
                <h2 style={{ display: 'flex' }}>Zostalo oplacone i przyjete do realizacji</h2>

              <button style={{ 
                display: 'flex',
                alignSelf: 'center', 
                justifyContent: 'center',
                width: '120px', 
                padding: '10px 5px' }} className="site-btn" id="submit" onClick={() => {
                    setIsPaymentMade(false);
                    setTransactionData({});
                    navigate('/')}}>Cofnij</button>

            </div>
          </div>

            </div> : <div className="demo-frame" style={{ width: '200%' }}>  
                    <form submit="/" method="post" id="cardForm" >

                        <label className="hosted-fields--label" for="card-number">Numer karty kredytowej</label>
                        <div id="card-number" className="hosted-field payment-gate-input"></div>

                        <label className="hosted-fields--label" for="expiration-date">Data wygasniecia</label>
                        <div id="expiration-date" className="hosted-field payment-gate-input"></div>

                        <label className="hosted-fields--label" for="cvv">CVV</label>
                        <div id="cvv" className="hosted-field payment-gate-input"></div>

                        <h1 style={{ textAlign: 'left', margin: '0 10px' }} >Calosc: {OverallPrice} zł</h1>
                             
                            <input style={{ width: '150px' }} 
                            type="submit" 
                            className="site-btn" 
                            value={"Zaplac"} id="submit" />
                             
                    </form>

                
                    <button className="site-btn" style={{ position: 'absolute', left: '180px', bottom: '39.5px' }} onClick={() => setActiveStep(2)}>Cofnij</button>

                </div>
            }
        </>
    );
}