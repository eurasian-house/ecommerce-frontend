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
    "https://www.facebook.com/eurasianhouse",
    "https://www.instagram.com/eurasianhouse/",
    "https://in.pinterest.com/eurasianhouse/"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "Eurasian House",

  url: "https://www.eurasianrugs.com"
};


export const getProductSchema = (product) => {
  const hasStock =
    product.product_sizes?.some((size) => size.stock > 0) ?? false;

  const images = [
    product.thumbnail,
    ...(product.images || []),
  ].filter(Boolean);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.title,

    description: product.description,

    image: images,

    sku: product.product_sizes?.[0]?.sku || "",

    brand: {
      "@type": "Brand",
      name: "Eurasian House",
    },

    manufacturer: {
      "@type": "Organization",
      name: "Eurasian House",
    },

    category: product.main_category,

    material: product.materials,

    color: product.primary_color,

    additionalProperty: [
      ...(product.other_colors || []).map((color) => ({
        "@type": "PropertyValue",
        name: "Additional Color",
        value: color,
      })),
    ],

    pattern: product.pattern,

    countryOfOrigin: {
      "@type": "Country",
      name: "India",
    },

    offers: {
      "@type": "Offer",

      url: `https://www.eurasianrugs.com/products/${product.slug}`,

      priceCurrency: "USD",

      price: product.selling_price,

      priceValidUntil: "2027-12-31",

      availability: hasStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",

      shippingDetails: {
        "@type": "OfferShippingDetails",

        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "USD",
        },

        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "001",
        },

        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: product.production_days || 7,
            maxValue: product.production_days || 7,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 5,
            maxValue: 10,
            unitCode: "DAY",
          },
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",

        applicableCountry: "001",

        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",

        merchantReturnDays: 30,

        returnMethod:
          "https://schema.org/ReturnByMail",

        returnFees:
          "https://schema.org/FreeReturn",
      },
    },
  };

  if (product.review_count > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Number(product.average_rating),
      reviewCount: product.review_count,
    };
  }

  return schema;
};


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