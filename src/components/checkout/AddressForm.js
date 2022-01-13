import { Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce'

export const AddressForm = ({ checkoutToken, next }) => {

        const [shippingCountries, setShippingCountries] = useState([]);
        const [shippingCountry, setShippingCountry] = useState('');
        const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
        const [shippingSubdivision, setShippingSubdivision] = useState('');
        const [shippingOptions, setShippingOptions] = useState([]);
        const [shippingOption, setShippingOption] = useState('');
        const methods = useForm();
      
        const fetchShippingCountries = async (checkoutTokenId) => {
          const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      
          setShippingCountries(countries);
          setShippingCountry(Object.keys(countries)[0]);
        };
      
        const fetchSubdivisions = async (countryCode) => {
          const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      
          setShippingSubdivisions(subdivisions);
          setShippingSubdivision(Object.keys(subdivisions)[0]);
        };
      
        const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
          const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
      
          setShippingOptions(options);
          setShippingOption(options[0].id);
        };
      
        useEffect(() => {
          fetchShippingCountries(checkoutToken.id);
        }, []);
      
        useEffect(() => {
          if (shippingCountry) fetchSubdivisions(shippingCountry);
        }, [shippingCountry]);
      
        useEffect(() => {
          if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }, [shippingSubdivision])




    return (
        <form className="address-form" onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                <FormProvider {...methods}>
                <input required name="firstName" placeholder="Name" label="First name" />
                <input required name="lastName" placeholder="Second Name" label="Last name" />
                <input required name="address1" placeholder="Address and number" label="Address line 1" />
                <input required name="email" placeholder="Shipping note (optional)" label="Email" />
                <input required name="zip" placeholder="Postal Code" label="City" />
                <input required name="city" placeholder="City" label="Zip / Postal code" />
                <select value={shippingCountry} placeholder="Province" fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>            
                <select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>
                <select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>

                <button className='first'>przejdź do płatnosci</button>
                <Link to="/cart">Back to cart</Link>
                </FormProvider>
        </form>
    )
}
