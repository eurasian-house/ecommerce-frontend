import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-E0LM03XFFY";

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL ||
  "https://ecommerce-backend-bkm1.onrender.com"
).replace(/\/$/, "");

const TRACKING_ENDPOINT = `${BACKEND_URL}/api/visitor-tracking/event`;

const VISITOR_KEY = "eh_visitor_id";
const SESSION_KEY = "eh_session_id";

const SESSION_TIMEOUT = 30 * 60 * 1000;

let gaInitialized = false;
let lastPageView = null;

// -----------------------------
// Google Analytics
// -----------------------------

export const initGA = () => {
  if (gaInitialized) return;

  ReactGA.initialize(MEASUREMENT_ID);
  gaInitialized = true;
};

export const trackPageView = (path) => {
  if (!path || lastPageView === path) return;

  lastPageView = path;

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

// -----------------------------
// Anonymous visitor identity
// -----------------------------

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "");
  }

  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2)
  );
};

const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Tracking should never break the storefront.
  }
};

const getVisitorId = () => {
  let id = getStorageItem(VISITOR_KEY);

  if (!id) {
    id = createId();
    setStorageItem(VISITOR_KEY, id);
  }

  return id;
};

const getSessionId = () => {
  const now = Date.now();

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      if (
        parsed.id &&
        now - parsed.lastActivity < SESSION_TIMEOUT
      ) {
        return parsed.id;
      }
    }

    const id = createId();

    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        id,
        lastActivity: now,
      })
    );

    return id;
  } catch {
    return createId();
  }
};

const updateSessionActivity = () => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    const parsed = stored ? JSON.parse(stored) : null;

    if (parsed?.id) {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          id: parsed.id,
          lastActivity: Date.now(),
        })
      );
    }
  } catch {
    // Ignore storage errors.
  }
};

// -----------------------------
// First-party visitor tracking
// -----------------------------

let pendingEvents = Promise.resolve();

export const trackVisitorEvent = (
  eventName,
  eventData = {},
  pagePath
) => {
  if (typeof window === "undefined") return Promise.resolve(null);

  const visitorId = getVisitorId();
  const sessionId = getSessionId();

  const payload = {
    visitorId,
    sessionId,
    eventName,
    pagePath:
      pagePath ||
      window.location.pathname +
      window.location.search,
    referrer:
      eventName === "page_view"
        ? document.referrer || null
        : null,
    eventData,
  };

  // Serialize requests to preserve event ordering.
  const request = async () => {
    const response = await fetch(TRACKING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: eventName === "page_exit",
    });

    if (!response.ok) {
      throw new Error(`Tracking failed: ${response.status}`);
    }

    const result = await response.json();

    // The backend can issue a replacement session after inactivity.
    if (result.sessionId && result.sessionId !== sessionId) {
      try {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({
            id: result.sessionId,
            lastActivity: Date.now(),
          })
        );
      } catch {
        // Ignore storage errors.
      }
    }

    updateSessionActivity();

    return result;
  };

  pendingEvents = pendingEvents
    .catch(() => null)
    .then(request)
    .catch((error) => {
      console.warn("Visitor tracking unavailable:", error.message);
      return null;
    });

  return pendingEvents;
};

// -----------------------------
// Ecommerce item helpers
// -----------------------------

const getItem = (product) => ({
  item_id: product.sku || String(product.id),
  item_name: product.title,
  item_category: product.main_category,
  item_variant: [
    product.selectedSize?.size,
    product.selectedColor?.color_name,
  ]
    .filter(Boolean)
    .join(" / "),
  price: Math.round(Number(product.selling_price)),
  quantity: product.quantity || 1,
});

const getCartValue = (cart = []) =>
  cart.reduce(
    (sum, item) =>
      sum +
      Number(item.selling_price || 0) *
      Number(item.quantity || 1),
    0
  );

// -----------------------------
// Product and cart events
// -----------------------------

export const trackProductView = (product) => {
  const item = getItem(product);
  const value = item.price * item.quantity;

  ReactGA.event("view_item", {
    currency: "USD",
    value,
    items: [item],
  });

  trackVisitorEvent("product_view", {
    productId: String(product.id),
    sku: product.sku || null,
    title: product.title,
    value,
    currency: "USD",
  });
};

export const trackAddToCart = (product) => {
  const item = getItem(product);
  const value = item.price * item.quantity;

  ReactGA.event("add_to_cart", {
    currency: "USD",
    value,
    items: [item],
  });

  trackVisitorEvent("add_to_cart", {
    productId: String(product.id),
    sku: product.sku || null,
    title: product.title,
    quantity: item.quantity,
    value,
    currency: "USD",
  });
};

export const trackRemoveFromCart = (product) => {
  const item = getItem(product);
  const value = item.price * item.quantity;

  ReactGA.event("remove_from_cart", {
    currency: "USD",
    value,
    items: [item],
  });

  trackVisitorEvent("remove_from_cart", {
    productId: String(product.id),
    sku: product.sku || null,
    title: product.title,
    quantity: item.quantity,
    value,
    currency: "USD",
  });
};

export const trackBeginCheckout = (cart) => {
  const value = getCartValue(cart);

  ReactGA.event("begin_checkout", {
    currency: "USD",
    value,
    items: cart.map(getItem),
  });

  trackVisitorEvent("begin_checkout", {
    itemCount: cart.length,
    value,
    currency: "USD",
  });
};

export const trackPurchase = (orderId, cart) => {
  const value = getCartValue(cart);

  ReactGA.event("purchase", {
    transaction_id: orderId,
    currency: "USD",
    value,
    items: cart.map(getItem),
  });

  trackVisitorEvent("purchase", {
    orderId: String(orderId),
    itemCount: cart.length,
    value,
    currency: "USD",
  });
};

// -----------------------------
// Search and category events
// -----------------------------

export const trackSearch = (query) => {
  ReactGA.event("search", {
    search_term: query,
  });

  trackVisitorEvent("search", {
    query: String(query).slice(0, 200),
  });
};

export const trackCategory = (category) => {
  ReactGA.event("view_item_list", {
    item_list_name: category,
  });

  trackVisitorEvent("category_view", {
    category: String(category).slice(0, 200),
  });
};

export const trackFilters = (filters) => {
  ReactGA.event("view_item_list", {
    item_list_name: "Product Filters",
    ...filters,
  });

  trackVisitorEvent("search", {
    action: "filters_applied",
    filters,
  });
};

// -----------------------------
// Contact events
// -----------------------------

export const trackWhatsApp = () => {
  ReactGA.event("contact", {
    method: "WhatsApp",
  });

  trackVisitorEvent("contact", {
    method: "WhatsApp",
  });
};

export const trackPhone = () => {
  ReactGA.event("contact", {
    method: "Phone",
  });

  trackVisitorEvent("contact", {
    method: "Phone",
  });
};