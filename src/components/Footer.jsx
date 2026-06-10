import React from 'react';
import logo from "/logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
                alt="Logo"
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
            <h5 className="text-uppercase mb-4 fw-bold text-light small">Explore</h5>
            <p><a href="/" className="text-secondary text-decoration-none hover-white">Home</a></p>
            <p><a href="/blogs" className="text-secondary text-decoration-none">Blogs</a></p>
            <p><a href="/us" className="text-secondary text-decoration-none">About Us</a></p>
            <p><a href="/contact" className="text-secondary text-decoration-none">Contact</a></p>
          </div>

          {/* Services / Categories */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">Services</h5>
            <p><a href="#!" className="text-secondary text-decoration-none">Handmade Rugs</a></p>
            <p><a href="#!" className="text-secondary text-decoration-none">Web Development</a></p>
            <p><a href="#!" className="text-secondary text-decoration-none">Educational Coaching</a></p>
            <p><a href="#!" className="text-secondary text-decoration-none">UI/UX Design</a></p>
          </div>

          {/* Newsletter Section */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-light small">Newsletter</h5>
            <p className="text-secondary small">Join our mailing list for the latest updates.</p>
            <form className="mt-3">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control bg-secondary border-0 text-white rounded-start-pill ps-3"
                  placeholder="Your Email"
                  aria-label="Email"
                />
                <button className="btn btn-primary rounded-end-pill px-3" type="button">Join</button>
              </div>
            </form>
          </div>

        </div>

        <hr className="mb-4 mt-5 opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-secondary small">
              © 2026 Copyright:
              <strong className="text-primary"> EurasianHouse.com</strong>
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <p className="text-md-end text-secondary small">
              Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;