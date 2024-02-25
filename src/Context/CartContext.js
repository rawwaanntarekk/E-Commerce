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
        ).catch(err=>console.log(err));
    }
    return <cartContext.Provider value={{addToCart , setCartNumber , cartNumber}}>
            {props.children}
        </cartContext.Provider>
    
}