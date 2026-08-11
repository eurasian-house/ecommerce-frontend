import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/common/StarRating";
import { toast } from "react-toastify";
import "../styles/components/ProductCard.css";
import { sortSizes } from "../utils/sortSizes";


export default function ProductCard({
  product,
  onClick,
  selectedImage,
  onColorClick,
  cardWidth = "168px",
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
      onClick={onClick || (() => navigate(`/products/${product.slug}`))}
    >
      <div className="card product-card h-100">

        <div className="product-card-image-wrapper">
          <img
            src={selectedImage || product.thumbnail}
            alt={`${product.title} - Handmade ${product.main_category} Rug`}
            className="product-card-image"
            loading="lazy"
          />
        </div>

        <div className="card-body product-card-body">

          <small className="product-category">
            {product.main_category}
          </small>

          <h6 className="product-title">
            {product.title}
          </h6>

          <StarRating
            rating={product.average_rating}
            reviewCount={product.review_count}
          />

          <div className="product-price-row">

            <span className="product-price">
              ${Math.round(Number(product.selling_price))}
            </span>

            <span className="product-old-price">
              ${product.mrp}
            </span>
            <span className="product-discount">
              {product.discount_percent}% OFF
            </span>
          </div>

          <div className="product-colors">
            {product.product_colors?.slice(0, 5).map((c) => (
              <div
                key={c.id}
                title={c.color_name}
                className="product-color-dot"
                onClick={(e) => {
                  e.stopPropagation();
                  onColorClick?.(product.id, c.color_image);
                }}
                style={{
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
                                                                      ? "conic-gradient(red, orange, yellow, green, cyan, blue, violet)"
                                                                      : "#ccc",

                  border:
                    selectedImage === c.color_image
                      ? "2px solid var(--text-primary)"
                      : "1px solid var(--border)",
                }}
              />
            ))}
          </div>

          <div className="product-card-buttons mt-auto">

            <button
                className="btn app-btn-outline btn-sm"
                onClick={(e) => {
                  e.stopPropagation();

                  const sizes = sortSizes(product.product_sizes || []);
                  const chosenSize = sizes[0] || product.product_sizes?.[0] || null;
                  const chosenColor = product.product_colors?.[0] || null;
                  const chosenPrice = Math.round(Number(chosenSize?.selling_price ?? product.selling_price));

                  addToCart({
                    ...product,
                    cartItemId: crypto.randomUUID(),
                    selectedColor: chosenColor,
                    selectedSize: chosenSize,
                    price: chosenPrice,
                    quantity: 1,
                  });

                  navigate("/cart");
                }}
              >
                Buy Now
              </button>

              <button
                className="btn app-btn-primary btn-sm addCart"
                onClick={(e) => {
                  e.stopPropagation();

                  const sizes = sortSizes(product.product_sizes || []);
                  const chosenSize = sizes[0] || product.product_sizes?.[0] || null;
                  const chosenColor = product.product_colors?.[0] || null;
                  const chosenPrice = Math.round(Number(chosenSize?.selling_price ?? product.selling_price));

                  addToCart({
                    ...product,
                    cartItemId: crypto.randomUUID(),
                    selectedColor: chosenColor,
                    selectedSize: chosenSize,
                    price: chosenPrice,
                  });

                  toast.success(
                    <>
                      <div className="fw-semibold">Added to Cart</div>
                      <small>{product.title}</small>
                    </>,
                    {
                      autoClose: 2500,
                    }
                  );
                }}
              >
                Add to Cart
              </button>

          </div>

        </div>

      </div>
    </div>
  );
}
