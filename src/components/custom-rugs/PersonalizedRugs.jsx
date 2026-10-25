
export default function PersonalizedRugs() {
    const image =
        import.meta.env.VITE_CUSTOM_RUGS_PERSONALIZED_IMAGE || "";

    return (
        <section className="custom-personal section-padding">
            <div className="container">
                <div className="custom-personal__card">
                    <div className="custom-personal__visual">
                        {image ? (
                            <img
                                src={image}
                                alt="Personalized handmade rug with a custom design"
                                loading="lazy"
                            />
                        ) : (
                            <div className="custom-personal__placeholder">
                                <i className="bi bi-gift" />
                                <span>YOUR PERSONALIZED RUG</span>
                            </div>
                        )}

                        <div className="custom-personal__stamp">
                            <i className="bi bi-heart" />
                            <span>Made for someone special</span>
                        </div>
                    </div>

                    <div className="custom-personal__content">
                        <span className="custom-rugs-section-eyebrow">
                            A GIFT THAT LASTS
                        </span>

                        <h2>
                            More than a rug.
                            <br />
                            <span>A personal story.</span>
                        </h2>

                        <p>
                            Turn a thoughtful idea into something tangible.
                            Personalize a rug with names, initials, meaningful
                            dates or a design created especially for someone.
                        </p>

                        <div className="custom-personal__occasions">
                            <span><i className="bi bi-heart-fill" /> Weddings</span>
                            <span><i className="bi bi-house-heart" /> New homes</span>
                            <span><i className="bi bi-gift" /> Special gifts</span>
                            <span><i className="bi bi-door-open" /> Personal spaces</span>
                        </div>

                        <a
                            href="#custom-rug-contact"
                            className="custom-rugs-btn custom-rugs-btn--dark"
                        >
                            Create a Personal Design
                            <i className="bi bi-arrow-up-right" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
