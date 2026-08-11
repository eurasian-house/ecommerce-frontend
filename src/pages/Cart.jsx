import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "../styles/pages/Cart.css";


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
        <div className="cart-page">

            <div className="container">

                {cart.length === 0 ? (

                    <section className="cart-empty">

                        <div className="cart-empty-icon">
                            <i className="bi bi-bag"></i>
                        </div>

                        <h1 className="cart-empty-title">
                            Your Cart is Empty
                        </h1>

                        <p className="cart-empty-description">
                            Looks like you haven't added any handmade rugs yet.
                            Explore our collection and discover timeless pieces for your home.
                        </p>

                        <button
                            className="app-btn-primary"
                            onClick={() => navigate("/products")}
                        >
                            Explore Collection
                        </button>

                    </section>

                ) : (

                    <>

                        {/* HERO */}

                        <section className="cart-header">

                            <span className="cart-subtitle">
                                SHOPPING CART
                            </span>

                            <h1 className="cart-title">
                                Your Selected Rugs
                            </h1>

                            <p className="cart-description">
                                Review your handcrafted selections before proceeding to checkout.
                            </p>

                        </section>

                        {/* CART ITEMS */}

                        <div className="cart-list">

                            {cart.map((item) => (

                                <article
                                    key={item.cartItemId}
                                    className="cart-card"
                                    onClick={() =>
                                        navigate(`/products/${item.slug}`, {
                                            state: {
                                                selectedSizeId: item.selectedSize?.id,
                                                selectedColorId: item.selectedColor?.id,
                                            },
                                        })
                                    }
                                >

                                    <div className="cart-image-wrapper">

                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="cart-image"
                                        />

                                    </div>

                                    <div className="cart-content">

                                        <div className="cart-details">

                                          <div className="cart-meta">

                                            {item.selectedSize && (
                                                <span>
                                                    Size:
                                                    <strong> {item.selectedSize.size}</strong>
                                                </span>
                                            )}

                                            {item.selectedColor && (
                                                <span>
                                                    Color:
                                                    <strong> {item.selectedColor.color_name || item.selectedColor.name}</strong>
                                                </span>
                                            )}

                                          </div>

                                            <div className="cart-price">
                                                ${Math.round(Number(item.price || item.selling_price))}
                                            </div>

                                        </div>

                                        <div className="cart-actions">

                                            <div
                                                className="cart-quantity"
                                                onClick={(e) => e.stopPropagation()}
                                            >

                                                <button
                                                    className="cart-qty-btn"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.selectedSize?.id,
                                                            item.selectedColor?.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span className="cart-qty-value">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    className="cart-qty-btn"
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
                                                className="cart-remove-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    removeFromCart(
                                                        item.id,
                                                        item.selectedSize?.id,
                                                        item.selectedColor?.id
                                                    );
                                                }}
                                            >
                                                <i className="bi bi-trash3 me-2"></i>
                                                Remove
                                            </button>

                                        </div>

                                        <h3 className="cart-product-title">
                                            {item.title}
                                        </h3>

                                    </div>

                                </article>

                            ))}

                        </div>

                        {/* SUMMARY  */}

                        <section className="cart-summary">

                            <div>

                                <span className="cart-summary-label">
                                    Order Total
                                </span>

                                <h2 className="cart-total">
                                    ${total}
                                </h2>

                            </div>

                            <div className="cart-summary-actions">

                                <button
                                    className="app-btn-primary checkout"
                                    onClick={handleCheckoutClick}
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    className="app-btn-secondary clear"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>

                            </div>

                        </section>

                    </>

                )}

            </div>

        </div>
    );
}
