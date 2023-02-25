import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { Link } from 'react-router-dom';

export const AddressForm = ({ setCheckoutToken, checkoutToken, next }) => {

  const InputAreas = [
    {name: "firstName", placeholder: "Imię", label: "First name" },
    {name: "lastName", placeholder: "Nazwisko", label: "Last name" },
    {name: "address1", placeholder: "Adres zamieszkania", label: "Address line 1" },
    {name: "email", placeholder: "Uwagi odnośnie zamówienia (opcjonalne)", label: "Email" },
    {name: "zip", placeholder: "Kod pocztowy", label: "City" },
    {name: "city", placeholder: "Miasto", label: "Zip / Postal code" },
  ]

  const Regions = [
    { name: "malopolska", placeholder: "Małopolskie" },
    { name: "mazowsze", placeholder: "Mazowieckie" },
    { name: "opole", placeholder: "Opolskie" },
    { name: "warminsko-mazurskie", placeholder: "Warmińsko-Mazurskie" },
    { name: "podkarpackie", placeholder: "Podkarpackie" },
    { name: "dolno-slaskie", placeholder: "Dolno Śląskie" },
    { name: "podlaskie", placeholder: "Podlaskie" },
    { name: "lubuskie", placeholder: "Lubuskie" },
  ]

        const [shippingCountries, setShippingCountries] = useState([]);
        const [shippingCountry, setShippingCountry] = useState('');
        const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
        const [shippingSubdivision, setShippingSubdivision] = useState('');
        const [shippingOptions, setShippingOptions] = useState([]);
        const [shippingOption, setShippingOption] = useState('');
        const methods = useForm();

        const GoToPayment = () => {
          setCheckoutToken(2)
        }


    return (
        <form className="address-form">

                <h1>Adres wysyłki</h1>

                <FormProvider {...methods}>

                {InputAreas.map((item, key) => <input className="input-form-address" key={key} required name={item.name} placeholder={item.placeholder} label={item.label} /> )}

                <select className="input-form-address" placeholder="Województwo" fullWidth >
                {Regions.map(item =>  <option>{item.placeholder}</option>)}
                </select> 

                <button onClick={next} className='site-btn'>przejdź do płatnosci</button>
                <Link to="/cart">Back to cart</Link>
                </FormProvider>
        </form>
    )
}
