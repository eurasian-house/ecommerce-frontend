import { Link } from "react-router-dom";
import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import "../styles/pages/policies.css";


export default function PaymentPolicy() {
    return (
        <>
            <SEO
                title="Payment & Security Policy | Eurasian House"
                description="Learn how Eurasian House keeps every payment secure through trusted payment gateways, encryption, fraud protection, and industry-standard security practices."
                canonical="https://www.eurasianrugs.com/payment-policy"
            />

            <PolicyLayout
                title="Payment & Security Policy"
                description="Your security and privacy are our priority. Learn how we protect your payments and personal information during every transaction."
                lastUpdated="19 June 2026"
            >

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-shield-lock me-2"></i>
                        Secure Payments
                    </h2>

                    <p>
                        At Eurasian House, every payment is processed through
                        trusted and secure payment gateways. We currently use
                        <strong> Razorpay</strong> and
                        <strong> PayPal</strong>, both of which employ advanced
                        encryption, fraud detection, and industry-standard
                        security measures to protect every transaction.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-credit-card me-2"></i>
                        Accepted Payment Methods
                    </h2>

                    <p>
                        Available payment methods may vary depending on your
                        country and region. Depending on availability, you may
                        pay using:
                    </p>

                    <ul>
                        <li>Credit Cards</li>
                        <li>Debit Cards</li>
                        <li>PayPal</li>
                        <li>UPI (where supported)</li>
                        <li>Net Banking (where supported)</li>
                        <li>Digital Wallets supported by our payment partners</li>
                    </ul>

                    <p className="mb-0">
                        We may introduce additional secure payment options in
                        the future to improve your shopping experience.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-lock me-2"></i>
                        Your Card Information
                    </h2>

                    <p>
                        Eurasian House <strong>never stores</strong> your
                        complete credit card, debit card, CVV, or banking
                        credentials on our servers. Sensitive payment
                        information is processed directly by our trusted payment
                        providers using encrypted connections.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-incognito me-2"></i>
                        Fraud Prevention
                    </h2>

                    <p>
                        To protect both our customers and our business, certain
                        transactions may undergo additional verification if they
                        appear unusual or potentially fraudulent. In some cases,
                        we may contact you to verify order details before
                        processing your purchase.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-arrow-repeat me-2"></i>
                        Failed or Pending Payments
                    </h2>

                    <p>
                        Occasionally, payments may remain pending or fail due to
                        bank authorization, network interruptions, or payment
                        provider issues. If a payment fails but money is
                        deducted, the amount is generally reversed
                        automatically according to your bank's processing time.
                    </p>

                    <p className="mb-0">
                        If you experience any payment-related issues, please
                        contact our support team before placing another order.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-currency-dollar me-2"></i>
                        Currency
                    </h2>

                    <p>
                        Unless stated otherwise, all prices on our website are
                        displayed in <strong>United States Dollars (USD)</strong>.
                        If your payment is made in another currency, your bank
                        or payment provider may apply currency conversion rates
                        and applicable charges.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-patch-check me-2"></i>
                        Buyer Protection
                    </h2>

                    <p>
                        Every successful order receives an order confirmation,
                        payment confirmation, and shipment updates. Our customer
                        support team is available to assist you with payment,
                        billing, and order-related questions throughout your
                        purchase journey.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                        Refunds
                    </h2>

                    <p>
                        Approved refunds are always processed back to the
                        original payment method used during checkout. Refund
                        timelines depend on your bank or payment provider.
                    </p>

                    <p className="mb-0">
                        Please review our{" "}
                        <Link
                            to="/refund-policy"
                            className="fw-semibold text-decoration-none"
                        >
                            Refund & Return Policy
                        </Link>{" "}
                        for complete details regarding refund eligibility and
                        processing.
                    </p>

                </div>

                <div className="policy-section mb-0">

                    <h2>
                        <i className="bi bi-headset me-2"></i>
                        Need Assistance?
                    </h2>

                    <p className="mb-0">
                        If you have any questions regarding payments, billing,
                        or transaction security, please contact us through our{" "}
                        <Link
                            to="/contact"
                            className="fw-semibold text-decoration-none"
                        >
                            Contact Page
                        </Link>. Our team will be happy to assist you.
                    </p>

                </div>

            </PolicyLayout>
        </>
    );
}