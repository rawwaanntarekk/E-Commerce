import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../Context/WishListContext';
import { toast } from 'react-toastify';
import { cartContext } from '../../Context/CartContext';



export default function WishList() {

    let {getWishList , deleteFromWishlist , setWishListNumber} = useContext(wishListContext);
    const [wishListProducts , setWishListProducts] = useState([]);
    let {addToCart, setCartNumber} = useContext(cartContext);


useEffect(() => {   
    (async ()=>{
        let {data} = await getWishList();
        setWishListProducts(data?.data);
        setWishListNumber(data?.data?.length);
    })()
})

async function addToMyCart(id){
    let {data} = await addToCart(id);
    if (data.status === "success") {
        toast.success(data.message);
        setCartNumber(data.numOfCartItems);
    }
}



//^ remove product from the wishlist
async function removeProduct(id){
    let {data} = await deleteFromWishlist(id);
    setWishListProducts(data.data);
    setWishListNumber(data.data.length);
  }

return (
    <div className='py-5 mt-5'>
    <h1 className='text-main'>Wishlist</h1>
    <div className="container">
    {
        wishListProducts?.map((product) => {
            return(
                <div className="row border-bottom" key={product._id}>
                <div className="col-md-2 my-4">
                <img src={product.imageCover} alt={product.title} className='w-100' />
                </div>
                <div className="col-md-10 my-4 d-flex justify-content-between align-items-center">
                <div>
                    <h5>{product.title}</h5>
                    <button onClick={()=> {removeProduct(product._id)}} className='btn btn-outline-danger'>
                    <i className='fa-regular fa-trash-can me-2'></i> Remove</button>
                </div>
                <div>
                    <button onClick={() =>addToMyCart(product._id)} className='btn wish-btn bg-main text-light  col-12  py-2'> Add to Cart 
                        <i className="fa-solid fa-cart-shopping  text-light mx-2"></i>
                    </button>
                </div>
            </div>
                
                </div>
                
            )
        })
    }
        

        


        
    </div>
    </div>
)
}

