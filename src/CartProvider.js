import React, {createContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify'
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = props => {

    const [userCartContent, setUserCartContent] = useState([])
    const [cartQuantity, setCartQuantity] = useState(0)
    const [isCouponApplied, setIsCouponApplied] = useState(0)

    const FetchCart = async (CartId) => { 
        let result = await axios.get(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${CartId}`);
        setUserCartContent(JSON.parse(result.data.content[0][0].products));
    }

    const SetActualQuantityCart = async (CartId) => {
        let result = await axios.get(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/${CartId}`);
        setCartQuantity(JSON.parse(result.data.content[0][0].products).length)
    }
 
    const AddProductToAcartFunction = (CartId, ProductLink, QuantityOfProduct, ProductPrice) => {  

        setCartQuantity(userCartContent.length + 1) 

        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/create`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                id: CartId,
                idProd: ProductLink,
                quantity: QuantityOfProduct,
                price: ProductPrice
            })
        }).then(res => res.json()).then(data => toast.success('Dodales produkt')) 
    }

    const ModifyProductInAcartFunction = (CartId, ProductLink, foundIndex, QuantityOfProduct, ProductPrice) => {      
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                id: CartId,
                Obj: ProductLink,
                IndexO: foundIndex,
                num_prod:  QuantityOfProduct,
                price: ProductPrice
            })
        }).then(res => res.json()).then(data => toast.success('Dodales produkt'))
    }

    const RemovingProductInAcartFunction = async (CartId, IdProduct, foundIndex, QuantityUserProd, ProductPrice) => {   
        try {
          await axios.post(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
            id: CartId,
            Obj: IdProduct,
            IndexO: foundIndex,
            num_prod: QuantityUserProd - 1,
            price: ProductPrice
          })
          .then((response) => {
            toast.success('Zmieniono stan w koszyku')
            window.location.reload()
          }, (error) => {
            toast.log(error);
          });
        } catch (e) {  toast.error(e) } 
    }

    const AdddingProductInAcartFunction = async (CartId, IdProduct, foundIndex, QuantityUserProd, ProductPrice) => {   
        try {
          await axios.post(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/product`, {
            id: CartId,
            Obj: IdProduct,
            IndexO: foundIndex,
            num_prod: QuantityUserProd + 1,
            price: ProductPrice
          })
          .then((response) => {
            toast.success('Zmieniono stan w koszyku')
            window.location.reload()
          }, (error) => {
            toast.log(error);
          });
        } catch (e) {  toast.error(e) } 
    }

    const CleaningCartFunction = (CartId) => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/cartU/${CartId}`, {
            method: 'POST',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }}).then(res => res.json()).then(toast.info('Czysto'))
              setCartQuantity(0)
    }

    const GettingInfoAboutCart = (CartId) => {
      fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}cart/promo/${CartId}`, {
        method: 'GET',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(res => res.json()).then(data => setIsCouponApplied(data.content[0].coupon_applied))
    }

    const ApplyingCouponFunction = (Query) => {
    if(isCouponApplied == 0) {
      fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}pay/coupon`, {
        method: 'POST',  
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          Query: Query
        })}
    ).then(res => res.json())
    } else { toast.error('Wykorzystano rabat') }
    } 
    
    return(
       <CartContext.Provider value={{ 
        FetchCart,
        SetActualQuantityCart,
        userCartContent, 
        cartQuantity,
        AddProductToAcartFunction,
        ModifyProductInAcartFunction,
        RemovingProductInAcartFunction,
        AdddingProductInAcartFunction,
        CleaningCartFunction,
        ApplyingCouponFunction,
        isCouponApplied,
        GettingInfoAboutCart, 
        }}>
        {props.children}
       </CartContext.Provider>
    );
}