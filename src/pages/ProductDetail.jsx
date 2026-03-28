import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ added

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [related, setRelated] = useState([]);
  const [displayPrice, setDisplayPrice] = useState({
    selling: 0,
    mrp: 0,
    discount: 0
  });
  // From Cart
  const { addToCart } = useCart();

  const hasIncremented = useRef(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!hasIncremented.current) {
      incrementClick();
      hasIncremented.current = true;
    }
  }, []);

  useEffect(() => {
    if (product) {
      setDisplayPrice({
        selling: product.selling_price,
        mrp: product.mrp,
        discount: product.discount_percent
      });
    }
  }, [product]);

  const incrementClick = async () => {
    await supabase.rpc("increment_clicks", { row_id: id });
  };

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select(`*, product_colors (*), product_sizes (*)`)
      .eq("id", id)
      .single();

    if (data) {
      const allImages = [
        data.thumbnail,
        ...(data.images || []),
        ...(data.product_colors?.map(c => c.color_image) || [])
      ];

      setImages(allImages);
      setSelectedImage(data.thumbnail);

      const { data: relatedData } = await supabase
        .from("products")
        .select("*")
        .eq("main_category", data.main_category)
        .eq("shape", data.shape)
        .neq("id", data.id)
        .limit(12);

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

  const isSelectionValid = selectedSize && selectedColor;

  if (!product) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">

      <div className="card p-4">
        <div className="d-flex gap-4">

          <div style={{ flex: 1 }}>
            <div className="d-flex gap-3">

              <div className="d-flex flex-column gap-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setSelectedImage(img)}
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

              <div style={{ flex: 1, position: "relative", textAlign: "center" }}>
                <button onClick={prevImage} style={{ position: "absolute", left: 0, top: "45%" }}>◀</button>

                <img src={selectedImage} style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} />

                <button onClick={nextImage} style={{ position: "absolute", right: 0, top: "45%" }}>▶</button>
              </div>

            </div>
          </div>

          <div style={{ flex: 1 }}>

            <p className="text-muted mb-1">{product.main_category}</p>
            <h2>{product.title}</h2>

            <div className="d-flex gap-3 align-items-center mt-2">
              <h4>₹{displayPrice.selling}</h4>
              <span className="text-decoration-line-through text-muted">₹{displayPrice.mrp}</span>
              <span className="badge bg-dark">{displayPrice.discount}% OFF</span>
            </div>

            <p className="text-muted mt-2" style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}>
              {product.description}
            </p>

            {/* COLORS */}
            <div className="mt-3">
              <strong>Colors:</strong>
              <div className="d-flex gap-2 mt-2">
                {product.product_colors?.map((c, i) => (
                  <img
                    key={i}
                    src={c.color_image}
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
              <div className="d-flex gap-2 mt-2 overflow-auto">
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
                          : s.selling_price || product.selling_price;

                      setDisplayPrice({
                        selling,
                        mrp: mrp || product.mrp,
                        discount: discount || product.discount_percent
                      });
                    }}
                    style={{
                      minWidth: "80px",
                      border: selectedSize === s ? "2px solid black" : "1px solid #ccc"
                    }}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3">Shape: {product.shape}</p>
            <p>Material: {product.materials}</p>

            {/* BUTTONS */}
            <div className="mt-4 d-flex gap-3">
              <button
                className="btn btn-dark w-50"
                disabled={!isSelectionValid}
                onClick={() => {
                  if (!isSelectionValid) return;
                  console.log("Buy Now", { product, selectedSize, selectedColor });
                }}
              >
                Buy Now
              </button>

              <button
                className="btn btn-outline-dark w-50"
                disabled={!isSelectionValid}
                onClick={() => {
                  if (!isSelectionValid) return;

                  addToCart({
                    ...product,
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
      <div className="card p-4 mt-5">

        <h5 className="text-muted text-center">Related Products</h5>
        <h2 className="text-center mb-4">Explore Related Products</h2>

        <div className="d-flex gap-3 overflow-auto">

          {related.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)} // ✅ added
              style={{
                minWidth: "220px",
                border: "1px solid #eee",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer" // ✅ added
              }}
            >

              <img
                src={p.thumbnail}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <p className="text-muted mt-2 mb-1" style={{ fontSize: "12px" }}>
                {p.main_category}
              </p>

              <h6>{p.title}</h6>

              <div className="d-flex gap-2 align-items-center">
                <span>₹{p.selling_price}</span>
                <span style={{
                  textDecoration: "line-through",
                  fontSize: "12px",
                  color: "#888"
                }}>
                  ₹{p.mrp}
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}