import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
    return (
        <PolicyLayout
            title="Privacy Policy"
            description="Learn how Eurasian House collects, uses, stores, and protects your personal information when you visit or shop on our website."
            canonical="https://www.eurasianrugs.com/privacy-policy"
        >

            {/* All your existing privacy policy sections go here */}
            <h2 className="h4 fw-bold">1. Information We Collect</h2>



            <p>We may collect the following information:</p>



            <ul>

                <li>Full Name</li>

                <li>Email Address</li>

                <li>Phone Number</li>

                <li>Shipping & Billing Address</li>

                <li>Payment Information (processed securely through trusted payment providers)</li>

                <li>Order History</li>

                <li>IP Address and Browser Information</li>

            </ul>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">2. How We Use Your Information</h2>



            <p>Your information is used to:</p>



            <ul>

                <li>Process and deliver your orders.</li>

                <li>Provide customer support.</li>

                <li>Communicate order updates.</li>

                <li>Improve our website and services.</li>

                <li>Prevent fraud and unauthorized transactions.</li>

                <li>Comply with applicable legal requirements.</li>

            </ul>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">3. Payment Security</h2>



            <p>

                Payments are processed through secure third-party payment providers.

                Eurasian House does not store your complete credit card or debit

                card information on its servers.

            </p>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">4. Cookies</h2>



            <p>

                We may use cookies and similar technologies to improve your browsing

                experience, remember your preferences, analyze website traffic, and

                enhance website performance.

            </p>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">5. Information Sharing</h2>



            <p>

                We do not sell or rent your personal information. Information may

                be shared only with trusted service providers involved in payment

                processing, shipping, website hosting, or where required by law.

            </p>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">6. Data Security</h2>



            <p>

                We implement reasonable administrative, technical, and

                organizational measures to protect your personal information from

                unauthorized access, disclosure, alteration, or destruction.

            </p>



            <hr className="my-5" />



            <h2 className="h4 fw-bold">7. Your Rights</h2>



            <p>You may request to:</p>



            <ul>

                <li>Access your personal information.</li>

                <li>Correct inaccurate information.</li>

                <li>Request deletion of your personal data where applicable.</li>

                <li>Contact us regarding any privacy-related concerns.</li>

            </ul>

        </PolicyLayout>
    );
}