import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { applyActiveFilter } from '../utils/productQueries'
import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import "../styles/pages/ProductList.css";

import { trackFilters } from "../lib/analytics";

export default function ProductList({ colorFilter }) { // ✅ receive prop
  // Pagination state
  const [visibleCount, setVisibleCount] = useState(10);

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  const location = useLocation();
  const [category, setCategory] = useState(
    location.state?.autoCategory || ""
  );
  const [sort, setSort] = useState(
    location.state?.autoSort || ""
  );
  const [budget, setBudget] = useState(
    location.state?.autoBudget || ""
  );
  const autoQuality = location.state?.autoQuality;
  const autoShapes = location.state?.autoShapes;



  const [discount, setDiscount] = useState("");
  const [shape, setShape] = useState("");
  const [quality, setQuality] = useState("");
  // From CArt
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const hasCountedViews = useRef(false);

  useEffect(() => {
    setVisibleCount(18);
  }, [search, category, sort, budget, discount, colorFilter, autoShapes, autoQuality]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get("search") || "";
    const categoryFromURL = params.get("category") || "";
    const discountFromURL = params.get("discount") || "";
    const shapeFromURL = params.get("shape") || "";
    const qualityFromURL = params.get("quality") || "";
    const sortFromURL = params.get("sort") || "";
    const budgetFromURL = params.get("budget") || "";

    setSearch(searchFromURL);
    setCategory(categoryFromURL);
    setDiscount(discountFromURL);
    setSort(sortFromURL);
    setBudget(budgetFromURL);
    setShape(shapeFromURL);
    setQuality(qualityFromURL);
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, search, category, sort, budget, discount, colorFilter, shape, quality]); // ✅ include color


  useEffect(() => {
    const hasFilters =
      category ||
      search ||
      budget ||
      discount ||
      colorFilter ||
      autoShapes?.length ||
      autoQuality ||
      sort;

    if (!hasFilters) return;

    trackFilters({
      category: category || "All",
      search: search || "",
      budget: budget || "",
      discount: discount || "",
      color: colorFilter || "",
      shape: autoShapes?.join(", ") || "",
      quality: autoQuality || "",
      sort: sort || "",
    });
  }, [
    category,
    search,
    budget,
    discount,
    colorFilter,
    autoShapes,
    autoQuality,
    sort,
  ]);

  const fetchProducts = async () => {
    let query = supabase
      .from("products")
      .select(`*, product_colors (*), product_sizes (*)`);

    // ✅ ADD THIS
    query = applyActiveFilter(query);

    const { data } = await query;

    setProducts(data);
    setFiltered(data);

    const imgs = {};
    data?.forEach((p) => (imgs[p.id] = p.thumbnail));
    setSelectedImages(imgs);

    if (!hasCountedViews.current) {
      data?.forEach(async (p) => {
        await supabase.rpc("increment_views", { row_id: p.id });
      });
      hasCountedViews.current = true;
    }
  };

  const applyFilters = () => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((p) =>
        p.main_category?.toLowerCase().includes(category.toLowerCase()) ||

        (p.sub_category || []).some(
          (sub) => sub.toLowerCase().includes(category.toLowerCase())
        ) ||

        p.shape?.toLowerCase() === category.toLowerCase()
      );
    }

    if (shape) {
      const selectedShapes = shape
        .split(",")
        .map((s) => s.trim().toLowerCase());

      data = data.filter((p) =>
        selectedShapes.includes(
          p.shape?.toLowerCase()
        )
      );
    }

    if (quality) {
      data = data.filter(
        (p) =>
          p.quality?.toLowerCase() ===
          quality.toLowerCase()
      );
    }

    if (discount) {
      data = data.filter(
        (p) => p.discount_percent == Number(discount)
      );
    }

    // ✅ COLOR FILTER
    if (colorFilter) {
      data = data.filter((p) =>
        p.product_colors?.some(
          (c) =>
            c.color_name?.toLowerCase() === colorFilter.toLowerCase()
        )
      );
    }

    if (budget) {
      data = data.filter((p) => {
        const price = p.selling_price;

        if (budget === "1") return price < 100;
        if (budget === "2") return price >= 100 && price < 499;
        if (budget === "3") return price >= 499 && price < 999;
        if (budget === "4") return price >= 999 && price < 1499;
        if (budget === "5") return price >= 1499;

        return true;
      });
    }

    if (sort) {
      if (sort === "az") data.sort((a, b) => a.title.localeCompare(b.title));
      if (sort === "za") data.sort((a, b) => b.title.localeCompare(a.title));
      if (sort === "new") data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      if (sort === "old") data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      if (sort === "low") data.sort((a, b) => a.selling_price - b.selling_price);
      if (sort === "high") data.sort((a, b) => b.selling_price - a.selling_price);
    }

    setFiltered(prev => {
      const prevString = JSON.stringify(prev);
      const newString = JSON.stringify(data);

      if (prevString === newString) return prev;

      return data;
    });
  };

  const uniqueCategories = [...new Set(products.map((p) => p.main_category))];

  const handleColorClick = (e, id, img) => {
    e.stopPropagation();
    setSelectedImages((prev) => ({ ...prev, [id]: img }));
  };

  const handleProductClick = (slug) => {
    navigate(`/products/${slug}`);
  };

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

            <span className="filter-count">
              {filtered.length} Products
            </span>
          </div>

          <button
            className="filter-toggle-btn d-md-none"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-sliders me-2"></i>
            {showFilters ? "Hide Filters" : "Filter & Sort"}
          </button>

          <div className={`${showFilters ? "d-block" : "d-none"} d-md-block`}>
            <div className="row g-3">

              {/* Search */}
              <div className="col-md-3">
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="app-input"
                  placeholder="Search rugs..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    updateURL("search", e.target.value);
                  }}
                />
              </div>

              {/* Category */}
              <div className="col-md-3">
                <select
                  className="app-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    updateURL("category", e.target.value);
                  }}
                >
                  <option value="">All Categories</option>

                  {uniqueCategories.map((c, i) => (
                    <option
                      key={i}
                      value={c}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="col-md-3">
                <select
                  className="app-select"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    updateURL("sort", e.target.value);
                  }}
                >
                  <option value="">Sort By</option>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                  <option value="new">Newest First</option>
                  <option value="old">Oldest First</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>

              {/* Budget */}
              <div className="col-md-3">
                <select
                  className="app-select"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    updateURL("budget", e.target.value);
                  }}
                >
                  <option value="">Budget</option>
                  <option value="1">Below $100</option>
                  <option value="2">$100 - $499</option>
                  <option value="3">$499 - $999</option>
                  <option value="4">$999 - $1,499</option>
                  <option value="5">Above $1,499</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* PRODUCTS  */}
        <div className="row products-grid">

          {filtered?.length === 0 ? (

            <div className="col-12">
              <div className="empty-products">
                <i className="bi bi-search display-4 mb-3"></i>

                <h3>No Products Found</h3>

                <p>
                  Try adjusting your search or filters to discover more beautiful rugs.
                </p>
              </div>
            </div>

          ) : (

            filtered.slice(0, visibleCount).map((p) => (

              <div
                key={p.id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 cards-body"
              >
                <ProductCard
                  product={p}
                  selectedImage={selectedImages[p.id]}
                  onColorClick={(productId, image) =>
                    setSelectedImages((prev) => ({
                      ...prev,
                      [productId]: image,
                    }))
                  }
                  cardWidth="100%"
                />
              </div>

            ))

          )}

        </div>

      </div>

      {visibleCount < filtered.length && (

        <div className="load-more-wrapper">

          <button
            className="app-btn-luxury"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            <span>View More Collections</span>
            <i className="bi bi-arrow-right ms-2"></i>
          </button>

        </div>

      )}
    </>
  );
}
