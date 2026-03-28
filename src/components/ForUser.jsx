import React from 'react';

const ForUser = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light border-top border-bottom">
      <div className="container py-5">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            
            {/* Minimalist Icon/Badge */}
            <div className="mb-4">
              <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-2 fw-bold text-uppercase tracking-wider">
                Our Commitment
              </span>
            </div>

            {/* Main Heading - The "Bigger" Statement */}
            <h1 className="display-1 fw-bolder text-dark mb-4 tracking-tight">
              We really <span className="text-primary italic">care</span> for our customer.
            </h1>

            {/* Supporting Text */}
            <p className="lead fs-3 text-secondary mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              From the initial spark of an idea to the final delivery, 
              your satisfaction is the heartbeat of our process. 
              We don't just build products; we build relationships.
            </p>

            {/* Minimalist Feature Grid */}
            <div className="row g-4 mt-5 pt-5 border-top border-light">
              <div className="col-md-4">
                <h4 className="fw-bold">24/7 Support</h4>
                <p className="text-muted small">Always here when you need us most.</p>
              </div>
              <div className="col-md-4">
                <h4 className="fw-bold">Global Quality</h4>
                <p className="text-muted small">Crafted to meet international standards.</p>
              </div>
              <div className="col-md-4">
                <h4 className="fw-bold">Human First</h4>
                <p className="text-muted small">Real people, real conversations.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-5 pt-4">
              <button className="btn btn-dark btn-lg px-5 py-3 rounded-pill shadow-lg hover-lift">
                Experience the Difference
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForUser;