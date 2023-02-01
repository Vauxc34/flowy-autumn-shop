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

import { Navbar } from "../components/Navbar"
import { Cart } from "../components/Cart"
import { Checkout  } from "../components/checkout/Checkout"

/* component's */

const AnimatedPage = ({
ProductList,
ToastMessReg,
SignGoogle,
SignFB,
userName,
setUserName,
userMail,
setUserMail,
userPassword,
setUserPassword,
userPasswordRepeat,
setUserPasswordRepeat,
DatabaseAddUser,
RegisterU,
ToastContainer,
currentUser,
LoginU,
toast,
generateBrandDropdown,
handleFilterBrand,
}) => {

const location = useLocation()

return (
<>
<Routes key={location.pathname} location={location}>
<Route 
exact path='/' 
element={<Products ProductList={ProductList}/>}>
</Route>

<Route 
exact path='/produkt/:id' 
element={<ProductPage ProductList={ProductList}/>}>
</Route>

<Route
exact path="/produkty"
element={<Allproducts 
generateBrandDropdown={generateBrandDropdown}
handleFilterBrand={handleFilterBrand}
ProductList={ProductList}/>}
>
</Route>

<Route 
exact path='/koszyk' 
element={<Cart/> }>
</Route>

<Route 
exact path='/sposoby-dostawy-i-platnosci'
element={<Checkout/>}>
</Route>

<Route 
exact path="/rejestracja"
element={<RegisterPage
ToastMessReg={ToastMessReg}
SignGoogle={SignGoogle}
SignFB={SignFB}
userName={userName}
setUserName={setUserName}
userMail={userMail}
setUserMail={setUserMail}
userPassword={userPassword}
setUserPassword={setUserPassword}
userPasswordRepeat={userPasswordRepeat}
setUserPasswordRepeat={setUserPasswordRepeat}
DatabaseAddUser={DatabaseAddUser}
RegisterU={RegisterU}
ToastContainer={ToastContainer}
/>}>
</Route>

<Route
exact path="/logowanie"
element={<Login
  SignGoogle={SignGoogle}
  SignFB={SignFB}
  userMail={userMail}
  setUserMail={setUserMail}
  userPassword={userPassword}
  setUserPassword={setUserPassword}
  LoginU={LoginU}
  ToastContainer={ToastContainer}
/>}
>

</Route>

<Route 
exact path="/twoj-profil"
element={<ProfilePage
currentUser={currentUser}

/>}>
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
</Routes>
</>
)
}

export default AnimatedPage