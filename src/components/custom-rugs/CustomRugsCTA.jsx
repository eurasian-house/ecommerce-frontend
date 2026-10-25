
export default function CustomRugsCTA() {
    const whatsappNumber =
        import.meta.env.VITE_WHATSAPP_NUMBER || "";

    const email =
        import.meta.env.VITE_CUSTOM_RUGS_EMAIL || "";

    const whatsappUrl = whatsappNumber
        ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
              "Hello Eurasian House, I'd like to discuss a custom rug."
          )}`
        : "";

    const emailUrl = email
        ? `mailto:${email}?subject=${encodeURIComponent(
              "Custom Rug Inquiry"
          )}&body=${encodeURIComponent(
              "Hello Eurasian House,\n\nI'd like to discuss a custom rug.\n\nMy ideas and requirements:\n"
          )}`
        : "";

    const openChat = () => {
        window.dispatchEvent(
            new CustomEvent("open-custom-chat", {
                detail: { message: "I'd like to discuss a custom rug." },
            })
        );
    };

    return (
        <section
            className="custom-contact section-padding"
            id="custom-rug-contact"
        >
            <div className="container">
                <div className="custom-contact__card">
                    <div className="custom-contact__decoration" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>

                    <span className="custom-rugs-section-eyebrow">
                        YOUR IDEA STARTS HERE
                    </span>

                    <h2>
                        Let's create
                        <br />
                        <span>something yours.</span>
                    </h2>

                    <p>
                        Have a design in mind, a space to transform
                        or a special gift to create? Tell us about it.
                        We'll help you explore the possibilities.
                    </p>

                    <div className="custom-contact__actions">
                        <button
                            type="button"
                            className="custom-rugs-btn custom-rugs-btn--light"
                            onClick={openChat}
                        >
                            <i className="bi bi-chat-dots" />
                            Chat With Us
                        </button>

                        {whatsappUrl && (
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="custom-rugs-btn custom-rugs-btn--outline"
                            >
                                <i className="bi bi-whatsapp" />
                                WhatsApp
                            </a>
                        )}

                        {emailUrl && (
                            <a
                                href={emailUrl}
                                className="custom-rugs-btn custom-rugs-btn--outline"
                            >
                                <i className="bi bi-envelope" />
                                Email Us
                            </a>
                        )}

                        <a
                            href="/contact"
                            className="custom-rugs-btn custom-rugs-btn--outline"
                        >
                            <i className="bi bi-arrow-up-right" />
                            Contact Us
                        </a>
                    </div>

                    <div className="custom-contact__footer">
                        <i className="bi bi-heart" />
                        Every great rug begins with an idea.
                    </div>
                </div>
            </div>
        </section>
    );
}
