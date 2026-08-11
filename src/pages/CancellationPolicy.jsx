import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";
import "../styles/pages/policies.css";


export default function CancellationPolicy() {
  return (
    <>
      <SEO
        title="Cancellation Policy | Eurasian House"
        description="Learn about the order cancellation process, eligibility, and applicable conditions at Eurasian House."
        canonical="https://www.eurasianrugs.com/cancellation-policy"
      />

      <PolicyLayout
        title="Cancellation Policy"
        description="Understand when an order can be cancelled, how to request a cancellation, and when refunds are applicable."
        lastUpdated="19 June 2026"
      >
        <div className="policy-section">

          <h2>
            <i className="bi bi-bag-x me-2"></i>
            Order Cancellation
          </h2>

          <p>
            You may request cancellation of your order within <strong>48 hours of placing it</strong>,
            provided it has not entered processing or production. Once manufacturing,
            customization, or shipping preparation has begun, cancellation requests
            generally cannot be accepted.
          </p>

        </div>

        <div className="policy-section">

          <h2>
            <i className="bi bi-headset me-2"></i>
            How to Request a Cancellation
          </h2>

          <p>
            Please contact our customer support as soon as possible through our
            <strong> Contact Page</strong> or the
            <strong> WhatsApp chat</strong> available on our website. To help us
            process your request quickly, include your order number and the reason
            for cancellation.
          </p>

        </div>

        <div className="policy-section">

          <h2>
            <i className="bi bi-hourglass-split me-2"></i>
            Cancellation Approval
          </h2>

          <p>
            Every cancellation request is reviewed based on the current status of
            the order. If the order has already entered production, customization,
            packaging, or has been handed over to the shipping carrier, cancellation
            may no longer be possible.
          </p>

        </div>

        <div className="policy-section">

          <h2>
            <i className="bi bi-arrow-repeat me-2"></i>
            Refund for Cancelled Orders
          </h2>

          <p>
            If your cancellation request is approved, any payment received will be
            refunded to your original payment method. Refund processing times depend
            on your bank or payment provider and may vary accordingly.
          </p>

        </div>

        <div className="policy-section">

          <h2>
            <i className="bi bi-palette me-2"></i>
            Customized & Made-to-Order Products
          </h2>

          <div className="alert alert-warning rounded-4 mb-0">
            Customized, personalized, bespoke, or made-to-order products cannot be
            cancelled once production has started, except where required by
            applicable law.
          </div>

        </div>

        <div className="policy-section">

          <h2>
            <i className="bi bi-shield-check me-2"></i>
            Cancellation by Eurasian House
          </h2>

          <p>
            Eurasian House reserves the right to cancel an order due to stock
            unavailability, pricing inaccuracies, payment issues, suspected
            fraudulent activity, or other unforeseen circumstances. If payment has
            already been received, a full refund will be issued promptly.
          </p>

        </div>

        <div className="policy-section mb-0">

          <h2>
            <i className="bi bi-question-circle me-2"></i>
            Need Assistance?
          </h2>

          <p className="mb-0">
            If you have any questions regarding our cancellation policy, our support
            team is always happy to help. Please reach out through our Contact page,
            email, or WhatsApp for assistance.
          </p>

        </div>

      </PolicyLayout>
    </>
  );
}