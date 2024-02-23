import React from 'react'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import HomeSlider from '../HomeSlider/HomeSlider'


export default function Home() {
  return (
    <div>
      <HomeSlider />
      <Categories/>
      <Products />
    </div>
  )
}
