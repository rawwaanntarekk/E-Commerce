import axios from "axios";
import { createContext, useState } from "react";


export let cartContext = createContext();


export default function CartContextProvider(props){

    const [cartNumber, setCartNumber] = useState(0);

    function addToCart(id){
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
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

    function getCart(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    
    }


    function updateCart(id, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        // body
        {
            count:count
        },
        // headers
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    }
    function deleteFromCart(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        // headers
        {
            headers:{token:localStorage.getItem('UserToken')}
        }
        )
    }
    return <cartContext.Provider value={{addToCart , setCartNumber , cartNumber , getCart ,updateCart , deleteFromCart }}>
            {props.children}
        </cartContext.Provider>
    
}