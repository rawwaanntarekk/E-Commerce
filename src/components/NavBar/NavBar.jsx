import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserToken } from '../../Context/TokenContext'
import { cartContext } from '../../Context/CartContext';
import { useEffect } from 'react';
import { wishListContext } from '../../Context/WishListContext';


export default function NavBar() {
  let {token , setToken} = useContext(UserToken);
  let navigate = useNavigate();
  let {cartNumber , getCart , setCartNumber } = useContext(cartContext);
  let {WishListNumber  , setWishListNumber, getWishList} = useContext(wishListContext);
  


  // To keep the user logged in after refreshing the page
  if (localStorage.getItem('UserToken') !== null) {
    setToken(localStorage.getItem('UserToken'));
  }

  function Logout(){
    navigate("/signin");
    localStorage.removeItem('UserToken');
    setToken(null);

  }
  

  useEffect(() => {
    if (token) {
      (async () => {
        let { data } = await getCart();
        setCartNumber(data.numOfCartItems);
        console.log(data.numOfCartItems);
        let { data: wishListData } = await getWishList();
        setWishListNumber(wishListData.data.length);

      })();
    }
  }, []);



  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-light position-fixed w-100 navBar"
      >
        <div className="container">
          <Link className="navbar-brand fw-bold " href="#">
            <span> <i className="fa-solid fa-cart-shopping fs-5 text-main"></i></span> FreshCart
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
            {token ?
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
               <Link className="nav-link" to="categories">Categories</Link>
             </li>

              </ul>
          :""
            }
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

              {token ?  
              <>
              <li className="nav-item">
              <Link className="nav-link" to="cart">
              <i className="fa-solid fa-cart-shopping text-main"></i>
              <span className="badge bg-main"> {cartNumber}</span>
              </Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link" to="wishlist">
              <i class="fa-solid fa-heart text-main text-center  "></i>
              <span className="badge bg-main"> {WishListNumber}</span>
              </Link>
            </li>
            <li className="nav-item">
                <Link onClick={()=> Logout()} className="nav-link">Logout</Link>
              </li>
              </>
              :
              <>
              <li className="nav-item">
                <Link className="nav-link" to="signin">Signin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="signup">Signup</Link>
              </li>
              </>
              
            }

              
            
            </ul>

          </div>
        </div>
      </nav>
      
    </div>
  )
}
