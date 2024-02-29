import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';







export default function Allorders() {

  let token = localStorage.getItem('UserToken');
  let decodedToken = jwtDecode(token);
  let {addToCart, setCartNumber} = useContext(cartContext);
  const [orders, setOrders] = useState([]);

  async function addToMyCart(id){
    let {data} = await addToCart(id);
    if (data.status === "success") {
        toast.success(data.message);
        setCartNumber(data.numOfCartItems);
    }
}

  useEffect(() => {
    (async () => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`);
            setOrders(response.data);
            console.log(response?.data);
            console.log();
        } catch (error) {
            console.error(error);
        }
    })();
}, [decodedToken.id]);




  return (
    <div className='py-5 mt-5'>
      <h1 className='text-main'>Your orders </h1>
      <div className="container">
        {
          orders?.map( (order)=> {
            return(
              order.cartItems?.map((item) => {
                return(
                  <div className="row border-bottom" key={item._id}>
                    <div className="col-md-2 my-4">
                    <img src={item.product.imageCover} alt={item.product.title} className='w-100' />
                    </div>
                    <div className="col-md-10 my-4 d-flex justify-content-between align-items-center">
                      <div>
                      <h5>{item.product.title}</h5>
                      <p>Price : {item.price}</p>
                      <p>brand : {item.product.brand.name}</p>
                      </div>
                      <div>
                      <button onClick={() =>addToMyCart(item.product._id)} className='btn wish-btn bg-main text-light  col-12  py-2'> Add to Cart Again !
                        <i className="fa-solid fa-cart-shopping  text-light mx-2"></i>
                      </button>
                      </div>
                      </div>
                      
                  </div>


                )
  
            })
            )
            
        })

  }
      </div>
    </div>
  )
}
