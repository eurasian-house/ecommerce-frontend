import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Get in Touch</h1>
        <p className="lead text-muted">Have a question? We'd love to hear from you.</p>
      </div>

      <div className="row g-5">
        {/* Contact Form Section */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg rounded-4 p-4">
            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                  <input type="text" className="form-control form-control-lg bg-light border-0" id="firstName" placeholder="John" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                  <input type="text" className="form-control form-control-lg bg-light border-0" id="lastName" placeholder="Doe" required />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control form-control-lg bg-light border-0" id="email" placeholder="name@example.com" required />
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label fw-semibold">Message</label>
                  <textarea className="form-control form-control-lg bg-light border-0" id="message" rows="5" placeholder="How can we help you?" required></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="col-lg-5">
          <div className="h-100 p-5 bg-dark text-white rounded-4 shadow-lg">
            <h2 className="fw-bold mb-4">Contact Information</h2>
            <p className="text-secondary mb-5">
              Fill out the form and our team will get back to you within 5 hours.
            </p>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📍</div>
              <div>
                <h6 className="mb-0">Our Office</h6>
                <p className="mb-0 text-secondary">Bhadohi, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📞</div>
              <div>
                <h6 className="mb-0">Phone</h6>
                <p className="mb-0 text-secondary">+91 123 456 7890</p>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="fs-3 me-3 text-primary">📧</div>
              <div>
                <h6 className="mb-0">Email</h6>
                <p className="mb-0 text-secondary">hello@yourdomain.com</p>
              </div>
            </div>

            <hr className="my-5 opacity-25" />

            <div className="d-flex gap-3 fs-4">
              <span className="cursor-pointer">🌐</span>
              <span className="cursor-pointer">📱</span>
              <span className="cursor-pointer">✉️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;