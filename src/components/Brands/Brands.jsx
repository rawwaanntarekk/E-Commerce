import axios from 'axios';
import { useQuery } from 'react-query';

export default function Brands() {

  async function getBrands(){
  return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let {data , isLoading} = useQuery('brands', getBrands);
  console.log(data?.data.data);

  return (
    <div className='py-5'>
      <h1 className='pt-5 text-main'>Brands</h1>
      {isLoading ? 
      <span className='content-loader'></span>
      : <div className="row g-4">
      {
          data?.data.data.map((brand) => {
          return(
            <div className="col-md-3" key={brand._id}>
              <img src={brand.image} alt={brand.name} className="w-100" />
              <h4 className='text-center text-main'>{brand.name}</h4>
            </div>
          )
        })
      }
    </div>
      }
    </div>
  )
}
