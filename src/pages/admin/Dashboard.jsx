import React from "react";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiEye,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiDownload,
  FiPlus,
  FiActivity,
  FiPackage,
  FiClock,
  FiMessageCircle,
  FiMousePointer,
  FiGlobe,
  FiMonitor,
  FiArrowRight,
  FiRefreshCw,
} from "react-icons/fi";
import "../../styles/pages/admin/Dashboard.css";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,840",
    change: "+12.8%",
    positive: true,
    icon: FiTrendingUp,
    note: "vs. previous period",
  },
  {
    title: "Total Orders",
    value: "248",
    change: "+8.2%",
    positive: true,
    icon: FiShoppingBag,
    note: "vs. previous period",
  },
  {
    title: "New Customers",
    value: "126",
    change: "+14.5%",
    positive: true,
    icon: FiUsers,
    note: "vs. previous period",
  },
  {
    title: "Live Visitors",
    value: "—",
    change: null,
    positive: true,
    icon: FiEye,
    note: "Live tracking not connected",
  },
];

const activities = [
  {
    icon: FiShoppingBag,
    title: "Order received",
    detail: "Order activity will appear here",
    time: "Awaiting live data",
    type: "order",
  },
  {
    icon: FiUsers,
    title: "New visitor",
    detail: "Visitor activity will appear here",
    time: "Awaiting live data",
    type: "visitor",
  },
  {
    icon: FiMessageCircle,
    title: "Customer inquiry",
    detail: "Chat activity will appear here",
    time: "Awaiting live data",
    type: "message",
  },
];

const trafficSources = [
  { label: "Organic Search", value: 0, color: "organic" },
  { label: "Google Ads", value: 0, color: "ads" },
  { label: "Direct", value: 0, color: "direct" },
  { label: "Social", value: 0, color: "social" },
];

const visitorPages = [
  { page: "/", label: "Homepage", visitors: "—" },
  { page: "/products", label: "All Products", visitors: "—" },
  { page: "/custom-rugs", label: "Custom Rugs", visitors: "—" },
  { page: "/wholesale", label: "Wholesale", visitors: "—" },
];

const Dashboard = () => {
  return (
    <div className="eh-dashboard">
      <header className="eh-dashboard-header">
        <div className="eh-dashboard-heading">
          <span className="eh-eyebrow">
            <span className="eh-eyebrow-dot" />
            EURASIAN HOUSE / ADMIN
          </span>

          <h1>Dashboard</h1>
          <p>Your store performance, customer activity, and business insights.</p>
        </div>

        <div className="eh-dashboard-actions">
          <button
            type="button"
            className="eh-dashboard-btn eh-dashboard-btn-secondary"
            onClick={() => window.location.reload()}
            aria-label="Refresh dashboard"
          >
            <FiRefreshCw />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            className="eh-dashboard-btn eh-dashboard-btn-primary"
            onClick={() => {
              window.location.href = "/admin/add-product";
            }}
          >
            <FiPlus />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      <section className="eh-dashboard-toolbar">
        <div className="eh-dashboard-period">
          <span className="eh-toolbar-label">OVERVIEW</span>
          <span className="eh-toolbar-divider" />
          <span>Store performance</span>
        </div>

        <span className="eh-dashboard-date">
          <FiActivity />
          Analytics integration pending
        </span>
      </section>

      <section className="eh-dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="eh-stat-card" key={stat.title}>
              <div className="eh-stat-top">
                <span className="eh-stat-label">{stat.title}</span>
                <span className="eh-stat-icon">
                  <Icon />
                </span>
              </div>

              <div className="eh-stat-value">{stat.value}</div>

              <div className="eh-stat-footer">
                {stat.change ? (
                  <span
                    className={`eh-stat-change ${stat.positive ? "is-positive" : "is-negative"
                      }`}
                  >
                    {stat.positive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    {stat.change}
                  </span>
                ) : (
                  <span className="eh-stat-pending">Not connected</span>
                )}

                <span className="eh-stat-note">{stat.note}</span>
              </div>
            </article>
          );
        })}
      </section>

      <section className="eh-dashboard-main-grid">
        <article className="eh-panel eh-revenue-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">FINANCIAL OVERVIEW</span>
              <h2>Revenue performance</h2>
              <p>Track your store's sales over time.</p>
            </div>

            <button
              type="button"
              className="eh-icon-btn"
              aria-label="Revenue panel options"
            >
              <FiMoreHorizontal />
            </button>
          </div>

          <div className="eh-chart-summary">
            <div>
              <span className="eh-chart-label">Selected period revenue</span>
              <strong>—</strong>
            </div>
            <span className="eh-chart-pending">Awaiting database data</span>
          </div>

          <div className="eh-chart-placeholder">
            <div className="eh-chart-grid-lines">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="eh-chart-empty">
              <span className="eh-chart-empty-icon">
                <FiTrendingUp />
              </span>
              <strong>Revenue insights will appear here</strong>
              <p>
                Connect your orders and payment records to display accurate
                revenue trends.
              </p>
            </div>
          </div>

          <div className="eh-chart-legend">
            <span>
              <i className="eh-legend-dot eh-legend-revenue" />
              Revenue
            </span>
            <span className="eh-chart-footnote">
              Live financial data not connected
            </span>
          </div>
        </article>

        <article className="eh-panel eh-visitors-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">REAL-TIME ANALYTICS</span>
              <h2>Live visitors</h2>
              <p>Understand who is browsing your store.</p>
            </div>

            <span className="eh-live-indicator">
              <i />
              Not connected
            </span>
          </div>

          <div className="eh-live-count">
            <strong>—</strong>
            <span>active visitors</span>
          </div>

          <div className="eh-live-divider" />

          <div className="eh-live-metric">
            <span>
              <FiGlobe />
              Countries & cities
            </span>
            <strong>—</strong>
          </div>

          <div className="eh-live-metric">
            <span>
              <FiMonitor />
              Device breakdown
            </span>
            <strong>—</strong>
          </div>

          <div className="eh-live-metric">
            <span>
              <FiMousePointer />
              Page views
            </span>
            <strong>—</strong>
          </div>

          <div className="eh-visitors-note">
            <FiActivity />
            <span>
              Visitor tracking will be enabled after the analytics backend is
              connected.
            </span>
          </div>
        </article>
      </section>

      <section className="eh-dashboard-secondary-grid">
        <article className="eh-panel eh-pages-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">CUSTOMER JOURNEY</span>
              <h2>Most visited pages</h2>
              <p>Discover which pages attract customer attention.</p>
            </div>

            <button
              type="button"
              className="eh-text-action"
              onClick={() => {
                window.location.href = "/admin/marketing";
              }}
            >
              View insights <FiArrowRight />
            </button>
          </div>

          <div className="eh-page-list">
            {visitorPages.map((item, index) => (
              <div className="eh-page-row" key={item.page}>
                <span className="eh-page-rank">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="eh-page-info">
                  <strong>{item.label}</strong>
                  <span>{item.page}</span>
                </div>

                <div className="eh-page-visitors">
                  <strong>{item.visitors}</strong>
                  <span>visitors</span>
                </div>
              </div>
            ))}
          </div>

          <div className="eh-panel-bottom-note">
            Page views and time spent require tracking integration.
          </div>
        </article>

        <article className="eh-panel eh-traffic-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">ACQUISITION</span>
              <h2>Traffic sources</h2>
              <p>Where your visitors come from.</p>
            </div>
          </div>

          <div className="eh-traffic-total">
            <strong>—</strong>
            <span>Total tracked sessions</span>
          </div>

          <div className="eh-traffic-list">
            {trafficSources.map((source) => (
              <div className="eh-traffic-item" key={source.label}>
                <div className="eh-traffic-item-header">
                  <span>
                    <i className={`eh-traffic-dot ${source.color}`} />
                    {source.label}
                  </span>
                  <strong>—</strong>
                </div>

                <div className="eh-traffic-track">
                  <span style={{ width: `${source.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="eh-panel-bottom-note">
            Google Analytics integration pending.
          </div>
        </article>
      </section>

      <section className="eh-dashboard-bottom-grid">
        <article className="eh-panel eh-activity-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">STORE TIMELINE</span>
              <h2>Recent activity</h2>
              <p>Important events from your store.</p>
            </div>

            <button
              type="button"
              className="eh-icon-btn"
              aria-label="Recent activity options"
            >
              <FiMoreHorizontal />
            </button>
          </div>

          <div className="eh-activity-list">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div className="eh-activity-item" key={activity.title}>
                  <span className={`eh-activity-icon ${activity.type}`}>
                    <Icon />
                  </span>

                  <div className="eh-activity-content">
                    <strong>{activity.title}</strong>
                    <p>{activity.detail}</p>
                  </div>

                  <span className="eh-activity-time">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="eh-panel eh-conversion-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">SHOPPING BEHAVIOUR</span>
              <h2>Customer conversions</h2>
              <p>Follow the journey from browsing to purchase.</p>
            </div>
          </div>

          <div className="eh-conversion-list">
            <div className="eh-conversion-row">
              <span className="eh-conversion-icon">
                <FiEye />
              </span>
              <div>
                <strong>Product views</strong>
                <span>Products explored</span>
              </div>
              <b>—</b>
            </div>

            <div className="eh-conversion-row">
              <span className="eh-conversion-icon">
                <FiShoppingBag />
              </span>
              <div>
                <strong>Add to cart</strong>
                <span>Shopping intent</span>
              </div>
              <b>—</b>
            </div>

            <div className="eh-conversion-row">
              <span className="eh-conversion-icon">
                <FiClock />
              </span>
              <div>
                <strong>Checkout started</strong>
                <span>Purchase consideration</span>
              </div>
              <b>—</b>
            </div>

            <div className="eh-conversion-row">
              <span className="eh-conversion-icon">
                <FiMessageCircle />
              </span>
              <div>
                <strong>Customer messages</strong>
                <span>Chat and inquiry activity</span>
              </div>
              <b>—</b>
            </div>
          </div>

          <div className="eh-conversion-footer">
            <FiPackage />
            <span>Conversion tracking is not connected yet.</span>
          </div>
        </article>
      </section>

      <footer className="eh-dashboard-footer">
        <span>Eurasian House · Admin Analytics</span>
        <span>
          <FiActivity />
          Dashboard UI preview
        </span>
      </footer>
    </div>

  );
};

export default Dashboard;