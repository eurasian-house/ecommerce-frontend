export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "Eurasian House",

  url: "https://www.eurasianrugs.com",

  logo: "https://www.eurasianrugs.com/logo.png",

  description:
    "Eurasian House offers premium handmade Persian, Kilim, Tufted, Tibetan, Jute and designer rugs crafted with exceptional quality.",

  email: "contact@eurasianrugs.com",

  sameAs: [
    // Add these later
    // "https://facebook.com/...",
    // "https://instagram.com/...",
    // "https://pinterest.com/..."
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "Eurasian House",

  url: "https://www.eurasianrugs.com"
};


export const getProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",

  name: product.title,

  image: [
    product.primary_image
  ],

  description: product.description,

  sku: product.sku,

  brand: {
    "@type": "Brand",
    name: "Eurasian House"
  },

  offers: {
    "@type": "Offer",

    priceCurrency: "INR",

    price: product.selling_price,

    availability:
      product.status === "active"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

    url: `https://www.eurasianrugs.com/products/${product.slug}`,

    itemCondition:
      "https://schema.org/NewCondition"
  }
});


export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});


export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}