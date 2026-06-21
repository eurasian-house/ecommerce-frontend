import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Eurasian House",
  description = "Discover premium handmade rugs and carpets.",
  canonical = "https://eurasianrugs.com",
  image = "https://eurasianrugs.com/og-image.png",
  type = "website",
  keywords = "handmade rugs, carpets, Persian rugs, Kilim rugs, Tibetan rugs, Jute rugs",
  schema = null,
}) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index,follow" />
      <meta name="author" content="Eurasian House" />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Eurasian House" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schema &&
        (Array.isArray(schema) ? schema : [schema]).map((item, index) => (
          <script
            key={index}
            type="application/ld+json"
          >
            {JSON.stringify(item)}
          </script>
        ))}
    </Helmet>
  );
}