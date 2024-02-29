import React from 'react'
import Products from '../Products/Products'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'


export default function Home() {
  return (
    <div>
      <HomeSlider />
      <CategoriesSlider/>
      <Products />
    </div>
  )
}
