import { Link } from "react-router-dom";
import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import "../styles/pages/policies.css";


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
                description="Learn about our shipping process, delivery timelines, order tracking, and international shipping."
                lastUpdated="19 June 2026"
            >

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-box-seam me-2"></i>
                        Order Processing
                    </h2>

                    <p>
                        Orders are processed after successful payment
                        confirmation. Processing time may vary depending on
                        product availability, customization requirements, and
                        current order volume.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-clock-history me-2"></i>
                        Delivery Timeline
                    </h2>

                    <p>
                        Estimated delivery times vary depending on your shipping
                        destination and selected shipping method. Delivery dates
                        are estimates and are not guaranteed. Your estimated
                        delivery date will be displayed on the Product Detail
                        page and again during checkout.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-truck me-2"></i>
                        Shipping Charges
                    </h2>

                    <p>
                        We proudly offer <strong>Free Worldwide Shipping</strong>
                        {" "}on eligible orders. If any shipping charges apply,
                        they will always be displayed before you complete your
                        purchase.
                    </p>

                    <div className="alert alert-info rounded-4 mt-3 mb-0">

                        <strong>Customs & Import Duties</strong>

                        <br /><br />

                        Customs duties, import taxes, VAT, or other government
                        charges are <strong>not included</strong> in the product
                        or shipping price. These charges vary by country and are
                        determined by your local customs authority. Buyers are
                        responsible for paying any applicable import fees.

                    </div>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-geo-alt me-2"></i>
                        Order Tracking
                    </h2>

                    <p>
                        After your order is placed, we'll keep you updated
                        throughout the production process. Once your order has
                        shipped, tracking details will be sent via email or your
                        preferred communication method.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-hourglass-split me-2"></i>
                        Delivery Delays
                    </h2>

                    <p>
                        Delivery delays may occasionally occur due to weather,
                        customs clearance, public holidays, courier disruptions,
                        or other circumstances beyond our reasonable control.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-house-door me-2"></i>
                        Delivery Address
                    </h2>

                    <p>
                        Customers are responsible for providing a complete and
                        accurate shipping address. Eurasian House cannot be held
                        responsible for delays or failed deliveries caused by
                        incorrect or incomplete address information.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-globe2 me-2"></i>
                        International Shipping
                    </h2>

                    <p>
                        We ship to customers around the world. While shipping is
                        free on eligible orders, buyers remain responsible for
                        any customs duties, import taxes, or similar charges
                        imposed by their country.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Damaged Shipments
                    </h2>

                    <p>
                        If your package arrives damaged, please contact us
                        immediately with clear photos or videos of both the
                        package and the product so we can investigate and assist
                        you promptly.
                    </p>

                    <p className="mb-0">
                        For detailed return and refund information, please refer
                        to our{" "}
                        <Link
                            to="/refund-policy"
                            className="fw-semibold text-decoration-none"
                        >
                            Refund & Return Policy
                        </Link>.
                    </p>

                </div>

                <div className="policy-section mb-0">

                    <h2>
                        <i className="bi bi-headset me-2"></i>
                        Need Assistance?
                    </h2>

                    <p className="mb-0">
                        If you have any questions regarding shipping,
                        international delivery, or order tracking, please
                        contact us through our{" "}
                        <Link
                            to="/contact"
                            className="fw-semibold text-decoration-none"
                        >
                            Contact Page
                        </Link>.
                    </p>

                </div>

            </PolicyLayout>
        </>
    );
}