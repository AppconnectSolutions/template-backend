// src/App.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

/* ---------------- ADMIN ---------------- */
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Products from "./components/admin/Products.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import EditProduct from "./components/admin/EditProduct.jsx";
import AdminCategories from "./components/admin/Categories.jsx";
import AddCategory from "./components/admin/AddCategory.jsx";
import EditCategory from "./components/admin/EditCategory.jsx";
import OrdersList from "./components/admin/OrdersList.jsx";
import OrderDetails from "./components/admin/OrderDetails.jsx";
import PrepareShipment from "./components/admin/PrepareShipment.jsx";
import OrderDetailsSingle from "./components/admin/OrderDetailsSingle.jsx";
import UpdateShipment from "./components/admin/UpdateShipment.jsx";
import Users from "./components/admin/Users.jsx";
import AdminProtectedRoute from "./components/admin/ProtectedRoute.jsx";

/* ----------- AUTH (COMMON) ------------- */
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";

/* ---------------- USER ---------------- */
import Navbar from "./components/users/Navbar.jsx";
import Banner from "./components/users/Banner.jsx";
import UserCategories from "./components/users/Categories.jsx";

import TopPicks from "./components/users/TopPicks.jsx";
import Recipes from "./components/users/Recipes.jsx";
import DailyBestSells from "./components/users/DailyBestSells.jsx";
import ProductGrid from "./components/users/ProductGrid.jsx";
import Footer from "./components/users/Footer.jsx";
import { CartProvider } from "./components/users/CartContext";
import WhyChoose from "./components/users/WhyChoose.jsx";
import Testimonials from "./components/users/Testimonials.jsx";

import Checkout from "./components/users/Checkout.jsx";
import ForgotPassword from "./components/users/ForgotPassword.jsx";

import AccountLayout from "./components/users/account/AccountLayout.jsx";
import Orders from "./components/users/account/Orders.jsx";
import Settings from "./components/users/account/Settings.jsx";
import PaymentMethod from "./components/users/account/PaymentMethod.jsx";
import NotificationSettings from "./components/users/account/NotificationSettings.jsx";
import Address from "./components/users/account/Address.jsx";
import CartPage from "./components/users/account/CartPage.jsx";

import ProductDetails from "./components/users/ProductDetails.jsx";
import About from "./components/users/About.jsx";
import Contact from "./components/users/Contact.jsx";
import Wishlist from "./components/users/Wishlist.jsx";
import AllProducts from "./components/users/AllProducts.jsx";

/* ---------------- CART ---------------- */
import CartDrawer from "./components/users/CartDrawer.jsx";
import { useCart } from "./components/users/CartContext";

/* ---------------- USER LAYOUT ---------------- */
function UserLayout() {
  const { openCart } = useCart();
  return (
    <>
      <Navbar openCart={openCart} />
      <Outlet />
      <Footer />
    </>
  );
}


/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    // ❌ Ignore clicks on interactive elements
    const ignoreSelectors = [
      "button",
      "a",
      "input",
      "textarea",
      "select",
      "[role='button']",
      ".slider-controls",
      ".slick-arrow",
      ".swiper-button-next",
      ".swiper-button-prev",
    ];

    if (ignoreSelectors.some((selector) => e.target.closest(selector))) {
      return;
    }

    // ✅ Otherwise redirect
    navigate("/products");
  };

  return (
    <main onClick={handleHomeClick} style={{ cursor: "pointer" }}>
      <Banner />
      <UserCategories />
      <WhyChoose />
      <TopPicks />
      <Recipes />
      <DailyBestSells />
      <ProductGrid />
      <Testimonials />
    </main>
  );
}
/* ---------------- MAIN APP ROUTER ---------------- */
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* ---------- PUBLIC AUTH ROUTES (no navbar/footer if you want full page) ---------- */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------------- USER ROUTES ---------------- */}
          <Route element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<AllProducts />} />

            {/* PRODUCT DETAILS */}
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="combos" element={<DailyBestSells />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="shopnow" element={<ProductGrid />} />
              <Route path="cart" element={<CartPage />} />

            {/* ACCOUNT ROUTES */}
            <Route path="account" element={<AccountLayout />}>
            <Route path="cart" element={<CartPage />} />
      <Route index element={<Orders />} />
      <Route path="orders" element={<Orders />} />
      <Route path="settings" element={<Settings />} />
      <Route path="payment-method" element={<PaymentMethod />} />
      <Route path="notifications" element={<NotificationSettings />} />
      <Route path="address" element={<Address />} />
  </Route>
          </Route>

          {/* ---------------- ADMIN ROUTES (PROTECTED) ---------------- */}
          <Route
            element={
              <AdminProtectedRoute allowedRoles={["admin", "staff"]}>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route
              path="/admin/edit-category/:id"
              element={<EditCategory />}
            />
            {/* order-related admin pages */}
            <Route path="/orders/list" element={<OrdersList />} />
            <Route path="/orders/details" element={<OrderDetails />} />
            <Route
              path="/prepare-shipment/:order_no"
              element={<PrepareShipment />}
            />
            <Route
              path="/order-details/:order_no"
              element={<OrderDetailsSingle />}
            />
            <Route
              path="/update-shipment/:id"
              element={<UpdateShipment />}
            />
            <Route path="/admin/users" element={<Users />} />
          </Route>
        </Routes>

        {/* CART DRAWER (GLOBAL) */}
        <CartDrawer />
      </Router>
    </CartProvider>
  );
}

export default App;
