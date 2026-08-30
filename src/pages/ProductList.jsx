import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { applyActiveFilter } from "../utils/productQueries";
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import "../styles/pages/ProductList.css";

import { trackFilters } from "../lib/analytics";

import {
  MAIN_CATEGORIES,
  SUB_CATEGORIES,
  SHAPES,
  PATTERNS,
  QUALITIES,
  COLORS,
} from "../data/productOptions";

const PRODUCTS_PER_PAGE = 18;

export default function ProductList({ colorFilter }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState("");
  const [mainCategory, setMainCategory] = useState(
    location.state?.autoCategory || ""
  );
  const [subCategory, setSubCategory] = useState("");
  const [shape, setShape] = useState("");
  const [quality, setQuality] = useState("");
  const [pattern, setPattern] = useState("");
  const [color, setColor] = useState("");

  const [sort, setSort] = useState(
    location.state?.autoSort || ""
  );

  const [budget, setBudget] = useState(
    location.state?.autoBudget || ""
  );

  const [discount, setDiscount] = useState("");

  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const requestIdRef = useRef(0);

  /*
   * ---------------------------------------------
   * READ URL FILTERS
   * ---------------------------------------------
   */

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearch(params.get("search") || "");
    setMainCategory(params.get("mainCategory") || "");
    setSubCategory(params.get("subCategory") || "");
    setShape(params.get("shape") || "");
    setQuality(params.get("quality") || "");
    setPattern(params.get("pattern") || "");
    setColor(params.get("color") || "");
    setDiscount(params.get("discount") || "");
    setSort(params.get("sort") || "");
    setBudget(params.get("budget") || "");
  }, [location.search]);

  /*
   * ---------------------------------------------
   * AUTO FILTERS FROM NAVIGATION STATE
   * ---------------------------------------------
   */

  const autoQuality = location.state?.autoQuality || "";
  const autoShapes = location.state?.autoShapes || [];

  const activeQuality = autoQuality || quality;
  const activeColor = colorFilter || color;

  /*
   * ---------------------------------------------
   * UPDATE URL
   * ---------------------------------------------
   */

  const updateURL = (key, value) => {
    const params = new URLSearchParams(location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  /*
   * ---------------------------------------------
   * BUILD DATABASE QUERY
   * ---------------------------------------------
   */

  const buildQuery = () => {
    let query = supabase
      .from("products")
      .select(
        `
          *,
          product_colors (*),
          product_sizes (*)
        `,
        { count: "exact" }
      );

    /*
     * ACTIVE PRODUCTS
     */

    query = applyActiveFilter(query);

    /*
     * SEARCH
     * Preserves your previous logic:
     * title search
     */

    if (search.trim()) {
      query = query.ilike(
        "title",
        `%${search.trim()}%`
      );
    }

    /*
     * MAIN CATEGORY
     */

    if (mainCategory) {
      query = query.eq(
        "main_category",
        mainCategory
      );
    }

    /*
     * SUB CATEGORY
     * Array column
     */

    if (subCategory) {
      query = query.contains(
        "sub_category",
        [subCategory]
      );
    }

    /*
     * SHAPE
     *
     * URL autoShapes can contain multiple shapes.
     */

    if (autoShapes.length > 0) {
      query = query.in(
        "shape",
        autoShapes
      );
    } else if (shape) {
      query = query.eq(
        "shape",
        shape
      );
    }

    /*
     * QUALITY
     */

    if (activeQuality) {
      query = query.eq(
        "quality",
        activeQuality
      );
    }

    /*
     * PATTERN
     */

    if (pattern) {
      query = query.eq(
        "pattern",
        pattern
      );
    }


    /*
     * COLOR
     *
     * Uses products.primary_color
     */

    if (activeColor) {
      query = query.eq(
        "primary_color",
        activeColor
      );
    }

    /*
     * DISCOUNT
     *
     * Preserves your existing logic.
     */

    if (discount) {
      query = query.eq(
        "discount_percent",
        Number(discount)
      );
    }

    /*
     * BUDGET
     *
     * Preserves your CURRENT logic:
     * products.selling_price
     */

    if (budget === "1") {
      query = query.lt(
        "selling_price",
        100
      );
    }

    if (budget === "2") {
      query = query
        .gte("selling_price", 100)
        .lt("selling_price", 499);
    }

    if (budget === "3") {
      query = query
        .gte("selling_price", 499)
        .lt("selling_price", 999);
    }

    if (budget === "4") {
      query = query
        .gte("selling_price", 999)
        .lt("selling_price", 1499);
    }

    if (budget === "5") {
      query = query.gte(
        "selling_price",
        1499
      );
    }

    /*
     * SORTING
     */

    if (sort === "az") {
      query = query.order(
        "title",
        { ascending: true }
      );
    } else if (sort === "za") {
      query = query.order(
        "title",
        { ascending: false }
      );
    } else if (sort === "old") {
      query = query.order(
        "created_at",
        { ascending: true }
      );
    } else if (sort === "low") {
      query = query.order(
        "selling_price",
        { ascending: true }
      );
    } else if (sort === "high") {
      query = query.order(
        "selling_price",
        { ascending: false }
      );
    } else {
      /*
       * Default + "new"
       */

      query = query.order(
        "created_at",
        { ascending: false }
      );
    }

    return query;
  };

  /*
   * ---------------------------------------------
   * FETCH FIRST 18 PRODUCTS
   * ---------------------------------------------
   */

  const fetchFirstPage = async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setPage(0);

    try {
      const query = buildQuery();

      const {
        data,
        error,
        count,
      } = await query.range(
        0,
        PRODUCTS_PER_PAGE - 1
      );

      if (error) {
        throw error;
      }

      /*
       * Ignore old requests if filters changed
       */

      if (requestId !== requestIdRef.current) {
        return;
      }

      const productData = data || [];

      setProducts(productData);
      setTotalCount(count || 0);

      const imgs = {};

      productData.forEach((p) => {
        imgs[p.id] = p.thumbnail;
      });

      setSelectedImages(imgs);

    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );

      if (requestId === requestIdRef.current) {
        setProducts([]);
        setTotalCount(0);
      }

    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  /*
   * ---------------------------------------------
   * FETCH NEXT 18 PRODUCTS
   * ---------------------------------------------
   */

  const loadMore = async () => {
    if (loadingMore) return;

    setLoadingMore(true);

    try {
      const nextPage = page + 1;

      const from =
        nextPage * PRODUCTS_PER_PAGE;

      const to =
        from + PRODUCTS_PER_PAGE - 1;

      const query = buildQuery();

      const {
        data,
        error,
      } = await query.range(
        from,
        to
      );

      if (error) {
        throw error;
      }

      const newProducts = data || [];

      setProducts((prev) => [
        ...prev,
        ...newProducts,
      ]);

      setSelectedImages((prev) => {
        const updated = { ...prev };

        newProducts.forEach((p) => {
          updated[p.id] =
            updated[p.id] || p.thumbnail;
        });

        return updated;
      });

      setPage(nextPage);

    } catch (error) {
      console.error(
        "Error loading more products:",
        error
      );

    } finally {
      setLoadingMore(false);
    }
  };

  /*
   * ---------------------------------------------
   * REFETCH WHEN FILTERS CHANGE
   * ---------------------------------------------
   */

  useEffect(() => {
    fetchFirstPage();

  }, [
    search,
    mainCategory,
    subCategory,
    shape,
    activeQuality,
    pattern,
    sort,
    budget,
    discount,
    activeColor,
    autoShapes.join(","),
  ]);

  /*
   * ---------------------------------------------
   * ANALYTICS
   * ---------------------------------------------
   */

  useEffect(() => {
    const hasFilters =
      mainCategory ||
      subCategory ||
      search ||
      budget ||
      discount ||
      colorFilter ||
      shape ||
      activeQuality ||
      pattern ||
      sort;

    if (!hasFilters) return;

    trackFilters({
      mainCategory: mainCategory || "All",
      subCategory: subCategory || "",
      search: search || "",
      budget: budget || "",
      discount: discount || "",
      color: activeColor || "",
      shape:
        autoShapes.length > 0
          ? autoShapes.join(", ")
          : shape || "",
      quality: activeQuality || "",
      pattern: pattern || "",
      sort: sort || "",
    });

  }, [
    mainCategory,
    subCategory,
    search,
    budget,
    discount,
    activeColor,
    shape,
    activeQuality,
    pattern,
    sort,
    autoShapes.join(","),
  ]);

  /*
   * ---------------------------------------------
   * COLOR IMAGE CHANGE
   * ---------------------------------------------
   */

  const handleColorClick = (
    productId,
    image
  ) => {
    setSelectedImages((prev) => ({
      ...prev,
      [productId]: image,
    }));
  };

  /*
   * ---------------------------------------------
   * RESET ALL FILTERS
   * ---------------------------------------------
   */

  const clearFilters = () => {
    navigate("/products");
  };

  const hasMore =
    products.length < totalCount;

  return (
    <>
      <SEO
        title="Shop All Rugs | Eurasian House"
        description="Browse our collection of handmade rugs including Persian, Kilim, Tibetan, Jute, Dhurrie and more."
        canonical="https://www.eurasianrugs.com/products"
      />

      <div className="container mt-4">

        {/* FILTER PANEL */}

        <div className="filter-panel">

          <div className="filter-header">

            <h4 className="filter-title">
              Explore Our Collection
            </h4>

            <div className="filter-meta-row">

              <span className="filter-count">
                {totalCount} Products
              </span>

              <button
                type="button"
                className="clear-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          </div>

          <button
            className="filter-toggle-btn d-md-none"
            onClick={() =>
              setShowFilters(!showFilters)
            }
          >
            <i className="bi bi-sliders me-2"></i>

            {showFilters
              ? "Hide Filters"
              : "Filter & Sort"}
          </button>

          <div
            className={
              `${showFilters
                ? "d-block"
                : "d-none"
              } d-md-block`
            }
          >

            <div className="row g-3 filters">

              {/* SEARCH */}

              <div className="col-md-3">

                <input
                  type="text"
                  className="app-input"
                  placeholder="Search rugs..."
                  value={search}
                  onChange={(e) => {
                    updateURL(
                      "search",
                      e.target.value
                    );
                  }}
                />

              </div>


              {/* MAIN CATEGORY */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={mainCategory}
                  onChange={(e) =>
                    updateURL(
                      "mainCategory",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Main Category
                  </option>

                  {MAIN_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>


              {/* SUB CATEGORY */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={subCategory}
                  onChange={(e) =>
                    updateURL(
                      "subCategory",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Sub Category
                  </option>

                  {SUB_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>


              {/* SHAPE */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={shape}
                  onChange={(e) =>
                    updateURL(
                      "shape",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Shape
                  </option>

                  {SHAPES.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>


              {/* QUALITY */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={quality}
                  onChange={(e) =>
                    updateURL(
                      "quality",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Quality
                  </option>

                  {QUALITIES.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>


              {/* PATTERN */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={pattern}
                  onChange={(e) =>
                    updateURL(
                      "pattern",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Pattern
                  </option>

                  {PATTERNS.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>



              {/* PRIMARY COLOR */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={activeColor}
                  onChange={(e) =>
                    updateURL(
                      "color",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Color
                  </option>

                  {COLORS.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>


              {/* BUDGET */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={budget}
                  onChange={(e) =>
                    updateURL(
                      "budget",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Budget
                  </option>

                  <option value="1">
                    Below $100
                  </option>

                  <option value="2">
                    $100 - $499
                  </option>

                  <option value="3">
                    $499 - $999
                  </option>

                  <option value="4">
                    $999 - $1,499
                  </option>

                  <option value="5">
                    Above $1,499
                  </option>

                </select>

              </div>


              {/* DISCOUNT */}

              <div className="col-md-3">

                <input
                  type="number"
                  className="app-input"
                  placeholder="Discount %"
                  value={discount}
                  onChange={(e) =>
                    updateURL(
                      "discount",
                      e.target.value
                    )
                  }
                />

              </div>


              {/* SORT */}

              <div className="col-md-3">

                <select
                  className="app-select"
                  value={sort}
                  onChange={(e) =>
                    updateURL(
                      "sort",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Sort By
                  </option>

                  <option value="az">
                    A → Z
                  </option>

                  <option value="za">
                    Z → A
                  </option>

                  <option value="new">
                    Newest First
                  </option>

                  <option value="old">
                    Oldest First
                  </option>

                  <option value="low">
                    Price: Low to High
                  </option>

                  <option value="high">
                    Price: High to Low
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* PRODUCTS */}

        <div className="row products-grid">

          {loading ? (

            <div className="col-12 text-center py-5">

              <div
                className="spinner-border"
                role="status"
              />

            </div>

          ) : products.length === 0 ? (

            <div className="col-12">

              <div className="empty-products">

                <i className="bi bi-search display-4 mb-3"></i>

                <h3>
                  No Products Found
                </h3>

                <p>
                  Try adjusting your search or
                  filters to discover more beautiful
                  rugs.
                </p>

              </div>

            </div>

          ) : (

            products.map((p) => (

              <div
                key={p.id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 cards-body"
              >

                <ProductCard
                  product={p}
                  selectedImage={
                    selectedImages[p.id]
                  }
                  onColorClick={handleColorClick}
                  cardWidth="100%"
                />

              </div>

            ))

          )}

        </div>


        {/* VIEW MORE */}

        {hasMore && !loading && (

          <div className="load-more-wrapper">

            <button
              className="app-btn-luxury"
              onClick={loadMore}
              disabled={loadingMore}
            >

              {loadingMore ? (
                <>
                  <span>
                    Loading...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    View More Collections
                  </span>

                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}

            </button>

          </div>

        )}

      </div>
    </>
  );
}