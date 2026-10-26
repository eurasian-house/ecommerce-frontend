import { BrowserRouter, Routes, Route, useLocation, } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollManager from "./components/ScrollManager";

import Layout from "./components/layout/Layout";
import Products from "./pages/Products";
import ProductList from "./pages/ProductList";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import CartProvider from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import ChatWidget from "./components/ChatWidget";

import Analytics from "./components/Analytics";
import WriteReview from "./pages/WriteReview";
import AdminQuestions from "./pages/admin/AdminQuestions";
import AdminReviews from "./pages/admin/AdminReviews";
import Wholesale from "./pages/Wholesale";
import WholesaleContact from "./pages/WholesaleContact";
import WholesaleLeads from "./pages/admin/WholesaleLeads";

import PayPalCheckout from "./pages/PayPalCheckout";

import CustomRugs from "./pages/CustomRugs";

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
const PaymentPolicy = lazy(() => import("./pages/PaymentPolicy"));
const PackagingPolicy = lazy(() => import("./pages/PackagingPolicy"));

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
const CustOrderDetail = lazy(() => import("./pages/CustOrderDetail"));



function CustomerChat() {
  const location = useLocation();

  if (
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/")
  ) {
    return null;
  }

  return <ChatWidget />;
}




export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollManager />
          <Analytics />
          <CustomerChat />
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
                <Route path="/custom-rugs" element={<CustomRugs />} />
                <Route path="/products" element={<ProductList />} />

                {/* SEO category pages */}

                <Route
                  path="/products/hand-tufted-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Tufted Rugs"
                      seo={{
                        title: "Finest Hand Tufted Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Buy quality hand tufted rugs at Eurasian House free global shipping. Discover stylish handmade rugs with beautiful designs, rich colors, and lasting comfort.",
                        canonical: "https://www.eurasianrugs.com/products/hand-tufted-rugs",
                        keywords:
                          "hand tufted rugs, hand tufted carpets, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/hand-loom-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Loom Rugs"
                      seo={{
                        title: "Hand Loom Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Shop hand-loom rugs at Eurasian House with free global shipping. Explore handcrafted rugs combining traditional weaving techniques with versatile designs.",
                        canonical: "https://www.eurasianrugs.com/products/hand-loom-rugs",
                        keywords:
                          "hand loom rugs, handloom carpets, handmade rugs,wool rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/hand-knotted-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Knotted Rugs"
                      seo={{
                        title: "Hand Knotted Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Explore free global shipping on all rugs. Hand knotted rugs are the finest quality and most durable rugs entirely made by hands. Hand knotted rugs are valued for their craftsmanship and can last for generations, making them a timeless comfort to any home.",
                        canonical:
                          "https://www.eurasianrugs.com/products/hand-knotted-rugs",
                        keywords:
                          "hand knotted rugs, hand knotted carpets, rugs, carpets, area rugs, wool rug, living room rug, flooring, premium rug",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/flatweave-rugs-dhurries"
                  element={
                    <ProductList
                      initialMainCategory="Flatweave Rugs/Dhurries"
                      seo={{
                        title: "Flatweave Rugs & Dhurries at Best Price | Eurasian House Rugs",
                        description:
                          "Discover flatweave rugs and dhurries at Eurasian House free global shipping. Shop versatile woven rugs with timeless patterns and practical style.",
                        canonical: "https://www.eurasianrugs.com/products/flatweave-rugs-dhurries",
                        keywords:
                          "flatweave rugs, dhurries, flat weave carpets, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/leather-rugs-pouffe"
                  element={
                    <ProductList
                      initialMainCategory="Leather Rugs/Pouffe"
                      seo={{
                        title: "Leather Rugs & Pouffes at Best Price | Eurasian House Rugs",
                        description:
                          "Explore leather rugs and poufs at Eurasian House with free global shipping. Discover cowhide's distinctive textures and handcrafted pieces for your home.",
                        canonical: "https://www.eurasianrugs.com/products/leather-rugs-pouffe",
                        keywords:
                          "leather rugs, leather carpets, leather pouffes, handmade rugs, rugs, carpets, area rugs, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/hand-knotted-persian-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Knotted Persian"
                      seo={{
                        title: "Hand Knotted Persian Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Discover hand knotted Premium Persian rugs at Eurasian House with free global shipping, featuring intricate patterns, rich colors, and traditional craftsmanship.",
                        canonical: "https://www.eurasianrugs.com/products/hand-knotted-persian-rugs",
                        keywords:
                          "Persian rugs, hand knotted Persian rugs, Persian carpets, traditional rugs, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/hand-knotted-tibetan-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Knotted Tibetan"
                      seo={{
                        title: "Hand Knotted Tibetan Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Explore hand knotted Tibetan rugs at Eurasian House free global shipping. Discover distinctive designs and handcrafted rugs inspired by Tibetan weaving traditions.",
                        canonical: "https://www.eurasianrugs.com/products/hand-knotted-tibetan-rugs",
                        keywords:
                          "Tibetan rugs, hand knotted Tibetan rugs, Tibetan carpets, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/hand-knotted-kashmiri-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Hand Knotted Kashmiri"
                      seo={{
                        title: "Hand Knotted Kashmiri Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Shop premium hand knotted Kashmiri rugs at Eurasian House with free global shipping. Explore elegant designs inspired by the traditional craftsmanship of Kashmir.",
                        canonical: "https://www.eurasianrugs.com/products/hand-knotted-kashmiri-rugs",
                        keywords:
                          "Kashmiri rugs, hand knotted Kashmiri rugs, Kashmir carpets, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs, premium rugs",
                      }}
                    />
                  }
                />

                <Route
                  path="/products/indo-gabbeh-rugs"
                  element={
                    <ProductList
                      initialMainCategory="Indo-Gabbeh Rugs"
                      seo={{
                        title: "Indo-Gabbeh Rugs at Best Price | Eurasian House Rugs",
                        description:
                          "Discover Indo Gabbeh rugs at Eurasian House free global shipping. Explore distinctive handcrafted rugs with bold designs, rich textures, and timeless appeal.",
                        canonical: "https://www.eurasianrugs.com/products/indo-gabbeh-rugs",
                        keywords:
                          "Indo Gabbeh rugs, Gabbeh rugs, handmade Gabbeh carpets, handmade rugs, rugs, carpets, area rugs, wool rug, living room rug, flooring, boho decor rugs",
                      }}
                    />
                  }
                />

                {/* Keep product detail route after explicit category routes */}
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
                <Route path="questions" element={<AdminQuestions />} />
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
              <Route path="/payment-policy" element={<PaymentPolicy />} />
              <Route path="/packaging-policy" element={<PackagingPolicy />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/account/orders/:id" element={<ProtectedRoute> <CustOrderDetail /></ProtectedRoute>} />
              <Route path="/write-review/:orderItemId" element={<WriteReview />} />
              <Route path="/admin/reviews" element={<AdminProtectedRoute> <AdminReviews /></AdminProtectedRoute>} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/wholesale-contact" element={<WholesaleContact />} />
              <Route
                path="/admin/wholesale-leads"
                element={
                  <AdminProtectedRoute>
                    <WholesaleLeads />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/checkout/paypal"
                element={<PayPalCheckout />}
              />


            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}