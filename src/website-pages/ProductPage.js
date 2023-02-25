import React, {useState, useEffect, useRef} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper'
import { motion } from 'framer-motion'

const ProductPage = ({
    itemsQuantity,
    setItemsQuantity,
    products, 
    onAddToCart, 
    onUpdateCartQty, 
    ProductList,
    ToastContainer,
    toast,
}) => {

    
    let location = useLocation()
    const [CartAdd, setAddToCart] = useState(null)
    const  ProductLink  = location.pathname.split('/', 3)[2]
    const idUser = 'qcC6uukDcp0yS7BkK0bf'
    const [NameProduct, setNameProduct] = useState('Lorem ipsum')
    const [ImageProd, setImageProd] = useState('https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg')
    const [DescProduct, setDescProduct] = useState('lorem ipsum dolor lit amenus papa')
    const [PriceProduct, setPriceProduct] = useState('9.99')
    const [ProdQuantity ,setProdQuantity] = useState(0)
    const [userQuantity, setUserQuantity] = useState(ProdQuantity)
    const [ColorItem, setColorItem] = useState('')
    const [Error, setError] = useState()

    useEffect(() => {
    fetch('http://localhost:8080/product-list/' + ProductLink).then(data => data.json()).then(product =>  {
        setNameProduct(product._fieldsProto.title.stringValue)
        setImageProd(product._fieldsProto.image.stringValue)
        setDescProduct(product._fieldsProto.description.stringValue)
        //setPriceProduct(product._fieldsProto.price.double)
        setProdQuantity(product._fieldsProto.quantity.integerValue)
        //console.log(product._fieldsProto.quantity.integerValue)
        }
    )
    })

    const HandleChangeUserQuantity = (name) => {

        if(name == 'plus') {
            setUserQuantity(userQuantity + 1)
        }

        if(name == 'minus') {
            setUserQuantity(userQuantity - 1)
        }

    }

    const HandleAddToCart = () => {
    fetch('http://localhost:8080/cart/add-to/' + idUser, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
        NameProduct: NameProduct,
        ImageProd: ImageProd,
        PriceProduct: PriceProduct,
        ProdQuantity: 1
        }
    )
    });
    toast.success('Dodano produkt do koszyka 😀')
    }

return (
<>
    
<motion.section id='product-page'
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>

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

    {/*<div className='quantity-box-container'>
    <p>Quantity</p>
    <div className='quantity-box'>
    <div className='select-item-quantity'>
    <div onClick={HandleChangeUserQuantity} name='plus' className='p__'>
        +
    </div>
    <span className='p_quantity-itself'>{userQuantity}</span>
    <div onClick={HandleChangeUserQuantity} name='minus' className='p__'>
        -
    </div>
    </div>
    </div>
</div>*/}

</div>
<div className='container-for-product-delivery'>
    

    {/*<div className='product-option-title'><input type="checkbox" /> <span>Subscribe and delivery every </span></div>
    <div className='product-option-title'><input type="checkbox" /><span> One time purchase</span></div>*/}

    <div className='product-parameters'>

    <p>
        {DescProduct}
    </p>
    
    </div>

    <button className='site-btn' onClick={HandleAddToCart} id="buy_btn">Dodaj do koszyka</button>

</div>
</div>

<div className='product-parameters'>

    <h4>Specyfikacja:</h4>

    <span className='parameter-itself'>
        <p>Kolor: </p>
        <p>{ColorItem}</p>
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
            <div onClick="" class="product-img" style={{ background: `url(${item.image}) 50% 50%`, backgroundSize: 'cover' }}></div>
            <div class="description-box-product">
            <h5 class="title-product" onClick="">{item.title}</h5>
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