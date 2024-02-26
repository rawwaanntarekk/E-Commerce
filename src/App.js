import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Products from "./components/Products/Products.jsx";
import Brands from "./components/Brands/Brands.jsx";
import SignIn from "./components/Signin/Signin.jsx";
import SignUp from "./components/Signup/Signup.jsx";
import Categories from "./components/Categories/Categories.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import TokenContext from "./Context/TokenContext.js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Context/CartContext.js";
import { ToastContainer } from "react-toastify";
import Payment from "./components/Payment/Payment.jsx";
import Allorders from "./components/Allorders/Allorders.jsx";
import WishList from "./components/WishList/WishList.jsx";
import WishListContextProvider from "./Context/WishListContext.js";


const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },

      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <CartContextProvider>
      <TokenContext>
        <WishListContextProvider>
        <RouterProvider router={router} />
        <ToastContainer theme="colored" />
        </WishListContextProvider>
      </TokenContext>
    </CartContextProvider>
  );
}

export default App;
