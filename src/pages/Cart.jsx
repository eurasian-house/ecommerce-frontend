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
                    key={item.id}
                    className="d-flex align-items-center justify-content-between mb-3 border p-3 rounded"
                >
                    <div className="d-flex gap-3 align-items-center">
                        <img
                            src={item.thumbnail}
                            style={{ width: 80, height: 80, objectFit: "cover" }}
                        />

                        <div>
                            <h6>{item.title}</h6>
                            <p className="mb-1">₹{item.price || item.selling_price}</p>
                            {item.selectedSize && <small>Size: {item.selectedSize.size}</small>}
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">
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
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                            removeFromCart(item.id, item.selectedSize?.id, item.selectedColor?.id)
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="mt-4">
                <h4>Total: ₹{total}</h4>

                {/* ✅ UPDATED */}
                <button
                    className="btn btn-dark mt-2"
                    onClick={handleCheckoutClick}
                >
                    Checkout
                </button>

                <button
                    className="btn btn-outline-danger mt-2 ms-2"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            </div>

        </div>
    );
}