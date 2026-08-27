import { useState } from "react";
import { useLocation } from "react-router-dom";
import { trackWhatsApp } from "../lib/analytics";
import "../styles/components/WhatsAppFloat.css";

export default function WhatsAppFloat() {
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(true);

  const path = location.pathname;

  let message = "Hi, I have a doubt.";

  if (path.includes("/login")) {
    message = "Hi, I am facing an issue while logging in.";
  } else if (path.includes("/signup")) {
    message = "Hi, I need help creating my account.";
  } else if (path.includes("/account")) {
    message = "Hi, I need help setting up my account.";
  } else if (path.includes("/forgot-password")) {
    message = "Hi, I need help resetting my password.";
  } else if (path.includes("/cart")) {
    message = "Hi, I need help with my cart/order.";
  } else if (path.includes("/blogs")) {
    message = "Hi, I need help with your blogs.";
  } else if (path.includes("/products")) {
    message = `Hi, I need help regarding this product/page: ${window.location.href}`;
  }

  const whatsappLink =
    `https://wa.me/917080012972?text=${encodeURIComponent(message)}`;

  return (
    <>
      {showPrompt && (
        <div className="whatsapp-prompt" role="status">
          <span>Message on WhatsApp for instant reply</span>
          <button
            type="button"
            className="whatsapp-prompt-close"
            aria-label="Close WhatsApp message"
            onClick={() => setShowPrompt(false)}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
      )}

      <a
        className="whatsapp-float"
        href={whatsappLink}
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsApp}
      >
        <i className="bi bi-whatsapp" aria-hidden="true"></i>
      </a>
    </>
  );
}
