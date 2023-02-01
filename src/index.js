import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import Shop from './website-pages/Shop'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
<BrowserRouter>
      <React.StrictMode>
      <Shop/>
      </React.StrictMode>
    </BrowserRouter>


,


document.getElementById('root'))