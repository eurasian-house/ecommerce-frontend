// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../../context/CartContext";
// import NavbarProfile from "../NavbarProfile"; // adjust path

// // ✅ ADD
// import { useAuth } from "../../context/AuthContext";
// import { logout } from "../../lib/auth";


// export default function Navbar() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();
//   const { cart } = useCart();

//   // ✅ ADD
//   const { user } = useAuth();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//     }
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   // ✅ ADD
//   const handleUserClick = async () => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       await logout();
//       navigate("/");
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
//       <div className="container-fluid px-4">

//         <NavLink className="navbar-brand" to="/">
//           <img
//             src="/logo.png"
//             alt="Logo"
//             style={{ height: "40px", objectFit: "contain" }}
//           />
//         </NavLink>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarContent"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarContent">

//           <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink to="/" className="nav-link">Home</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/products" className="nav-link">Products</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/us" className="nav-link">About Us</NavLink>
//             </li>

//             <li className="nav-item">
//               <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
//             </li>
//           </ul>

//           <div className="d-flex align-items-center gap-3">

//             <form onSubmit={handleSearch} className="d-flex">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{ width: "200px" }}
//               />
//             </form>


//             <div className="d-flex align-items-center">
//               {/* existing cart icon */}
//               <button className="btn btn-light">
//                 {/* <i className="bi bi-cart"></i> */}
//               </button>

//               {/* ✅ ADD THIS */}
//               <NavbarProfile />
//             </div>

//             {/* CART */}
//             <div
//               style={{ position: "relative", cursor: "pointer" }}
//               onClick={() => navigate("/cart")}
//             >
//               <i className="bi bi-cart fs-5"></i>

//               {totalItems > 0 && (
//                 <span
//                   style={{
//                     position: "absolute",
//                     top: "-6px",
//                     right: "-10px",
//                     background: "black",
//                     color: "white",
//                     fontSize: "10px",
//                     borderRadius: "50%",
//                     padding: "3px 6px",
//                   }}
//                 >
//                   {totalItems}
//                 </span>
//               )}
//             </div>

//             {/* USER */}
//             <i
//               className={`bi ${user ? "bi-box-arrow-right" : "bi-person"} fs-5`}
//               style={{ cursor: "pointer" }}
//               onClick={handleUserClick}
//               title={user ? "Logout" : "Login"}
//             ></i>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }




import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import NavbarProfile from "../NavbarProfile";

// ✅ ADD
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../lib/auth";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = async () => {
    if (!user) {
      navigate("/login");
    } else {
      await logout();
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container-fluid px-4">

        <NavLink className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link">Products</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/us" className="nav-link">About Us</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">

            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "200px" }}
              />
            </form>

            <div className="d-flex align-items-center">
              <button className="btn btn-light"></button>

              {/* ✅ PASS USER */}
              <NavbarProfile user={user} />
            </div>

            {/* CART */}
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => navigate("/cart")}
            >
              <i className="bi bi-cart fs-5"></i>

              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-10px",
                    background: "black",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "50%",
                    padding: "3px 6px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </div>

            {/* ❌ REMOVE THIS USER ICON BLOCK COMPLETELY */}
            {/* DELETE BELOW */}
            {/* 
            <i
              className={`bi ${user ? "bi-box-arrow-right" : "bi-person"} fs-5`}
              style={{ cursor: "pointer" }}
              onClick={handleUserClick}
              title={user ? "Logout" : "Login"}
            ></i>
            */}

          </div>
        </div>
      </div>
    </nav>
  );
}