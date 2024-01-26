import React, {createContext, useEffect, useState} from 'react';
import Polish from './assets/locales/pl/translation.json'
import English from './assets/locales/en/translation.json'

export const LanguageContext = createContext();

export const LanguageProvider = props => {

     const [Language, setLanguage] = useState('PL')
     const [SelectorLanguage, setSelectorLanguage] = useState('')

    const SetterActualLanguage = (e) => {
        setSelectorLanguage(e.target.value)
        if(e.target.value == 'PL') {
            setLanguage('PL')
        } else if (e.target.value == 'EN') {
            setLanguage('EN')
        }
    }

      useEffect(() => {
        const data = localStorage.getItem('Language');
        if(data) {
            setLanguage(data)
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('Language', Language)
      })   
    
    return(
        <LanguageContext.Provider value={{ Language, Polish, English, SelectorLanguage, SetterActualLanguage }}>
            {props.children}
        </LanguageContext.Provider>
    );
}