import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import Shop from './website-pages/Shop'
import { BrowserRouter } from 'react-router-dom'
import { PaymentProvider } from './PaymentProvider'
import { CartProvider } from './CartProvider'
import { LanguageProvider } from './LanguageProvider'

ReactDOM.render(
  <LanguageProvider>
  <PaymentProvider>
  <CartProvider>
      <BrowserRouter>
      <React.StrictMode>
      <Shop/>
      </React.StrictMode>
    </BrowserRouter>
    </CartProvider>
  </PaymentProvider>
  </LanguageProvider>
,document.getElementById('root'))