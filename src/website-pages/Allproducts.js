import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

const Allproducts = () => {

const [ProductList, setProductList] = useState([]) 
const [ActualSelectedCategory, setActualSelectedCategory] = useState('Nie wybrano')

const Categories = [
  { name: 'Nie wybrano' }, { name: 'Kremy' }, { name: 'Balsamy' }, { name: 'Kleje' },
]

useEffect(() => {
  fetch(`${process.env.REACT_APP_ACTUAL_LINK_APPLICATION}products`, {
    method: 'GET',  
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
}}).then(res => res.json()).then(data => setProductList(data.prod))
}, [])

return (
    
<motion.section 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
id="products-all">

<div class="startup-screen">

    <div class="widget-description">

    <h3>A co tym razem szukamy?</h3>

    {/*<select required 
        id="category" 
        name="category-list" 
        placeholder='Wybierz markę'   
        >
             {Categories.map(item => (
                <option value={item.name}>{item.name}</option>
             ))}
             </select>*/}

    </div>

</div>
<div class="products-list">

            <div class="description-box">
                <h1>Produkty</h1>
                <p>Przebieraj w tym co lepsze</p>
            </div>


            <div class="product-grid">

            {ProductList.map(item => <div class="product-itself">
            <div onClick="" class="product-img" style={{ 
              background: `url(${item.image}) 50% 50%`, 
              backgroundSize: '100%', 
              }}></div>
            <div class="description-box-product" onClick={() => window.location.replace('/produkt/' + item.id)}>
            <h5 class="title-product" >{item.name}</h5>
            <span class="price-product">{item.price} zł</span>
            </div>
            </div>
            )}

            </div>

            <button class="site-btn">
                See more
            </button>

</div>

</motion.section>

  )
}

export default Allproducts