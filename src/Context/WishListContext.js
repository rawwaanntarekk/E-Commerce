import axios from "axios";
import { createContext, useState } from "react";


export let wishListContext = createContext();


export default function WishListContextProvider(props){

    const [WishListNumber, setWishListNumber] = useState(0);

    function addToWishlist(id){
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
        // body
        {
            productId:id
        },
        // headers
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    }

    function getWishList(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    
    }

    function deleteFromWishlist(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        // headers
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    }


    return <wishListContext.Provider value={{addToWishlist , setWishListNumber , WishListNumber , getWishList , deleteFromWishlist }}>
            {props.children}
        </wishListContext.Provider>
    
}