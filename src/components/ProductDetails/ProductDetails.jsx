import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishListContext } from '../../Context/WishListContext';



export default function ProductDetails() {
let param = useParams();
let {addToCart , setCartNumber} = useContext(cartContext);
let {getWishList , deleteFromWishlist , setWishListNumber,addToWishlist} = useContext(wishListContext);
const [isWishlistItem, setIsWishlistItem] = useState(false); 
const [wishListProducts , setWishListProducts] = useState([]);



async function addToMyCart(id){
    let {data} = await addToCart(id);
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
        setIsWishlistItem(!isWishlistItem);

    }

    
}

useEffect(() => {   
    (async ()=>{
        let {data} = await getWishList();
        setWishListProducts(data.data);
    })()
})


  
  function isInWishList(product_id){
    let found = wishListProducts.find((product) => product._id === product_id);
    if (found) {
      return true;
    }
    return false;
  }
  




async function getProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${param.id}`)
}

let {data , isLoading} = useQuery('productDetails', getProductDetails);
let product = data?.data.data;



return (
    <div className='pt-5 mt-5'>
        <h1 className='text-main mb-2' >Product Details</h1>
    {
    isLoading ? 
    <span className='content-loader'></span>
    :
    <div className="row gy-3 mx-auto py-5">
        <div className="col-md-3 ">
            <img src={product.imageCover} alt={product.title} className='w-100' />
        </div>
        <div className="col-md-6 offset-1">
        <div className="d-flex justify-content-around">
                <div className="details mb-5">
                <h2>{product.title}</h2>
                <h3 className='text-main'>{`${product.price} EGP`}</h3>
                <p> {product.description}</p>
                <p>{product.brand.name}</p>
                <p className='mt-4'>{`Available quantity: ${product.quantity}`}</p>
                </div>
            <div className="icons d-flex flex-column">
            <div className="rate d-flex align-items-center fs-5 ">
                {
                    isInWishList(product._id) ? 
                    <i className='fa-solid fa-heart  fs-3 text-main text-center my-2' onClick={()=>{deleteFromWishlist(product._id); }}></i>
                    : <i className='fa-regular fa-heart fs-3 text-main text-center my-2' onClick={()=>{addToMyWishlist(product._id); }}></i>
                    }
                <p className='mb-0'>{product.ratingsAverage} </p>
            </div>
            </div>
        </div>
        <button onClick={() =>addToMyCart(product._id)} className='btn wish-btn bg-main text-light  col-12  py-2'> Add to Cart
        <i className="fa-solid fa-cart-shopping  text-light mx-2"></i>
        </button>

        </div>

    </div>
    }
    </div>
)
}
