import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {

  const navItems = [
    { to: "/admin/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
    { to: "/admin/add-product", icon: "bi-plus-circle-dotted", label: "Add Product" },
    { to: "/admin/products", icon: "bi-tags", label: "Products" },
    { to: "/admin/orders", icon: "bi-cart-check", label: "Orders" },
    { to: "/admin/messages", icon: "bi-chat-left-dots", label: "Messages" },
    { to: "/admin/marketing", icon: "bi-megaphone", label: "Marketing" },
    { to: "/admin/finances", icon: "bi-wallet2", label: "Finances" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAF8F5" }}>

      {/* Sidebar */}
      <div
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

      {/* Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </div>

    </div>
  );
}