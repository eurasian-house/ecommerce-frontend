import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  onClick,
  selectedImage,
  onColorClick,
}) {


  const { addToCart } = useCart();
  const navigate = useNavigate();


  return (
    <div
      style={{
        width: "280px",
        flex: "0 0 auto",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="card h-100 shadow-sm border-0 overflow-hidden">

        <img
          src={selectedImage || product.thumbnail}
          alt={`${product.title} - Handmade ${product.main_category} Rug`}
          className="card-img-top"
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
          loading="lazy"
        />

        <div className="card-body d-flex flex-column">

          <p className="text-muted small mb-1">
            {product.main_category}
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
              height: "3.0em",
              wordBreak: "break-word",
            }}
          >
            {product.title}
          </h6>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-5">
              ${product.selling_price}
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

          <div className="d-flex gap-2 mb-4 flex-wrap">
            {product.product_colors?.slice(0, 5).map((c) => (
              <div
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
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor:
                    c.color_name?.toLowerCase(),
                  border:
                    selectedImage === c.color_image
                      ? "3px solid black"
                      : "2px solid #cfcfcf",
                  cursor: "pointer",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,.15)",
                }}
              />
            ))}
          </div>

          <div className="mt-auto d-grid gap-2">

            <button
              onClick={(e) => {
                e.stopPropagation();

                const firstColor = product.product_colors?.[0];
                const firstSize = product.product_sizes?.[0];

                addToCart({
                  ...product,
                  selectedColor: firstColor,
                  selectedSize: firstSize,
                  price: product.selling_price,
                  quantity: 1,
                });

                navigate("/cart");
              }}
              className="btn btn-outline-dark"
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
                  selectedColor: firstColor,
                  selectedSize: firstSize,
                  price: product.selling_price,
                });
              }}
              className="btn btn-dark"
            >
              Add to cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}