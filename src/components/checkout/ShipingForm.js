import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// icons //

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const ShipingForm = ({ 
  Language, 
  Polish,
  English,
  next, 
  nextStep,
  userBillingInfo, 
  setActiveStep,
  setUserBillingInfo, 
  SelectedRegions }) => {

    const [ShipmentForm, setShipmentForm] = useState(10)
    const [PriceForAshipment, setPriceForAshipment] = useState(0)

    const ShippmentForms = [
      { desc: "Darmowa wysylka kurierem", company: 'DHL', price: 0, form: "courier_prepaid", no_days: 7, opt: 0, checked: false },
      { desc: "Darmowa wysylka kurierem", company: 'FedEX', price: 0, form: "courier_prepaid", no_days: 12, opt: 1, checked: false },
    ]

    const [NewShipmentArray, setNewShipmentArray] = useState(ShippmentForms)
    const setSelectedShipmentForm = (e) => {
      let SelectedOption = ShippmentForms.find(item => item.opt == e.target.value)
      setShipmentForm(SelectedOption.opt)
             if(SelectedOption.opt === 0) {
        ShippmentForms[0].checked = true
        ShippmentForms[1].checked = false
        setPriceForAshipment(ShippmentForms[0].price)
        setNewShipmentArray([...ShippmentForms])
      } else if (SelectedOption.opt === 1) {
        ShippmentForms[0].checked = false
        ShippmentForms[1].checked = true
        setPriceForAshipment(ShippmentForms[1].price)
        setNewShipmentArray([...ShippmentForms])
      }       
    }

    return (
<form className="address-form">

<h1 style={{ textAlign: 'left', margin: '0px 3vw 15px' }}>{Language == 'PL' ? Polish.form_of_shipment : Language == 'EN' ? English.form_of_shipment : 'Forma wysylki' }</h1>

<div className='product-parameters' style={{ width: '90%', justifyContent: 'center', alignSelf: 'center' }}>

       <span className='parameter-itself' style={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'flex-start' }}>
        <h3 style={{ display: 'flex' , margin: '5px 0' }}><span style={{ margin: '-4px -7.5px 5px' }}><EditNoteIcon style={{ fontSize: '32px' }}/></span>
        {Language == 'PL' ? Polish.address_shipment : Language == 'EN' ? English.address_shipment : "Adres wysyłki" }
        </h3>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_2_1 : Language == 'EN' ? English.input_form_text_2_1 : "Imię" }
        : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.firstName}</h4></span>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_2_2 : Language == 'EN' ? English.input_form_text_2_2 : "Nazwisko" }
        : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.lastName}</h4></span>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_7 : Language == 'EN' ? English.input_form_text_7 : "Adres zamieszkania" }
        : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.address}</h4></span>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_8 : Language == 'EN' ? English.input_form_text_8 : "Miasto" }
        : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.city}</h4></span>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_9 : Language == 'EN' ? English.input_form_text_9 : "Kod pocztowy" }
      : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.zip}</h4></span>
      <span style={{ display: 'flex', flexDirection: 'row' }}><h4>
      {Language == 'PL' ? Polish.input_form_text_11 : Language == 'EN' ? English.input_form_text_11 : "Województwo" }
        : </h4> <h4 style={{ fontWeight: 600, margin: '0 4px' }} > {userBillingInfo.region}</h4></span>
        </span>

<span className='parameter-itself' style={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'flex-start', margin: '10px 0' }}>
    <h3 style={{ display: 'flex' }}><span style={{ margin: '.5px -7.5px' }} ><LocalShippingIcon style={{ fontSize: '28px' }}/></span> 
    {Language == 'PL' ? Polish.form_of_shipment : Language == 'EN' ? English.form_of_shipment : "Forma wysylki" }
    </h3>

    <span className='parameter-itself' style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignSelf: 'flex-start', 
      alignItems: 'flex-start', 
      margin: '10px'
      }}>
      {NewShipmentArray.map(item => <>
        <div style={{ display: 'flex' }}>
        <input style={{ width: 'unset', margin: '0 5px' }}
        onClick={(e) => setSelectedShipmentForm(e)}
        value={item.opt}
        checked={item.checked}
        type="radio"
        required></input><h4>{item.desc} {item.company}: {item.price} zl | Sredni czas oczekiwania: {item.no_days} dni</h4></div>
      </>)}
      </span>   
</span>
<button style={{ background: "#407ff5" }} onClick={(e) => {e.preventDefault(); setActiveStep(0) }} className='site-btn'>
{Language == 'PL' ? Polish.change_btn_shippment : Language == 'EN' ? English.change_btn_shippment : "Zmien dane do wysylki" }</button> 
</div>
<input style={{ width: '90%', alignSelf: 'center' }} type='submit' className='site-btn' value={Language == 'PL' ? Polish.check_pay_go_into_btn : Language == 'EN' ? English.check_pay_go_into_btn : "Przejdź do płatnosci" } onClick={(e) => {
  e.preventDefault()
  if(ShipmentForm == 10) {
    toast.error('Nie ustawiono wysylki!')
  } else if(ShipmentForm == 0 || ShipmentForm == 1) {
    next()
  }}}></input>
  <Link to="/koszyk">
  {Language == 'PL' ? Polish.checkout_go_into_btn : Language == 'EN' ? English.checkout_go_into_btn : "Powrot do koszyka" }
  </Link>
<ToastContainer/>
    </form>
    )
}
 