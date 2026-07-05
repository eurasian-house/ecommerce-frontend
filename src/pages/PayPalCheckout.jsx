import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { trackPurchase } from "../lib/analytics";
import { useLocation, useNavigate } from "react-router-dom";
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

    return (
        <PayPalScriptProvider
            options={{
                clientId,
                currency: "USD",
                intent: "capture",
            }}
        >
            <div className="container py-5">
                <div
                    className="mx-auto"
                    style={{
                        maxWidth: 700,
                        background: "#fff",
                        borderRadius: 24,
                        padding: "2rem",
                        border: "1px solid #ece8e2",
                    }}
                >
                    <h2 className="fw-bold mb-3">
                        Complete your PayPal Payment
                    </h2>

                    <p className="text-muted">
                        Order #{orderId}
                    </p>

                    <p className="fw-bold fs-4">
                        ${amount}
                    </p>

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
        </PayPalScriptProvider>
    );
}