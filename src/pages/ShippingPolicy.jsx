import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function ShippingPolicy() {
  return (
    <>
      <SEO
        title="Shipping Policy | Eurasian House"
        description="View shipping methods, delivery timelines, shipping charges, and order tracking information for Eurasian House."
        canonical="https://www.eurasianrugs.com/shipping-policy"
      />
      <PolicyLayout
        title="Shipping Policy"
        description="Learn about our shipping process, delivery timelines, and order tracking."
        lastUpdated="19 June 2026"
      >
        <h2>1. Order Processing</h2>
        <p>
          Orders are processed after successful payment confirmation. Processing
          time may vary depending on product availability and order volume.
        </p>

        <h2>2. Delivery Timeline</h2>
        <p>
          Estimated delivery times vary by destination and shipping method.
          Delivery dates are estimates and are not guaranteed.
        </p>

        <h2>3. Shipping Charges</h2>
        <p>
          We offer <strong>Free Shipping</strong> to all over the world. Shipping charges, if applicable, will be displayed during checkout or in Product Detail page,
          before you complete your purchase.
        </p>

        <h2>4. Order Tracking</h2>
        <p>
          Following your successful order placement, we will keep you updated on its production progress. Once your order has shipped, we will send you the tracking information via email or your preferred communication channel.
        </p>

        <h2>5. Delivery Delays</h2>
        <p>
          Delays may occur due to weather conditions, public holidays, customs
          clearance, courier issues, or other circumstances beyond our control.
        </p>

        <h2>6. Delivery Address</h2>
        <p>
          Customers are responsible for providing an accurate shipping address.
          Eurasian House is not responsible for delays or failed deliveries caused
          by incorrect address information.
        </p>

        <h2>7. International Shipping</h2>
        <p>
          International shipping may be available for selected destinations.
          Customers are responsible for any customs duties etc
          imposed by their country. But Shipping charge/Delivery charge is completely free.
        </p>

        <h2>8. Damaged Shipments</h2>
        <p>
          If your package arrives damaged, please contact us promptly with photos/videos
          of the package and product so we can investigate and assist you. For return policy please visit <Link
            to="/refund-policy"
            className="fw-bold text-decoration-underline"
          >
            Refund & Return Policy
          </Link>
        </p>

        <h2>9. Contact Us</h2>
        <p>
          For shipping-related questions, please contact us through our <Link
            to="/contact"
            className="fw-bold text-decoration-underline"
          >
            Contact Page
          </Link>
        </p>
      </PolicyLayout>
    </>
  );
}