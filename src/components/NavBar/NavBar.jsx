import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
      >
        <div className="container">
          <Link className="navbar-brand fw-bold " href="#">
            <span> <i class="fa-solid fa-cart-shopping fs-5 text-main"></i></span> FreshCart
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">Categories</Link>
              </li>
             
             
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

              <li className="nav-item">
                <Link className="nav-link" to="signin">Signin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signup">Signup</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signout">Signout</Link>
              </li>
            </ul>
           
          </div>
        </div>
      </nav>
      
    </div>
  )
}
