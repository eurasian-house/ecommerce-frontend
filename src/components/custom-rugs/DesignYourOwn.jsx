
import { useState } from "react";

const choices = [
    { id: "material", label: "Material", icon: "bi-layers" },
    { id: "design", label: "Design & pattern", icon: "bi-palette" },
    { id: "color", label: "Colors", icon: "bi-droplet-half" },
    { id: "weaving", label: "Weaving technique", icon: "bi-grid-3x3" },
    { id: "size", label: "Size", icon: "bi-arrows-angle-expand" },
    { id: "shape", label: "Shape", icon: "bi-circle-half" },
    { id: "personalized", label: "Personalization", icon: "bi-gift" },
    { id: "everything", label: "Everything", icon: "bi-magic" },
];

export default function DesignYourOwn() {
    const [selected, setSelected] = useState([]);

    const toggleChoice = (id) => {
        setSelected((previous) => {
            if (id === "everything") {
                return previous.includes("everything") ? [] : ["everything"];
            }

            const next = previous.filter((item) => item !== "everything");

            return next.includes(id)
                ? next.filter((item) => item !== id)
                : [...next, id];
        });
    };

    const startInquiry = () => {
        const labels = choices
            .filter((choice) => selected.includes(choice.id))
            .map((choice) => choice.label);

        const message = labels.length
            ? `I'd like to customize a rug. My interests are: ${labels.join(", ")}.`
            : "I'd like to discuss a custom rug. Please help me explore the options.";

        try {
            sessionStorage.setItem("customRugInquiry", message);
        } catch {
            // Continue to the contact section if session storage is unavailable.
        }

        document.getElementById("custom-rug-contact")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        window.dispatchEvent(
            new CustomEvent("custom-rug-inquiry", {
                detail: { message, selections: selected },
            })
        );
    };

    return (
        <section className="custom-design section-padding">
            <div className="container">
                <div className="custom-design__grid">
                    <div className="custom-design__intro">
                        <span className="custom-rugs-section-eyebrow">
                            YOUR RUG, YOUR RULES
                        </span>

                        <h2>
                            Start with an idea.
                            <br />
                            <span>Make it yours.</span>
                        </h2>

                        <p>
                            Select the details you'd like to personalize.
                            You don't need to know everything yet — we'll
                            help you work through the possibilities.
                        </p>

                        <div className="custom-design__note">
                            <i className="bi bi-lightbulb" />
                            <span>
                                Have a reference photo or sketch?
                                You can share it when you contact us.
                            </span>
                        </div>
                    </div>

                    <div className="custom-design__builder">
                        <div className="custom-design__builder-header">
                            <span>YOUR CUSTOM RUG</span>
                            <span>{selected.length} selected</span>
                        </div>

                        <div className="custom-design__choices">
                            {choices.map((choice) => {
                                const active = selected.includes(choice.id);

                                return (
                                    <button
                                        type="button"
                                        key={choice.id}
                                        className={`custom-design__choice ${active ? "is-selected" : ""}`}
                                        aria-pressed={active}
                                        onClick={() => toggleChoice(choice.id)}
                                    >
                                        <span className="custom-design__choice-icon">
                                            <i className={`bi ${choice.icon}`} />
                                        </span>

                                        <span>{choice.label}</span>

                                        <i
                                            className={`bi ${active ? "bi-check-circle-fill" : "bi-plus-circle"} custom-design__choice-check`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <div className="custom-design__builder-footer">
                            <p>
                                No commitment — just tell us what you have
                                in mind.
                            </p>

                            <button
                                type="button"
                                className="custom-rugs-btn custom-rugs-btn--dark"
                                onClick={startInquiry}
                            >
                                Discuss My Rug
                                <i className="bi bi-arrow-up-right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
