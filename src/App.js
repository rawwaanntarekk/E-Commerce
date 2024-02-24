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
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <TokenContext>
      <RouterProvider router={router} />
    </TokenContext>
  );
}

export default App;
