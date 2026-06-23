import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/layout/Layout";
import Products from "./pages/Products";
import ProductList from "./pages/ProductList";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Blogs = lazy(() => import("./pages/Blogs"));
const Us = lazy(() => import("./pages/Us"));
const Contact = lazy(() => import("./pages/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Account = lazy(() => import("./pages/Account"));

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const BlogDetails = lazy(() => import("./pages/BlogDetails"));

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));

const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AddProduct = lazy(() => import("./pages/admin/AddProduct"));
const AllProducts = lazy(() => import("./pages/admin/AllProducts"));
const Orders = lazy(() => import("./pages/admin/Orders"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Marketing = lazy(() => import("./pages/admin/Marketing"));
const Finances = lazy(() => import("./pages/admin/Finances"));
const OrderDetails = lazy(() => import("./pages/admin/OrderDetails"));


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          >
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />


            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}