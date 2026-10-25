
import { useState } from "react";

const questions = [
    {
        question: "What can I customize?",
        answer:
            "You can discuss materials, colors, patterns, weaving techniques, dimensions, shapes and personalized details. You can also bring an idea that combines several of these elements.",
    },
    {
        question: "Can I share my own design or reference photo?",
        answer:
            "Yes. Share your reference images, sketches or inspiration when contacting us. Our team can discuss the design and its feasibility with you.",
    },
    {
        question: "Can I customize a rug as a gift?",
        answer:
            "You can discuss personalized ideas such as names, initials, monograms and designs for weddings, housewarmings or other special occasions.",
    },
    {
        question: "Which materials and weaving methods are available?",
        answer:
            "Available options depend on your design and requirements. Contact us to discuss suitable materials and techniques for your custom rug.",
    },
    {
        question: "How much does a custom rug cost?",
        answer:
            "Pricing depends on factors such as dimensions, materials, design complexity and weaving technique. Share your requirements with us for a tailored quotation.",
    },
    {
        question: "How long does a custom rug take?",
        answer:
            "Production time varies depending on the design, size, technique and current production schedule. We'll discuss the expected timeline before you confirm your order.",
    },
];

export default function CustomRugsFAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="custom-faq section-padding">
            <div className="container">
                <div className="custom-faq__layout">
                    <div className="custom-faq__intro">
                        <span className="custom-rugs-section-eyebrow">
                            GOOD TO KNOW
                        </span>

                        <h2>
                            A few things
                            <br />
                            <span>you might wonder.</span>
                        </h2>

                        <p>
                            Every custom project is different.
                            Here are some helpful starting points.
                        </p>

                        <a
                            href="#custom-rug-contact"
                            className="custom-faq__contact-link"
                        >
                            Have another question?
                            <i className="bi bi-arrow-up-right" />
                        </a>
                    </div>

                    <div className="custom-faq__list">
                        {questions.map((item, index) => {
                            const isOpen = openIndex === index;
                            const panelId = `custom-rug-faq-${index}`;

                            return (
                                <article
                                    className={`custom-faq__item ${isOpen ? "is-open" : ""}`}
                                    key={item.question}
                                >
                                    <h3>
                                        <button
                                            type="button"
                                            className="custom-faq__question"
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            onClick={() =>
                                                setOpenIndex(
                                                    isOpen ? -1 : index
                                                )
                                            }
                                        >
                                            <span>{item.question}</span>
                                            <i
                                                className={`bi ${isOpen ? "bi-dash-lg" : "bi-plus-lg"}`}
                                            />
                                        </button>
                                    </h3>

                                    <div
                                        id={panelId}
                                        className="custom-faq__answer"
                                        hidden={!isOpen}
                                    >
                                        <p>{item.answer}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
