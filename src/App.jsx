import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/Blogs";
import Us from "./pages/Us";
import Contact from "./pages/Contact";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./pages/Account";

import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrderSuccess from "./pages/OrderSuccess";

// ✅ ADMIN
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import AllProducts from "./pages/admin/AllProducts";
import Orders from "./pages/admin/Orders";
import Messages from "./pages/admin/Messages";
import Marketing from "./pages/admin/Marketing";
import Finances from "./pages/admin/Finances";

import OrderDetails from "./pages/admin/OrderDetails";


// ✅ Password Recovery
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import BlogDetails from "./pages/BlogDetails";


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* MAIN WEBSITE */}
            <Route element={<Layout />}>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/us" element={<Us />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* ✅ ADMIN PANEL (WITH SIDEBAR) */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products" element={<AllProducts />} />
              <Route path="orders" element={<Orders />} />
              <Route path="messages" element={<Messages />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="finances" element={<Finances />} />
            </Route>
            <Route path="/admin/orders/:id" element={<OrderDetails />} />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            {/* ✅ Password Reset */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/blogs/:id" element={<BlogDetails />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}