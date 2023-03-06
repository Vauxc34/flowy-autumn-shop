import React, { useState, useEffect } from 'react'

const Review = ({ 
    CreditCardNumber,
    setCreditCardNumber,
 }) => {

    const [CartArray, setCartArray] = useState([])

    
    let idUser = 'qcC6uukDcp0yS7BkK0bf'
    let idItem = '2gAxrck3XnTpZv0cZLbV'

    useEffect(() => {
        fetch('https://candle-af-shop.appspot.com/cart/' + idUser, {method: 'POST'}).then(data =>  data.json()).then(some => setCartArray(some))
        }, [CartArray])

    return (
        <>
            <ul>
                <h3>Zamówione przedmioty</h3>

            <div className='items-review'>
                {CartArray.map(item =>  <ul><li>{item._fieldsProto.NameProduct.stringValue}</li><li>ilość towaru:{item._fieldsProto.ProdQuantity.integerValue}</li><li>Łączna cena:{item._fieldsProto.PriceProduct.integerValue}</li></ul>)}
            </div>
            <span>
                <input type='number' 
                className='review-card' 
                value={CreditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
                ></input>
            </span>
            <div>
            <h1>Całość:</h1>
            <p>{0} zł</p>
            </div>
            </ul>
        </>
    )
}

export default Review
