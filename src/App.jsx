import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routess from "./components/Routess";
import SearchedProduct from "./components/SearchedProduct";
import Chat from "./components/Chat";
const App = () => {
  const location = useLocation();
  const adminPaths = [
    "/admin",
    "/ProductDashboard",
    "/AddProduct",
    "/UpdateProduct/:id",
    "/ProductRequest",
    "/orders",
    "/order/:orderId",
    "/AdminProfile",
    "/signup",
    "/signin",
  ];

  const isAdminRoute = adminPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      {!isAdminRoute && <Header />}
      <Routess />
      <Chat />

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
