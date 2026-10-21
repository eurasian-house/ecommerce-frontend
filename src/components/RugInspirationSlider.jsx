import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { applyActiveFilter } from "../utils/productQueries";
import "../styles/components/RugInspirationSlider.css";

const SCENES = [
    {
        title: "A Room That Feels Like Home",
        subtitle: "Find the rug that brings everything together.",
        image: "/images/inspiration/room-1.jpg",
        products: [
            { slug: "eurasian-rugs-hand-tufted-wool-rug-pastel-pink-yellow-peach-organic-abstract-area-rug-for-bedroom-living-room", position: { left: "22%", top: "65%" } },
            { slug: "eurasian-rugs-hand-tufted-daisy-flower-rug-cream-baby-blue-orange-floral-wool-area-rug-for-bedroom-nursery", position: { left: "48%", top: "42%" } },
            { slug: "eurasian-rugs-handloom-silk-carpet-sage-green-handmade-mint-green-solid-textured-area-rug-for-living-room-bedroom", position: { left: "66%", top: "68%" } },
            { slug: "eurasian-rugs-handloom-rug-beige-taupe-wave-pattern-textured-carpet-handmade-modern-abstract-area-rug-for-living-room-bedroom", position: { left: "79%", top: "30%" } },
        ],
    },
    {
        title: "Make Space for Texture",
        subtitle: "Natural textures. Thoughtful details.",
        image: "/images/inspiration/room-2.jpg",
        products: [
            { slug: "eurasian-rugs-hand-knotted-oushak-runner-rug-cream-floral-runner-carpet-for-kitchen-hallway", position: { left: "24%", top: "60%" } },
            { slug: "eurasian-rugs-hand-knotted-oushak-runner-rug-blue-olive-green-fish-pattern-wool-runner-for-hallway-kitchen-entryway", position: { left: "47%", top: "40%" } },
            { slug: "eurasian-rugs-premium-hand-knotted-kashmiri-silk-carpet-floral-tree-of-life-birds-peacock-area-rug-for-living-room-bedroom", position: { left: "67%", top: "66%" } },
            { slug: "eurasian-rugs-handmade-cowhide-leather-patchwork-rug-brown-tan-white-checkered-area-rug-for-living-room-bedroom", position: { left: "80%", top: "32%" } },
        ],
    },
];

const formatPrice = (price) =>
    `$${Math.round(Number(price) || 0).toLocaleString("en-US")}`;

export default function RugInspirationSlider() {
    const [products, setProducts] = useState([]);
    const [slide, setSlide] = useState(0);
    const [activeProduct, setActiveProduct] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;

        async function loadProducts() {
            const slugs = [
                ...new Set(SCENES.flatMap((scene) =>
                    scene.products.map((product) => product.slug)
                )),
            ];

            const { data, error } = await supabase
                .from("products")
                .select(`
        id, title, slug, thumbnail, selling_price, mrp, main_category
      `)
                .in("slug", slugs);

            if (cancelled) return;

            if (error) {
                console.error("Could not load inspiration products:", error.message);
                setProducts([]);
            } else {
                setProducts(data || []);
            }

            setLoading(false);
        }

        loadProducts();

        return () => {
            cancelled = true;
        };
    }, []);

    const totalSlides = SCENES.length;
    const currentSlide = slide % totalSlides;
    const scene = SCENES[currentSlide];

    const slideProducts = scene.products
        .map((item) =>
            products.find((product) => product.slug === item.slug)
        )
        .filter(Boolean);

    useEffect(() => {
        setActiveProduct(0);
    }, [currentSlide]);

    const goToSlide = (nextSlide) => {
        if (!totalSlides) return;

        setSlide((nextSlide + totalSlides) % totalSlides);
        setActiveProduct(0);
    };

    if (loading) {
        return (
            <section className="rug-inspiration-section">
                <div className="rug-inspiration-heading">
                    <span className="rug-inspiration-eyebrow">THE ART OF LIVING</span>
                    <h2>Find your room’s missing piece.</h2>
                </div>
                <div className="rug-inspiration-loading" aria-label="Loading inspiration">
                    <span />
                    <span />
                    <span />
                </div>
            </section>
        );
    }

    if (!products.length) return null;

    return (
        <section className="rug-inspiration-section">
            <div className="rug-inspiration-heading">
                <div>
                    <span className="rug-inspiration-eyebrow">
                        THE ART OF LIVING
                    </span>
                    <h2>Find your room’s missing piece.</h2>
                    <p>Explore the rugs. Discover the feeling.</p>
                </div>

                <div className="rug-inspiration-controls">
                    <button
                        type="button"
                        className="rug-inspiration-arrow"
                        onClick={() => goToSlide(currentSlide - 1)}
                        aria-label="Previous inspiration slide"
                    >
                        <i className="bi bi-arrow-left" />
                    </button>

                    <span className="rug-inspiration-counter">
                        {String(currentSlide + 1).padStart(2, "0")}
                        <span> / </span>
                        {String(totalSlides).padStart(2, "0")}
                    </span>

                    <button
                        type="button"
                        className="rug-inspiration-arrow"
                        onClick={() => goToSlide(currentSlide + 1)}
                        aria-label="Next inspiration slide"
                    >
                        <i className="bi bi-arrow-right" />
                    </button>
                </div>
            </div>

            <div className="rug-inspiration-layout" key={currentSlide}>
                <div className="rug-inspiration-scene">
                    <img
                        className="rug-inspiration-scene-image"
                        src={scene.image}
                        alt={scene.title}
                        loading="lazy"
                    />

                    <div className="rug-inspiration-scene-shade" />

                    <div className="rug-inspiration-scene-copy">
                        <span>ROOM {String(currentSlide + 1).padStart(2, "0")}</span>
                        <h3>{scene.title}</h3>
                        <p>{scene.subtitle}</p>
                    </div>

                    {slideProducts.map((product, index) => (
                        <button
                            type="button"
                            key={product.id}
                            className={`rug-inspiration-hotspot ${activeProduct === index ? "is-active" : ""
                                }`}
                            style={scene.products[index].position}
                            onMouseEnter={() => setActiveProduct(index)}
                            onFocus={() => setActiveProduct(index)}
                            onClick={() => setActiveProduct(index)}
                            aria-label={`Highlight ${product.title}`}
                            aria-pressed={activeProduct === index}
                        >
                            <span />
                        </button>
                    ))}

                    <div className="rug-inspiration-scene-hint">
                        <i className="bi bi-cursor" />
                        Explore the rugs
                    </div>
                </div>

                <div className="rug-inspiration-products">
                    {slideProducts.map((product, index) => (
                        <article
                            key={product.id}
                            className={`rug-inspiration-product ${activeProduct === index ? "is-active" : ""
                                }`}
                            onMouseEnter={() => setActiveProduct(index)}
                            onFocus={() => setActiveProduct(index)}
                            onClick={() => navigate(`/products/${product.slug}`)}
                            tabIndex={0}
                            role="link"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    navigate(`/products/${product.slug}`);
                                }
                            }}
                            aria-label={`View ${product.title}`}
                        >
                            <div className="rug-inspiration-product-image-wrap">
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="rug-inspiration-product-image"
                                    loading="lazy"
                                />

                                <span className="rug-inspiration-product-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="rug-inspiration-product-open">
                                    <i className="bi bi-arrow-up-right" />
                                </span>
                            </div>

                            <div className="rug-inspiration-product-info">
                                <span className="rug-inspiration-product-category">
                                    {product.main_category || "Handmade rug"}
                                </span>

                                <h3>{product.title}</h3>

                                <div className="rug-inspiration-price">
                                    <span>{formatPrice(product.selling_price)}</span>

                                    {Number(product.mrp) > Number(product.selling_price) && (
                                        <del>{formatPrice(product.mrp)}</del>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {totalSlides > 1 && (
                <div className="rug-inspiration-progress">
                    {Array.from({ length: totalSlides }, (_, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`rug-inspiration-progress-item ${currentSlide === index ? "is-active" : ""
                                }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to inspiration slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}