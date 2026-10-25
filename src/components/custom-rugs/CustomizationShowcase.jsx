
const customizationOptions = [
    {
        number: "01",
        title: "Material",
        subtitle: "Feel the difference",
        description:
            "Explore wool, cotton, jute and other materials to find the right texture and character for your space.",
        icon: "bi-layers",
        image: import.meta.env.VITE_CUSTOM_RUGS_MATERIAL_IMAGE || "",
    },
    {
        number: "02",
        title: "Design & Pattern",
        subtitle: "Your vision, your design",
        description:
            "From timeless traditional motifs to contemporary geometry, bring your own reference or create something new.",
        icon: "bi-palette",
        image: import.meta.env.VITE_CUSTOM_RUGS_DESIGN_IMAGE || "",
    },
    {
        number: "03",
        title: "Colors",
        subtitle: "Make it yours",
        description:
            "Choose a single shade, a subtle palette or a bold combination that complements your interior.",
        icon: "bi-droplet-half",
        image: import.meta.env.VITE_CUSTOM_RUGS_COLORS_IMAGE || "",
    },
    {
        number: "04",
        title: "Weaving Technique",
        subtitle: "Crafted your way",
        description:
            "Discuss hand-knotting, hand-tufting, dhurrie weaving and other suitable techniques for your design.",
        icon: "bi-grid-3x3",
        image: import.meta.env.VITE_CUSTOM_RUGS_WEAVING_IMAGE || "",
    },
    {
        number: "05",
        title: "Size & Dimensions",
        subtitle: "Made to fit",
        description:
            "Choose the dimensions for your living room, bedroom, hallway, workspace or any special area.",
        icon: "bi-arrows-angle-expand",
        image: import.meta.env.VITE_CUSTOM_RUGS_SIZE_IMAGE || "",
    },
    {
        number: "06",
        title: "Shape",
        subtitle: "Think beyond the rectangle",
        description:
            "Explore rectangular, round, oval, runner and other shapes suited to your design and space.",
        icon: "bi-circle-half",
        image: import.meta.env.VITE_CUSTOM_RUGS_SHAPE_IMAGE || "",
    },
    {
        number: "07",
        title: "Personalized Rugs",
        subtitle: "Made meaningful",
        description:
            "Add names, initials, monograms or meaningful details for weddings, housewarmings and thoughtful gifts.",
        icon: "bi-gift",
        image: import.meta.env.VITE_CUSTOM_RUGS_PERSONALIZED_IMAGE || "",
    },
    {
        number: "08",
        title: "Completely Bespoke",
        subtitle: "Start with an idea",
        description:
            "Have a unique concept in mind? Let's discuss the material, design, colors, dimensions and details together.",
        icon: "bi-magic",
        image: import.meta.env.VITE_CUSTOM_RUGS_BESPOKE_IMAGE || "",
    },
];

export default function CustomizationShowcase() {
    return (
        <section
            className="custom-rugs-options section-padding"
            id="customization-options"
        >
            <div className="container">
                <div className="custom-rugs-section-heading">
                    <div className="discount-ornament">
                        <span className="ornament-line"></span>

                        <span className="ornament-text">
                            YOUR IDEAS, OUR CRAFT
                        </span>

                        <span className="ornament-line"></span>
                    </div>

                    <h2 className="recent-added-title">
                        Every Detail. <br /><em>Your Choice.</em>
                    </h2>

                    <p>
                        A rug should feel like it belongs to you.
                        Choose the details that matter, combine your
                        favorite ideas, and let us help bring them together.
                    </p>
                </div>

                <div className="custom-rugs-options__grid">
                    {customizationOptions.map((option, index) => (
                        <article
                            className={`custom-rugs-option-card ${index === 0
                                ? "custom-rugs-option-card--featured"
                                : ""
                                }`}
                            key={option.number}
                            style={{ "--card-index": index }}
                        >
                            <div className="custom-rugs-option-card__media">
                                {option.image ? (
                                    <img
                                        src={option.image}
                                        alt={`${option.title} rug customization`}
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="custom-rugs-option-card__placeholder">
                                        <i className={`bi ${option.icon}`} />
                                        <span>YOUR DESIGN POSSIBILITY</span>
                                    </div>
                                )}

                                <span className="custom-rugs-option-card__number">
                                    {option.number}
                                </span>

                                <span className="custom-rugs-option-card__icon">
                                    <i className={`bi ${option.icon}`} />
                                </span>
                            </div>

                            <div className="custom-rugs-option-card__body">
                                <span className="custom-rugs-option-card__subtitle">
                                    {option.subtitle}
                                </span>

                                <h3>{option.title}</h3>

                                <p>{option.description}</p>

                                <a
                                    href="#custom-rug-contact"
                                    className="custom-rugs-option-card__link"
                                    aria-label={`Customize your rug: ${option.title}`}
                                >
                                    Discuss your idea
                                    <i className="bi bi-arrow-up-right" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="custom-rugs-options__footer">
                    <div>
                        <span className="custom-rugs-options__footer-label">
                            HAVE SOMETHING DIFFERENT IN MIND?
                        </span>

                        <p>
                            You don't have to choose just one option.
                            Let's create something entirely your own.
                        </p>
                    </div>

                    <a
                        href="#custom-rug-contact"
                        className="custom-rugs-btn custom-rugs-btn--dark"
                    >
                        Tell Us Your Idea
                        <i className="bi bi-arrow-up-right" />
                    </a>
                </div>
            </div>
        </section>
    );
}
