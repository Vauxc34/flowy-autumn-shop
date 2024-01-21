import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const AddressForm = ({  
  setUserBillingInfo,
  setCheckoutToken,  
  SelectedRegions,
  setSelectedRegions,
  next
 }) => {

        const InputAreas = [
      {name: "firstName", placeholder: "Imię", label: "First name" },
      {name: "lastName", placeholder: "Nazwisko", label: "Last name" },
      {name: "address1", placeholder: "Adres zamieszkania", label: "Address line 1" },
      {name: "email", placeholder: "Uwagi odnośnie zamówienia (opcjonalne)", label: "Email" },
      {name: "city", placeholder: "Miasto", label: "City" },
      {name: "zip", placeholder: "Kod pocztowy", label: "Zip / Postal code" },
        ]

        const Regions = [
      { name: "nie_wybrano", placeholder: "Nie wybrano", isDislabed: 'disabled' },
      { name: "malopolska", placeholder: "Małopolskie", isDislabed: '' },
      { name: "mazowsze", placeholder: "Mazowieckie", isDislabed: '' },
      { name: "opole", placeholder: "Opolskie", isDislabed: '' },
      { name: "warminsko-mazurskie", placeholder: "Warmińsko-Mazurskie", isDislabed: '' },
      { name: "podkarpackie", placeholder: "Podkarpackie", isDislabed: '' },
      { name: "dolno-slaskie", placeholder: "Dolnosląskie", isDislabed: '' },
      { name: "podlaskie", placeholder: "Podlaskie", isDislabed: '' },
      { name: "lubuskie", placeholder: "Lubuskie", isDislabed: '' },
        ]

        const [InputForm, setInputForm] = useState(InputAreas)
        const HandleInputs = (e) => {setInputForm({...InputForm, [e.target.name]: e.target.value})}
        const methods = useForm();

        //const GoToPayment = () => { setCheckoutToken(2) }

        const SetUserAddress = () => {
          setUserBillingInfo({ 
            address: InputForm.address1,
            city:InputForm.city, 
            email: InputForm.email,
            firstName: InputForm.firstName,
            lastName: InputForm.lastName, 
            zip:InputForm.zip
           })
        }

        const MultipleFunction = () => {
          if(
           InputForm.address  === '' ||
           InputForm.city === '' || 
           InputForm.email === '' || 
           InputForm.firstName === '' || 
           InputForm.lastName === "" || 
           InputForm.zip === "" ) {
            toast.error('Nie uzupełniono wszystkich pól formularza 😩')
          } else {  next()  
            SetUserAddress() }
        }

    return (
        <form className="address-form">

                <h1 style={{ textAlign: 'left', margin: '0px 5vw 15px' }}>Adres wysyłki</h1>

                <FormProvider {...methods}>

                {InputAreas.map((item, key) => 
                <input 
                className="input-form-address" 
                key={key} 
                required 
                name={item.name} 
                placeholder={item.placeholder} 
                label={item.label} 
                onChange={HandleInputs}
                />
                )}
                <select 
                className="input-form-address" 
                placeholder="Województwo" 
                onChange={(e) => setSelectedRegions(e.target.value)}
                fullWidth >
                {Regions.map((item, key) =>  
                <option key={key} disabled={item.isDislabed} value={item.placeholder}>{item.placeholder}</option>
                )}
                </select> 

                <input style={{ width: '90%', alignSelf: 'center'
                }} type='submit' className='site-btn' value={"przejdź do płatnosci"} onClick={MultipleFunction}></input>
                <Link to="/koszyk">Powrot do koszyka</Link>
                </FormProvider>
                <ToastContainer/>
        </form>
    )
}
