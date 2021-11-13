import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

export const AddressForm = () => {

    const methods = useForm()

    return (
        <form className="address-form">
                <FormProvider {...methods}>
                <label>imie</label>
                <input type="text" name="name" required/>
                <label>nazwisko</label>
                <input type="text" name="username" required/>
                <label>adres e-mail</label>
                <input type="text" name="e-mail" required/>
                <label>numer domu/mieszkania</label>
                <input type="text" name="address" required/>
                <label>ulica</label>
                <input type="text" name="street" required/>
                <label>kod pocztowy</label>
                <input type="text" name="zip-code" required/>
                <label>miasto</label>
                <input type="text" name="city" required/>
                <label>panstwo</label>
                <select>
                </select>
                <label>wojewodztwo</label>
                <select>
                <option></option>
                </select>
                <label>opcja wysyłki</label>
                <select value="opcja wysyłki">
                <option></option>
                </select>
                <button>przejdź do płatnosci</button>
                </FormProvider>
        </form>
    )
}
