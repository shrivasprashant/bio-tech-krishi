import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import Contact from "./Contact";
import Product from "./Product";
import ProductList from "./ProductList";
import HeroSection from "./HeroSection";
import ProductDetails from "./ProductDetails";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import OrderConfirmationPage from "./OrderConfirmationPage";
import Checkout from "./CheckOut";
import Admin from "./AdminPannel/Admin";
import ProductDashboard from "./AdminPannel/Project/ProductDashboard";
import AddProduct from "./AdminPannel/Project/AddProduct";
import UpdateProduct from "./AdminPannel/Project/UpdateProduct";
import ProductRequest from "./AdminPannel/ProductRequest/ProductRequest";
import Error from "./Error";
import OrderDetails from "./OrderDetails";
import Profile from "./Profile";
import Orders from "./Orders";
import AboutUs from "./AboutUs";
import AdminProfile from "./AdminPannel/AdminProfile";
import PrivateRoute from "./PrivateRoute";
import UserOrder from "./UserOrders";
import SliderImage from "./AdminPannel/Dash/SliderImage";
import Blogs from "./Blogs";

const Routess = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Productlist" element={<ProductList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<Blogs />} />
        <Route
          path="/checkout"
          element={<PrivateRoute element={CheckoutPage} />}
        />
        <Route
          path="/order-confirmation"
          element={<PrivateRoute element={OrderConfirmationPage} />}
        />
        <Route path="/check" element={<PrivateRoute element={Checkout} />} />
        <Route
          path="/admin"
          element={<PrivateRoute element={Admin} adminRoute />}
        />
        <Route
          path="/ProductDashboard"
          element={<PrivateRoute element={ProductDashboard} adminRoute />}
        />
        <Route
          path="/AddProduct"
          element={<PrivateRoute element={AddProduct} adminRoute />}
        />
        <Route
          path="/UpdateProduct/:id"
          element={<PrivateRoute element={UpdateProduct} adminRoute />}
        />
        <Route path="/error" element={<Error />} />
        <Route
          path="/ProductRequest"
          element={<PrivateRoute element={ProductRequest} adminRoute />}
        />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route
          path="/userorders"
          element={<PrivateRoute element={UserOrder} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute element={Orders} adminRoute />}
        />
        <Route
          path="/order/:orderId"
          element={<PrivateRoute element={OrderDetails} adminRoute />}
        />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/AdminProfile"
          element={<PrivateRoute element={AdminProfile} adminRoute />}
        />
        <Route
          path="/SliderUpload"
          element={<PrivateRoute element={SliderImage} adminRoute />}
        />
      </Routes>
    </div>
  );
};

export default Routess;
