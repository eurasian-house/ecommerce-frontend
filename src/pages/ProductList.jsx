import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { applyActiveFilter } from '../utils/productQueries'
import SEO from "../components/SEO";

export default function ProductList({ colorFilter }) { // ✅ receive prop
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});

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
  // From CArt
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const hasCountedViews = useRef(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromURL = params.get("search") || "";
    const categoryFromURL = params.get("category") || "";
    const discountFromURL = params.get("discount") || "";

    setSearch(searchFromURL);
    setCategory(categoryFromURL);
    setDiscount(discountFromURL);
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [products, search, category, sort, budget, discount, colorFilter, autoShapes, autoQuality]); // ✅ include color

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
      data = data.filter(
        (p) =>
          p.main_category?.toLowerCase() === category.toLowerCase() ||
          p.sub_category?.toLowerCase() === category.toLowerCase() ||
          p.shape?.toLowerCase() === category.toLowerCase()
      );
    }

    if (autoShapes?.length > 0) {
      data = data.filter((p) =>
        autoShapes.some(
          (shape) =>
            p.shape?.toLowerCase() === shape.toLowerCase()
        )
      );
    }

    if (autoQuality) {
      data = data.filter(
        (p) =>
          p.quality?.toLowerCase() ===
          autoQuality.toLowerCase()
      );
    }

    if (discount) {
      data = data.filter(
        (p) => p.discount_percent >= Number(discount)
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

        if (budget === "1") return price < 299;
        if (budget === "2") return price >= 299 && price < 499;
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

  return (
    <>
      <SEO
        title="Shop All Rugs | Eurasian House"
        description="Browse our collection of handmade rugs including Persian, Kilim, Tibetan, Jute, Dhurrie and more."
        canonical="https://www.eurasianrugs.com/products"
      />

      <div className="container mt-4">

        {/* FILTERS */}
        <div className="card p-3 mb-4">
          <div className="row g-3">

            <div className="col-md-3">
              <input
                type="text"
                id="search"
                name="search"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="new">Date: New → Old</option>
                <option value="old">Date: Old → New</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Budget</option>
                <option value="1">Below $299</option>
                <option value="2">$299 - $499</option>
                <option value="3">$499 - $999</option>
                <option value="4">$999 - $1,499</option>
                <option value="5">Above $1,499</option>
              </select>
            </div>

          </div>
        </div>

        {/* PRODUCTS */}
        <div className="row">
          {filtered?.length === 0 ? (
            <div className="text-center mt-5">
              <h5>No products in this category</h5>
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                onClick={() => handleProductClick(p.slug)}
                style={{ cursor: "pointer" }}
              >
                <div className="card h-100 border-0 shadow-sm overflow-hidden">

                  <img
                    src={selectedImages[p.id]}
                    alt={p.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">

                    <p className="text-muted small mb-1">
                      {p.main_category}
                    </p>

                    <h6
                      className="fw-semibold mb-3"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: "1.4",
                        height: "3em",
                      }}
                    >
                      {p.title}
                    </h6>

                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold">${p.selling_price}</span>
                      <span className="text-muted text-decoration-line-through small">
                        ${p.mrp}
                      </span>
                    </div>

                    <span className="badge bg-dark mt-2">
                      {p.discount_percent}% OFF
                    </span>

                    <div className="d-flex gap-2 mt-4 mb-4 flex-wrap">
                      {p.product_colors?.slice(0, 5).map((c) => (
                        <div
                          key={c.id}
                          onClick={(e) =>
                            handleColorClick(e, p.id, c.color_image)
                          }
                          title={c.color_name}
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            backgroundColor: c.color_name?.toLowerCase(),
                            cursor: "pointer",
                            boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                            border:
                              selectedImages[p.id] === c.color_image
                                ? "3px solid black"
                                : "2px solid #cfcfcf",
                          }}
                        />
                      ))}
                    </div>

                    <div className="mt-3 d-grid gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          const firstColor = p.product_colors?.[0];
                          const firstSize = p.product_sizes?.[0];

                          addToCart({
                            ...p,
                            selectedColor: firstColor,
                            selectedSize: firstSize,
                            price: p.selling_price,
                            quantity: 1,
                          });

                          navigate("/cart");
                        }}
                        className="btn btn-outline-dark btn-sm"
                      >
                        Buy it now
                      </button>
                      {/* Add to cart by selecting first color and first size from the varation */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          const firstColor = p.product_colors?.[0];
                          const firstSize = p.product_sizes?.[0];

                          addToCart({
                            ...p,
                            selectedColor: firstColor,
                            selectedSize: firstSize,
                            price: p.selling_price,
                          });
                        }}
                        className="btn btn-dark btn-sm"
                      >
                        Add to cart
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}