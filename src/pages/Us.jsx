import React from 'react';

const Us = () => {
  return (
    <div className="container py-5">
      {/* Hero Section: About Me / Us */}
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mb-5">
        <div className="col-10 col-sm-8 col-lg-6">
          {/* Placeholder for a profile or team image */}
          <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded-5 shadow-lg" style={{ height: '400px' }}>
            <span className="fs-3">Insert Your Image Here</span>
          </div>
        </div>
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold lh-1 mb-3 text-primary">About Us</h1>
          <p className="lead text-muted">
            We are a team of passionate creators dedicated to building high-quality 
            digital experiences. Our journey started with a simple idea: 
            make the web a more beautiful and functional place for everyone.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 rounded-pill shadow">
              Our Portfolio
            </button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Values / Features Section */}
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col text-center">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
            <i className="bi bi-cpu"></i> {/* Requires Bootstrap Icons */}
            💡
          </div>
          <h3 className="fs-4 fw-bold">Innovation</h3>
          <p>Constantly pushing the boundaries of what is possible with modern technology and ReactJS.</p>
        </div>
        <div className="feature col text-center">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
            🎯
          </div>
          <h3 className="fs-4 fw-bold">Precision</h3>
          <p>Every pixel and every line of code is crafted with extreme attention to detail.</p>
        </div>
        <div className="feature col text-center">
          <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
            🤝
          </div>
          <h3 className="fs-4 fw-bold">Collaboration</h3>
          <p>We believe in working closely with our clients to turn their vision into a reality.</p>
        </div>
      </div>

      {/* Quote / Mission Section */}
      <div className="p-4 p-md-5 mb-4 text-white rounded-5 bg-dark shadow-lg mt-5">
        <div className="col-md-8 px-0 mx-auto text-center">
          <h2 className="display-6 italic fw-light">"Our mission is to empower developers through clean code and intuitive design."</h2>
          <p className="lead my-3 text-secondary">- Founded in 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Us;