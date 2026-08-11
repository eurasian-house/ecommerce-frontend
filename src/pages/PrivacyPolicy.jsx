import PolicyLayout from "../components/PolicyLayout";
import "../styles/pages/policies.css";


export default function PrivacyPolicy() {
    return (
        <PolicyLayout
            title="Privacy Policy"
            description="Learn how Eurasian House collects, uses, stores, and protects your personal information when you visit or shop on our website."
            canonical="https://www.eurasianrugs.com/privacy-policy"
        >

            <div className="policy-section">

                <h2>
                    <i className="bi bi-person-vcard me-2"></i>
                    Information We Collect
                </h2>

                <p>We may collect the following information:</p>

                <ul>
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Phone Number</li>
                    <li>Shipping & Billing Address</li>
                    <li>Payment information (processed securely through trusted payment providers)</li>
                    <li>Order History</li>
                    <li>IP Address and Browser Information</li>
                </ul>

            </div>

            <div className="policy-section">

                <h2>
                    <i className="bi bi-gear me-2"></i>
                    How We Use Your Information
                </h2>

                <p>Your information is used to:</p>

                <ul>
                    <li>Process and deliver your orders.</li>
                    <li>Provide customer support.</li>
                    <li>Communicate order updates.</li>
                    <li>Improve our website and services.</li>
                    <li>Prevent fraud and unauthorized transactions.</li>
                    <li>Comply with applicable legal requirements.</li>
                </ul>

            </div>

            <div className="policy-section">

                <h2>
                    <i className="bi bi-shield-lock me-2"></i>
                    Payment Security
                </h2>

                <p>
                    Payments are processed through secure third-party payment
                    providers. Eurasian House does not store your complete credit
                    card or debit card information on its servers.
                </p>

            </div>

            <div className="policy-section">

                <h2>
                    <i className="bi bi-cookie me-2"></i>
                    Cookies
                </h2>

                <p>
                    We may use cookies and similar technologies to improve your
                    browsing experience, remember your preferences, analyze website
                    traffic, and enhance website performance.
                </p>

            </div>

            <div className="policy-section">

                <h2>
                    <i className="bi bi-share me-2"></i>
                    Information Sharing
                </h2>

                <p>
                    We do not sell or rent your personal information. Information
                    may only be shared with trusted service providers involved in
                    payment processing, shipping, website hosting, or where required
                    by applicable law.
                </p>

            </div>

            <div className="policy-section">

                <h2>
                    <i className="bi bi-shield-check me-2"></i>
                    Data Security
                </h2>

                <p>
                    We implement reasonable administrative, technical, and
                    organizational measures to protect your personal information
                    against unauthorized access, disclosure, alteration, or
                    destruction.
                </p>

            </div>

            <div className="policy-section mb-0">

                <h2>
                    <i className="bi bi-person-check me-2"></i>
                    Your Rights
                </h2>

                <p>You may request to:</p>

                <ul className="mb-0">
                    <li>Access your personal information.</li>
                    <li>Correct inaccurate information.</li>
                    <li>Request deletion of your personal data where applicable.</li>
                    <li>Contact us regarding any privacy-related concerns.</li>
                </ul>

            </div>

        </PolicyLayout>
    );
}