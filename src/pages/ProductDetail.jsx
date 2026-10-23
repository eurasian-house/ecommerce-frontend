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
import { toast } from "react-toastify";
import { sortSizes } from "../utils/sortSizes";
import "../styles/pages/ProductDetail.css";



import SEO from "../components/SEO";
import {
  getProductSchema,
  getBreadcrumbSchema,
} from "../seo/schemas";

function renderDescription(description) {
  const lines = String(description || "").split(/\r?\n/);
  const content = [];
  let list = [];

  const flushList = () => {
    if (!list.length) return;
    content.push(
      <ul key={`list-${content.length}`}>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
    list = [];
  };

  lines.forEach((line) => {
    const value = line.trim();
    const bullet = value.match(/^(?:•|-|\*)\s+(.+)$/);

    if (!value) {
      flushList();
    } else if (bullet) {
      list.push(bullet[1]);
    } else {
      flushList();
      content.push(<p key={`paragraph-${content.length}`}>{value}</p>);
    }
  });

  flushList();

  return content.length ? content : <p>No description available.</p>;
}

function ProductDetailSkeleton() {
  return (
    <div className="product-detail-page container-fluid px-0 mt-3">
      <div className="product-detail-card">
        <div className="product-detail-layout product-detail-skeleton-layout">
          {/* Gallery skeleton */}
          <div className="product-gallery">
            <div className="product-gallery-wrapper">
              <div className="product-thumbnail-strip">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="product-skeleton-thumb skeleton-shimmer"
                  />
                ))}
              </div>

              <div className="product-image-panel">
                <div className="product-skeleton-main-image skeleton-shimmer" />
              </div>
            </div>
          </div>

          {/* Product information skeleton */}
          <div className="product-detail-info product-skeleton-info">
            <div className="product-skeleton-category skeleton-shimmer" />
            <div className="product-skeleton-title skeleton-shimmer" />

            <div className="product-skeleton-price-row">
              <div className="product-skeleton-price skeleton-shimmer" />
              <div className="product-skeleton-mrp skeleton-shimmer" />
              <div className="product-skeleton-discount skeleton-shimmer" />
            </div>

            <div className="product-skeleton-description">
              <div className="skeleton-shimmer" />
              <div className="skeleton-shimmer" />
            </div>

            <div className="product-skeleton-option">
              <div className="product-skeleton-label skeleton-shimmer" />
              <div className="product-skeleton-note skeleton-shimmer" />
              <div className="product-skeleton-swatches">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="product-skeleton-swatch skeleton-shimmer"
                  />
                ))}
              </div>
            </div>

            <div className="product-skeleton-option">
              <div className="product-skeleton-label skeleton-shimmer" />
              <div className="product-skeleton-select skeleton-shimmer" />
            </div>

            <div className="product-skeleton-specs">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-shimmer"
                />
              ))}
            </div>

            <div className="product-skeleton-info-line skeleton-shimmer" />
            <div className="product-skeleton-info-line skeleton-shimmer" />

            <div className="product-skeleton-actions">
              <div className="skeleton-shimmer" />
              <div className="skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate(); // ✅ added

  // For Cart to Detail page again
  const location = useLocation();
  const selectedSizeId = location.state?.selectedSizeId;
  const selectedColorId = location.state?.selectedColorId;
  const [isLoading, setIsLoading] = useState(true);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const sizeDropdownRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImages, setSelectedImages] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [related, setRelated] = useState([]);
  const detailsRef = useRef(null);
  const clickedProductIdRef = useRef(null);
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
    if (!product || clickedProductIdRef.current === product.id) return;

    // The product loader can run twice in React development mode. Count only
    // one click for this product-detail visit.
    clickedProductIdRef.current = product.id;
    void incrementClick(product.id);
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const storageKey = "recentlyViewedProducts";

    try {
      const stored = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      // Remove current product if it already exists
      const filtered = stored.filter(
        (item) => item.id !== product.id
      );

      // Put current product at the beginning
      const updated = [
        {
          id: product.id,
          slug: product.slug,
          title: product.title,
          thumbnail: product.thumbnail,
          selling_price: product.selling_price,
          mrp: product.mrp,
          discount_percent: product.discount_percent,
          primary_color: product.primary_color,
          shape: product.shape,
        },
        ...filtered,
      ].slice(0, 10);

      localStorage.setItem(
        storageKey,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log("Recently viewed error:", error);
    }
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
        selling: Math.round(Number(product.selling_price)),
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
    setIsLoading(true);
    setProduct(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
        *,
        product_colors (*),
        product_sizes (*)
      `)
        .eq("slug", slug)
        .single();

      if (error) throw error;

      if (data) {
        const allImages = [
          data.thumbnail,
          ...(data.images || []),
          ...(data.product_colors?.map((c) => c.color_image) || []),
        ].filter(Boolean);

        setImages(allImages);
        setSelectedImage(data.thumbnail);

        const { data: relatedData, error: relatedError } = await supabase
          .from("products")
          .select(`
          *,
          product_colors (*),
          product_sizes (*)
        `)
          .eq("main_category", data.main_category)
          .eq("shape", data.shape)
          .neq("id", data.id)
          .limit(15);

        if (relatedError) {
          console.error("Error fetching related products:", relatedError);
        }

        setRelated(
          (relatedData || []).map((product) => ({
            ...product,
            product_sizes: sortSizes(product.product_sizes || []),
          }))
        );

        data.product_sizes = sortSizes(data.product_sizes || []);
      } else {
        setImages([]);
        setSelectedImage("");
        setRelated([]);
      }

      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
      setImages([]);
      setSelectedImage("");
      setRelated([]);
    } finally {
      setIsLoading(false);
    }
  };


  const nextImage = () => {
    // navigate only through the main gallery images (thumbnail + product images)
    if (!product) {
      const index = images.indexOf(selectedImage);
      const next = (index + 1) % images.length;
      setSelectedImage(images[next]);
      return;
    }

    const gallery = [product.thumbnail, ...(product.images || [])].filter(Boolean);
    let index = gallery.indexOf(selectedImage);
    // if selectedImage is a color image (not in gallery), jump to first gallery image
    if (index === -1) index = 0;
    const next = (index + 1) % gallery.length;
    setSelectedImage(gallery[next]);
  };


  const changePreviewImage = (direction) => {
    const gallery = [product.thumbnail, ...(product.images || [])].filter(Boolean);

    if (!gallery.length) return;

    let index = gallery.findIndex(
      (img) => optimizeUrl(img) === previewImage
    );

    // If a color image is open, start from the first gallery image.
    if (index === -1) index = 0;

    const nextIndex = (index + direction + gallery.length) % gallery.length;
    const nextImageUrl = gallery[nextIndex];

    setSelectedImage(nextImageUrl);
    setPreviewImage(optimizeUrl(nextImageUrl));
  };


  const prevImage = () => {
    // navigate only through the main gallery images (thumbnail + product images)
    if (!product) {
      const index = images.indexOf(selectedImage);
      const prev = (index - 1 + images.length) % images.length;
      setSelectedImage(images[prev]);
      return;
    }

    const gallery = [product.thumbnail, ...(product.images || [])].filter(Boolean);
    let index = gallery.indexOf(selectedImage);
    if (index === -1) index = 0;
    const prev = (index - 1 + gallery.length) % gallery.length;
    setSelectedImage(gallery[prev]);
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

  const showSelectionMessage = () => {
    toast.info("Kindly choose a Color & Size");
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target)
      ) {
        setIsSizeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="container text-center py-5">
        <h3>Product not found</h3>
        <p>Please check the product link or explore our collection.</p>
        <Link to="/products" className="app-btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }



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
      <div className="product-detail-page container-fluid px-0 mt-3">

        <div className="product-detail-card">

          <div className="product-detail-layout">

            {/* LEFT SIDE */}
            <div className="product-gallery">

              <div className="product-gallery-wrapper">

                <div className="product-thumbnail-strip">

                  {images.map((img, i) => (
                    <img
                      key={i}
                      src={optimizeUrl(img)}
                      onClick={() => setSelectedImage(img)}
                      alt={product.title}
                      fetchPriority="high"
                      loading="lazy"
                      className={`product-thumbnail ${selectedImage === img ? "active" : ""
                        }`}
                    />
                  ))}

                </div>

                <div
                  {...handlers}
                  className="product-image-panel"
                >
                  <button
                    type="button"
                    className="sliding-arrow sliding-arrow--left hero-arrow-left"
                    onClick={prevImage}
                    aria-label="Previous slide"
                  >
                    <i className="bi bi-chevron-left" />
                  </button>

                  <div className="product-main-image">

                    <img
                      src={optimizeUrl(selectedImage)}
                      alt={product.title}
                      onClick={() =>
                        setPreviewImage(optimizeUrl(selectedImage))
                      }
                      className="product-main-image-img"
                    />

                  </div>
                  <button
                    type="button"
                    className="sliding-arrow sliding-arrow--right hero-arrow-right"
                    onClick={nextImage}
                    aria-label="Next slide"
                  >
                    <i className="bi bi-chevron-right" />
                  </button>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}

            {/* <div className="product-detail-info"></div> */}




            <div className="product-detail-info">

              <p className="product-category">
                {product.main_category}
              </p>

              <h1 className="product-title">
                {product.title}
              </h1>

              <div className="product-price-row">

                <h3 className="product-price">
                  ${Math.round(Number(displayPrice.selling))}
                </h3>

                <span className="product-mrp">
                  ${displayPrice.mrp}
                </span>

                <span className="product-discount">
                  {displayPrice.discount}% OFF
                </span>

              </div>

              <div className="product-short-description">

                <p className="product-short-text">
                  {product.description}
                </p>

                <button
                  className="product-show-more"
                  onClick={() =>
                    detailsRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Read Full Description
                  <i className="bi bi-arrow-down ms-2"></i>
                </button>

              </div>



              <div className="productVariation">
                {/* COLORS */}

                <div className="product-option-section">

                  <h6 className="product-option-title">
                    Colors
                  </h6>

                  <p className="product-option-note">
                    Didn't find the color you want? We customize it at no additional cost.
                  </p>

                  <div className="product-color-list">

                    {product.product_colors?.map((c, i) => (

                      <img
                        key={i}
                        src={optimizeUrl(c.color_image)}
                        alt={`${product.title} - ${c.color_name}`}
                        loading="lazy"
                        title={c.color_name}
                        className={`product-color-swatch ${selectedColor === c ? "active" : ""
                          }`}
                        onClick={() => {
                          setSelectedImage(c.color_image);
                          setSelectedColor(c);
                        }}
                      />

                    ))}

                  </div>

                </div>

                {/* SIZE */}

                <div className="product-option-section">

                  <label
                    htmlFor="size-select"
                    className="product-option-title"
                  >
                    Sizes
                  </label>

                  <p className="product-option-note">
                    Didn't find your size? We customize it at no additional cost.
                  </p>


                  <div className="premium-size-dropdown" ref={sizeDropdownRef}>
                    <button
                      type="button"
                      className={`premium-size-trigger ${isSizeDropdownOpen ? "is-open" : ""
                        }`}
                      onClick={() => setIsSizeDropdownOpen((open) => !open)}
                      aria-expanded={isSizeDropdownOpen}
                      aria-haspopup="listbox"
                    >
                      <span className="premium-size-trigger-content">
                        <span className="premium-size-trigger-label">
                          {selectedSize ? "SELECTED SIZE" : "CHOOSE YOUR SIZE"}
                        </span>

                        <span className="premium-size-trigger-value">
                          {selectedSize
                            ? selectedSize.size
                            : "Select a size"}
                        </span>
                      </span>

                      <span className="premium-size-trigger-price">
                        {selectedSize
                          ? `$${Math.round(Number(displayPrice.selling))}`
                          : "View sizes"}
                        <i
                          className={`bi ${isSizeDropdownOpen
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                            }`}
                        />
                      </span>
                    </button>

                    {isSizeDropdownOpen && (
                      <div
                        className="premium-size-menu"
                        role="listbox"
                        aria-label="Available rug sizes"
                      >
                        <div className="premium-size-menu-heading">
                          <span>AVAILABLE SIZES</span>
                          <span>PRICE</span>
                        </div>

                        {product.product_sizes?.map((size, index) => {
                          const isSelected = selectedSize?.id === size.id;
                          const price = Math.round(
                            Number(size.selling_price ?? product.selling_price)
                          );

                          return (
                            <button
                              key={size.id || index}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              className={`premium-size-option ${isSelected ? "is-selected" : ""
                                }`}
                              onClick={() => {
                                setSelectedSize(size);

                                setDisplayPrice({
                                  selling: price,
                                  mrp: size.mrp_variation || product.mrp,
                                  discount:
                                    size.discount_variation ||
                                    Number(product.discount_percent),
                                });

                                setIsSizeDropdownOpen(false);
                              }}
                            >
                              <span className="premium-size-option-details">
                                <span className="premium-size-option-name">
                                  {size.size}
                                </span>

                                <span className="premium-size-option-unit">
                                  Rug size
                                </span>
                              </span>

                              <span className="premium-size-option-price">
                                ${price}
                                {isSelected && (
                                  <i className="bi bi-check-circle-fill" />
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>


                </div>
              </div>

              <div className="product-spec-list">

                <p>
                  <strong>Shape:</strong> {product.shape}
                </p>

                <p>
                  <strong>Pattern:</strong> {product.pattern}
                </p>

                <p>
                  <strong>Materials:</strong>{" "}
                  {Array.isArray(product.materials)
                    ? product.materials.join(", ")
                    : product.materials}
                </p>

              </div>

              <div className="product-info-item">
                <i className="bi bi-truck"></i>

                <span>
                  <strong>Expected Delivery:</strong>{" "}
                  {expectedDelivery.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="product-info-item">
                <i className="bi bi-airplane"></i>

                <span>
                  <strong>Shipping:</strong>

                  <span className="product-free-shipping">
                    Free Worldwide
                  </span>
                </span>
              </div>

              {/* ACTION BUTTONS */}

              <div className="product-action-buttons d-flex justify-content-center">

                <button
                  className="btn-primary"
                  aria-disabled={!isSelectionValid}
                  onClick={() => {

                    if (!isSelectionValid) {
                      showSelectionMessage();
                      return;
                    }

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
                  <i className="bi bi-lightning-charge-fill me-2"></i>
                  Buy Now
                </button>

                <button
                  className="btn-secondary"
                  aria-disabled={!isSelectionValid}
                  onClick={() => {

                    if (!isSelectionValid) {
                      showSelectionMessage();
                      return;
                    }

                    addToCart({
                      ...product,
                      cartItemId: crypto.randomUUID(),
                      selectedSize,
                      selectedColor,
                      price: displayPrice.selling,
                    });

                    toast.success(
                      <div className="app-toast-content">
                        <div className="app-toast-title">
                          Added to Cart
                        </div>

                        <div className="app-toast-message">
                          {product.title}
                        </div>
                      </div>,
                      {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                      }
                    );

                  }}
                >
                  <i className="bi bi-bag me-2"></i>
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS */}

        <section className="related-products-section">

          <div className="section-heading">

            <span className="section-subtitle">
              YOU MAY ALSO LIKE
            </span>

            <h2 className="section-title">
              Similar Handcrafted Pieces
            </h2>

            <p className="section-description">
              Carefully selected handmade rugs crafted with the same
              attention to detail.
            </p>

          </div>

          <div className="related-products-grid">

            {related.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                cardWidth="100%"
                selectedImage={selectedImages[product.id]}
                onColorClick={(productId, image) =>
                  setSelectedImages((prev) => ({
                    ...prev,
                    [productId]: image,
                  }))
                }
              />

            ))}

          </div>

        </section>



        {/* Rug Size Guide */}
        <div className="container-fluid px-0 my-0">
          <img
            src="/size.jpg"
            alt="Rug size guide"
            className="img-fluid w-100 d-block"
            loading="lazy"
            decoding="async"
          />
        </div>



        <section
          ref={detailsRef}
          className="product-details-section"
        >

          <div className="row g-5">

            <div className="col-lg-6">

              <h2 className="details-heading">
                Product Description
              </h2>

              <div className="trust-quote">

                <div className="trust-quote-icon">
                  ❝
                </div>

                <p>

                  We understand that ordering a handmade rug online requires trust.
                  That's why we stand behind every order we ship.
                  If any disruption occurs from our side on orders up to
                  <strong> $499</strong>,
                  we will compensate you with
                  <strong> 50% of your order value</strong>.

                  Your satisfaction matters to us, and we believe shopping
                  should always feel safe and worry-free.

                </p>

                <div className="trust-quote-signature">
                  — The Eurasian House Team
                </div>

              </div>

              <div className="product-description">
                {renderDescription(product.description)}
              </div>

            </div>



            <div className="col-lg-6">

              <h2 className="details-heading">
                Specifications
              </h2>

              <ul className="product-specifications">

                <li>
                  <strong>Shape:</strong> {product.shape}
                </li>

                <li>
                  <strong>Pattern:</strong> {product.pattern}
                </li>

                <li>
                  <strong>Materials:</strong>{" "}
                  {Array.isArray(product.materials)
                    ? product.materials.join(", ")
                    : product.materials}
                </li>

                <li>
                  <strong>Category:</strong> {product.main_category}
                </li>

                <li>
                  <strong>Sub-Category:</strong>{" "}
                  {Array.isArray(product.sub_category)
                    ? product.sub_category.join(", ")
                    : product.sub_category || ""}
                </li>

                <li>
                  <strong>Primary Color:</strong> {product.primary_color}
                </li>

                <li>
                  <strong>Other Colors:</strong>{" "}
                  {product.other_colors?.join(", ")}
                </li>

                <li>
                  <strong>Quality:</strong> {product.quality}
                </li>

                <li>
                  <strong>Expected Delivery:</strong>{" "}
                  {expectedDelivery.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </li>

                <li>
                  <strong>Custom Shapes:</strong>{" "}
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <strong>Custom Sizes:</strong>{" "}
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <strong>Custom Colors:</strong>{" "}
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <strong>Shipping:</strong>{" "}
                  <Link to="/shipping-policy">
                    Shipping Policy
                  </Link>
                </li>

                <li>
                  <strong>Returns:</strong>{" "}
                  <Link to="/refund-policy">
                    Refund & Return Policy
                  </Link>
                </li>

              </ul>

              <div className="referral-card">

                <div className="referral-icon">
                  🎁
                </div>

                <h5 className="referral-title">
                  Share the Comfort, Earn Rewards
                </h5>

                <p>

                  Refer a friend and when they place their first order,
                  both of you receive
                  <strong> $15 in rewards.</strong>

                </p>

                <div className="referral-signature">
                  — The Eurasian House Team
                </div>

              </div>

            </div>

          </div>

        </section>


        <section className="product-feedback-grid">
          <ProductReviews productId={product.id} />
          <ProductQuestions productId={product.id} />
        </section>

      </div >

      {previewImage && (
        <div className="product-preview-modal">
          <div className="product-preview-dialog">
            <div className="product-preview-content">
              <img
                src={previewImage}
                alt={product?.title}
                className="product-preview-image"
              />

              {/* Previous image */}
              <button
                type="button"
                className="sliding-arrow sliding-arrow--left hero-arrow-left"
                onClick={() => changePreviewImage(-1)}
                aria-label="Previous slide"
              >
                <i className="bi bi-chevron-left" />
              </button>

              {/* Next image */}
              <button
                type="button"
                className="sliding-arrow sliding-arrow--right hero-arrow-right"
                onClick={() => changePreviewImage(1)}
                aria-label="Next slide"
              >
                <i className="bi bi-chevron-right" />
              </button>

              {/* Close only through this button */}
              <button
                type="button"
                className="product-preview-close"
                onClick={() => setPreviewImage(null)}
                aria-label="Close preview"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
          </div>
        </div>
      )
      }

    </>
  );
}
