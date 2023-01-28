import React from 'react'

const Allproducts = ({ ProductList }) => {

  

  return (
    
<section id="products-all">

<div class="startup-screen">

    <div class="widget-description">

    <h3>A co tym razem szukamy?</h3>


    <select>
      <option>Świeczki</option>
      <option>Odzież</option>
      <option>Samochody</option>
    </select>
    </div>

</div>
<div class="products-list">

            <div class="description-box">
                <h1>Produkty</h1>
                <p>Order it for you or for your beloved ones</p>
            </div>


            <div class="product-grid">

            {ProductList.map(item => <div class="product-itself">
            <div onClick="" class="product-img" style={{ 
              background: `url(${item.data.image}) 50% 50%`, 
              backgroundSize: 'cover' 
              }}></div>
            <div class="description-box-product" onClick="">
            <h5 class="title-product" >{item.data.title}</h5>
            <span class="price-product">{item.data.price} zł</span>
            </div>
            </div>
            )}

            </div>

            <button class="site-btn">
                See more
            </button>

</div>

</section>

  )
}

export default Allproducts