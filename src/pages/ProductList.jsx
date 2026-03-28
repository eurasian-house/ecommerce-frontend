import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductList({ colorFilter }) { // ✅ receive prop
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [budget, setBudget] = useState("");
  const [discount, setDiscount] = useState("");
  // From CArt
  const { addToCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();
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
  }, [products, search, category, sort, budget, discount, colorFilter]); // ✅ include color

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select(`*, product_colors (*), product_sizes (*)`);

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

        if (budget === "1") return price < 10000;
        if (budget === "2") return price >= 10000 && price < 20000;
        if (budget === "3") return price >= 20000 && price < 50000;
        if (budget === "4") return price >= 50000 && price < 100000;
        if (budget === "5") return price >= 100000;

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

    setFiltered(data);
  };

  const uniqueCategories = [...new Set(products.map((p) => p.main_category))];

  const handleColorClick = (e, id, img) => {
    e.stopPropagation();
    setSelectedImages((prev) => ({ ...prev, [id]: img }));
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mt-4">

      {/* FILTERS */}
      <div className="card p-3 mb-4">
        <div className="row g-3">

          <div className="col-md-3">
            <input
              type="text"
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
              <option value="1">Below 10,000</option>
              <option value="2">10,000 - 20,000</option>
              <option value="3">20,000 - 50,000</option>
              <option value="4">50,000 - 100,000</option>
              <option value="5">Above 100,000</option>
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
              className="col-6 col-md-4 col-lg-3 mb-4"
              onClick={() => handleProductClick(p.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100">

                <img
                  src={selectedImages[p.id]}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "contain" }}
                />

                <div className="card-body">

                  <p className="text-muted small mb-1">
                    {p.main_category}
                  </p>

                  <h6 className="mb-2">{p.title}</h6>

                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">₹{p.selling_price}</span>
                    <span className="text-muted text-decoration-line-through small">
                      ₹{p.mrp}
                    </span>
                  </div>

                  <span className="badge bg-dark mt-2">
                    {p.discount_percent}% OFF
                  </span>

                  <div className="d-flex gap-2 mt-3">
                    {p.product_colors?.map((c) => (
                      <div
                        key={c.id}
                        onClick={(e) =>
                          handleColorClick(e, p.id, c.color_image)
                        }
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: c.color_name.toLowerCase(),
                          border:
                            selectedImages[p.id] === c.color_image
                              ? "2px solid black"
                              : "1px solid #ccc",
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-3 d-grid gap-2">
                    <button
                      onClick={(e) => e.stopPropagation()}
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
  );
}