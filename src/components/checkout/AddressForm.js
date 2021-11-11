import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { FormInput } from './FormInput'

export const AddressForm = () => {
    const methods = useForm()
    return (
        <form className="address-form">
            
                <h3>Adres dostawy</h3>
                <FormProvider {...methods}>
                <form onSubmit=''>
                <FormInput required name="firstname" style="color:white;" id="test" label="first name"/>
                </form>
                </FormProvider>
        </form>
    )
}
