import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function Products() {
  const [products, setProducts] = useState([]);
  async function getProducts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
    console.log(data);

  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <>
    <h1 className='mb-5'>Products</h1>
    {products.length === 0 ?
    <span className='content-loader '></span>
    : <div className="row g-4 overflow-hidden  ">
    {
      products.map((product) => {
        return(
          <div className="col-md-3  " key={product._id}>
            <div className="product  mb-4 pb-4 px-4 rounded rounded-4">
            <img src={product.imageCover} alt={product.title} className="w-100" />
            <h6>{product.title}</h6>
            <p className='text-main'>{product.category.name}</p>
            <div className="priceWRate d-flex justify-content-between">
              <p className="price">{product.price} EGP</p>
              <div className="rate d-flex align-items-center">
                <i className=' fa-solid fa-star mx-1 rating-color'></i>
                <p className='mb-0'>{product.ratingsAverage} </p>
              </div>
            </div>
            <button className='btn bg-main text-light'> Add to Cart</button>
            </div>
          </div>
        )
      })
    }
  </div>
    }
    
    
    </>
     
  )
}
