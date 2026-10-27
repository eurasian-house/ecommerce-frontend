import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiEye,
  FiPlus,
  FiActivity,
  FiClock,
  FiMessageCircle,
  FiMousePointer,
  FiGlobe,
  FiMonitor,
  FiArrowRight,
  FiRefreshCw,
  FiPackage,
} from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import "../../styles/pages/admin/Dashboard.css";

const API_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  "https://ecommerce-backend-bkm1.onrender.com"
).replace(/\/$/, "");

const REFRESH_INTERVAL = 30000;

const formatTime = (date) => {
  if (!date) return "Unknown time";

  const timestamp = new Date(date).getTime();
  if (!Number.isFinite(timestamp)) return "Unknown time";

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

  return new Date(date).toLocaleDateString();
};

const formatDuration = (seconds) => {
  if (seconds == null) return "—";
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return remainingSeconds
    ? `${minutes}m ${remainingSeconds}s`
    : `${minutes}m`;
};

const pageLabel = (path = "/") => {
  if (path === "/") return "Homepage";

  const labels = {
    "/products": "All Products",
    "/custom-rugs": "Custom Rugs",
    "/wholesale": "Wholesale",
    "/cart": "Shopping Cart",
    "/checkout": "Checkout",
  };

  if (labels[path]) return labels[path];

  return path
    .split("?")[0]
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Homepage";
};

const getTrafficSource = (referrer) => {
  if (!referrer) return "Direct";

  try {
    const host = new URL(referrer).hostname.toLowerCase();

    if (host.includes("google.") || host.includes("bing.") ||
      host.includes("yahoo.") || host.includes("duckduckgo.")) {
      return "Organic Search";
    }

    if (
      host.includes("facebook.") ||
      host.includes("instagram.") ||
      host.includes("pinterest.") ||
      host.includes("t.co") ||
      host.includes("threads.")
    ) {
      return "Social";
    }

    if (
      host.includes("googleadservices.") ||
      host.includes("doubleclick.")
    ) {
      return "Google Ads";
    }

    return "Referral";
  } catch {
    return "Direct";
  }
};

const eventTitle = (event) => {
  const titles = {
    page_view: "Page viewed",
    page_exit: "Visitor left page",
    product_view: "Product viewed",
    add_to_cart: "Added to cart",
    remove_from_cart: "Removed from cart",
    begin_checkout: "Checkout started",
    purchase: "Purchase completed",
    search: "Store search",
    category_view: "Category viewed",
    chat_open: "Chat opened",
    chat_message: "Customer message",
    contact: "Contact interaction",
  };

  return titles[event] || event.replace(/_/g, " ");
};

const eventIcon = (event) => {
  if (event === "purchase" || event.includes("cart")) return FiShoppingBag;
  if (event.includes("chat") || event === "contact") return FiMessageCircle;
  if (event === "product_view") return FiEye;
  return FiActivity;
};

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [visitorAnalytics, setVisitorAnalytics] = useState(null);

  const loadAnalytics = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);

    try {
      setError("");

      const { data, error: authError } = await supabase.auth.getSession();

      if (authError) throw authError;

      const token = data?.session?.access_token;

      if (!token) {
        throw new Error("Your admin session has expired. Please sign in again.");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const [sessionsResponse, eventsResponse, analyticsResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/visitor-tracking/admin/sessions`, { headers }),
          fetch(`${API_URL}/api/visitor-tracking/admin/events`, { headers }),
          fetch(`${API_URL}/api/visitor-tracking/admin/analytics`, { headers }),
        ]);

      const [sessionsData, eventsData, analyticsData] = await Promise.all([
        sessionsResponse.json(),
        eventsResponse.json(),
        analyticsResponse.json(),
      ]);

      if (!sessionsResponse.ok) {
        throw new Error(
          sessionsData.error || "Unable to load visitor sessions."
        );
      }

      if (!eventsResponse.ok) {
        throw new Error(
          eventsData.error || "Unable to load visitor events."
        );
      }

      if (!analyticsResponse.ok) {
        throw new Error(
          analyticsData.error || "Unable to load visitor analytics."
        );
      }

      setVisitorAnalytics(analyticsData);

      if (!sessionsResponse.ok) {
        throw new Error(
          sessionsData.error || "Unable to load visitor sessions."
        );
      }

      if (!eventsResponse.ok) {
        throw new Error(
          eventsData.error || "Unable to load visitor events."
        );
      }

      setSessions(Array.isArray(sessionsData.sessions) ? sessionsData.sessions : []);
      setEvents(Array.isArray(eventsData.events) ? eventsData.events : []);
    } catch (err) {
      console.error("Dashboard analytics error:", err);
      setError(err.message || "Unable to load analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();

    const interval = window.setInterval(() => {
      loadAnalytics();
    }, REFRESH_INTERVAL);

    return () => window.clearInterval(interval);
  }, [loadAnalytics]);

  const analytics = useMemo(() => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;

    const activeSessions = sessions.filter((session) => {
      if (session.ended_at || !session.last_seen_at) return false;

      const lastSeen = new Date(session.last_seen_at).getTime();
      return Number.isFinite(lastSeen) && now - lastSeen <= 5 * 60 * 1000;
    });

    const last24HourEvents = events.filter((event) => {
      const timestamp = new Date(event.created_at).getTime();
      return Number.isFinite(timestamp) && timestamp >= dayAgo;
    });

    const pageViews = last24HourEvents.filter(
      (event) => event.event_name === "page_view"
    );

    const pageExitEvents = last24HourEvents.filter(
      (event) =>
        event.event_name === "page_exit" &&
        Number.isFinite(Number(event.event_data?.timeSpentSeconds)) &&
        Number(event.event_data.timeSpentSeconds) >= 0
    );

    const totalTimeSpent = pageExitEvents.reduce(
      (sum, event) =>
        sum + Number(event.event_data.timeSpentSeconds),
      0
    );

    const averageTimeOnPage = pageExitEvents.length
      ? Math.round(totalTimeSpent / pageExitEvents.length)
      : null;

    const pageCounts = {};

    pageViews.forEach((event) => {
      const path = event.page_path || "/";
      pageCounts[path] = (pageCounts[path] || 0) + 1;
    });

    const popularPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    const deviceCounts = activeSessions.reduce((counts, session) => {
      const device = session.device_type || "Unknown";
      counts[device] = (counts[device] || 0) + 1;
      return counts;
    }, {});

    const locations = new Set(
      activeSessions
        .map((session) =>
          [session.city, session.country].filter(Boolean).join(", ")
        )
        .filter(Boolean)
    );

    const trafficCounts = {
      "Organic Search": 0,
      "Google Ads": 0,
      Direct: 0,
      Social: 0,
      Referral: 0,
    };

    sessions.forEach((session) => {
      const source = getTrafficSource(session.referrer);
      trafficCounts[source] = (trafficCounts[source] || 0) + 1;
    });

    const totalTraffic = Object.values(trafficCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    const conversionCounts = {
      product_view: 0,
      add_to_cart: 0,
      begin_checkout: 0,
      purchase: 0,
      chat_message: 0,
      chat_open: 0,
      contact: 0,
    };

    last24HourEvents.forEach((event) => {
      if (event.event_name in conversionCounts) {
        conversionCounts[event.event_name] += 1;
      }
    });

    return {
      activeSessions,
      last24HourEvents,
      pageViews,
      popularPages,
      deviceCounts,
      locations: [...locations],
      trafficCounts,
      totalTraffic,
      conversionCounts,
      averageTimeOnPage,
      pageExitEvents,
    };
  }, [sessions, events]);


  const journeyData = useMemo(() => {
    const sourceSessions = visitorAnalytics?.sessions || [];
    const sourceEvents = visitorAnalytics?.events || [];

    const recentEvents = sourceEvents.filter((event) => {
      const time = new Date(event.created_at).getTime();
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      return Number.isFinite(time) && time >= cutoff;
    });

    const eventsBySession = recentEvents.reduce((map, event) => {
      if (!event.session_id) return map;
      if (!map[event.session_id]) map[event.session_id] = [];
      map[event.session_id].push(event);
      return map;
    }, {});

    const journeys = sourceSessions
      .filter((session) => {
        const started = new Date(session.started_at).getTime();
        const lastSeen = new Date(session.last_seen_at).getTime();
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;

        return Number.isFinite(started) &&
          Number.isFinite(lastSeen) &&
          started <= Date.now() &&
          lastSeen >= cutoff;
      })
      .map((session) => {
        const sessionEvents = (eventsBySession[session.session_id] || [])
          .slice()
          .sort((a, b) =>
            new Date(a.created_at) - new Date(b.created_at)
          );

        const pageViews = sessionEvents.filter(
          (event) => event.event_name === "page_view"
        );

        const pageExits = sessionEvents.filter(
          (event) => event.event_name === "page_exit"
        );

        const pages = pageViews.map((event) => {
          const exit = pageExits.find(
            (item) =>
              item.page_path === event.page_path &&
              new Date(item.created_at) >= new Date(event.created_at)
          );

          return {
            path: event.page_path || "/",
            time: event.created_at,
            duration: exit?.event_data?.timeSpentSeconds,
          };
        });

        const cartEvents = sessionEvents.filter(
          (event) =>
            event.event_name === "add_to_cart" ||
            event.event_name === "remove_from_cart"
        );

        return {
          ...session,
          events: sessionEvents,
          pages,
          cartEvents,
          pageCount: pages.length,
          source: getTrafficSource(session.referrer),
        };
      })
      .sort(
        (a, b) =>
          new Date(b.last_seen_at) - new Date(a.last_seen_at)
      );

    const makeLocationRows = (field) => {
      const groups = {};

      journeys.forEach((session) => {
        const name = session[field]?.trim() || "Unknown";
        const visitorId = session.visitor_id || session.session_id;

        if (!groups[name]) groups[name] = {};

        // Keep only the latest session for each visitor in this location.
        const previous = groups[name][visitorId];

        if (
          !previous ||
          new Date(session.last_seen_at) > new Date(previous.last_seen_at)
        ) {
          groups[name][visitorId] = session;
        }
      });

      return Object.entries(groups)
        .map(([name, visitorMap]) => {
          const visitors = Object.values(visitorMap);

          return {
            name,
            visitors,
            count: visitors.length,
          };
        })
        .sort((a, b) => b.count - a.count);
    };
    const uniqueVisitorCount = new Set(
      journeys.map((session) => session.visitor_id || session.session_id)
    ).size;


    return {
      journeys,
      uniqueVisitorCount,
      cities: makeLocationRows("city"),
      countries: makeLocationRows("country"),
    };
  }, [visitorAnalytics]);

  const renderLocationChart = (title, subtitle, rows) => {
    const maxCount = Math.max(1, ...rows.map((row) => row.count));

    return (
      <article className="eh-panel eh-journey-location-panel">
        <div className="eh-panel-header">
          <div>
            <span className="eh-panel-kicker">LAST 24 HOURS</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>

        {rows.length ? (
          <div className="eh-location-chart">
            {rows.map((row) => (
              <details className="eh-location-row" key={row.name}>
                <summary>
                  <span className="eh-location-name" title={row.name}>
                    {row.name}
                  </span>
                  <span className="eh-location-track">
                    <span
                      style={{
                        width: `${(row.count / maxCount) * 100}%`,
                      }}
                    />
                  </span>
                  <strong>{row.count}</strong>
                </summary>

                <div className="eh-location-details">
                  {row.visitors.map((visitor) => (
                    <div
                      className="eh-location-visitor"
                      key={visitor.session_id}
                    >
                      <code className="eh-full-visitor-id">
                        {visitor.visitor_id || "Unknown"}
                      </code>
                      <span>
                        Visit: {visitor.started_at
                          ? new Date(visitor.started_at).toLocaleString()
                          : "Unknown"}
                      </span>
                      <span>
                        Last activity: {visitor.last_seen_at
                          ? new Date(visitor.last_seen_at).toLocaleString()
                          : "Unknown"}
                      </span>
                      <span>
                        City: {visitor.city || "Unknown"}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="eh-panel-bottom-note">
            {loading ? "Loading location data…" : "No sessions found in this period."}
          </p>
        )}

        <div className="eh-panel-bottom-note">
          Counts represent sessions, not unique people. Expand a row for details.
        </div>
      </article>
    );
  };


  const stats = [
    {
      title: "Total Revenue",
      value: "—",
      icon: FiTrendingUp,
      note: "Connect order data",
    },
    {
      title: "Total Orders",
      value: "—",
      icon: FiShoppingBag,
      note: "Connect order data",
    },
    {
      title: "New Customers",
      value: "—",
      icon: FiUsers,
      note: "Connect customer data",
    },
    {
      title: "Live Visitors",
      value: loading ? "…" : analytics.activeSessions.length,
      icon: FiEye,
      note: "Active in last 5 minutes",
    },
  ];

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
            onClick={() => loadAnalytics(true)}
            disabled={refreshing}
          >
            <FiRefreshCw className={refreshing ? "eh-dashboard-spin" : ""} />
            <span>{refreshing ? "Refreshing…" : "Refresh"}</span>
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
          <span>Live store analytics</span>
        </div>

        <span className="eh-dashboard-date">
          <FiActivity />
          {error ? "Connection issue" : loading ? "Connecting…" : "Visitor tracking connected"}
        </span>
      </section>

      {error && (
        <div className="eh-dashboard-error" role="alert">
          <FiActivity />
          <span>{error}</span>
          <button type="button" onClick={() => loadAnalytics(true)}>
            Retry
          </button>
        </div>
      )}

      <section className="eh-dashboard-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="eh-stat-card" key={stat.title}>
              <div className="eh-stat-top">
                <span className="eh-stat-label">{stat.title}</span>
                <span className="eh-stat-icon"><Icon /></span>
              </div>

              <div className="eh-stat-value">{stat.value}</div>

              <div className="eh-stat-footer">
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
              <p>Sales figures will appear when order data is connected.</p>
            </div>
          </div>

          <div className="eh-chart-summary">
            <div>
              <span className="eh-chart-label">Revenue</span>
              <strong>—</strong>
            </div>
            <span className="eh-chart-pending">Awaiting order data</span>
          </div>

          <div className="eh-chart-placeholder">
            <div className="eh-chart-grid-lines">
              <span /><span /><span /><span />
            </div>

            <div className="eh-chart-empty">
              <span className="eh-chart-empty-icon"><FiTrendingUp /></span>
              <strong>Revenue insights are not connected yet</strong>
              <p>Connect your order and payment records before displaying financial totals.</p>
            </div>
          </div>

          <div className="eh-chart-legend">
            <span><i className="eh-legend-dot eh-legend-revenue" />Revenue</span>
            <span className="eh-chart-footnote">No financial figures are being fabricated</span>
          </div>
        </article>

        <article className="eh-panel eh-visitors-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">REAL-TIME ANALYTICS</span>
              <h2>Live visitors</h2>
              <p>Visitors active within the last five minutes.</p>
            </div>

            <span className="eh-live-indicator">
              <i />
              {error ? "Connection issue" : loading ? "Loading" : "Live"}
            </span>
          </div>

          <div className="eh-live-count">
            <strong>{loading ? "…" : analytics.activeSessions.length}</strong>
            <span>active visitors</span>
          </div>
          <div className="eh-live-metric">
            <span>
              <FiClock />
              Average time on page (24h)
            </span>
            <strong>
              {formatDuration(analytics.averageTimeOnPage)}
            </strong>
          </div>

          <div className="eh-live-divider" />

          <div className="eh-live-metric">
            <span><FiGlobe /> Countries & cities</span>
            <strong>{analytics.locations.length}</strong>
          </div>

          <div className="eh-live-metric">
            <span><FiMonitor /> Devices</span>
            <strong>{Object.keys(analytics.deviceCounts).length}</strong>
          </div>

          <div className="eh-live-metric">
            <span><FiMousePointer /> Page views (24h)</span>
            <strong>{analytics.pageViews.length}</strong>
          </div>

          <div className="eh-visitors-note">
            <FiActivity />
            <span>
              Location information depends on whether city and country data are available.
            </span>
          </div>
          <div className="eh-active-visitors">
            <h3>Currently browsing</h3>

            {analytics.activeSessions.length === 0 ? (
              <p className="eh-panel-bottom-note">
                No active visitors at the moment.
              </p>
            ) : (
              analytics.activeSessions.slice(0, 8).map((visitor) => (
                <div
                  className="eh-active-visitor"
                  key={visitor.session_id}
                >
                  <span className="eh-active-visitor-dot" />

                  <div className="eh-active-visitor-info">
                    <strong>{pageLabel(visitor.current_page || "/")}</strong>
                    <span>{visitor.current_page || "/"}</span>
                    <small>
                      {[visitor.device_type, visitor.browser]
                        .filter(Boolean)
                        .join(" · ") || "Device unknown"}
                    </small>
                    {(visitor.city || visitor.country) && (
                      <small>
                        {[visitor.city, visitor.country]
                          .filter(Boolean)
                          .join(", ")}
                      </small>
                    )}
                  </div>

                  <span className="eh-active-visitor-time">
                    {formatTime(visitor.last_seen_at)}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="eh-dashboard-secondary-grid">
        <article className="eh-panel eh-pages-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">CUSTOMER JOURNEY</span>
              <h2>Most visited pages</h2>
              <p>Based on recorded page views over the last 24 hours.</p>
            </div>
          </div>

          <div className="eh-page-list">
            {analytics.popularPages.length ? (
              analytics.popularPages.map((item, index) => (
                <div className="eh-page-row" key={item.page}>
                  <span className="eh-page-rank">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="eh-page-info">
                    <strong>{pageLabel(item.page)}</strong>
                    <span>{item.page}</span>
                  </div>

                  <div className="eh-page-visitors">
                    <strong>{item.count}</strong>
                    <span>page views</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="eh-panel-bottom-note">
                {loading ? "Loading page views…" : "No page views recorded in the last 24 hours."}
              </p>
            )}
          </div>

          <div className="eh-panel-bottom-note">
            Counts are based on recorded page_view events, not unique visitors.
          </div>
        </article>

        <article className="eh-panel eh-traffic-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">ACQUISITION</span>
              <h2>Traffic sources</h2>
              <p>Sources inferred from stored session referrers.</p>
            </div>
          </div>

          <div className="eh-traffic-total">
            <strong>{sessions.length}</strong>
            <span>loaded sessions</span>
          </div>

          <div className="eh-traffic-list">
            {[
              { label: "Organic Search", color: "organic" },
              { label: "Google Ads", color: "ads" },
              { label: "Direct", color: "direct" },
              { label: "Social", color: "social" },
              { label: "Referral", color: "organic" },
            ].map((source) => {
              const count = analytics.trafficCounts[source.label] || 0;
              const percent = analytics.totalTraffic
                ? (count / analytics.totalTraffic) * 100
                : 0;

              return (
                <div className="eh-traffic-item" key={source.label}>
                  <div className="eh-traffic-item-header">
                    <span>
                      <i className={`eh-traffic-dot ${source.color}`} />
                      {source.label}
                    </span>
                    <strong>{count}</strong>
                  </div>

                  <div className="eh-traffic-track">
                    <span style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="eh-panel-bottom-note">
            These are estimates from referrer data, not Google Analytics campaign reports.
          </div>
        </article>
      </section>

      <section className="eh-dashboard-bottom-grid">
        <article className="eh-panel eh-activity-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">STORE TIMELINE</span>
              <h2>Recent activity</h2>
              <p>Latest recorded visitor events.</p>
            </div>
          </div>

          <div className="eh-activity-list">
            {events.length ? (
              events.slice(0, 8).map((event) => {
                const Icon = eventIcon(event.event_name);

                return (
                  <div className="eh-activity-item" key={event.id}>
                    <span className="eh-activity-icon visitor"><Icon /></span>

                    <div className="eh-activity-content">
                      <strong>{eventTitle(event.event_name)}</strong>
                      <p>{event.page_path || "Page not specified"}</p>
                    </div>

                    <span className="eh-activity-time">
                      {formatTime(event.created_at)}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="eh-panel-bottom-note">
                {loading ? "Loading activity…" : "No visitor events recorded yet."}
              </p>
            )}
          </div>
        </article>

        <article className="eh-panel eh-conversion-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">SHOPPING BEHAVIOUR</span>
              <h2>Customer conversions</h2>
              <p>Recorded events from the last 24 hours.</p>
            </div>
          </div>

          <div className="eh-conversion-list">
            {[
              { key: "product_view", title: "Product views", subtitle: "Products explored", icon: FiEye },
              { key: "add_to_cart", title: "Add to cart", subtitle: "Shopping intent", icon: FiShoppingBag },
              { key: "begin_checkout", title: "Checkout started", subtitle: "Purchase consideration", icon: FiClock },
              { key: "purchase", title: "Purchases", subtitle: "Recorded purchase events", icon: FiTrendingUp },
              { key: "chat_message", title: "Customer messages", subtitle: "Messages recorded", icon: FiMessageCircle },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div className="eh-conversion-row" key={item.key}>
                  <span className="eh-conversion-icon"><Icon /></span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                  <b>{analytics.conversionCounts[item.key] || 0}</b>
                </div>
              );
            })}
          </div>

          <div className="eh-conversion-footer">
            <FiPackage />
            <span>These counts reflect recorded events, not verified unique customers or orders.</span>
          </div>
        </article>
      </section>

      <footer className="eh-dashboard-footer">
        <span>Eurasian House · Admin Analytics</span>
        <span><FiActivity /> Auto-refreshes every 30 seconds</span>
      </footer>

      <section className="eh-dashboard-journey-section">
        <div className="eh-dashboard-section-heading">
          <span className="eh-panel-kicker">CUSTOMER INTELLIGENCE</span>
          <h2>Visitor analytics</h2>
          <p>Explore visitor journeys, location distribution, and shopping activity from the last 24 hours.</p>
        </div>

        <article className="eh-panel eh-journey-panel">
          <div className="eh-panel-header">
            <div>
              <span className="eh-panel-kicker">BROWSING HISTORY</span>
              <h2>Visitor journey</h2>
              <p>Expand a visitor to inspect pages, time spent, and shopping actions.</p>
            </div>
            <span className="eh-journey-count">
              {journeyData.journeys.length} Visits by{" "}
              {journeyData.uniqueVisitorCount}{" "}
              {journeyData.uniqueVisitorCount === 1 ? "Visitor" : "Visitors"}
            </span>
          </div>

          {journeyData.journeys.length ? (
            <div className="eh-journey-list">
              {journeyData.journeys.map((visitor) => (
                <details className="eh-journey-item" key={visitor.session_id}>
                  <summary className="eh-journey-summary">
                    <span className="eh-journey-status">
                      <i className={visitor.is_active ? "is-active" : ""} />
                    </span>

                    <span className="eh-journey-identity">
                      <strong>
                        Visitor ID: {visitor.visitor_id || "Unknown"}
                      </strong>
                      <small>
                        {visitor.visitor_type === "returning" ? "Returning visitor" : "New visitor"}
                        {" · "}{visitor.source}
                      </small>
                    </span>

                    <span className="eh-journey-page-count">
                      <strong>{visitor.pageCount}</strong>
                      <small>pages</small>
                    </span>

                    <span className="eh-journey-chevron">
                      <FiArrowRight />
                    </span>
                  </summary>

                  <div className="eh-journey-details">
                    <div className="eh-journey-meta">
                      <div>
                        <span>Visit started</span>
                        <strong>
                          {visitor.started_at
                            ? new Date(visitor.started_at).toLocaleString()
                            : "Unknown"}
                        </strong>
                      </div>
                      <div>
                        <span>Last activity</span>
                        <strong>
                          {visitor.last_seen_at
                            ? new Date(visitor.last_seen_at).toLocaleString()
                            : "Unknown"}
                        </strong>
                      </div>
                      <div>
                        <span>Location</span>
                        <strong>
                          {[visitor.city, visitor.country].filter(Boolean).join(", ") || "Unknown"}
                        </strong>
                      </div>
                      <div>
                        <span>Device / browser</span>
                        <strong>
                          {[visitor.device_type, visitor.browser].filter(Boolean).join(" · ") || "Unknown"}
                        </strong>
                      </div>
                      <div>
                        <span>Session</span>
                        <code title={visitor.session_id}>{(visitor.session_id || "").slice(0, 12)}…</code>
                      </div>
                      <div>
                        <span>Referrer</span>
                        <strong className="eh-journey-referrer">
                          {visitor.referrer || "Direct"}
                        </strong>
                      </div>
                    </div>

                    <h3>Pages visited</h3>

                    {visitor.pages.length ? (
                      <div className="eh-journey-pages">
                        {visitor.pages.map((page, index) => (
                          <div
                            className="eh-journey-page"
                            key={`${page.time}-${index}`}
                            title={`${page.path} · ${formatDuration(page.duration)}`}
                          >
                            <span className="eh-journey-page-index">{index + 1}</span>
                            <div>
                              <strong>{pageLabel(page.path)}</strong>
                              <small>{page.path}</small>
                            </div>
                            <span className="eh-journey-duration">
                              {formatDuration(page.duration)}
                            </span>
                            <span className="eh-journey-page-time">
                              {page.time ? new Date(page.time).toLocaleTimeString() : "Unknown"}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="eh-panel-bottom-note">No page views recorded for this session in the last 24 hours.</p>
                    )}

                    <h3>Shopping activity</h3>

                    {visitor.cartEvents.length ? (
                      <div className="eh-journey-cart-list">
                        {visitor.cartEvents.map((event) => (
                          <div className="eh-journey-cart-item" key={event.id}>
                            <FiShoppingBag />
                            <div>
                              <strong>{eventTitle(event.event_name)}</strong>
                              <span>
                                {event.event_data?.title ||
                                  event.event_data?.productName ||
                                  event.event_data?.productId ||
                                  "Product details not recorded"}
                              </span>
                              <small>
                                {event.event_data?.quantity != null
                                  ? `Quantity: ${event.event_data.quantity} · `
                                  : ""}
                                {event.event_data?.value != null
                                  ? `${event.event_data.currency || "USD"} ${event.event_data.value}`
                                  : ""}
                              </small>
                            </div>
                            <time>
                              {event.created_at
                                ? new Date(event.created_at).toLocaleTimeString()
                                : ""}
                            </time>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="eh-panel-bottom-note">No add/remove-to-cart events recorded for this session.</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p className="eh-panel-bottom-note">
              {loading ? "Loading visitor journeys…" : "No visitor sessions found in the last 24 hours."}
            </p>
          )}

          <div className="eh-panel-bottom-note">
            Last activity is not a confirmed departure time. Page durations are shown only when a matching recorded exit event is available.
          </div>
        </article>

        <div className="eh-dashboard-location-grid">
          {renderLocationChart(
            "Visitors by city",
            "Expand a city to see its visitor sessions.",
            journeyData.cities
          )}

          {renderLocationChart(
            "Visitors by country",
            "Expand a country to see its visitor sessions.",
            journeyData.countries
          )}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;