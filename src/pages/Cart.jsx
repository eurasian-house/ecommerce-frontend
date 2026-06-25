import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const handleCheckoutClick = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            navigate("/login", { state: { from: "/checkout" } });
        } else {
            navigate("/checkout"); // logged in
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h4>Your cart is empty</h4>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Cart</h3>

            {cart.map((item) => (
                <div
                    key={item.cartItemId}
                    className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3 border p-3 rounded"
                >
                    <div className="d-flex gap-3 align-items-start w-100">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{
                                width: 80,
                                height: 80,
                                objectFit: "cover",
                                flexShrink: 0
                            }}
                        />

                        <div>
                            <h6
                                style={{
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word"
                                }}
                            >
                                {item.title}
                            </h6>

                            <p className="mb-1">
                                ${item.price || item.selling_price}
                            </p>

                            {item.selectedSize && (
                                <div>
                                    <small>Size: {item.selectedSize.size}</small>
                                </div>
                            )}

                            {item.selectedColor && (
                                <div>
                                    <small>
                                        Color: {item.selectedColor.color_name || item.selectedColor.name}
                                    </small>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
                        <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.selectedSize?.id,
                                    item.selectedColor?.id,
                                    item.quantity - 1
                                )
                            }
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                            className="btn btn-sm btn-outline-dark"
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.selectedSize?.id,
                                    item.selectedColor?.id,
                                    item.quantity + 1
                                )
                            }
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="btn btn-sm btn-danger align-self-start align-self-md-center"
                        onClick={() =>
                            removeFromCart(item.id, item.selectedSize?.id, item.selectedColor?.id)
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="mt-4 d-flex flex-column flex-sm-row gap-3">
                <h4>Total: ${total}</h4>

                {/* ✅ UPDATED */}
                <button
                    className="btn btn-dark"
                    onClick={handleCheckoutClick}
                >
                    Checkout
                </button>

                <button
                    className="btn btn-outline-danger"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>

        </div>
    );
}