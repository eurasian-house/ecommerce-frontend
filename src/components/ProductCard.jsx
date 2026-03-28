import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();

  return (
    <div
      style={{ width: "260px", flex: "0 0 auto", cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="card h-100">

        <img
          src={product.thumbnail}
          className="card-img-top"
          style={{ height: "180px", objectFit: "contain" }}
        />

        <div className="card-body">
          <p className="text-muted small mb-1">
            {product.main_category}
          </p>

          <h6 className="mb-2">{product.title}</h6>

          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">₹{product.selling_price}</span>
            <span className="text-muted text-decoration-line-through small">
              ₹{product.mrp}
            </span>
          </div>

          <span className="badge bg-dark mt-2">
            {product.discount_percent}% OFF
          </span>

          <div className="d-flex gap-2 mt-3">
            {product.product_colors?.map((c) => (
              <div
                key={c.id}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: c.color_name.toLowerCase(),
                  border: "1px solid #ccc",
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
  );
}