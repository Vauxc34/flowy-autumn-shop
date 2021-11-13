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
                <label>imie</label>
                <input type="text" name="firstname" required/>
                <label>nazwisko</label>
                <input type="text" name="lastname" required/>
                <label>adres e-mail</label>
                <input type="text" name="email" required/>
                <label>numer domu/mieszkania</label>
                <input type="text" name="house_nmbr" required/>
                <label>ulica</label>
                <input type="text" name="street" required/>
                <label>kod pocztowy</label>
                <input type="text" name="postal_zip_code" required/>
                <label>miasto</label>
                <input type="text" name="town_city" required/>
                <label>panstwo</label>
                
                <select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>
                <label>wojewodztwo</label>
                
                <select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>

                <label>opcja wysyłki</label>
                
                <select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
                </select>

                <button>
                    <Link to="/cart">
                    fds
                    </Link>
                </button>

                <button>przejdź do płatnosci</button>


                </FormProvider>
        </form>
    )
}
