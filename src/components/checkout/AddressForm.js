import { Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { Link } from 'react-router-dom';

export const AddressForm = ({ checkoutToken, next }) => {

  const InputAreas = [
    {name: "firstName", placeholder: "Name", label: "First name" },
    {name: "lastName", placeholder: "Second Name", label: "Last name" },
    {name: "address1", placeholder: "Address and number", label: "Address line 1" },
    {name: "email", placeholder: "Shipping note (optional)", label: "Email" },
    {name: "zip", placeholder: "Postal Code", label: "City" },
    {name: "city", placeholder: "City", label: "Zip / Postal code" },
  ]

        const [shippingCountries, setShippingCountries] = useState([]);
        const [shippingCountry, setShippingCountry] = useState('');
        const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
        const [shippingSubdivision, setShippingSubdivision] = useState('');
        const [shippingOptions, setShippingOptions] = useState([]);
        const [shippingOption, setShippingOption] = useState('');
        const methods = useForm();

    return (
        <form className="address-form">

                <h1>Shipping Address</h1>

                <FormProvider {...methods}>

                {InputAreas.map((item, key) => <input className="input-form-address" key={key} required name={item.name} placeholder={item.placeholder} label={item.label} /> )}

                <select className="input-form-address" placeholder="Province" fullWidth >
                
                  <option >
                    
                  </option>
                
                </select> 

                <select className="input-form-address" fullWidth >
                  <option>
                    
                  </option>
             
                </select>

                <select className="input-form-address" fullWidth >
               
                  <option >
                    
                  </option>
              
                </select>

                <button className='site-btn'>przejdź do płatnosci</button>
                <Link to="/cart">Back to cart</Link>
                </FormProvider>
        </form>
    )
}
