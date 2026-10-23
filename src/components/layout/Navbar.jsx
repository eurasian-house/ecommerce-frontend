import { useTheme } from "../../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import NavbarProfile from "../NavbarProfile";
import { useEffect, useRef, useState } from "react";

import EurasianLogo from "../EurasianLogo";

import { useAuth } from "../../context/AuthContext";
import { trackSearch } from "../../lib/analytics";

import { FaXmark, FaMagnifyingGlass, FaSun, FaMoon, FaCartShopping, FaBars } from "react-icons/fa6";


export default function Navbar() {
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();

  const { user } = useAuth();
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setNavOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-lg sticky-top py-0"
    >
      <div className="container-fluid px-2 px-md-4 d-flex align-items-center">
        <NavLink
          className="navbar-brand"
          to="/"
          aria-label="Eurasian House home"
        >
          <EurasianLogo className="navbar-logo" animated={true} />
        </NavLink>


        {/*  Hamburger  */}
        <div
          className={`collapse navbar-collapse order-3 w-100 mt-3 mt-lg-0 order-lg-0 ${navOpen ? "show" : ""}`}
          id="navbarContent"
        >

          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 text-center text-lg-start">
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/blogs"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Blogs
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/wholesale"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Trade
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/us"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                About Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  `nav-link hover-lift hover-lift--underline ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>

        </div>

        {mobileSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="navbar-mobile-search w-100 mt-3 d-md-none order-5"
          >
            <div className="navbar-mobile-search-wrapper d-flex align-items-center">
              <input
                type="search"
                className="form-control border-0 shadow-none navbar-mobile-search-input"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="button"
                className="navbar-mobile-search-close border-0 bg-transparent"
                onClick={() => setMobileSearchOpen(false)}
                aria-label="Close search"
              >
                <FaXmark />
              </button>

              <button
                type="submit"
                className="navbar-mobile-search-btn border-0 d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <FaMagnifyingGlass />
              </button>
            </div>
          </form>
        )}

        {/* Search+User+Cart */}

        <div className="d-flex align-items-center flex-grow-1 order-1 order-lg-0 navbar-actions">
          {/* Dark/light theme btn */}
          <button
            type="button"
            className="theme-toggle hover-lift"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>


          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="navbar-search d-none d-md-flex align-items-center flex-grow-1"
          >
            <input
              type="search"
              id="search"
              className="form-control border-0 shadow-none navbar-search-input"
              placeholder="Search for the Products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              aria-label="Search products"
              type="submit"
              className="navbar-search-btn border-0 d-flex align-items-center justify-content-center fw-bold"
            >
              <FaMagnifyingGlass />
            </button>
          </form>

          {/* Mobile Search Icon */}
          {!mobileSearchOpen && (
            <button
              type="button"
              className="navbar-mobile-search-toggle border-0 bg-transparent p-0 d-md-none"
              onClick={() => setMobileSearchOpen(true)}
              aria-label="Open search"
            >
              <FaMagnifyingGlass />
            </button>
          )}

          {/* Mobile Search Bar */}
          <div className="d-flex align-items-center flex-shrink-0 position-relative">

            {/* CART */}
            <button
              type="button"
              className="navbar-cart-btn flex-shrink-0 border-0 bg-transparent p-0"
              onClick={() => navigate("/cart")}
              aria-label="Shopping cart"
            >
              <FaCartShopping />

              {totalItems > 0 && (
                <span className="navbar-cart-badge">
                  {totalItems}
                </span>
              )}
            </button>

            {/* ✅ PASS USER */}
            <div className="navbar-profile">
              <NavbarProfile user={user} />
            </div>
          </div>




          <button
            className="navbar-toggler flex-shrink-0 order-2"
            type="button"
            onClick={() => setNavOpen((prev) => !prev)}
            aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={navOpen}
            aria-controls="navbarContent"
          >
            {navOpen ? <FaXmark /> : <FaBars />}
          </button>

        </div>

      </div>

    </nav >
  );
}
