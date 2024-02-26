import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../Context/WishListContext';


export default function WishList() {

    let {getWishList , deleteFromWishlist , setWishListNumber} = useContext(wishListContext);
    const [wishListProducts , setWishListProducts] = useState([]);

useEffect(() => {   
    (async ()=>{
        let {data} = await getWishList();
        setWishListProducts(data?.data);
        setWishListNumber(data?.data?.length);
    })()
})



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
                    <i className='fa-regular fa-trash-can me-2'></i> Remove
                  </button>
                  </div>
                  <div>
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

