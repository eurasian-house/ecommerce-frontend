import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/pages/admin/AdminLayout.css";

const navGroups = [
  {
    title: "OVERVIEW",
    items: [
      {
        to: "/admin/dashboard",
        icon: "bi-grid-1x2",
        label: "Dashboard",
      },
    ],
  },
  {
    title: "STORE MANAGEMENT",
    items: [
      {
        to: "/admin/add-product",
        icon: "bi-plus-circle",
        label: "Add Product",
      },
      {
        to: "/admin/products",
        icon: "bi-tags",
        label: "Products",
      },
      {
        to: "/admin/orders",
        icon: "bi-bag-check",
        label: "Orders",
      },
      {
        to: "/admin/wholesale-leads",
        icon: "bi-building",
        label: "Wholesale Leads",
      },
    ],
  },
  {
    title: "CUSTOMER ENGAGEMENT",
    items: [
      {
        to: "/admin/messages",
        icon: "bi-chat-left-text",
        label: "Messages",
      },
      {
        to: "/admin/questions",
        icon: "bi-chat-square-quote",
        label: "QnA",
      },
      {
        to: "/admin/reviews",
        icon: "bi-star",
        label: "Reviews",
      },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      {
        to: "/admin/marketing",
        icon: "bi-megaphone",
        label: "Marketing",
      },
      {
        to: "/admin/finances",
        icon: "bi-wallet2",
        label: "Finances",
      },
    ],
  },
];

export default function AdminLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!showMenu) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };

  }, [showMenu]);

  const renderNavigation = (mobile = false) => (
    <nav className="eh-admin-nav" aria-label="Admin navigation">
      {navGroups.map((group) => (
        <div className="eh-admin-nav-group" key={group.title}>
          <div className="eh-admin-nav-heading">{group.title}</div>

          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin/dashboard"}
              onClick={() => {
                if (mobile) setShowMenu(false);
              }}
              className={({ isActive }) =>
                `eh-admin-nav-link${isActive ? " is-active" : ""}`
              }
            >
              <i
                className={`bi ${item.icon} eh-admin-nav-icon`}
                aria-hidden="true"
              />

              <span>{item.label}</span>

              {item.to === "/admin/dashboard" && (
                <span className="eh-admin-nav-indicator" />
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>

  );

  return (
    <div className="eh-admin-layout">
      <aside className="eh-admin-sidebar">
        <NavLink
          to="/admin/dashboard"
          className="eh-admin-brand"
          aria-label="Eurasian House Admin Dashboard"
        >
          <span className="eh-admin-brand-mark">E</span>

          <span className="eh-admin-brand-copy">
            <strong>Eurasian House</strong>
            <small>ADMINISTRATION</small>
          </span>
        </NavLink>

        <div className="eh-admin-sidebar-divider" />

        {renderNavigation()}

        <div className="eh-admin-sidebar-bottom">
          <div className="eh-admin-brand-note">
            <span className="eh-admin-brand-note-icon">
              <i className="bi bi-stars" aria-hidden="true" />
            </span>

            <div>
              <strong>Made with care</strong>
              <span>Manage your store in one place.</span>
            </div>
          </div>

          <div className="eh-admin-sidebar-version">
            EURASIAN HOUSE <span>•</span> ADMIN
          </div>
        </div>
      </aside>

      <div className="eh-admin-workspace">
        <header className="eh-admin-mobile-header">
          <button
            type="button"
            className="eh-admin-menu-toggle"
            onClick={() => setShowMenu(true)}
            aria-label="Open admin navigation"
            aria-expanded={showMenu}
          >
            <i className="bi bi-list" aria-hidden="true" />
          </button>

          <NavLink to="/admin/dashboard" className="eh-admin-mobile-brand">
            <span className="eh-admin-brand-mark">E</span>
            <span>Eurasian House</span>
          </NavLink>

          <span className="eh-admin-mobile-label">ADMIN</span>
        </header>

        <main className="eh-admin-content" id="admin-main-content">
          <Outlet />
        </main>
      </div>

      {showMenu && (
        <div
          className="eh-admin-mobile-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowMenu(false);
            }
          }}
        >
          <aside
            className="eh-admin-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation menu"
          >
            <div className="eh-admin-drawer-header">
              <NavLink
                to="/admin/dashboard"
                className="eh-admin-brand"
                onClick={() => setShowMenu(false)}
              >
                <span className="eh-admin-brand-mark">E</span>

                <span className="eh-admin-brand-copy">
                  <strong>Eurasian House</strong>
                  <small>ADMINISTRATION</small>
                </span>
              </NavLink>

              <button
                type="button"
                className="eh-admin-menu-toggle eh-admin-close"
                onClick={() => setShowMenu(false)}
                aria-label="Close admin navigation"
                autoFocus
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="eh-admin-sidebar-divider" />

            {renderNavigation(true)}

            <div className="eh-admin-drawer-footer">
              <i className="bi bi-shield-check" aria-hidden="true" />
              Secure admin workspace
            </div>
          </aside>
        </div>
      )}
    </div>

  );
}