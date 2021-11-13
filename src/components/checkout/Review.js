import React from 'react'

const Review = ({ checkoutToken }) => {
    return (
        <>
            <ul>
                {checkoutToken.live.line_items.map((product) => (
                    <li key={product.name}>
                        <ul>
                            <li>{product.name}</li>
                            <li>{`ilość: ${product.quantity}`}</li>
                            <li>{`Łączna cena: ${product.line_total.formatted_with_symbol}`}</li>
                        </ul>
                        
                    </li>
                    
                ))}
                <span>
                <h1>Calosc:</h1>
                <p>{checkoutToken.live.subtotal.formatted_with_symbol}</p>
                </span>
            </ul>
        </>
    )
}

export default Review
