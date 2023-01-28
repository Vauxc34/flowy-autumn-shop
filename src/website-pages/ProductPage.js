import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDocFromCache, getDocs, collection } from 'firebase/firestore'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper'
import { db } from '../lib/config'

/* image's */

import prodctPageImage from '../images/prodct-page-image.svg'
import ProfilePicTestimonial from '../images/img-1.svg'
import StarFilled from '../images/star-filled.svg'

/* */

const ProductPage = ({
    products, 
    onAddToCart, 
    onUpdateCartQty, 
    ProductList
}) => {

    const location = useLocation()
    let navigate = useNavigate()
    

    const [ProductLink, setProductLink] = useState(location.pathname.split('/', 3)[2])
    const [NameProduct, setNameProduct] = useState('Lorem ipsum')
    const [ImageProd, setImageProd] = useState('basic.jpg')
    const [DescProduct, setDescProduct] = useState('lorem ipsum dolor lit amenus papa')
    const [PriceProduct, setPriceProduct] = useState('9.99')
    const [ProdQuantity ,setProdQuantity] = useState(0)
    const [Error, setError] = useState()

    const ActualProductCheckList = {
        title: 'lorem dolor lit amenus',
        price: 9.99,
        description: 'lorem ipsum'
    }
    const [productId] = useState(location.pathname.split('/')[2]);
    const [Product, setProduct] = useState({});

    const item = ProductList.find(product => product.id == ProductLink)    

    const ProductSet = async () => {
        if(item) {
            setProductLink(item.id)
            setNameProduct(item.data.title)
            setImageProd(item.data.image)
            setPriceProduct(item.data.price)
            setProdQuantity(item.data.quantity)
        } else {

        }

    }


    console.log(item)

    useEffect(() => {
        ProductSet()
    })

    console.log(ProductLink)

return (
<>
    
<section id='product-page'>

<div className="wrapper-product ">

<div className='row-product'>

<h1 className='product-title-- medium-hide'>{NameProduct}</h1>

<img className='product-image--' src={ImageProd} />

<div className='container-for-etc-product mobile-hide'>

<h3>Tu będzie jakiś inny tekst promocyjny</h3>

<h2>🚚 Darmowa dostawa</h2>

</div>

</div>
<div className='row-product'> 

<h1 className='product-title-- mobile-hide'>{NameProduct}</h1>

<div className='row-for-smaller-containers'>
<div className='container-for-product-option'>
    
    <span className='price-etc'>{PriceProduct} zł</span>

    <div className='quantity-box-container'>
    <p>Quantity</p>
    <div className='quantity-box'>
    <div className='select-item-quantity'>
    <div  className='p__'>
        +
    </div>
    <span className='p_quantity-itself'>{ProdQuantity}</span>
    <div className='p__'>
        -
    </div>
    </div>
    </div>
    </div>

</div>
<div className='container-for-product-delivery'>
    

    {/*<div className='product-option-title'><input type="checkbox" /> <span>Subscribe and delivery every </span></div>
    <div className='product-option-title'><input type="checkbox" /><span> One time purchase</span></div>*/}

    <div className='product-parameters'>

    <p>
        {DescProduct}
    </p>
    
    </div>

    <button className='site-btn'>Dodaj do koszyka</button>

</div>
</div>

<div className='product-parameters'>

    <span className='parameter-itself'>
        <p>Wax: </p>
        <p> Top grade Soy Vax that delivers a smoke less, consistent burn</p>
    </span>

    <span className='parameter-itself'>
        <p>
            Fragrance:
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

</div>

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
       {ProductList.map(item => 
        
        <SwiperSlide key={item}>
        <div class="product-itself" style={{ position: 'absolute', zIndex: 32 }} onClick={() => window.location.replace('/produkt/' + item.id)}>
            <div onClick="" class="product-img" style={{ background: `url(${item.data.image}) 50% 50%`, backgroundSize: 'cover' }}></div>
            <div class="description-box-product">
            <h5 class="title-product" onClick="">{item.data.title}</h5>
            <span class="price-product">{item.data.price} zł</span>
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

</section>

    </>
)

}

export default ProductPage