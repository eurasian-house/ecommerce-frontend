import { Link } from "react-router-dom";
import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import "../styles/pages/policies.css";


export default function PackagingPolicy() {
    return (
        <>
            <SEO
                title="Packaging & Handling Policy | Eurasian House"
                description="Learn how Eurasian House carefully prepares, packages, protects, and ships every handmade rug to ensure it reaches you safely."
                canonical="https://www.eurasianrugs.com/packaging-policy"
            />

            <PolicyLayout
                title="Packaging & Handling Policy"
                description="Discover how every rug is carefully inspected, packaged, and prepared for safe domestic and international delivery."
                lastUpdated="19 June 2026"
            >

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-box-seam me-2"></i>
                        Our Packaging Standards
                    </h2>

                    <p>
                        Every rug shipped by Eurasian House is carefully packed
                        using professional packaging methods designed to protect
                        handmade textiles during storage, domestic transportation,
                        and international shipping. Our objective is to ensure
                        every order reaches you in excellent condition.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-search me-2"></i>
                        Final Quality Inspection
                    </h2>

                    <p>
                        Before packaging, every rug undergoes a final quality
                        inspection. Our team checks workmanship, dimensions,
                        finishing, labeling, cleanliness, and overall appearance
                        to ensure it meets our quality standards before dispatch.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-shield-check me-2"></i>
                        Protective Packaging
                    </h2>

                    <p>
                        Depending on the rug type and destination, products are
                        securely rolled or folded using protective moisture-resistant
                        wrapping before being placed inside durable export-quality
                        packaging. Additional protective layers may be used for
                        delicate or premium handmade rugs whenever required.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-globe2 me-2"></i>
                        International Shipping Preparation
                    </h2>

                    <p>
                        Since we ship worldwide, our packaging is designed to
                        withstand long-distance transportation, multiple handling
                        points, and export logistics. Each shipment is prepared to
                        help protect the rug from dust, moisture, and normal
                        transportation handling during transit.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-building me-2"></i>
                        Wholesale & Bulk Orders
                    </h2>

                    <p>
                        Wholesale and commercial orders receive packaging suited
                        for bulk transportation. Depending on order size, rugs may
                        be individually labeled, bundled, carton packed, or palletized
                        to simplify inventory management and ensure safe delivery.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-recycle me-2"></i>
                        Responsible Packaging
                    </h2>

                    <p>
                        Whenever practical, we use recyclable or responsibly
                        sourced packaging materials while maintaining the level of
                        protection required for safe transportation. We continuously
                        work to reduce unnecessary packaging without compromising
                        product safety.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-house-heart me-2"></i>
                        After Delivery
                    </h2>

                    <p>
                        Upon receiving your rug, carefully remove the packaging
                        using scissors or a cutter while avoiding contact with the
                        rug itself. Handmade rugs may naturally develop temporary
                        folds or creases during transportation. These usually relax
                        after the rug is laid flat for a short period.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        If Your Package Arrives Damaged
                    </h2>

                    <div className="alert alert-warning rounded-4 mt-3 mb-3">
                        <strong>Important:</strong> Please record an unboxing
                        video before opening your package. This helps us verify
                        any shipping damage quickly and provide faster assistance.
                    </div>

                    <p className="mb-0">
                        If you believe your package has been damaged during
                        transit, please contact us within <strong>12 hours</strong>
                        of delivery with clear photographs and your unboxing video.
                        Our team will investigate the issue and assist you in
                        accordance with our{" "}
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
                        If you have any questions regarding our packaging,
                        shipping preparation, wholesale packaging, or delivery,
                        please contact us through our{" "}
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