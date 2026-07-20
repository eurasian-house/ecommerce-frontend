import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/common/StarRating";
import { toast } from "react-toastify";

export default function ProductCard({
  product,
  onClick,
  selectedImage,
  onColorClick,
  cardWidth = "200px",
}) {


  const { addToCart } = useCart();
  const navigate = useNavigate();


  return (
    <div
      style={{
        width: cardWidth,
        flex: "0 0 auto",
        cursor: "pointer",
      }}
      onClick={
        onClick ||
        (() => navigate(`/products/${product.slug}`))
      }
    >
      <div className="card product-card h-100 shadow-sm border-0 overflow-hidden">

        <img
          className="card-img-top product-card-image"
          src={selectedImage || product.thumbnail}
          alt={`${product.title} - Handmade ${product.main_category} Rug`}
          style={{
            width: "100%",
            aspectRatio: "4  / 3",
            objectFit: "cover",
          }}
          loading="lazy"
        />

        <div className="card-body d-flex flex-column p-3">

          <p className="text-muted small" style={{ marginBottom: "1px" }}>
            {product.main_category}
          </p>

          <h6
            className="fw-semibold mb-0"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              height: "2.6em",
              lineHeight: "1.3",
              fontSize: "0.95rem",
              wordBreak: "break-word",
            }}
          >
            {product.title}
          </h6>

          <StarRating
            rating={product.average_rating}
            reviewCount={product.review_count}
          />

          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-6" style={{ color: "#198754" }}>
              ${Math.round(Number(product.selling_price))}
            </span>

            <span className="text-muted text-decoration-line-through small">
              ${product.mrp}
            </span>
          </div>

          <span
            className="badge bg-dark align-self-start mb-3"
          >
            {product.discount_percent}% OFF
          </span>

          <div className="d-flex gap-2 mb-1 flex-wrap">
            {product.product_colors?.slice(0, 5).map((c) => (
              <div
                className="product-color-dot"
                key={c.id}
                title={c.color_name}
                onClick={(e) => {
                  e.stopPropagation();

                  onColorClick?.(
                    product.id,
                    c.color_image
                  );
                }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background:
                    c.color_name === "Maroon" ? "#7A1F3D" :
                      c.color_name === "Gold" ? "#D4AF37" :
                        c.color_name === "Navy" ? "#1E3A8A" :
                          c.color_name === "Blue" ? "#2563EB" :
                            c.color_name === "Sky Blue" ? "#38BDF8" :
                              c.color_name === "Green" ? "#2E8B57" :
                                c.color_name === "Olive" ? "#6B8E23" :
                                  c.color_name === "Beige" ? "#DCC9A3" :
                                    c.color_name === "Cream" ? "#FFFDD0" :
                                      c.color_name === "Ivory" ? "#FFFFF0" :
                                        c.color_name === "Brown" ? "#7B4A2F" :
                                          c.color_name === "Grey" ? "#8B8B8B" :
                                            c.color_name === "Silver" ? "#C0C0C0" :
                                              c.color_name === "White" ? "#FFFFFF" :
                                                c.color_name === "Black" ? "#1F1F1F" :
                                                  c.color_name === "Teal" ? "#0F766E" :
                                                    c.color_name === "Pink" ? "#EC4899" :
                                                      c.color_name === "Purple" ? "#7C3AED" :
                                                        c.color_name === "Orange" ? "#EA580C" :
                                                          c.color_name === "Red" ? "#DC2626" :
                                                            c.color_name === "Rust" ? "#B7410E" :
                                                              c.color_name === "Mustard" ? "#D4A017" :
                                                                c.color_name === "Tan" ? "#D2B48C" :
                                                                  c.color_name === "Yellow" ? "#FACC15" :
                                                                    c.color_name === "Multicolor"
                                                                      ? "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)"
                                                                      : "#ccc",
                  border:
                    selectedImage === c.color_image
                      ? "3px solid black"
                      : "2px solid #cfcfcf",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,.15)",
                }}
              />
            ))}
          </div>

          <div className="mt-auto d-grid gap-1">

            <button
              onClick={(e) => {
                e.stopPropagation();

                const firstColor = product.product_colors?.[0];
                const firstSize = product.product_sizes?.[0];

                addToCart({
                  ...product,
                  cartItemId: crypto.randomUUID(),
                  selectedColor: firstColor,
                  selectedSize: firstSize,
                  price: Math.round(Number(product.selling_price)),
                  quantity: 1,
                });

                navigate("/cart");
              }}
              className="btn btn-outline-dark btn-sm"
            >
              Buy it now
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();

                const firstColor =
                  product.product_colors?.[0];

                const firstSize =
                  product.product_sizes?.[0];

                addToCart({
                  ...product,
                  cartItemId: crypto.randomUUID(),
                  selectedColor: firstColor,
                  selectedSize: firstSize,
                  price: Math.round(Number(product.selling_price)),
                });
                toast.success(
                  <div>
                    <div className="fw-semibold">Added to Cart</div>
                    <small>{product.title}</small>
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
              className="btn btn-dark btn-sm"
            >
              Add to cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
