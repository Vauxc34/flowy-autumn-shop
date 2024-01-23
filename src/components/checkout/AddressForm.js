import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const AddressForm = ({  
  setUserBillingInfo,
  setCheckoutToken,   
  next
 }) => {

        const InputAreas = [
      {name: "firstName", placeholder: "Imię", label: "First name" },
      {name: "lastName", placeholder: "Nazwisko", label: "Last name" },
      {name: "address", placeholder: "Adres zamieszkania", label: "Address line 1" },
      {name: "email", placeholder: "Adres e-mail", label: "Email" },
      {name: "city", placeholder: "Miasto", label: "City" },
      {name: "zip", placeholder: "Kod pocztowy", label: "Zip / Postal code" },
        ]

        const [SelectedRegions, setSelectedRegions] = useState('Małopolskie')

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

        const SetUserAddress = () => {
          setUserBillingInfo({ 
            address: InputForm.address,
            city:InputForm.city, 
            email: InputForm.email,
            firstName: InputForm.firstName,
            lastName: InputForm.lastName, 
            zip:InputForm.zip,
            region: SelectedRegions
           })
        }

        const MultipleFunction = () => {
          if(InputForm.address == undefined ||
           InputForm.city == undefined || 
           InputForm.email ==  undefined || 
           InputForm.firstName == undefined || 
           InputForm.lastName == undefined || 
           InputForm.zip == undefined ) {
            toast.error('Nie uzupełniono wszystkich pól')
          } else {  
            next()  
            SetUserAddress() }
        }

    return (
        <form className="address-form">

                <h1 style={{ textAlign: 'left', margin: '0px 3vw 15px' }}>Adres wysyłki</h1>                

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
                value={SelectedRegions}
                required 
                onChange={e => setSelectedRegions(e.target.value)}
                fullWidth>
                {Regions.map((item, key) =>  
                <option 
                key={key} 
                disabled={item.isDislabed} 
                >{item.placeholder}</option>)}
                </select> 

                <input style={{ width: '90%', alignSelf: 'center'
                }} type='submit' className='site-btn' value={"Przejdź do wysylki"} onClick={MultipleFunction}></input>
                <Link to="/koszyk">Powrot do koszyka</Link>
                
                <ToastContainer/>
        </form>
    )
}
