
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import NavbarProfile from "../NavbarProfile";

import { useAuth } from "../../context/AuthContext";

import { trackSearch } from "../../lib/analytics";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    trackSearch(query);

    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const closeNavbar = () => {
    setNavOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-0">
      <div className="container-fluid px-2 px-md-4 d-flex align-items-center">

        <NavLink className="navbar-brand" to="/">
          <img
            src="/logo.png"
            alt="Eurasian House Logo"
            fetchPriority="high"
            decoding="async"
            style={{ height: "clamp(45px,6vw,60px)", objectFit: "contain" }}
          />
        </NavLink>

        {/*  Hamburger  */}
        <div
          className={`collapse navbar-collapse order-3 w-100 mt-3 mt-lg-0 order-lg-0 ${navOpen ? "show" : ""}`}
          id="navbarContent"
        >

          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 text-center text-lg-start">
            <li className="nav-item">
              <NavLink to="/" onClick={closeNavbar} className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" onClick={closeNavbar} className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>Products</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/blogs" onClick={closeNavbar} className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>Blogs</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/us" onClick={closeNavbar} className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>About Us</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" onClick={closeNavbar} className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-semibold" : "text-dark"}`}>Contact Us</NavLink>
            </li>
          </ul>
        </div>

        {mobileSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="w-100 mt-3 d-md-none order-5"
            style={{
              flexBasis: "100%"
            }}
          >
            <div
              className="d-flex align-items-center"
              style={{
                border: "1px solid #2f2933",
                borderRadius: "50px",
                overflow: "hidden",
                background: "#f5f4f2",
                height: "45px",
              }}
            >
              <input
                type="search"
                className="form-control border-0 shadow-none"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setMobileSearchOpen(false)}
              >
                ✕
              </button>

              <button
                type="submit"
                className="border-0"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#0d6efd",
                  color: "white",
                  margin: "3px",
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        )}

        {/* Search+User+Cart */}

        <div
          className="d-flex align-items-center flex-grow-1 order-1 order-lg-0 navbar-actions"
          style={{ justifyContent: "space-between" }}
        >

          <>
            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="align-items-center flex-grow-1 desktop-search d-none d-md-flex"
              style={{
                border: "1px solid #2f2933",
                borderRadius: "50px",
                overflow: "hidden",
                width: "clamp(120px, 30vw, 700px)",
                background: "#f5f4f2",
                height: "45px",
                minWidth: 0,
              }}
            >
              <input
                type="search"
                id="search"
                className="form-control border-0 shadow-none"
                placeholder="Search for the Products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  background: "transparent",
                  padding: "10px 18px",
                  fontSize: "clamp(.9rem,2vw,1.1rem)"
                }}
              />

              <button
                aria-label="Search products"
                type="submit"
                className="border-0 d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  borderRadius: "50%",
                  background: "#0d6efd",
                  margin: "3px",
                  color: "white",
                  padding: 0,
                }}
              >
                <i className="bi bi-search fs-6 fw-bold"></i>
              </button>
            </form>

            {/* Mobile Search Icon */}
            {!mobileSearchOpen && (
              <button
                type="button"
                className="border-0 bg-transparent p-0 d-md-none"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <i className="bi bi-search fs-4"></i>
              </button>
            )}

            {/* Mobile Search Bar */}

          </>

          <div className="d-flex align-items-center flex-shrink-0 position-relative">

            {/* ✅ PASS USER */}
            <div style={{ zIndex: 1055 }}>
              <NavbarProfile user={user} />
            </div>
          </div>

          {/* CART */}
          <button
            type="button"
            className="flex-shrink-0 border-0 bg-transparent p-0 mx-2"
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
            aria-label="Shopping cart"
          >
            <i className="bi bi-cart fs-5"></i>

            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "black",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  minWidth: "20px",
                  minHeight: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="navbar-toggler flex-shrink-0 order-2"
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={navOpen}
            aria-controls="navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

      </div>
    </nav >
  );
}