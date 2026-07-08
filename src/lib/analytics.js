import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-E0LM03XFFY";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

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
  price: Number(product.selling_price),
  quantity: product.quantity || 1,
});

export const trackProductView = (product) => {
  ReactGA.event("view_item", {
    currency: "USD",
    value: Number(product.selling_price),
    items: [getItem(product)],
  });
};

export const trackAddToCart = (product) => {
  ReactGA.event("add_to_cart", {
    currency: "USD",
    value: Number(product.selling_price),
    items: [getItem(product)],
  });
};

export const trackRemoveFromCart = (product) => {
  ReactGA.event("remove_from_cart", {
    currency: "USD",
    value: Number(product.selling_price),
    items: [getItem(product)],
  });
};

export const trackBeginCheckout = (cart) => {
  ReactGA.event("begin_checkout", {
    currency: "USD",
    value: cart.reduce(
      (sum, item) => sum + item.selling_price * item.quantity,
      0
    ),
    items: cart.map(getItem),
  });
};

export const trackPurchase = (orderId, cart) => {
  ReactGA.event("purchase", {
    transaction_id: orderId,
    currency: "USD",
    value: cart.reduce(
      (sum, item) => sum + item.selling_price * item.quantity,
      0
    ),
    items: cart.map(getItem),
  });
};

export const trackSearch = (query) => {
  ReactGA.event("search", {
    search_term: query,
  });
};

export const trackCategory = (category) => {
  ReactGA.event("view_item_list", {
    item_list_name: category,
  });
};

export const trackWhatsApp = () => {
  ReactGA.event("contact", {
    method: "WhatsApp",
  });
};

export const trackPhone = () => {
  ReactGA.event("contact", {
    method: "Phone",
  });
};

export const trackFilters = (filters) => {
  ReactGA.event("view_item_list", {
    item_list_name: "Product Filters",
    ...filters,
  });
};