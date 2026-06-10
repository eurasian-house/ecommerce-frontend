import React, { useState } from 'react';

const Marketing = () => {
  // State for managing coupons
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME5', type: 'Cart-Add', value: 5, target: 'Selling Price', status: 'Active' },
    { id: 2, code: 'REFERRAL10', type: 'Referral', value: 10, target: 'Selling Price', status: 'Active' },
    { id: 3, code: 'FESTIVE20', type: 'Seasonal', value: 20, target: 'Selling Price', status: 'Inactive' }
  ]);

  const [showModal, setShowModal] = useState(false);

  // Logic: Discount applied ONLY to Selling Price
  const calculateDiscount = (sellingPrice, discountPercent) => {
    const discountAmount = (sellingPrice * discountPercent) / 100;
    return sellingPrice - discountAmount;
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold text-dark">Marketing & Promotions</h2>
            <p className="text-muted">Manage coupons, referrals, and automated cart discounts.</p>
          </div>
          <button className="btn btn-primary rounded-pill px-4 shadow-sm" onClick={() => setShowModal(true)}>
            + Create New Coupon
          </button>
        </div>

        {/* Automated Rules Section */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">🛒</div>
                <h5 className="fw-bold m-0">Cart-Add Automation</h5>
              </div>
              <p className="small text-muted">Automatically offer a 5% discount on the <strong>selling price</strong> when a user adds their first item to the cart.</p>
              <div className="form-check form-switch mt-auto">
                <input className="form-check-input" type="checkbox" checked readOnly />
                <label className="form-check-label fw-bold">Active</label>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">🔗</div>
                <h5 className="fw-bold m-0">Referral Program</h5>
              </div>
              <p className="small text-muted">Give 10% commission/discount to referrers. Discount is calculated based on the product's <strong>selling price</strong>, not MRP.</p>
              <div className="form-check form-switch mt-auto">
                <input className="form-check-input" type="checkbox" checked readOnly />
                <label className="form-check-label fw-bold">Active</label>
              </div>
            </div>
          </div>
        </div>

        {/* Coupons Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white py-3 border-0">
            <h5 className="fw-bold mb-0">Active Coupons</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Code</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td className="ps-4 fw-bold text-primary">{coupon.code}</td>
                    <td><span className="badge bg-light text-dark border">{coupon.type}</span></td>
                    <td>{coupon.value}% OFF</td>
                    <td><small className="text-uppercase fw-bold text-secondary">{coupon.target}</small></td>
                    <td>
                      <span className={`badge rounded-pill ${coupon.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-dark me-2 rounded-pill">Edit</button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => deleteCoupon(coupon.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation Logic Info - Important for Transparency */}
        <div className="mt-4 p-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-3">
          <p className="mb-0 small text-dark italic">
            <strong>Note:</strong> All system-wide discounts are programmed to bypass <code>mrp</code> and apply strictly to <code>selling_price</code> to protect profit margins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Marketing;