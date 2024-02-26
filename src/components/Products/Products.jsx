import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishListContext } from '../../Context/WishListContext';







export default function Products() {
  let {addToWishlist , setWishListNumber} = useContext(wishListContext);
  const [products, setProducts] = useState([]);
  let {addToCart , setCartNumber} = useContext(cartContext);

  async function addToMyCart(id){
    let {data} = await addToCart(id);
    console.log(data.numOfCartItems);
    if (data.status === "success") {
        toast.success(data.message);
        setCartNumber(data.numOfCartItems);
        
    }
}

async function addToMyWishlist(id){
  let {data} = await  addToWishlist(id);
  if (data.status === "success") {
      toast.success(data.message);
      setWishListNumber(data.data.length);
      console.log(data.data.length);
  }
}



  async function getProducts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);

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
              <Link to={`/productDetails/${product._id}`} className="resetLinkStyle ">
                <img src={product.imageCover} alt={product.title} className="w-100" />
              </Link>
              <h6>{product.title}</h6>
               <div className="d-flex justify-content-between">
               <p className='text-main'>{product.category.name}</p>
               <i onClick={() => {  addToMyWishlist(product._id);}} className={`fa-regular fa-heart fs-3 text-main text-center my-2`}>
                </i> 
               </div>
                <div className="priceWRate d-flex justify-content-between">
                  <p className="price">{product.price} EGP</p>
                  <div className="rate d-flex align-items-center">
                    <i className=' fa-solid fa-star mx-1 rating-color'></i>
                    <p className='mb-0'>{product.ratingsAverage} </p>
                  </div>
                </div>

            <button onClick={()=>addToMyCart(product._id)} className='btn bg-main text-light'> Add to Cart</button>
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
