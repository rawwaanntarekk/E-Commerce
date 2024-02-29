import axios from 'axios'
import React, { useEffect } from 'react'



export default function Allorders() {

 useEffect(()=> {
  let {data} = axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`);
  console.log(data);
  console.log('hi');
 
},[])

  return (
    <div className='pt-5 mt-5'>
      <h1>hi</h1>
    </div>
  )
}
