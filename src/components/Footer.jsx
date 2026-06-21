import React from 'react';
import logo from "/logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start" >
        <div className="row text-center text-md-start">

          {/* Brand / About Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 d-flex flex-column align-items-center text-center">

            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto"
              }}
            >
              <img
                src={logo}
                alt="Eurasian House Logo"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scale(1.4)"
                }}
              />
            </div>
            <p className="text-secondary small">
              Providing premium handcrafted quality since 2026.
              We believe in the intersection of modern technology and traditional
              craftsmanship.
            </p>
            <div className="d-flex justify-content-center mt-4 gap-4 flex-wrap">
              <FaFacebookF
                color="#0d6efd"
                className="mr-3"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              />

              <FaInstagram
                color="#0d6efd"
                className="mx-3"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              />

              <FaWhatsapp
                color="#0d6efd"
                className="mx-3"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              />

              <MdEmail
                color="#0d6efd"
                className="mx-3"
                style={{ cursor: "pointer", transition: "0.3s" }}
                onMouseEnter={(e) => e.target.style.opacity = "0.7"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">Company</h5>
            <p>
              <Link to="/account" className="text-secondary text-decoration-none footer-link footer-link">
                My Account
              </Link>
            </p>
            <p>
              <Link
                to="/products?sort=top-deals"
                className="text-secondary text-decoration-none footer-link footer-link"
              >
                Top Deals
              </Link>
            </p>
            <p>
              <Link to="/" className="text-secondary text-decoration-none footer-link footer-link">
                Home
              </Link>
            </p>

            <p>
              <Link to="/products" className="text-secondary text-decoration-none footer-link">
                Shop
              </Link>
            </p>

            <p>
              <Link to="/blogs" className="text-secondary text-decoration-none footer-link">
                Blogs
              </Link>
            </p>

            <p>
              <Link to="/us" className="text-secondary text-decoration-none footer-link">
                About Us
              </Link>
            </p>

            <p>
              <Link to="/contact" className="text-secondary text-decoration-none footer-link">
                Contact Us
              </Link>
            </p>
          </div>

          {/* Customer Support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">
              Customer Support
            </h5>

            <p>
              <Link
                to="/privacy-policy"
                className="text-secondary text-decoration-none footer-link"
              >
                Privacy Policy
              </Link>
            </p>

            <p>
              <Link
                to="/terms"
                className="text-secondary text-decoration-none footer-link"
              >
                Terms & Conditions
              </Link>
            </p>

            <p>
              <Link
                to="/shipping-policy"
                className="text-secondary text-decoration-none footer-link"
              >
                Shipping Policy
              </Link>
            </p>

            <p>
              <Link
                to="/refund-policy"
                className="text-secondary text-decoration-none footer-link"
              >
                Return & Refund
              </Link>
            </p>

            <p>
              <Link
                to="/cancellation-policy"
                className="text-secondary text-decoration-none footer-link"
              >
                Cancellation Policy
              </Link>
            </p>

            <p>
              <Link
                to="/faq"
                className="text-secondary text-decoration-none footer-link"
              >
                FAQ
              </Link>
            </p>
          </div>

          {/* Shop by Category */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">
              Shop by Category
            </h5>

            <p>
              <Link
                to="/products?category=Persian"
                className="text-secondary text-decoration-none footer-link"
              >
                Persian Rugs
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Tufted"
                className="text-secondary text-decoration-none footer-link"
              >
                Tufted Rugs
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Hand Knotted"
                className="text-secondary text-decoration-none footer-link"
              >
                Hand Knotted
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Kilim"
                className="text-secondary text-decoration-none footer-link"
              >
                Kilim Rugs
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Tibetan"
                className="text-secondary text-decoration-none footer-link"
              >
                Tibetan Rugs
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Jute"
                className="text-secondary text-decoration-none footer-link"
              >
                Jute Rugs
              </Link>
            </p>

            <p>
              <Link
                to="/products?category=Dhurrie"
                className="text-secondary text-decoration-none footer-link"
              >
                Dhurrie Rugs
              </Link>
            </p>
          </div>


          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">
              Contact Us
            </h5>

            <p className="text-secondary small mb-3">
              We'd love to hear from you. Reach out for product inquiries,
              custom rug orders, or any assistance.
            </p>

            <p className="text-secondary small mb-2">
              📍 Bhadohi - 221401, Uttar Pradesh, India
            </p>

            <p className="text-secondary small mb-2">
              📞 +91 70800 12972
            </p>

            <p className="text-secondary small mb-2">
              ✉️ contact@eurasianrugs.com
            </p>

            <p className="text-secondary small mb-0">
              🌍 Worldwide Shipping Available
            </p>
          </div>

        </div>

        <hr className="mb-4 mt-5 opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-secondary small">
              © 2026 <strong className="text-primary"> Eurasian House</strong>. All Rights Reserved.

            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-md-end text-secondary small">
              <Link
                to="/privacy-policy"
                className="text-secondary text-decoration-none"
              >
                Privacy Policy
              </Link>

              <span className="mx-2">|</span>

              <Link
                to="/terms"
                className="text-secondary text-decoration-none"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;