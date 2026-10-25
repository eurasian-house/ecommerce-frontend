
export default function CraftsmanshipInMotion() {
    const videoUrl =
        import.meta.env.VITE_CUSTOM_RUGS_CRAFT_VIDEO || "";

    const poster =
        import.meta.env.VITE_CUSTOM_RUGS_WEAVING_IMAGE || "";

    return (
        <section className="custom-craft section-padding">
            <div className="container">
                <div className="custom-craft__grid">
                    <div className="custom-craft__content">
                        <div className="discount-ornament">

                            <span className="ornament-line"></span>

                            <span className="ornament-text">
                                THE ART BEHIND EVERY RUG
                            </span>

                            <span className="ornament-line"></span>

                        </div>

                        <h2>
                            Made by Hand.
                            <br />
                            <span>Made with Meaning.</span>
                        </h2>

                        <p>
                            Every custom rug begins with an idea.
                            Through thoughtful material selection,
                            skilled craftsmanship and attention to detail,
                            we work to turn that idea into something
                            you can live with and love.
                        </p>

                        <div className="custom-craft__facts">
                            <div>
                                <i className="bi bi-hand-index-thumb" />
                                <span>Artisan craftsmanship</span>
                            </div>
                            <div>
                                <i className="bi bi-palette" />
                                <span>Personal design choices</span>
                            </div>
                            <div>
                                <i className="bi bi-zoom-in" />
                                <span>Attention to detail</span>
                            </div>
                        </div>

                        <a
                            href="#custom-rug-contact"
                            className="custom-rugs-btn custom-rugs-btn--dark"
                        >
                            Discuss Your Design
                            <i className="bi bi-arrow-up-right" />
                        </a>
                    </div>

                    <div className="custom-craft__visual">
                        {videoUrl ? (
                            <video
                                controls
                                playsInline
                                preload="metadata"
                                poster={poster || undefined}
                                aria-label="Watch our rug-making craftsmanship"
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="custom-craft__placeholder">
                                {poster && <img src={poster} alt="Rug weaving craftsmanship" />}
                                <div className="custom-craft__placeholder-overlay">
                                    <i className="bi bi-camera-video" />
                                    <span>Your workshop video goes here</span>
                                </div>
                            </div>
                        )}

                        <div className="custom-craft__caption">
                            <i className="bi bi-camera-reels" />
                            <span>A closer look at the craft</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
