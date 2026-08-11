import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { trackPurchase } from "../lib/analytics";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages/PayPalCheckout.css";
import {
    PayPalButtons,
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";

export default function PayPalCheckout() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();

    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        async function loadConfig() {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/paypal/config`
            );

            const data = await res.json();

            setClientId(data.clientId);
        }

        loadConfig();
    }, []);

    if (!state) {
        navigate("/checkout");
        return null;
    }

    if (!clientId) {
        return (
            <div className="container py-5 text-center">
                Loading PayPal...
            </div>
        );
    }

    const { orderId, amount, form } = state;

    // return (
    //     <PayPalScriptProvider
    //         options={{
    //             clientId,
    //             currency: "USD",
    //             intent: "capture",
    //         }}
    //     >
    //         <div className="container py-5">
    //             <div
    //                 className="mx-auto"
    //                 style={{
    //                     maxWidth: 700,
    //                     background: "#fff",
    //                     borderRadius: 24,
    //                     padding: "2rem",
    //                     border: "1px solid #ece8e2",
    //                 }}
    //             >
    //                 <h2 className="fw-bold mb-3">
    //                     Complete your PayPal Payment
    //                 </h2>

    //                 <p className="text-muted">
    //                     Order #{orderId}
    //                 </p>

    //                 <p className="fw-bold fs-4">
    //                     ${amount}
    //                 </p>

    //                 <PayPalButtons
    //                     createOrder={async () => {
    //                         const res = await fetch(
    //                             `${import.meta.env.VITE_API_URL}/paypal/create-order`,
    //                             {
    //                                 method: "POST",
    //                                 headers: {
    //                                     "Content-Type": "application/json",
    //                                 },
    //                                 body: JSON.stringify({
    //                                     amount,
    //                                     currency: "USD",
    //                                 }),
    //                             }
    //                         );

    //                         const data = await res.json();

    //                         return data.id;
    //                     }}

    //                     onApprove={async (data) => {
    //                         const res = await fetch(
    //                             `${import.meta.env.VITE_API_URL}/paypal/capture-order`,
    //                             {
    //                                 method: "POST",
    //                                 headers: {
    //                                     "Content-Type": "application/json",
    //                                 },
    //                                 body: JSON.stringify({
    //                                     orderID: data.orderID,
    //                                     orderId,
    //                                 }),
    //                             }
    //                         );

    //                         const capture = await res.json();

    //                         if (capture.status !== "COMPLETED") {
    //                             return;
    //                         }


    //                         trackPurchase(orderId, cart);

    //                         clearCart();

    //                         navigate("/order-success", {
    //                             state: { orderId },
    //                         });
    //                     }}
    //                 />
    //             </div>
    //         </div>
    //     </PayPalScriptProvider>
    // );


    return (
        <PayPalScriptProvider
            options={{
                clientId,
                currency: "USD",
                intent: "capture",
            }}
        >
            <div className="paypal-page">

                <div className="container">

                    <div className="paypal-card">

                        {/* Header */}

                        <div className="paypal-header">

                            <span className="paypal-subtitle">
                                SECURE PAYMENT
                            </span>

                            <h1 className="paypal-title">
                                Complete Your PayPal Payment
                            </h1>

                            <p className="paypal-description">
                                You're almost done. Complete your secure PayPal payment
                                to place your handmade rug order.
                            </p>

                        </div>

                        {/* Order Summary */}

                        <section className="paypal-summary">

                            <div className="paypal-summary-row">

                                <span>
                                    Order Number
                                </span>

                                <strong>
                                    #{orderId}
                                </strong>

                            </div>

                            <div className="paypal-summary-row">

                                <span>
                                    Total Amount
                                </span>

                                <h2>
                                    ${amount}
                                </h2>

                            </div>

                        </section>

                        {/* Security */}

                        <section className="paypal-security">

                            <i className="bi bi-shield-check"></i>

                            <div>

                                <h6>
                                    Secure Payment
                                </h6>

                                <p>
                                    Payments are securely processed through PayPal.
                                    Your payment information is never stored on our servers.
                                </p>

                            </div>

                        </section>

                        {/* PayPal */}

                        <div className="paypal-buttons-wrapper">

                            <PayPalButtons
                                createOrder={async () => {
                                    const res = await fetch(
                                        `${import.meta.env.VITE_API_URL}/paypal/create-order`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                amount,
                                                currency: "USD",
                                            }),
                                        }
                                    );

                                    const data = await res.json();

                                    return data.id;
                                }}

                                onApprove={async (data) => {
                                    const res = await fetch(
                                        `${import.meta.env.VITE_API_URL}/paypal/capture-order`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                orderID: data.orderID,
                                                orderId,
                                            }),
                                        }
                                    );

                                    const capture = await res.json();

                                    if (capture.status !== "COMPLETED") {
                                        return;
                                    }

                                    trackPurchase(orderId, cart);

                                    clearCart();

                                    navigate("/order-success", {
                                        state: { orderId },
                                    });
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </PayPalScriptProvider>
    );
}