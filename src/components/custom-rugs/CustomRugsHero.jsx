
const heroImage =
    import.meta.env.VITE_CUSTOM_RUGS_HERO_IMAGE || "";

const heroVideo =
    import.meta.env.VITE_CUSTOM_RUGS_HERO_VIDEO || "";

export default function CustomRugsHero() {
    return (
        <section className="custom-rugs-hero">
            <div className="custom-rugs-hero__media">
                {heroVideo ? (
                    <video
                        className="custom-rugs-hero__video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={heroImage || undefined}
                        aria-label="Our artisans crafting bespoke handmade rugs"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                ) : heroImage ? (
                    <img
                        className="custom-rugs-hero__image"
                        src={heroImage}
                        alt="Bespoke handmade rug crafted to your design"
                        fetchPriority="high"
                    />
                ) : null}
            </div>

            <div className="custom-rugs-hero__overlay" />

            <div className="custom-rugs-hero__content">
                <div className="custom-rugs-hero__eyebrow">
                    <span className="custom-rugs-hero__eyebrow-line" />
                    MADE PERSONAL. HANDCRAFTED WITH CARE.
                </div>

                <h1 className="custom-rugs-hero__title">
                    A Rug As Unique
                    <br />
                    As <span>Your Home.</span>
                </h1>

                <p className="custom-rugs-hero__description">
                    Your vision, your colors, your design.
                    From the first idea to the final knot,
                    we help you create a rug that is truly yours.
                </p>

                <div className="custom-rugs-hero__actions">
                    <a
                        href="#customization-options"
                        className="custom-rugs-btn custom-rugs-btn--light"
                    >
                        Explore Customization
                        <i className="bi bi-arrow-down-right" />
                    </a>

                    <a
                        href="#custom-rug-contact"
                        className="custom-rugs-btn custom-rugs-btn--outline"
                    >
                        Let's Create Your Rug
                        <i className="bi bi-arrow-up-right" />
                    </a>
                </div>

                <div className="custom-rugs-hero__trust">
                    <div className="custom-rugs-hero__trust-item">
                        <i className="bi bi-hand-index-thumb" />
                        <span>Made to Your Vision</span>
                    </div>

                    <span className="custom-rugs-hero__trust-divider" />

                    <div className="custom-rugs-hero__trust-item">
                        <i className="bi bi-brush" />
                        <span>Crafted with Care</span>
                    </div>
                </div>
            </div>

            <a
                href="#customization-options"
                className="custom-rugs-hero__scroll"
                aria-label="Scroll to customization options"
            >
                <span>DISCOVER THE POSSIBILITIES</span>
                <i className="bi bi-arrow-down" />
            </a>

            <div className="custom-rugs-hero__index" aria-hidden="true">
                EH / BESPOKE COLLECTION
            </div>
        </section>
    );
}
