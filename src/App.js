
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



const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      {path:"categories",element:<Categories/>},
      { path: "brands", element: <Brands /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      {path: "signout",element:<Home/>},
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
