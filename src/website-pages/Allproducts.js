import React, { useState } from 'react'
import { motion } from 'framer-motion';
const Allproducts = ({ 
  categories,
  onFilterCategory,
  allData
}) => {
  
const [filters, setFilters] = useState({ category: "", from: "", to: "" });

const handleInput = (field) => (event) => {
      const { value } = event.target;
      setFilters({ 
        ...filters, 
        [field]: value,
      });
      if(field === "category") {
        onFilterCategory(value);
      }
};

return (
    
<motion.section 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
id="products-all">

<div class="startup-screen">

    <div class="widget-description">

    <h3>A co tym razem szukamy?</h3>


    <select required 
        id="category" 
        name="category-list" 
        placeholder='Wybierz markę'  
        onChange={handleInput("category")}>
             {categories.map(brand => (
                <option value={brand} key={brand}>{brand}</option>
              ))}
        </select>

    </div>

</div>
<div class="products-list">

            <div class="description-box">
                <h1>Produkty</h1>
                <p>Przebieraj w tym co lepsze</p>
            </div>


            <div class="product-grid">

            {allData.map(item => <div class="product-itself">
            <div onClick="" class="product-img" style={{ 
              background: `url(${item.image}) 50% 50%`, 
              backgroundSize: '100%', 
              }}></div>
            <div class="description-box-product" onClick={() => window.location.replace('/produkt/' + item.id)}>
            <h5 class="title-product" >{item.title}</h5>
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