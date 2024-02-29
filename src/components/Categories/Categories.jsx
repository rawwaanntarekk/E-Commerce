import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';


export default function Categories() {


    async function getCategories(){
        try {
            return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        }
        catch(error){
            console.error(error);
        }
    }


let {data , isLoading} = useQuery('categories', getCategories);
console.log(data?.data.data);

return (
<div className='py-5'>
    <h1 className='pt-5 text-main'>Categories</h1>
    {isLoading ? 
    <span className='content-loader'></span>
    : <div className="row g-4">
    {
        data?.data.data.map((category) => {
        return(
        <div className="col-md-3 mb-3" key={category.id}  >
            <img src={category.image} alt={category.name} className="w-100" height={300} />
            <h4 className='text-center text-main'>{category.name}</h4>
        </div>
        )
    })
    }
</div>
    }
</div>
)
}
