import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {

  
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  async function getCategories(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    setCategories(data.data);
  }


  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className='py-5 mt-5'>
        <h1 className='text-main'>Categories</h1>
        <Slider {...settings}>
          {
            categories.map((category )  => {
              return(
                <div className="row category-slider " key={category.id}>
                  <div key={category.id} className='col-12'>
                <img src={category.image} alt={category.name} className='w-100 ' height={300} />
                <p>{category.name}</p>
                </div>
                </div>
              )
            })
          }

        </Slider>
    </div>
  )
}
