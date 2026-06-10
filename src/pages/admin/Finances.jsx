import React, { useState } from 'react';

const Finances = () => {
  // Financial Overview State
  const [financeSummary] = useState({
    totalSales: 45200.50,
    etsyFees: 3164.00,
    marketingSpend: 1250.00, // Cost of those 5% and Referral discounts
    netProfit: 40786.50,
    nextPayout: 5240.25
  });

  const recentTransactions = [
    { id: 'TXN-9921', date: 'Mar 30, 2026', type: 'Sale', amount: '+ $240.00', fee: '- $15.60', status: 'Available' },
    { id: 'TXN-9920', date: 'Mar 29, 2026', type: 'Refund', amount: '- $85.00', fee: '+ $5.50', status: 'Completed' },
    { id: 'TXN-9919', date: 'Mar 28, 2026', type: 'Listing Fee', amount: '- $0.20', fee: '$0.00', status: 'Completed' },
  ];

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-8">
            <h2 className="fw-bold text-dark">Financial Overview</h2>
            <p className="text-muted">Track your earnings, Etsy-style fees, and payout schedules.</p>
          </div>
          <div className="col-md-4 text-md-end">
            <button className="btn btn-dark rounded-pill px-4 shadow-sm">Download Statement</button>
          </div>
        </div>

        {/* Payout Hero Card */}
        <div className="card border-0 shadow-lg rounded-4 bg-primary text-white p-4 mb-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <span className="text-white-50 small text-uppercase fw-bold">Available for Payout</span>
              <h1 className="display-4 fw-bold mt-1">${financeSummary.nextPayout}</h1>
              <p className="mb-0 mt-2 opacity-75">Scheduled for deposit on Monday, April 6.</p>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <button className="btn btn-light btn-lg rounded-pill px-5 fw-bold text-primary shadow">Request Payout Now</button>
            </div>
          </div>
        </div>

        {/* Detailed Stats Row */}
        <div className="row g-4 mb-5">
          {[
            { label: 'Gross Sales', val: financeSummary.totalSales, color: 'text-dark' },
            { label: 'Etsy Fees (6.5%)', val: financeSummary.etsyFees, color: 'text-danger' },
            { label: 'Discount Costs', val: financeSummary.marketingSpend, color: 'text-warning' },
            { label: 'Total Net Profit', val: financeSummary.netProfit, color: 'text-success' }
          ].map((item, i) => (
            <div key={i} className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <h6 className="text-muted small fw-bold text-uppercase">{item.label}</h6>
                <h3 className={`fw-bold mb-0 ${item.color}`}>${item.val.toLocaleString()}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-header bg-white py-4 px-4 border-0 d-flex justify-content-between align-items-center">
            <h5 className="fw-bold mb-0">Recent Activity</h5>
            <div className="dropdown">
              <button className="btn btn-sm btn-outline-secondary rounded-pill dropdown-toggle" type="button">All Types</button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr className="small text-uppercase text-muted">
                  <th className="ps-4">Transaction ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Fees</th>
                  <th className="text-end pe-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn, idx) => (
                  <tr key={idx}>
                    <td className="ps-4 fw-mono small">{txn.id}</td>
                    <td className="text-secondary">{txn.date}</td>
                    <td><span className="badge bg-light text-dark border">{txn.type}</span></td>
                    <td className={`fw-bold ${txn.amount.includes('+') ? 'text-success' : 'text-dark'}`}>{txn.amount}</td>
                    <td className="text-danger small">{txn.fee}</td>
                    <td className="text-end pe-4">
                      <span className={`badge rounded-pill ${txn.status === 'Available' ? 'bg-info' : 'bg-success'}`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Education Section (Etsy Inspiration) */}
        <div className="mt-5 p-4 bg-secondary bg-opacity-10 rounded-4">
          <h6 className="fw-bold mb-3">Understanding your fees</h6>
          <div className="row g-3">
            <div className="col-md-4">
              <p className="small text-muted mb-0"><strong>Listing Fee:</strong> $0.20 per item listed for 4 months.</p>
            </div>
            <div className="col-md-4">
              <p className="small text-muted mb-0"><strong>Transaction Fee:</strong> 6.5% of total order price (including shipping).</p>
            </div>
            <div className="col-md-4">
              <p className="small text-muted mb-0"><strong>Payment Processing:</strong> 3% + $0.25 (varies by country).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;