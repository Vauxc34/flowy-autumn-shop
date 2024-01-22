import React, {useEffect, useContext, useState} from 'react' 
import { PaymentContext } from '../../PaymentProvider'
import { toast } from 'react-toastify'
import $ from 'jquery';

import CheckIcon from '@mui/icons-material/Check';

export const PaymentGate = ({ props, OverallPrice, userBillingInfo, setActiveStep }) => {
 
    const paymentContext = useContext(PaymentContext);
    const {tokenObject, paymentTransaction, isPaymentMade, setIsPaymentMade, transactionData, setTransactionData} = paymentContext;
    
    useEffect(()=> { renderPayment() });

    const renderPayment = ()=> {
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

                    if (formIsInvalid) {
                        toast.error("Card input is not valid");
                        return;
                    }

                    hostedFieldsInstance.tokenize({ 
                        cardholderName: $('#cc-name').val()
                        }, 
                        function(err, payload) {

                            console.log(payload.nonce);
                            paymentTransaction({
                                orderId: Math.floor(Math.random() * 9999),
                                idCart: 842,
                                amount: OverallPrice,
                                idUser: 323,
                                payment_method: 'credit_card',
                                finalized: 'success', 
                                idUser: 351,
                                firstName: userBillingInfo.firstName,
                                lastName: userBillingInfo.lastName,
                                company: 'FlowyAutumn',
                                email: userBillingInfo.email,
                                website: 'www.flowyshopy.com',
                                phone: 543323323,
                                fax: 184447132,
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

    const onCancelPayment = ()=>{

    }

    const gotoPayment = ()=>{
        setIsPaymentMade(false);
        setTransactionData({});
    }
    
    return(
        <>
            {isPaymentMade? 
            <div className="demo-frame" style={{ width: '200%' }}>
                {/*<h3>Zaplacono</h3>
                <div>
                    Amount: {transactionData.transaction !== undefined ? transactionData.transaction.amount: 'N/A'} <br></br>
                    PaymentInstrumentType = {transactionData.transaction !== undefined ? transactionData.transaction.paymentInstrumentType: 'N/A'} <br></br>
                    Status                = {transactionData.transaction !== undefined ? transactionData.transaction.status: 'N/A'} <br></br>
                    Transaction id        = {transactionData.transaction !== undefined ? transactionData.transaction.id: 'N/A'} <br></br>
                </div>
                <div>
                    <a className="btn btn-primary" onClick={gotoPayment}>Go back to payment page</a>
            </div>*/}

<div style={{ height: '100vh' }} className="startup-screen">
            <div className="widget-description">

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
                padding: '10px 5px' }} className="site-btn" id="submit" onClick={gotoPayment}>Cofnij</button>

            </div>
          </div>

            </div> 
            
            
            :
            
                <div className="demo-frame" style={{ width: '200%' }}>  
                    <form submit="/" method="post" id="cardForm" >
 

                        <label className="hosted-fields--label" for="card-number">Numer karty kredytowej</label>
                        <div id="card-number" className="hosted-field payment-gate-input"></div>

                        <label className="hosted-fields--label" for="expiration-date">Data wygasniecia</label>
                        <div id="expiration-date" className="hosted-field payment-gate-input"></div>

                        <label className="hosted-fields--label" for="cvv">CVV</label>
                        <div id="cvv" className="hosted-field payment-gate-input"></div>


                        <h1 style={{ textAlign: 'left', margin: '0 10px' }} >Calosc: {OverallPrice} zł</h1>

                            <input style={{ width: '150px' }} type="submit" className="site-btn" value={"Zaplac"} id="submit"/>
                    </form>

                   

                    <button className="site-btn" style={{ position: 'absolute', left: '180px', bottom: '38.5px' }} onClick={() => setActiveStep(2)}>Cofnij</button>

                </div>
            }
        </>
    );
}