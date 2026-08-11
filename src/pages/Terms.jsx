import "../styles/pages/policies.css";
import { Link } from "react-router-dom";
import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";

export default function Terms() {
    return (
        <>
            <SEO
                title="Terms & Conditions | Eurasian House"
                description="Read the terms and conditions governing the use of the Eurasian House website and purchases made through our online store."
                canonical="https://www.eurasianrugs.com/terms"
            />

            <PolicyLayout
                title="Terms & Conditions"
                description="Please read these Terms & Conditions carefully before using Eurasian House."
                lastUpdated="19 June 2026"
            >

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Introduction
                    </h2>

                    <p>
                        Welcome to Eurasian House. By accessing or using our
                        website, you agree to comply with and be bound by these
                        Terms & Conditions. If you do not agree with any part of
                        these terms, please discontinue using our website.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-person-check me-2"></i>
                        Eligibility
                    </h2>

                    <p>
                        You must be at least <strong>18 years old</strong> or use
                        this website under the supervision of a parent or legal
                        guardian.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-grid me-2"></i>
                        Products
                    </h2>

                    <p>
                        We strive to display product descriptions,
                        specifications, colors, and images as accurately as
                        possible. However, slight variations may occur due to
                        lighting, photography, monitor settings, and the handmade
                        nature of many of our rugs.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-currency-dollar me-2"></i>
                        Pricing
                    </h2>

                    <p>
                        Unless stated otherwise, all prices are listed in
                        <strong> USD ($)</strong>. Eurasian House reserves the
                        right to update prices, promotions, or product
                        information without prior notice.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-cart-check me-2"></i>
                        Orders
                    </h2>

                    <p>
                        We reserve the right to accept, reject, or cancel any
                        order due to pricing errors, stock availability,
                        suspected fraudulent activity, payment issues, or any
                        other legitimate business reason.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-credit-card me-2"></i>
                        Payments
                    </h2>

                    <p>
                        Payments are securely processed through trusted payment
                        gateways. Eurasian House does not store your complete
                        payment card information.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-truck me-2"></i>
                        Shipping
                    </h2>

                    <p>
                        Shipping timelines are estimates and may vary depending
                        on destination, logistics providers, customs clearance,
                        weather conditions, or other unforeseen circumstances.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-arrow-repeat me-2"></i>
                        Returns & Refunds
                    </h2>

                    <p>
                        Returns, replacements, and refunds are governed by our{" "}
                        <Link
                            to="/refund-policy"
                            className="fw-semibold text-decoration-none"
                        >
                            Refund & Return Policy
                        </Link>.
                        Please review that policy before requesting a return.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-shield-lock me-2"></i>
                        Intellectual Property
                    </h2>

                    <p>
                        All website content, including logos, product images,
                        graphics, text, designs, and other materials, is the
                        intellectual property of Eurasian House unless otherwise
                        stated. Unauthorized copying, reproduction, or use is
                        prohibited.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-person-x me-2"></i>
                        User Conduct
                    </h2>

                    <p>
                        Users agree not to misuse the website, interfere with its
                        operation, attempt unauthorized access, upload malicious
                        content, or violate any applicable laws or regulations.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-exclamation-circle me-2"></i>
                        Limitation of Liability
                    </h2>

                    <p>
                        Eurasian House shall not be liable for indirect,
                        incidental, or consequential damages arising from the use
                        of this website or its products, except where required by
                        applicable law.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        External Links
                    </h2>

                    <p>
                        Our website may contain links to third-party websites for
                        your convenience. Eurasian House is not responsible for
                        their content, services, or privacy practices.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-shield-check me-2"></i>
                        Privacy
                    </h2>

                    <p>
                        Your use of this website is also governed by our{" "}
                        <Link
                            to="/privacy-policy"
                            className="fw-semibold text-decoration-none"
                        >
                            Privacy Policy
                        </Link>.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Changes to These Terms
                    </h2>

                    <p>
                        We may revise these Terms & Conditions from time to time.
                        Any changes become effective immediately upon publication
                        on this page.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-bank me-2"></i>
                        Governing Law
                    </h2>

                    <p>
                        These Terms & Conditions shall be governed by and
                        interpreted in accordance with the laws of India.
                    </p>

                </div>

                <div className="policy-section mb-0">

                    <h2>
                        <i className="bi bi-headset me-2"></i>
                        Need Assistance?
                    </h2>

                    <p className="mb-0">
                        If you have any questions regarding these Terms &
                        Conditions, please contact us through our{" "}
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