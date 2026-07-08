import React from 'react';
import logo from "/logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPinterest } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer
      className="text-white pt-5 mt-5"
      style={{
        background:
          "linear-gradient(180deg,#111111 0%, #171717 45%, #101010 100%)",
        borderTop: "1px solid rgba(255,255,255,.08)"
      }}
    >
      <div className="container py-5">

        <div className="row gy-5">

          {/* Brand */}
          <div className="col-lg-4">

            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle shadow-lg mb-4"
              style={{
                width: 90,
                height: 90,
                background: "#fff"
              }}
            >
              <img
                src={logo}
                alt="Eurasian House"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  transform: "scale(1.35)"
                }}
              />
            </div>

            <h4
              className="fw-semibold mb-3"
              style={{
                letterSpacing: ".08em"
              }}
            >
              Eurasian House
            </h4>

            <p
              className="mb-4"
              style={{
                color: "#b8b8b8",
                lineHeight: 1.8,
                maxWidth: 350
              }}
            >
              Handcrafted luxury rugs made by skilled artisans.
              Blending centuries of craftsmanship with contemporary
              interiors for homes across the world.
            </p>

            <div className="d-flex gap-3">

              <a
                href="https://www.facebook.com/eurasianhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/eurasianhouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/917080012972"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              <a
                href="mailto:contact@eurasianrugs.com"
                className="footer-social"
                aria-label="Email"
              >
                <MdEmail />
              </a>

              <a
                href="https://in.pinterest.com/eurasianhouse/"
                target="_blank"
                className="footer-social"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          {/* Navigation */}
          <div className="col-lg-5">

            <div className="row">

              {/* Company */}
              <div className="col-6 col-md-4 mb-4">

                <h6
                  className="text-uppercase fw-semibold mb-4"
                  style={{
                    color: "#ffffff",
                    letterSpacing: ".08em",
                    fontSize: ".82rem"
                  }}
                >
                  Company
                </h6>

                <ul className="list-unstyled footer-list">

                  <li>
                    <Link to="/" className="footer-link">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/products" className="footer-link">
                      Shop
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?sort=top-deals"
                      className="footer-link"
                    >
                      Top Deals
                    </Link>
                  </li>

                  <li>
                    <Link to="/blogs" className="footer-link">
                      Blogs
                    </Link>
                  </li>

                  <li>
                    <Link to="/account" className="footer-link">
                      My Account
                    </Link>
                  </li>

                  <li>
                    <Link to="/us" className="footer-link">
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact" className="footer-link">
                      Contact
                    </Link>
                  </li>

                </ul>

              </div>

              {/* Support */}
              <div className="col-6 col-md-4 mb-4">

                <h6
                  className="text-uppercase fw-semibold mb-4"
                  style={{
                    color: "#ffffff",
                    letterSpacing: ".08em",
                    fontSize: ".82rem"
                  }}
                >
                  Support
                </h6>

                <ul className="list-unstyled footer-list">

                  <li>
                    <Link to="/faq" className="footer-link">
                      FAQ
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/privacy-policy"
                      className="footer-link"
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/terms"
                      className="footer-link"
                    >
                      Terms & Conditions
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/shipping-policy"
                      className="footer-link"
                    >
                      Shipping Policy
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/refund-policy"
                      className="footer-link"
                    >
                      Returns & Refunds
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/cancellation-policy"
                      className="footer-link"
                    >
                      Cancellation Policy
                    </Link>
                  </li>

                </ul>

              </div>

              {/* Collections */}
              <div className="col-md-4">

                <h6
                  className="text-uppercase fw-semibold mb-4"
                  style={{
                    color: "#ffffff",
                    letterSpacing: ".08em",
                    fontSize: ".82rem"
                  }}
                >
                  Collections
                </h6>

                <ul className="list-unstyled footer-list">

                  <li>
                    <Link
                      to="/products?category=Hand Knotted"
                      className="footer-link"
                    >
                      Hand Knotted
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Persian"
                      className="footer-link"
                    >
                      Persian Rugs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Tufted"
                      className="footer-link"
                    >
                      Tufted Rugs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Kilim"
                      className="footer-link"
                    >
                      Kilim Rugs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Tibetan"
                      className="footer-link"
                    >
                      Tibetan Rugs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Jute"
                      className="footer-link"
                    >
                      Jute Rugs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/products?category=Dhurrie"
                      className="footer-link"
                    >
                      Dhurrie Rugs
                    </Link>
                  </li>

                </ul>

              </div>

            </div>

          </div>


          {/* Contact */}
          {/* Contact */}
          <div className="col-lg-3">

            <h6
              className="text-uppercase fw-semibold mb-4"
              style={{
                color: "#ffffff",
                letterSpacing: ".08em",
                fontSize: ".82rem"
              }}
            >
              Contact
            </h6>

            <p
              style={{
                color: "#b8b8b8",
                lineHeight: 1.8
              }}
            >
              Luxury handcrafted rugs delivered worldwide.
              Reach out for custom orders, wholesale enquiries
              or product assistance.
            </p>

            <div className="mt-4">

              <div className="d-flex mb-3">
                <i className="bi bi-geo-alt me-3"></i>
                <span className="text-secondary">
                  Bhadohi - 221401, Uttar Pradesh, India
                </span>
              </div>

              <div className="d-flex mb-3">
                <i className="bi bi-telephone me-3"></i>
                <span className="text-secondary">
                  +91 70800 12972
                </span>
              </div>

              <div className="d-flex mb-3">
                <i className="bi bi-envelope me-3"></i>
                <span className="text-secondary">
                  contact@eurasianrugs.com
                </span>
              </div>

              <div className="d-flex">
                <i className="bi bi-globe me-3"></i>
                <span className="text-secondary">
                  Worldwide Shipping
                </span>
              </div>

            </div>

          </div>

        </div>

        <hr
          style={{
            borderColor: "rgba(255,255,255,.08)",
            marginTop: "4rem",
            marginBottom: "2rem"
          }}
        />

        <div className="row align-items-center">

          <div className="col-md-6">

            <p
              className="mb-3 mb-md-0"
              style={{
                color: "#8d8d8d",
                fontSize: ".92rem"
              }}
            >
              © 2026 <strong className="text-white">Eurasian House</strong>.
              Crafted with passion. All rights reserved.
            </p>

          </div>

          <div className="col-md-6">

            <div className="d-flex justify-content-md-end gap-4 flex-wrap">

              <Link
                to="/privacy-policy"
                className="footer-link"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="footer-link"
              >
                Terms
              </Link>

              <Link
                to="/shipping-policy"
                className="footer-link"
              >
                Shipping
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;