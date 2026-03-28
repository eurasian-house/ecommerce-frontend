import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          {/* Brand / About Section */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-primary">Your Brand</h5>
            <p className="text-secondary small">
              Providing premium digital experiences and handcrafted quality since 2026. 
              We believe in the intersection of modern technology and traditional 
              craftsmanship.
            </p>
            <div className="mt-4">
              <span className="me-3 fs-5 cursor-pointer">🌐</span>
              <span className="me-3 fs-5 cursor-pointer">📱</span>
              <span className="me-3 fs-5 cursor-pointer">✉️</span>
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
              <strong className="text-primary"> YourBrandName.com</strong>
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