import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import Shop from './website-pages/Shop'
import { BrowserRouter } from 'react-router-dom'
import { PaymentProvider } from './PaymentProvider'

ReactDOM.render(
  <PaymentProvider>
      <BrowserRouter>
      <React.StrictMode>
      <Shop/>
      </React.StrictMode>
    </BrowserRouter>
  </PaymentProvider>
,document.getElementById('root'))