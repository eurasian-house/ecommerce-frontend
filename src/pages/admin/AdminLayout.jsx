import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {

  const [showMenu, setShowMenu] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
    { to: "/admin/add-product", icon: "bi-plus-circle-dotted", label: "Add Product" },
    { to: "/admin/products", icon: "bi-tags", label: "Products" },
    { to: "/admin/orders", icon: "bi-cart-check", label: "Orders" },
    { to: "/admin/messages", icon: "bi-chat-left-dots", label: "Messages" },
    { to: "/admin/marketing", icon: "bi-megaphone", label: "Marketing" },
    { to: "/admin/finances", icon: "bi-wallet2", label: "Finances" },
    { to: "/admin/questions", icon: "bi-chat-left-text", label: "QnA" },
    { to: "/admin/reviews", icon: "bi bi-star-fill", label: "Reviews" },
    { to: "/admin/wholesale-leads", icon: "bi bi-building me-2", label: "Wholesale Leads" }

  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#FAF8F5",
      }}
    >
      <div style={{ display: "flex", minHeight: "100vh", background: "#FAF8F5" }}>

        {/* Sidebar */}
        <div
          className="d-none d-lg-block"
          style={{
            width: "240px",
            background: "#FAF8F5",
            borderRight: "1px solid #e5e5e5",
            padding: "20px 16px"
          }}
        >
          <h3 style={{ fontWeight: 600, marginBottom: '20px', color: '#E60023' }}>Admin</h3>

          <nav className="d-flex flex-column gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center px-3 py-2 mb-1 rounded-4 ${isActive
                    ? "bg-white fw-bold text-dark shadow-sm border"
                    : "text-secondary fw-medium"
                  }`
                }
                style={({ isActive }) => ({
                  transition: "0.2s",
                  background: isActive ? "#fff" : undefined
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains("bg-white")) {
                    e.currentTarget.style.background = "#f3f3f3";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains("bg-white")) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <i className={`bi ${item.icon} me-3 fs-5`}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>


        <button
          className="btn btn-light d-lg-none position-fixed"
          style={{
            top: 15,
            left: 15,
            zIndex: 1050,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          }}
          onClick={() => setShowMenu(true)}
        >
          <i className="bi bi-list fs-3"></i>
        </button>

        {showMenu && (
          <>
            <div
              onClick={() => setShowMenu(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.35)",
                zIndex: 1040,
              }}
            />

            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: 260,
                height: "100%",
                background: "#FAF8F5",
                padding: "20px 16px",
                zIndex: 1050,
                overflowY: "auto",
                boxShadow: "4px 0 20px rgba(0,0,0,.15)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3
                  style={{
                    color: "#E60023",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Admin
                </h3>

                <button
                  className="btn btn-sm"
                  onClick={() => setShowMenu(false)}
                >
                  <i className="bi bi-x-lg fs-4"></i>
                </button>
              </div>

              <nav className="d-flex flex-column gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center px-3 py-2 mb-1 rounded-4 ${isActive
                        ? "bg-white fw-bold text-dark shadow-sm border"
                        : "text-secondary fw-medium"
                      }`
                    }
                  >
                    <i className={`bi ${item.icon} me-3 fs-5`}></i>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </>
        )}



        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: window.innerWidth < 992 ? "70px 15px 20px" : "30px",
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}