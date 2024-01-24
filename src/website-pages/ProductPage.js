import React, {useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper'
import { motion } from 'framer-motion' 
import axios from 'axios'

import { CartContext } from '../CartProvider'

const ProductPage = ({ User, ToastContainer }) => {
    
    let location = useLocation()
    const [Product, setProduct] = useState('') 
    const [ProductList, setProductList] = useState('')
    const [QuantityOfProduct, setQuantityOfProduct] = useState(1) 
    const [ButtonCartVisible, setButtonCartVisible] = useState(false)
    const ProductLink = location.pathname.split('/', 3)[2] 
    
    const cartContext = useContext(CartContext);
    const { FetchCart, 
        AddProductToAcartFunction, 
        ModifyProductInAcartFunction, 
        userCartContent, 
        OrderIdCart,
        ApplyingCouponFunction } = cartContext;
    
    useEffect(() => { if(User) { FetchCart(User.cartId) } else { } }, [User]) 

    const findItemById = (items) => {
        return items.find(item => item.id == ProductLink);
    }

    const GetItemIndex = (items) => {
        return userCartContent.findIndex(item => item.id == ProductLink);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products/${ProductLink}`, {
            method: 'GET',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        }}).then(res => res.json()).then(data => setProduct(data.prod))
    }, [ProductLink])

    const AddProductToAcart = () => {  
    let CartId = User.cartId
    let ProductPrice_ = Product.price
    setButtonCartVisible(true) 
    let Query = `UPDATE carts SET coupon_applied = 0 WHERE idUser = ${User.id}` 
    ApplyingCouponFunction(Query)
    AddProductToAcartFunction(CartId, ProductLink, QuantityOfProduct, ProductPrice_)
    }

    const ModifyProductInAcart = () => {  
    let CartId = User.cartId
    let ProductPrice_ = Product.price
    const items = userCartContent
    const foundIndex = GetItemIndex(items, ProductLink);
    if(foundIndex != -1) {
        ModifyProductInAcartFunction(CartId, ProductLink, foundIndex, QuantityOfProduct, ProductPrice_)
    } else { window.location.reload() }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products`, {
                    method: 'GET',  
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
        }}).then(res => res.json()).then(data => setProductList(data.prod))
    }, [])

    useEffect(() => {
        if(User) {
            const foundIndex = GetItemIndex(userCartContent, ProductLink);
            if(foundIndex > -1) {
                setButtonCartVisible(true)
            } else {
                setButtonCartVisible(false)
            }
        }
    }, [User, ProductLink, userCartContent]);

return (
<>
    
<motion.section id='product-page'
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>

<div className="wrapper-product">

<div className='row-product'>

<h1 className='product-title-- medium-hide'>{Product.name}</h1>

<img className='product-image--' src={Product.image} />

<div className='container-for-etc-product mobile-hide'>

<h3>Tu będzie jakiś inny tekst promocyjny</h3>

<h2>🚚 Darmowa dostawa</h2>

</div>

</div>
<div className='row-product'> 

<h1 className='product-title-- mobile-hide'>{Product.name}</h1>

<div className='row-for-smaller-containers'>
<div className='container-for-product-option'>
    <span className='price-etc'>{Product.price} zł</span>
    {User ?  <div className='quantity-box-container'>
    <p style={{ alignSelf: 'flex-start' }}>Ilość</p>
    <div className='quantity-box'>
    <div className='select-item-quantity'>
    <div name='plus' className='p__' onClick={() => setQuantityOfProduct(QuantityOfProduct + 1)}>
        +
    </div>
    <span className='p_quantity-itself'>{QuantityOfProduct}</span>
    <div name='minus' className='p__' onClick={() => { setQuantityOfProduct(QuantityOfProduct - 1)
        if(QuantityOfProduct == 1 ) { setQuantityOfProduct(1) } }}>
        -
    </div>
    </div>
    </div>
    </div>
    : null}
</div>
<div className='container-for-product-delivery'>    

    {/*<div className='product-option-title'><input type="checkbox" /> <span>Subscribe and delivery every </span></div>
    <div className='product-option-title'><input type="checkbox" /><span> One time purchase</span></div>*/}

    <div className='product-parameters'>

    <p>
    {Product.description}
    </p>
    
    </div>
 

    {User ? <> {ButtonCartVisible ? <button className='site-btn' onClick={ModifyProductInAcart} id="buy_btn">Dodaj do koszyka</button> : <button className='site-btn' onClick={AddProductToAcart} id="buy_btn">Dodaj do koszyka</button>} </> : <button className='site-btn' id="buy_btn">Nie jestes zalogowany</button>} 

</div>
</div>

{/*<div className='product-parameters'>

    <h4>Specyfikacja:</h4>

    <span className='parameter-itself'>
        <p>Kolor: </p>
        <p>czerwony</p>
    </span>

    <span className='parameter-itself'>
        <p>
            Dodatki:
        </p>
        <p>
           Premium quality ingredients with natural essential oils
        </p>
    </span>

    <div className='container-for-a-parameters'>
    <span className='parameter-itself'>
        <p>
            Burning Time:
        </p>
        <p>
           70 - 75 hours
        </p>
    </span>

    <span className='parameter-itself'>
        <p>
            Dimension:
        </p>
        <p>
           10cm - 5cm
        </p>
    </span>

    <span className='parameter-itself'>
        <p>
            Weight:
        </p>
        <p>
           400g
        </p>
    </span>
    </div>

</div>*/}

    <h1>Pozostałe produkty 👇</h1>

<Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
       {ProductList == '' ? null : ProductList.map(item => 
        <SwiperSlide key={item}>
        <div class="product-itself" style={{ position: 'absolute', zIndex: 32 }} onClick={() => window.location.replace('/produkt/' + item.id)}>
            <div onClick="" class="product-img" style={{ background: `url(${item.image}) 50% 50%`, backgroundSize: 'cover' }}></div>
            <div class="description-box-product">
            <h5 class="title-product" onClick="">{item.name}</h5>
            <span class="price-product">{item.price} zł</span>
            </div>
            </div>
        </SwiperSlide>
       )}
        
        
</Swiper>

</div>

<div className='container-for-etc-product medium-hide'>

<h3>All hand-made with natural soy wax, Candleaf is made for your pleasure moments</h3>

<h2>🚚 Darmowa dostawa</h2>

</div>

</div>

</motion.section>
<ToastContainer/>
    </>
)

}

export default ProductPage