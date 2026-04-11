import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/HomePage/Home";
import Login from "../Components/AuthComponents/Login";
import CreateAccount from "../Components/AuthComponents/CreateAccount";
import OtpVerify from "../Components/AuthComponents/OtpVerify";
import Cart from "../Pages/ShopPage/Cart";
import Orders from "../Pages/ShopPage/Orders";
import Profile from "../Pages/AccountPage/ProfilePage";
import ProductSinglePage from "../Pages/CommonSinglePage/ProductSinglePage";
import ScrollToTop from "../ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const Router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "cart", element: <Cart /> },
          { path: "orders", element: <Orders /> },
          { path: "account", element: <Profile /> },
          { path: "product", element: <ProductSinglePage /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/verify-otp", element: <OtpVerify /> },
    ],
  },
]);

export default Router;
