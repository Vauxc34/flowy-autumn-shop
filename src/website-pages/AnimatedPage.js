import React, { useContext } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'

/* page's */

import Allproducts from './Allproducts';
import Products from './Products'
import ProductPage from './ProductPage'
import RegisterPage from './RegisterPage'
import ProfilePage from './ProfilePage'
import ContactForm from './ContactForm';
import Login from './LoginPage'
import OrderView from "./OrderView";
import PrivacyAndPolicy from './PrivacyAndPolicy'

/* page's */

/* component's */

import { Cart } from "../components/Cart"
import { Checkout } from "../components/checkout/Checkout"
import { Confirmation } from "../components/checkout/Confirmation";

/* component's */

import { LanguageContext } from '../LanguageProvider';

const AnimatedPage = ({
User,
UserCart,
setUserCart,
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

const languageContext = useContext(LanguageContext);
const {  Language, Polish, English } = languageContext;

return (
<>
<Routes key={location.pathname} location={location}>
<Route 
exact path='/' 
element={<Products
  Language={Language}
  Polish={Polish}
  English={English}
/>}>
</Route>

<Route 
exact path='/produkt/:id' 
element={<ProductPage 
  Language={Language}
  Polish={Polish}
  English={English}
ToastContainer={ToastContainer}
toast={toast} 
User={User}
ProductList={ProductList}
UserCart={UserCart}
setUserCart={setUserCart}
setQuantityCartUser={setQuantityCartUser}
/>}>
</Route>

<Route
exact path="/produkty"
element={<Allproducts
  Language={Language}
  Polish={Polish}
  English={English}
categories={categories} onFilterCategory={onFilterCategory} ProductList={ProductList} onCategoryFilter={onCategoryFilter} allData={allData} />}>
</Route>

<Route 
exact path='/koszyk' 
element={<Cart 
  Language={Language}
  Polish={Polish}
  English={English}
  User={User} 
  UserCart={UserCart} 
  QuantityCartUser={QuantityCartUser} 
  setQuantityCartUser={setQuantityCartUser}/> }>
</Route>

<Route 
exact path='/sposoby-dostawy-i-platnosci'
element={<Checkout
  Language={Language}
  Polish={Polish}
  English={English}
  User={User} UserCar={UserCart}/>}>
</Route>

<Route 
exact path="/rejestracja"
element={<RegisterPage
  Language={Language}
  Polish={Polish}
  English={English}
User={User}
setUser={setUser}
ToastMessReg={ToastMessReg}
ToastContainer={ToastContainer}
/>}>
</Route>

<Route
exact path="/logowanie"
element={<Login  
  Language={Language}
  Polish={Polish}
  English={English}
  User={User}
  setUser={setUser}
  ToastContainer={ToastContainer}
/>}
>

</Route>

<Route 
exact path="/twoj-profil"
element={<ProfilePage 
  Language={Language}
  Polish={Polish}
  English={English}
User={User} setUser={setUser}/>}>
</Route>

<Route 
exact path="/transakcja/:id"
element={<OrderView
  Language={Language}
  Polish={Polish}
  English={English}
  User={User} 
  setUser={setUser}/>}>
</Route>

<Route
exact path='/kontakt' 
element={<ContactForm
  Language={Language}
  Polish={Polish}
  English={English}
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