import React from 'react'
import Slider from "react-slick";
import img2 from '../../Assets/Images/img2.jpg'
import img3 from '../../Assets/Images/image3.jpg'
export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
      };
  return (
    <div className='pt-5'>
      <div className="row pt-5 gx-1 gy-4 gy-md-0">
        <div className="col-md-9">
        <Slider {...settings}>
                    <img src={img2} alt="grocery" className='w-100' height={450} />
                    <img src={img2} alt="grocery" className='w-100' height={450} />
                    <img src={img2} alt="grocery" className='w-100' height={450} />
            </Slider>

        </div>
        <div className="col-md-3 ">
              <img src={img3} alt="grocery" className='w-100 ' />
              <img src={img3} alt="grocery" className='w-100 pt-1' />
            </div>
      </div>
    </div>
  )
}
