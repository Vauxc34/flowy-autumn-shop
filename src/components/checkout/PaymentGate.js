import React, {useEffect, useContext, useState} from 'react' 
import { PaymentContext } from '../../PaymentProvider'
import { CartContext } from '../../CartProvider';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

/* */

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
    const { CleaningCartFunction, userCartContent } = cartContext    

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

    function MailToSend() {
        window.Email.send({
            Host : process.env.REACT_APP_HOST_MAIL,
            Username : process.env.REACT_APP_MAIL_MAIL,
            Password : process.env.REACT_APP_PASSWORD_MAIL,
            To : `${userBillingInfo.email}`,
            From : 'amalinowski575@gmail.com',
            Subject : `Dziekujemy za zakupy w naszym sklepie - ${userBillingInfo.email}`,
            Body : `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
            <style type="text/css">body, html {
              margin: 0px;
              padding: 0px;
              -webkit-font-smoothing: antialiased;
              text-size-adjust: none;
              width: 100% !important;
            }
              table td, table {
              }
              #outlook a {
                padding: 0px;
              }
              .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                line-height: 100%;
              }
              .ExternalClass {
                width: 100%;
              }
              @media only screen and (max-width: 480px) {
                table, table tr td, table td {
                  width: 100% ;
                }
                table tr td table.edsocialfollowcontainer  {
                  width: auto;
                }
                img {
                  width: inherit;
                }
                .layer_2 {
                  max-width: 100% !important;
                }
                .edsocialfollowcontainer table {
                  max-width: 25% !important;
                }
                .edsocialfollowcontainer table td {
                  padding: 10px !important;
                }
                .edsocialfollowcontainer table {
                  max-width: 25% !important;
                }
                .edsocialfollowcontainer table td {
                  padding: 10px !important;
                }
              }
            
              
            /* configutator */
            
            #content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            background: white;
            padding: 1em;
            width: 100em;
            z-index: 999;
            }
            
            #content span{
            color: black;
            }
            
            #content h1{
            align-self: flex-start !important;
            }
            
            #map * {
            overflow:visible;
            }
            
            /* configutator */
            
            </style>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
            </head><body style="padding:0; margin: 0;background: #e4e6ec">
            
            
            
            <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
              <tbody>
                <tr>
                  <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
                    <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                    
            
                    
            
                   <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
                      <tbody>
                        
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="emptycell" style="padding: 10px;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td class="edimg" valign="top" style="padding: 0px; box-sizing: border-box; text-align: center;">
                                      <img style="width: 50%; margin: 40px 0 0px; border-width: 0px; font-size:12px; border-style: none; max-width: 596px;" width="596" alt="Image" src="https://images.unsplash.com/photo-1563804447971-6e113ab80713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="emptycell" style="padding: 10px;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
            
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                      <p class="style1 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">Dokonano zakupu w drogerii</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr><td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;"><!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]--><div class="layer_2" style="max-width: 600px; display: inline-block; vertical-align: top; width: 100%;"><table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%"><tbody><tr><td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;"><p style="margin: 0px; padding: 0px;"><strong>Imię i nazwisko kupujacego: ${userBillingInfo.firstName} ${userBillingInfo.lastName}</strong></p><p style="margin: 0px; padding: 0px;"><strong>Adres e-mail:${userBillingInfo.email}</strong></p><p style="margin: 0px; padding: 0px;"><strong><br></strong></p>
            
                  <h1>Dziekujemy za dokonanie zamowienia</h1>       
            
                    <h2>Numer zamowienia : #${Math.floor(Math.random() * 9999)}</h2>
                    <span>Zapraszamy ponownie!</span><br>         
            
            </td></tr></tbody></table></div><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr> 
                        
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                    
            
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
            
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="emptycell" style="padding: 10px;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            
                            
                              <div class="layer_2" style="max-width: 296px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="edimg" style="padding: 20px; box-sizing: border-box; text-align: center;">
                                      <img src="http://api.elasticemail.com/userfile/49540e0f-2e09-4101-a05d-5032842b99d3/template-enhancements-2.jpg" alt="Image" width="256" style="font-size:12px; border-width: 0px; border-style: none; max-width: 256px; width: 100%;">
                                    </td>
                                  </tr>
                                  
                                  
                                  <tr>
                                    <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                      <p class="style3 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                        <strong>Morbi est risust
                                        </strong>
                                      </p>
                                      <p style="margin: 0px; padding: 0px;">
                                        <br>
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">consectetur adipisicing elit, sed do&nbsp;
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">eiusmod tempor incididunt ut labore&nbsp;
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">et dolore magna aliqua.
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="edbutton text-center" style="padding: 20px; text-align: center;">
                                      <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="text-center" style="border-radius: 8px; padding: 14px; background: #C82586; text-align: center;">
                                              <a style="font-size: 14px; word-break: break-word; color: #ffffff; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-weight: normal; text-decoration: none; display: inline-block;"><span style="color: #ffffff;">Awesome button</span></a></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 296px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="edimg" style="padding: 20px; box-sizing: border-box; text-align: center;">
                                      <img src="http://api.elasticemail.com/userfile/49540e0f-2e09-4101-a05d-5032842b99d3/template-enhancements-3.jpg" alt="Image" width="256" style="border-width: 0px; font-size:12px; border-style: none; max-width: 256px; width: 100%;">
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="edtext" style="padding: 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                      <p class="style3 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 16px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                        <strong>Etiam venenatis
                                        </strong>
                                      </p>
                                      <p style="margin: 0px; padding: 0px;">
                                        <br>
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">consectetur adipisicing elit, sed do&nbsp;
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">eiusmod tempor incididunt ut labore&nbsp;
                                      </p>
                                      <p class="text-center" style="text-align: center; margin: 0px; padding: 0px;">et dolore magna aliqua.
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="edbutton text-center" style="padding: 20px; text-align: center;">
                                      <table cellspacing="0" cellpadding="0" style="text-align: center;margin:0 auto;" align="center">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="text-center" style="border-radius: 8px; padding: 14px; background: #C82586; text-align: center;">
                                              <a style="font-size: 14px; word-break: break-word; color: #ffffff; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-weight: normal; text-decoration: none; display: inline-block;"><span style="color: #ffffff;">Awesome button</span></a></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="emptycell" style="padding: 10px;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="edimg" style="padding: 0px; box-sizing: border-box; text-align: center;">
                                      <img src="http://api.elasticemail.com/userfile/49540e0f-2e09-4101-a05d-5032842b99d3/template-enhancements-4.jpg" alt="Image" width="596" style="border-width: 0px; font-size:12px; border-style: none; max-width: 596px; width: 100%;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow" valign="top" align="center" style="background-color: #e4e6ec; box-sizing: border-box; font-size: 0px; text-align: center;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                              <table border="0" cellspacing="0" cellpadding="0" class="edcontent" style="border-collapse: collapse;width:100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="emptycell" style="padding: 20px;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <tr>
                          <td class="drow text-center" valign="top" align="center" style="background-color: #e4e6ec; text-align: center; box-sizing: border-box; font-size: 0px;">
                            <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                            <div class="layer_2 text-center" style="max-width: 596px; text-align: center; display: inline-block; vertical-align: top; width: 100%;">
                              <table class="edcontent" style="border-collapse: collapse;width:100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td class="edtext text-center" valign="top" style="padding: 10px; text-align: center; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                      <p style="font-size: 11px; margin: 0px; padding: 0px;"><br>FlowyShopy
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>`,
        })
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
                                MailToSend()
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