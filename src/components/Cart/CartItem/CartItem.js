import React from 'react'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => { 

    return (
        
        <div className="cart-item-itself">
        <div className="container-for-etc">
        <div className="container-for-img-h4">
        <img className="product-image-cart" src={item.image.url} />
        </div>
        <div className="container-for-item-name-h4">
        <h4>Produkt:</h4>
        <h4>{item.name}</h4>
        </div>
        <div className="container-for-item-price-h4">
        <h4>Cena:</h4>
        <span>{item.line_total.formatted_with_symbol}</span>
        </div>
        <div className="container-for-item-price-h4">
        <h4>Ilość:</h4>
        <p dangerouslySetInnerHTML={{__html:item.quantity}} />
        </div>
        </div>
        <div className="container-for-all-btns">
        <div className="container-of-btn">
        <input type="button" className="btn-" value="-" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}/>
        <input type="button" className="btn--" value="+" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}/>
        </div>
        <div className="container-delete-all">
        <input type="button" className="delete-item-btn" value="wyrzuc z koszyka" onClick={() => onRemoveFromCart(item.id)}/>
        </div>
        </div>
        </div>
    )
}

export default CartItem
