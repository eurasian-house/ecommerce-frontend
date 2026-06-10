import { useLocation } from "react-router-dom";

export default function WhatsAppFloat() {
  const location = useLocation();

  const path = location.pathname;

  let message = "Hi, I have a General question.";

  if (path.includes("/login")) {
    message = "Hi, I am facing an issue while logging in.";
  } else if (path.includes("/signup")) {
    message = "Hi, I need help creating my account.";
  } else if (path.includes("/forgot-password")) {
    message = "Hi, I need help resetting my password.";
  } else if (path.includes("/cart")) {
    message = "Hi, I need help with my cart/order.";
  } else if (path.includes("/products")) {
    message = `Hi, I need help regarding this product/page: ${window.location.href}`;
  }

  const whatsappLink =
    `https://wa.me/917054763786?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#0d6efd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
        color: "white",
        textDecoration: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        zIndex: 9999,
      }}
    >
      💬
    </a>
  );
}