import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import "../styles/pages/policies.css";


export default function RefundPolicy() {
    return (
        <>
            <SEO
                title="Refund & Return Policy | Eurasian House"
                description="Understand our refund, return, replacement, and exchange policy for handmade rugs and carpets purchased from Eurasian House."
                canonical="https://www.eurasianrugs.com/refund-policy"
            />

            <PolicyLayout
                title="Refund & Return Policy"
                description="Read our return, replacement, and refund policy for purchases made from Eurasian House."
                lastUpdated="19 June 2026"
            >

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-arrow-repeat me-2"></i>
                        Overview
                    </h2>

                    <p>
                        At Eurasian House, customer satisfaction is our priority.
                        If you are not completely satisfied with your purchase,
                        you may request a return or refund subject to the
                        conditions outlined below.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-box-seam me-2"></i>
                        Return Eligibility
                    </h2>

                    <p>
                        Products must be returned unused, undamaged, and in their
                        original packaging with all tags and accessories. Return
                        requests must be submitted within the eligible return period
                        mentioned at the time of purchase if the product is received
                        damaged.
                    </p>

                    <div className="alert alert-warning rounded-4 mt-3 mb-0">
                        <strong>Important:</strong> Please record a complete
                        unboxing video while opening your package. If you receive
                        a damaged or defective product, contact us within
                        <strong> 12 hours </strong>
                        with clear photos or the unboxing video so we can assist
                        you with the return or replacement process.
                    </div>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-x-circle me-2"></i>
                        Non-Returnable Items
                    </h2>

                    <p>
                        Customized, made-to-order, clearance, or otherwise
                        specified non-returnable products cannot be returned
                        unless they are delivered damaged, defective, or
                        incorrect.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Damaged or Incorrect Products
                    </h2>

                    <p>
                        If you receive a damaged, defective, or incorrect item,
                        please contact us immediately with the unpacking video,
                        product photographs, and packaging images. After
                        verification, we will arrange a replacement or refund
                        wherever applicable.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-credit-card me-2"></i>
                        Refund Process
                    </h2>

                    <p>
                        Once the returned item has been received and inspected,
                        we will notify you regarding the approval or rejection of
                        your refund. Approved refunds will be processed through
                        the original payment method.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-clock-history me-2"></i>
                        Refund Timeline
                    </h2>

                    <p>
                        Refund processing times depend on your payment provider
                        or bank. Where permitted, applicable shipping or handling
                        charges may be deducted from the refunded amount.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-truck me-2"></i>
                        Return Shipping
                    </h2>

                    <p>
                        Unless the return is due to our error or because the
                        product is defective or damaged, customers are generally
                        responsible for both the original shipping and return
                        shipping costs.
                    </p>

                </div>

                <div className="policy-section">

                    <h2>
                        <i className="bi bi-bag-x me-2"></i>
                        Cancellation
                    </h2>

                    <p>
                        Orders may be cancelled within <strong>48 hours</strong>
                        {" "}of placement or before production begins. Once an
                        order has entered processing or more than 48 hours have
                        passed, cancellation may no longer be possible.
                    </p>

                </div>

                <div className="policy-section mb-0">

                    <h2>
                        <i className="bi bi-headset me-2"></i>
                        Need Assistance?
                    </h2>

                    <p className="mb-0">
                        If you have any questions regarding returns, refunds,
                        replacements, or cancellations, please contact our
                        customer support team through our Contact page. We'll be
                        happy to assist you.
                    </p>

                </div>

            </PolicyLayout>
        </>
    );
}