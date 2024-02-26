import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';



export default function Cart() {
  
  let {getCart , deleteFromCart , updateCart , setCartNumber} = useContext(cartContext);
  const [cartProducts , setCartProducts] = useState([])
  const [cartPrice , setCartPrice] = useState([])

  //^ remove product from the cart
  async function removeProduct(id){
    let {data} = await deleteFromCart(id);
    setCartProducts(data?.data?.products);
    setCartNumber(data.data.numOfCartItems);

    console.log(data);
    
  }
  //^ update the product quantity in the cart
  async function updateProduct(id , count){
    // if the count is 0 remove the product
    if (count === 0) {
      removeProduct(id);
      return;
    }
    // else update the product quantity in the cart
    let {data} = await updateCart(id , count);
    setCartProducts(data?.data?.products);
    
  }
  //^ get the cart products and the total price on the first render
  useEffect(() => {
    (async ()=>{
      let {data} = await getCart();
      setCartProducts(data?.data?.products);
      setCartPrice(data?.data?.totalCartPrice)
    })()
  })
  return (
    <div className='py-5 mt-5'>
      <h1 className=' '>Shopping Cart</h1>
      <h3 className=' text-main fw-bold text-end'> Total Price : <span className='text-dark'>{cartPrice}</span></h3>
      <div className="container">
        
      {
      cartProducts?.map((product)=> {
              return (
                <div className="row border-bottom" key={product._id}>
                  <div className="col-md-2 my-4">
                    <img src={product.product.imageCover} alt={product.title} className='w-100' />
                  </div>
                  <div className="col-md-10 my-4 d-flex justify-content-between align-items-center">
                    <div>
                    <h5>{product.product.title}</h5>
                    <p>Price : {product.price}</p>
                    <button onClick={()=> {removeProduct(product.product._id)}} className='btn btn-outline-danger'>
                      <i className='fa-regular fa-trash-can me-2'></i> Remove
                    </button>
                    </div>
                    <div>
                      <button onClick={()=> {updateProduct(product.product._id , product.count+1)}} className='btn btn-outline-success mx-3'>+</button>
                      <span>{product.count}</span>
                      <button onClick={()=> {updateProduct(product.product._id , product.count-1)}}   className='btn btn-outline-success mx-3'>-</button>
                    </div>
                  </div>
                  
                </div>
              )
      })
      }
     
        
      </div>
      <div className="div mx-auto w-50 mt-3 ">
      <Link to="/checkout" >
      <button className='btn bg-main text-light w-100 py-2  '>Checkout</button>
      </Link>
      </div>
     
    </div>
  )
}
