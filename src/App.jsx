// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Admin from "./pages/Admin";
// import Products from "./pages/Products";
// import ProductList from "./pages/ProductList";
// import ProductDetail from "./pages/ProductDetail";
// import Layout from "./components/layout/Layout";
// import Blogs from "./pages/Blogs";
// import Us from "./pages/Us";
// import Contact from "./pages/Contact";
// import CartProvider from "./context/CartContext";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Account from "./pages/Account";

// import { AuthProvider } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import OrderSuccess from "./pages/OrderSuccess";

// export default function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>

//             <Route element={<Layout />}>
//               <Route path="/" element={<Products />} />
//               <Route path="/products" element={<ProductList />} />
//               <Route path="/products/:id" element={<ProductDetail />} />
//               <Route path="/blogs" element={<Blogs />} />
//               <Route path="/us" element={<Us />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/cart" element={<Cart />} />

//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* ✅ PROTECTED ACCOUNT */}
//               <Route
//                 path="/account"
//                 element={
//                   <ProtectedRoute>
//                     <Account />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* ✅ ORDER SUCCESS (INSIDE LAYOUT) */}
//               <Route
//                 path="/order-success"
//                 element={
//                   <ProtectedRoute>
//                     <OrderSuccess />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>

//             <Route path="/admin" element={<Admin />} />

//             <Route
//               path="/checkout"
//               element={
//                 <ProtectedRoute>
//                   <Checkout />
//                 </ProtectedRoute>
//               }
//             />

//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </AuthProvider>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
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

// ✅ NEW
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            <Route element={<Layout />}>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
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

            {/* ✅ SECURED ADMIN ROUTE */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}