import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <NavBar/>
      <div className="container">
      <Outlet/>
      </div>
     
    </div>
  )
}
