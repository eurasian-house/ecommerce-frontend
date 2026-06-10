import React from 'react';

const Dashboard = () => {
  // Sample Data for the Dashboard
  const stats = [
    { title: 'Total Sales', value: '$12,840', icon: '💰', color: 'text-primary', bg: 'bg-primary' },
    { title: 'Active Orders', value: '43', icon: '📦', color: 'text-success', bg: 'bg-success' },
    { title: 'New Customers', value: '125', icon: '👥', color: 'text-info', bg: 'bg-info' },
    { title: 'Pending Reviews', value: '12', icon: '⭐', color: 'text-warning', bg: 'bg-warning' },
  ];

  const recentOrders = [
    { id: '#1024', customer: 'Rahul Sharma', product: 'Handtufted Rug', status: 'Delivered', amount: '$240' },
    { id: '#1025', customer: 'Anjali Singh', product: 'Woolen Carpet', status: 'Processing', amount: '$180' },
    { id: '#1026', customer: 'James Bond', product: 'Silk Runner', status: 'Shipped', amount: '$540' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Main Content */}
        <main className="px-md-4 py-5  bg-light">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-4 border-bottom">
            <h1 className="h2 fw-bold">E-commerce Overview</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button type="button" className="btn btn-sm btn-outline-secondary me-2">Export CSV</button>
              <button type="button" className="btn btn-sm btn-primary">Add New Product</button>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="row g-4 mb-5">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3">
                <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
                  <div className="d-flex align-items-center">
                    <div className={`${stat.bg} bg-opacity-10 p-3 rounded-3 me-3 fs-3`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-muted mb-0 small">{stat.title}</p>
                      <h4 className={`fw-bold mb-0 ${stat.color}`}>{stat.value}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="row g-4">
            {/* Sales Chart Placeholder */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4">Revenue Growth</h5>
                <div className="bg-light rounded-3 d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                   <p className="text-muted italic">[ Chart Visualization Placeholder ]</p>
                </div>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4">Stock Alerts</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                    <span>Small Tufted Rug</span>
                    <span className="badge bg-danger rounded-pill">Low Stock</span>
                  </li>
                  <li className="list-group-item px-0 border-0 d-flex justify-content-between align-items-center">
                    <span>Premium Wool</span>
                    <span className="badge bg-warning text-dark rounded-pill">Reorder Soon</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="col-12 mt-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">Recent Transactions</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, i) => (
                        <tr key={i}>
                          <td className="fw-bold">{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td>{order.amount}</td>
                          <td>
                            <span className={`badge rounded-pill ${
                              order.status === 'Delivered' ? 'bg-success' : 
                              order.status === 'Shipped' ? 'bg-primary' : 'bg-info'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td><button className="btn btn-sm btn-light border">Details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;