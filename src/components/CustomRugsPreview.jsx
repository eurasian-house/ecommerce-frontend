
import { Link } from "react-router-dom";
import "../styles/components/CustomRugsPreview.css";

const rugImages = [
    {
        image:
            "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1000&q=85",
        title: "Choose Your Design",
        subtitle: "Patterns that tell your story",
        className: "crp-tile--large",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85",
        title: "Perfect Colors",
        subtitle: "Made for your space",
        className: "crp-tile--top",
    },
    {
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
        title: "Your Perfect Size",
        subtitle: "Every room, every shape",
        className: "crp-tile--bottom",
    },
];

const customOptions = [
    { icon: "bi-palette", label: "Colors" },
    { icon: "bi-grid-3x3", label: "Patterns" },
    { icon: "bi-layers", label: "Materials" },
    { icon: "bi-bounding-box", label: "Sizes & Shapes" },
    { icon: "bi-person-gear", label: "Personalization" },
];

export default function CustomRugsPreview() {
    return (
        <section className="crp-section">
            <div className="crp-container">
                <div className="crp-layout">
                    {/* Left: Editorial heading and options */}
                    <div className="crp-content">
                        <div className="discount-ornament">
                            <span className="ornament-line" />
                            <span className="ornament-text">MADE JUST FOR YOU</span>
                            <span className="ornament-line" />
                        </div>

                        <h2 className="recent-added-title">
                            Your Home. <br /><em>Your Style.</em><br />Your Rug.
                        </h2>

                        <p className="crp-description">
                            From colors and patterns to size and texture,
                            create a rug that feels unmistakably yours.
                        </p>

                        <div className="crp-options">
                            {customOptions.map((option) => (
                                <span className="crp-option" key={option.label}>
                                    <i
                                        className={`bi ${option.icon}`}
                                        aria-hidden="true"
                                    />
                                    {option.label}
                                </span>
                            ))}
                        </div>

                        <Link to="/custom-rugs" className="crp-button">
                            <span>Design Your Custom Rug</span>
                            <i className="bi bi-arrow-up-right" aria-hidden="true" />
                        </Link>

                        <span className="crp-note">
                            <i className="bi bi-heart" aria-hidden="true" />
                            A little imagination. A rug made for you.
                        </span>
                    </div>

                    {/* Right: Rug photography collage */}
                    <div className="crp-gallery">
                        <div className="crp-gallery__frame">
                            {rugImages.map((item, index) => (
                                <Link
                                    to="/custom-rugs"
                                    className={`crp-tile ${item.className}`}
                                    key={item.title}
                                    aria-label={`${item.title} — explore custom rugs`}
                                    style={{ "--tile-index": index }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                    />

                                    <span className="crp-tile__border" />

                                    <span className="crp-tile__caption">
                                        <span className="crp-tile__title">
                                            {item.title}
                                        </span>
                                        <span className="crp-tile__subtitle">
                                            {item.subtitle}
                                        </span>
                                    </span>

                                    <span className="crp-tile__arrow">
                                        <i
                                            className="bi bi-arrow-up-right"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Small decorative SVG */}
                        <svg
                            className="crp-decoration"
                            viewBox="0 0 100 100"
                            fill="none"
                            aria-hidden="true"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="39"
                                stroke="currentColor"
                                strokeWidth="0.8"
                                strokeDasharray="2 5"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="0.8"
                            />
                            <path
                                d="M50 30 L56 44 L70 50 L56 56 L50 70 L44 56 L30 50 L44 44 Z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            />
                        </svg>

                        <div className="crp-stamp">
                            <span>YOUR IDEA</span>
                            {/* <i className="bi bi-stars" aria-hidden="true" /> */}
                            E H
                            <span>OUR CRAFT</span>
                        </div>
                    </div>
                </div>


                {/* =====================================
    RUG INSPIRATION GALLERY
===================================== */}

                <div className="crp-inspiration">
                    <div className="crp-inspiration__heading">
                        <div>
                            <span className="crp-eyebrow">
                                <span className="crp-eyebrow__dot" />
                                FIND YOUR INSPIRATION
                            </span>
                            <h2 className="recent-added-title">
                                A Rug for Every <em>Beautiful Space.</em>
                            </h2>
                        </div>

                        <Link
                            to="/custom-rugs"
                            className="crp-inspiration__view-all"
                        >
                            Create Your Own
                            <i className="bi bi-arrow-up-right" aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="crp-inspiration__grid">
                        {[
                            {
                                title: "Living Room",
                                subtitle: "The heart of your home",
                                image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
                                className: "living",
                            },
                            {
                                title: "Bedroom",
                                subtitle: "Comfort in every detail",
                                image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
                                className: "bedroom",
                            },
                            {
                                title: "Minimal Spaces",
                                subtitle: "Less, but more meaningful",
                                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
                                className: "minimal",
                            },
                            {
                                title: "Warm & Cozy",
                                subtitle: "Made for slow moments",
                                image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
                                className: "cozy",
                            },
                            {
                                title: "Modern Interiors",
                                subtitle: "A statement underfoot",
                                image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
                                className: "modern",
                            },
                            {
                                title: "Natural Textures",
                                subtitle: "Beauty in every thread",
                                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
                                className: "natural",
                            },
                            {
                                title: "Elegant Corners",
                                subtitle: "Little details, big impact",
                                image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=900&q=85",
                                className: "elegant",
                            },
                            {
                                title: "Neutral Tones",
                                subtitle: "Effortlessly timeless",
                                image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=900&q=85",
                                className: "neutral",
                            },
                            {
                                title: "Contemporary Living",
                                subtitle: "Your style, reimagined",
                                image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=900&q=85",
                                className: "contemporary",
                            },
                            {
                                title: "Artful Interiors",
                                subtitle: "Express your individuality",
                                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
                                className: "artful",
                            },
                            {
                                title: "Quiet Luxury",
                                subtitle: "Understated elegance",
                                image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=85",
                                className: "luxury",
                            },
                            {
                                title: "Your Own Vision",
                                subtitle: "Something uniquely yours",
                                image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=85",
                                className: "vision",
                            },
                        ].map((rug, index) => (
                            <Link
                                to="/custom-rugs"
                                className={`crp-inspiration__item crp-inspiration__item--${rug.className}`}
                                key={rug.className}
                                style={{ "--gallery-index": index }}
                                aria-label={`Explore custom rugs for ${rug.title}`}
                            >
                                <img
                                    src={rug.image}
                                    alt={`${rug.title} rug inspiration`}
                                    loading="lazy"
                                />

                                <span className="crp-inspiration__border" />

                                <span className="crp-inspiration__number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="crp-inspiration__caption">
                                    <span className="crp-inspiration__subtitle">
                                        {rug.subtitle}
                                    </span>
                                    <span className="crp-inspiration__label">
                                        {rug.title}
                                    </span>
                                </span>

                                <span className="crp-inspiration__arrow">
                                    <i className="bi bi-arrow-up-right" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="crp-inspiration__footer">
                        <span>
                            <i className="bi bi-gear" aria-hidden="true" />
                            Get inspired by beautiful spaces
                        </span>

                        <Link to="/custom-rugs">
                            Make one yours
                            <i className="bi bi-arrow-right" aria-hidden="true" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
