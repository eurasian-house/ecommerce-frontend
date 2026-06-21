import { Link } from "react-router-dom";
import { FaHome, FaShoppingBag } from "react-icons/fa";

export default function NotFound() {
  return (
    <div
      className="container text-center d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "700",
          color: "#0d6efd",
        }}
      >
        404
      </h1>

      <h2 className="fw-bold mb-3">Oops! Page Not Found</h2>

      <p className="text-muted mb-4" style={{ maxWidth: "550px" }}>
        The page you're looking for may have been moved, deleted, or the URL
        might be incorrect.
      </p>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="/" className="btn btn-primary">
          <FaHome className="me-2" />
          Go Home
        </Link>

        <Link to="/products" className="btn btn-outline-primary">
          <FaShoppingBag className="me-2" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}