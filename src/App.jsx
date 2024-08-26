import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Register } from "./Components/Register/Register";
import { Signin } from "./Components/Signin/Signin";
import { NotFound } from "./Components/NotFound/NotFound";
import  Home  from "./Components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Category from "./components/Categories/Category";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ForgetPasswordResetCode from "./components/ForgetPasswordResetCode/ForgetPasswordResetCode";
import Wishlist from "./components/WishlistComponent/WishlistComponent";
import Categories from "./components/Categories/Categories";
import TokenContext from "./context/TokenContext";
import CartContextProvider from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import WishlistContext from "./context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Brand from "./components/Brand/Brand";

const reactQuearyConfig = new QueryClient();

const router = createBrowserRouter([
  {
      path: "",
      element: <Layout />,
      children: [
          {
              path: "",
              element: (
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
              ),
          },
          { path: "signin", element: <Signin /> },
          { path: "register", element: <Register /> },
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
              path: "brands",
              element: (
                  <ProtectedRoute>
                      <Brands />
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
              path: "Product/:id",
              element: (
                  <ProtectedRoute>
                      <ProductDetails />
                  </ProtectedRoute>
              ),
          },
          {
              path: "/brand/:id",
              element: (
                  <ProtectedRoute>
                      <Brand />
                  </ProtectedRoute>
              ),
          },
          {
              path: "/categories/:id",
              element: (
                  <ProtectedRoute>
                      <Category />
                  </ProtectedRoute>
              ),
          },
          {
              path: "/shippingAddress",
              element: (
                  <ProtectedRoute>
                      <ShippingAddress />
                  </ProtectedRoute>
              ),
          },
          {
              path: "/forgetpasswordcode",
              element: <ForgetPasswordResetCode />,
          },
          {
              path: "/forgetpassword",
              element: <ForgetPassword />,
          },
          {
              path: "/wishlist",
              element: <Wishlist />,
          },
          { path: "*", element: <NotFound /> },
      ],
  },
]);
function App() {
  return (
    <TokenContext>
        <QueryClientProvider client={reactQuearyConfig}>
            <CartContextProvider>
                <WishlistContext>
                    <RouterProvider router={router} />
                    <Toaster />
                </WishlistContext>
            </CartContextProvider>
        </QueryClientProvider>
    </TokenContext>
);
}

export default App;
