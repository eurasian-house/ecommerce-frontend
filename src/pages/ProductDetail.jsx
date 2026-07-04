import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import { trackProductView } from "../lib/analytics";
import { useSwipeable } from "react-swipeable";
import ProductCard from "../components/ProductCard";
import ProductQuestions from "../components/ProductQuestions";
import ProductReviews from "../components/ProductReviews";

import SEO from "../components/SEO";
import {
  getProductSchema,
  getBreadcrumbSchema,
} from "../seo/schemas";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate(); // ✅ added

  // For Cart to Detail page again
  const location = useLocation();
  const selectedSizeId = location.state?.selectedSizeId;
  const selectedColorId = location.state?.selectedColorId;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [related, setRelated] = useState([]);
  const detailsRef = useRef(null);
  const [displayPrice, setDisplayPrice] = useState({
    selling: 0,
    mrp: 0,
    discount: 0
  });
  // From Cart
  const { addToCart } = useCart();



  useEffect(() => {
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;

    trackProductView(product);
  }, [product]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [slug]);

  useEffect(() => {
    if (product) {
      setDisplayPrice({
        selling: product.selling_price,
        mrp: product.mrp,
        discount: product.discount_percent
      });
    }
  }, [product]);

  // Auto compression while image deleivery function
  const optimizeUrl = (url) => {
    if (!url.includes("/upload/")) return url;

    return url.replace(
      "/upload/",
      "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
    );
  };

  const incrementClick = async (productId) => {
    await supabase.rpc("increment_clicks", {
      row_id: productId,
    });
  };

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select(`*, product_colors (*), product_sizes (*)`)
      .eq("slug", slug)
      .single();

    if (data) {
      await incrementClick(data.id);
      const allImages = [
        data.thumbnail,
        ...(data.images || []),
        ...(data.product_colors?.map(c => c.color_image) || [])
      ];

      setImages(allImages);
      setSelectedImage(data.thumbnail);

      const { data: relatedData } = await supabase
        .from("products")
        .select(`
    *,
    product_colors (*),
    product_sizes (*)
  `)
        .eq("main_category", data.main_category)
        .eq("shape", data.shape)
        .neq("id", data.id)
        .limit(10);

      setRelated(relatedData || []);
    }

    setProduct(data);
  };

  const nextImage = () => {
    const index = images.indexOf(selectedImage);
    const next = (index + 1) % images.length;
    setSelectedImage(images[next]);
  };

  const prevImage = () => {
    const index = images.indexOf(selectedImage);
    const prev = (index - 1 + images.length) % images.length;
    setSelectedImage(images[prev]);
  };
  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true
  });

  useEffect(() => {
    if (!product) return;

    if (selectedSizeId) {
      const size = product.product_sizes.find(
        (s) => s.id === selectedSizeId
      );
      if (size) setSelectedSize(size);
    }

    if (selectedColorId) {
      const color = product.product_colors.find(
        (c) => c.id === selectedColorId
      );
      if (color) setSelectedColor(color);
    }
  }, [product, selectedSizeId, selectedColorId]);




  const isSelectionValid = selectedSize && selectedColor;

  const productSchema = product && {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.thumbnail],
    sku: product.product_sizes?.[0]?.sku || "",
    brand: {
      "@type": "Brand",
      name: "Eurasian House",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: displayPrice.selling,
      availability:
        "https://schema.org/InStock",
      url: `https://www.eurasianrugs.com/products/${product.slug}`,
    },
  };
  if (!product) return <div className="container mt-4">Loading...</div>;

  const expectedDelivery = new Date();
  expectedDelivery.setDate(
    expectedDelivery.getDate() + (product.production_days || 0) + 7
  );


  return (
    <>  <SEO
      title={`${product.title} | Eurasian House`}
      description={
        product.description?.substring(0, 160) ||
        `${product.title} at Eurasian House`
      }
      canonical={`https://www.eurasianrugs.com/products/${product.slug}`}
      image={product.thumbnail}
      type="product"
      schema={[
        getProductSchema(product),
        getBreadcrumbSchema([
          {
            name: "Home",
            url: "https://www.eurasianrugs.com/",
          },
          {
            name: "Products",
            url: "https://www.eurasianrugs.com/products",
          },
          {
            name: product.title,
            url: `https://www.eurasianrugs.com/products/${product.slug}`,
          },
        ]),
      ]}
    />
      <div className="container-fluid px-0 mt-3">

        <div
          className="bg-white p-3 p-md-5"
          style={{
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)"
          }}
        >
          <div className="d-flex flex-column flex-lg-row gap-4">

            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="d-flex flex-column-reverse flex-md-row gap-3">

                <div className="thumbnail-strip d-flex flex-row flex-md-column gap-2" style={{
                  maxHeight: window.innerWidth < 768
                    ? "300px"
                    : "500px",
                  overflowY: "auto",
                  overflowX: "auto",
                  maxWidth: "100%",
                  scrollbarWidth: "none"
                }}>
                  {images.map((img, i) => (
                    <img
                      key={i}
                      // src={img}
                      src={optimizeUrl(img)}
                      onClick={() => setSelectedImage(img)}
                      alt={product.title}
                      fetchPriority="high"
                      loading="lazy"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border: selectedImage === img ? "2px solid black" : "1px solid #ccc"
                      }}
                    />
                  ))}
                </div>

                <div
                  {...handlers}
                  style={{
                    flex: 1,
                    position: "relative",
                    textAlign: "center"
                  }}
                >
                  <button
                    onClick={prevImage}
                    className="btn btn-light image-nav-btn"
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 5,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      boxShadow: "0 4px 15px rgba(0,0,0,.15)"
                    }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  <img
                    src={optimizeUrl(selectedImage)}
                    alt={product.title}
                    onClick={() => setPreviewImage(optimizeUrl(selectedImage))}
                    style={{
                      width: "100%",
                      maxHeight: window.innerWidth < 768 ? "300px" : "500px",
                      objectFit: "contain",
                      cursor: "zoom-in"
                    }}
                  />

                  <button
                    onClick={nextImage}
                    className="btn btn-light image-nav-btn"
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 5,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      boxShadow: "0 4px 15px rgba(0,0,0,.15)"
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>

              <p className="text-muted mb-1">{product.main_category}</p>
              <h1
                className="fw-semibold"
                style={{
                  fontSize: "clamp(1.2rem,4vw,2.8rem)",
                  lineHeight: 1
                }}
              >
                {product.title}
              </h1>

              <div className="d-flex align-items-center gap-3 flex-wrap">
                <h3 className="mb-0 fw-bold" style={{ color: "#198754" }}>
                  ${displayPrice.selling}
                </h3>

                <span
                  className="text-muted text-decoration-line-through"
                >
                  ${displayPrice.mrp}
                </span>

                <span
                  className="badge rounded-pill bg-danger"
                >
                  {displayPrice.discount}% OFF
                </span>
              </div>

              <div className="mt-1">
                <p
                  className="text-muted mb-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {product.description}
                </p>

                <button
                  className="btn btn-link p-0 text-dark fw-semibold"
                  onClick={() =>
                    detailsRef.current?.scrollIntoView({
                      behavior: "smooth"
                    })
                  }
                >
                  Show More
                </button>
              </div>

              {/* COLORS */}
              <div className="mt-3">
                <strong>Colors:</strong>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {product.product_colors?.map((c, i) => (
                    <img
                      key={i}
                      src={optimizeUrl(c.color_image)}
                      alt={`${product.title} - ${c.color_name}`}
                      loading="lazy"
                      onClick={() => {
                        setSelectedImage(c.color_image);
                        setSelectedColor(c);
                      }}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        cursor: "pointer",
                        border: selectedColor === c ? "2px solid black" : "1px solid #ccc"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* SIZES */}
              <div className="mt-3">
                <strong>Sizes:</strong>
                <div className="d-flex gap-2 mt-2 overflow-auto pb-2">
                  {product.product_sizes?.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedSize(s);

                        const mrp = s.mrp_variation || 0;
                        const discount = s.discount_variation || 0;

                        const selling =
                          mrp && discount
                            ? mrp - (mrp * discount) / 100
                            : s.selling_price || Number(product.selling_price);

                        setDisplayPrice({
                          selling,
                          mrp: mrp || product.mrp,
                          discount: discount || Number(product.discount_percent)
                        });
                      }}
                      className={`size-btn ${selectedSize === s ? "active" : ""
                        }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-3">Shape: {product.shape}</p>
              <p>Material: {product.materials}</p>

              <div className="mt-2 text-muted">
                <i className="bi bi-truck me-2"></i>
                <strong>Expected Delivery:</strong>{" "}
                {expectedDelivery.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>



              {/* BUTTONS */}
              <div className="mt-4 d-flex flex-column flex-sm-row gap-3">
                <button
                  className="btn btn-dark w-100"
                  disabled={!isSelectionValid}
                  onClick={() => {
                    if (!isSelectionValid) return;

                    addToCart({
                      ...product,
                      cartItemId: crypto.randomUUID(),
                      selectedSize,
                      selectedColor,
                      price: displayPrice.selling,
                    });

                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>

                <button
                  className="btn btn-outline-dark w-100"
                  disabled={!isSelectionValid}
                  onClick={() => {
                    if (!isSelectionValid) return;

                    addToCart({
                      ...product,
                      cartItemId: crypto.randomUUID(),
                      selectedSize,
                      selectedColor,
                      price: displayPrice.selling,
                    });
                  }}
                >
                  Add to Cart
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <hr
          className="my-5"
          style={{
            opacity: 0.1
          }}
        />

        <div className="related-products-section mt-1">

          <div className="text-center mb-5">

            <span className="related-subtitle">
              YOU MAY ALSO LIKE
            </span>

            <h2 className="related-title mt-2">
              Similar Handcrafted Items
            </h2>

            <p className="related-description">
              Discover premium handmade items carefully selected
              to complement this design.
            </p>

          </div>

          <div className="row g-4 justify-content-center">
            {related.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>
        <hr
          className="my-5"
          style={{
            opacity: 0.1
          }}
        />

        {/* PRODUCT DETAILS */}
        <div
          ref={detailsRef}
          className="mt-5 p-4 p-md-5 bg-light rounded-4"
        >
          <h2 className="mb-4 fw-bold">
            Product Details
          </h2>

          <div className="row g-4">

            <div className="col-md-6">
              <h6 className="fw-bold" style={{
                borderBottom: "3px solid #111",
                paddingBottom: "8px"
              }}>Description</h6>
              <div className="trust-quote">
                <div className="trust-quote-icon">❝</div>

                <p className="mb-0">
                  We understand that ordering a handmade rug online requires trust.
                  That's why we stand behind every order we ship. If any disruption
                  occurs from our side on orders up to <strong>$499</strong>, we will
                  compensate you with <strong>50% of your order value</strong>.
                  Your satisfaction matters to us, and we believe you should shop with
                  complete peace of mind. We've got your back—every step of the way.
                </p>

                <div className="trust-quote-signature">
                  — The Eurasian House Team
                </div>
              </div>
              <p>{product.description}</p>
            </div>

            <div className="col-md-6">
              <h6 className="fw-bold" style={{
                borderBottom: "3px solid #111",
                paddingBottom: "8px"
              }}>Specifications</h6>

              <ul className="list-group">

                <li className="list-group-item">
                  <strong>Shape:</strong> {product.shape}
                </li>

                <li className="list-group-item">
                  <strong>Material:</strong> {product.materials}
                </li>

                <li className="list-group-item">
                  <strong>Category:</strong> {product.main_category}
                </li>

                <li className="list-group-item">
                  <strong>Color:</strong> {product.primary_color}
                </li>

                <li className="list-group-item">
                  <strong>Other Colors:</strong>{" "}
                  {product.other_colors?.join(", ")}
                </li>
                <li className="list-group-item">
                  <strong>Quality:</strong> {product.quality}
                </li>

                <li className="list-group-item">
                  <strong>Expected Delivery:</strong>  {expectedDelivery.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </li>

                <li className="list-group-item">
                  <strong>Shapes Availability:</strong> Custom shapes are available, kindly <Link
                    to="/contact"
                    className="fw-bold text-decoration-underline"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="list-group-item">
                  <strong>Sizes Availability:</strong> Custom Sizes are available, kindly <Link
                    to="/contact"
                    className="fw-bold text-decoration-underline"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="list-group-item">
                  <strong>Colors Availability:</strong> Custom Colors are available, kindly <Link
                    to="/contact"
                    className="fw-bold text-decoration-underline"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="list-group-item">
                  <strong>Shipping:</strong> Free all over the world. Kindly refer to our <Link
                    to="/shipping-policy"
                    className="fw-bold text-decoration-underline"
                  >
                    Shipping Policy
                  </Link>
                </li>

                <li className="list-group-item">
                  <strong>Return Policy:</strong>{" "}
                  Yes, kindly read our{" "}
                  <Link
                    to="/refund-policy"
                    className="fw-bold text-decoration-underline"
                  >
                    Refund & Return Policy
                  </Link>{" "}
                  for more details.
                </li>

              </ul>
              <div className="referral-card">
                <div className="referral-icon">
                  🎁
                </div>

                <h5 className="referral-title">
                  Share the Comfort, Earn Rewards
                </h5>

                <p className="mb-0">
                  If you love your experience with Eurasian House, share it with
                  someone close to you. When a friend or family member places
                  their very first order using your referral, both of you receive
                  <strong> $15 in rewards.</strong>

                  Your friend gets <strong>$15 off</strong> their first purchase,
                  and you receive <strong>$15 in store credit</strong> to use on
                  your next order.

                  A small thank you from us for helping our family grow.
                </p>

                <div className="referral-signature">
                  — With gratitude, The Eurasian House Team
                </div>
              </div>

            </div>

          </div>
        </div>
        <ProductReviews productId={product.id} />
        <ProductQuestions productId={product.id} />

      </div>
      {previewImage && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,.88)",
            backdropFilter: "blur(6px)"
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 bg-transparent shadow-none">
              <img
                src={previewImage}
                className="img-fluid rounded-4 shadow-lg"
                alt={product?.title}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}