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
            { slug: "handmade-rainbow-runner-rug-hand-tufted-geometric-colourful-hallway-carpet", position: { left: "22%", top: "75%" } },
            { slug: "modern-hand-tufted-irregular-area-rug-handmade-abstract-organic-multicolour-carpet", position: { left: "32%", top: "57%" } },
            { slug: "hand-knotted-pink-oushak-floral-rug-handmade-turkish-wool-area-carpet-vintage-floral-oriental-carpet-luxury-living-room-teppich", position: { left: "50%", top: "68%" } },
            { slug: "eurasian-rugs-handmade-floral-wool-carpet-multicolor-flower-hand-tufted-organic-area-rug-for-living-room-bedroom", position: { left: "70%", top: "90%" } },
        ],
    },
    {
        title: "A Space Wrapped in Warmth",
        subtitle: "Discover the rug that anchors the space.",
        image: "/images/inspiration/room-2.jpg",
        products: [
            { slug: "eurasian-rugs-handloom-rug-beige-taupe-wave-pattern-textured-carpet-handmade-modern-abstract-area-rug-for-living-room-bedroom", position: { left: "22%", top: "75%" } },
            { slug: "eurasian-rugs-hand-tufted-wool-rug-pastel-pink-yellow-peach-organic-abstract-area-rug-for-bedroom-living-room", position: { left: "32%", top: "57%" } },
            { slug: "eurasian-rugs-handloom-silk-carpet-sage-green-handmade-mint-green-solid-textured-area-rug-for-living-room-bedroom", position: { left: "50%", top: "68%" } },
            { slug: "eurasian-rugs-hand-tufted-daisy-flower-rug-cream-baby-blue-orange-floral-wool-area-rug-for-bedroom-nursery", position: { left: "70%", top: "90%" } },
        ],
    },
    {
        title: "A Corner Full of Comfort and Belonging",
        subtitle: "Choose the perfect rug to tie your room together.",
        image: "/images/inspiration/room-3.jpg",
        products: [
            { slug: "handmade-organic-wave-runner-rug-green-beige-orange-wool-carpet-abstract-oval-pattern-hand-tufted-modern-hallway-entryway-rug", position: { left: "22%", top: "75%" } },
            { slug: "eurasian-rugs-handmade-hand-tufted-wool-round-rug-cream-beige-abstract-sunburst-arch-area-carpet-for-living-room-bedroom", position: { left: "32%", top: "57%" } },
            { slug: "hand-knotted-persian-isfahan-rug-handmade-wool-oriental-area-carpet-traditional-floral-medallion-teppich-luxury-living-room-rug", position: { left: "50%", top: "68%" } },
            { slug: "handmade-botanical-abstract-wool-carpet-hand-tufted-green-cream-area-rug-boho-irregular-teppiche", position: { left: "70%", top: "90%" } },
        ],
    },
    {
        title: "A Sanctuary of Rest and Ease",
        subtitle: "Select the rug that completes the look.",
        image: "/images/inspiration/room-4.jpg",
        products: [
            { slug: "eurasian-rugs-hand-knotted-oushak-runner-rug-cream-floral-runner-carpet-for-kitchen-hallway", position: { left: "22%", top: "75%" } },
            { slug: "eurasian-rugs-handmade-organic-wool-carpet-multicolor-floral-abstract-hand-tufted-area-rug-for-living-room-bedroom", position: { left: "32%", top: "57%" } },
            { slug: "eurasian-rugs-premium-hand-knotted-kashmiri-silk-carpet-floral-tree-of-life-birds-peacock-area-rug-for-living-room-bedroom", position: { left: "50%", top: "68%" } },
            { slug: "eurasian-rugs-hand-tufted-wool-koi-fish-rug-blue-orange-japanese-pond-area-carpet-round-water-garden-decorative-rug", position: { left: "70%", top: "90%" } },
        ],
    },
    {
        title: "A Cozy Haven That Welcomes You In",
        subtitle: "Find a rug that unites the entire design.",
        image: "/images/inspiration/room-5.jpg",
        products: [
            { slug: "eurasian-rugs-handmade-tibetan-wool-runner-rug-golden-yellow-blue-floral-medallion-hand-knotted-carpet-for-hallway-living-room", position: { left: "22%", top: "75%" } },
            { slug: "hand-tufted-round-citrus-rug-orange-yellow-wool-circle-carpet", position: { left: "32%", top: "57%" } },
            { slug: "eurasian-rugs-hand-tufted-wavy-stripe-area-rug-retro-abstract-geometric-carpet-green-mustard-terracotta-modern-rug-for-living-room-bedroom", position: { left: "50%", top: "68%" } },
            { slug: "eurasian-rugs-handmade-koi-fish-wool-carpet-cream-blue-orange-abstract-hand-tufted-area-rug-for-bedroom-living-room", position: { left: "70%", top: "90%" } },
        ],
    },
];

const formatPrice = (price) =>
    `$${Math.round(Number(price) || 0).toLocaleString("en-US")}`;

export default function RugInspirationSlider() {
    const [products, setProducts] = useState([]);
    const [slide, setSlide] = useState(0);
    const [activeProduct, setActiveProduct] = useState(-1);
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
        setActiveProduct(-1);
    }, [currentSlide]);

    const goToSlide = (nextSlide) => {
        if (!totalSlides) return;

        setSlide((nextSlide + totalSlides) % totalSlides);
        setActiveProduct(0);
    };

    if (loading) {
        return (
            <section className="rug-inspiration-section rug-inspiration-skeleton">
                <div className="rug-inspiration-heading">
                    <div>
                        <span className="rug-inspiration-eyebrow">
                            THE ART OF LIVING
                        </span>
                        <div className="ris-skeleton ris-skeleton-heading" />
                        <div className="ris-skeleton ris-skeleton-subheading" />
                    </div>

                    <div className="ris-skeleton-controls">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div className="rug-inspiration-layout rug-inspiration-skeleton-layout">
                    {/* Large room scene skeleton  */}
                    <div className="rug-inspiration-scene ris-skeleton-scene">
                        <div className="ris-skeleton-scene-badge" />

                        <div className="ris-skeleton-scene-copy">
                            <span className="ris-skeleton ris-skeleton-label" />
                            <span className="ris-skeleton ris-skeleton-scene-title" />
                            <span className="ris-skeleton ris-skeleton-scene-subtitle" />
                        </div>

                        <div className="ris-skeleton-hotspots">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>

                    {/* Four product cards */}
                    <div className="rug-inspiration-products">
                        {Array.from({ length: 4 }, (_, index) => (
                            <article
                                key={index}
                                className="ris-skeleton-product"
                            >
                                <div className="ris-skeleton ris-skeleton-product-image" />

                                <div className="ris-skeleton-product-info">
                                    <span className="ris-skeleton ris-skeleton-category" />
                                    <span className="ris-skeleton ris-skeleton-product-title" />
                                    <span className="ris-skeleton ris-skeleton-product-title ris-skeleton-product-title-short" />
                                    <span className="ris-skeleton ris-skeleton-price" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="ris-skeleton-progress">
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
                            onMouseLeave={() => setActiveProduct(-1)}
                            onFocus={() => setActiveProduct(index)}
                            onClick={() => setActiveProduct(index)}
                            aria-label={`Highlight ${product.title}`}
                            aria-pressed={activeProduct === index}
                        >
                            <span />
                        </button>
                    ))}
                    <button
                        type="button"
                        className="rug-inspiration-scene-hint"
                        onClick={() => navigate("/products")}
                    >
                        Explore the rugs
                        <i className="bi bi-cursor" />
                    </button>
                </div>

                <div className="rug-inspiration-products">
                    {slideProducts.map((product, index) => (
                        <article
                            key={product.id}
                            className={`rug-inspiration-product ${activeProduct === index ? "is-active" : ""
                                }`}
                            onMouseEnter={() => setActiveProduct(index)}
                            onMouseLeave={() => setActiveProduct(-1)}
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