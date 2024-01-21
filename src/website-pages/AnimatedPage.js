import React from "react";
import { Route, Routes, useLocation } from 'react-router-dom'

/* page's */

import Allproducts from './Allproducts';
import Products from './Products'
import ProductPage from './ProductPage'
import RegisterPage from './RegisterPage'
import ProfilePage from './ProfilePage'
import ContactForm from './ContactForm';
import Login from './LoginPage'
import PrivacyAndPolicy from './PrivacyAndPolicy'

/* page's */

/* component's */

import { Cart } from "../components/Cart"
import { Checkout } from "../components/checkout/Checkout"
import { Confirmation } from "../components/checkout/Confirmation";

/* component's */

const AnimatedPage = ({
User,
UserCart,
setUser,
ProductList,
ToastMessReg,
userName,
setUserName,
userMail,
setUserMail,
ToastContainer, 
toast,
categories,
onFilterCategory, 
onCategoryFilter,
QuantityCartUser,
setQuantityCartUser,
allData, 
}) => {

const location = useLocation()

return (
<>
<Routes key={location.pathname} location={location}>
<Route 
exact path='/' 
element={<Products />}>
</Route>

<Route 
exact path='/produkt/:id' 
element={<ProductPage 
ToastContainer={ToastContainer}
toast={toast} 
User={User}
ProductList={ProductList}
UserCart={UserCart}
setQuantityCartUser={setQuantityCartUser}
/>}>
</Route>

<Route
exact path="/produkty"
element={<Allproducts categories={categories} onFilterCategory={onFilterCategory} ProductList={ProductList} onCategoryFilter={onCategoryFilter} allData={allData} />}>
</Route>

<Route 
exact path='/koszyk' 
element={<Cart User={User} UserCart={UserCart} QuantityCartUser={QuantityCartUser} setQuantityCartUser={setQuantityCartUser}/> }>
</Route>

<Route 
exact path='/sposoby-dostawy-i-platnosci'
element={<Checkout User={User} UserCar={UserCart}/>}>
</Route>

<Route 
exact path="/rejestracja"
element={<RegisterPage
User={User}
setUser={setUser}
ToastMessReg={ToastMessReg}
ToastContainer={ToastContainer}
/>}>
</Route>

<Route
exact path="/logowanie"
element={<Login  
  User={User}
  setUser={setUser}
  ToastContainer={ToastContainer}
/>}
>

</Route>

<Route 
exact path="/twoj-profil"
element={<ProfilePage User={User} setUser={setUser}/>}>
</Route>

<Route
exact path='/kontakt' 
element={<ContactForm
  userName={userName}
  setUserName={setUserName}
  userMail={userMail}
  setUserMail={setUserMail}
  ToastContainer={ToastContainer}
  toast={toast}
/>}
>
</Route>

<Route 
exact path="/polityka-prywatnosci"
element={<PrivacyAndPolicy/>}>
</Route>


<Route
exact path ="/confirmation-order"
element={<Confirmation/>}>
</Route>

</Routes>
</>
)
}

export default AnimatedPage