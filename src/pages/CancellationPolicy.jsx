import PolicyLayout from "../components/PolicyLayout";
import SEO from "../components/SEO";

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
        description="Learn how order cancellations are handled at Eurasian House."
        lastUpdated="19 June 2026"
      >
        <h2>1. Order Cancellation</h2>
        <p>
          Customers may request cancellation of an order before 48 hours of placing the order or before
          the order has been processed . Once either of these has completed, it generally
          cannot be cancelled.
        </p>

        <h2>2. How to Request a Cancellation</h2>
        <p>
          To cancel an order, please contact our customer support as soon as
          possible through our Contact page or WhatsApp chat floating on the right bottom corner. Please provide your order number to
          help us process your request quickly.
        </p>

        <h2>3. Cancellation Approval</h2>
        <p>
          Cancellation requests are subject to order status. If the order has
          already entered processing or has been handed over to the shipping
          partner, cancellation may not be possible.
        </p>

        <h2>4. Refund for Cancelled Orders</h2>
        <p>
          If your cancellation request is approved, any payment
          received will be refunded through the original payment method. Processing
          times may vary depending on your bank or payment provider.
        </p>

        <h2>5. Customized & Made-to-Order Products</h2>
        <p>
          Customized, personalized, or made-to-order products cannot be cancelled, unless required by applicable law.
        </p>

        <h2>6. Cancellation by Eurasian House</h2>
        <p>
          We reserve the right to cancel an order due to stock unavailability,
          pricing errors, suspected fraudulent activity, payment issues, or other
          unforeseen circumstances. In such cases, customers will receive a full
          refund if payment has already been made.
        </p>

        <h2>7. Need Assistance?</h2>
        <p>
          If you have any questions regarding cancellations, please contact us
          through our Contact page. We'll be happy to assist you.
        </p>
      </PolicyLayout>
    </>
  );
}