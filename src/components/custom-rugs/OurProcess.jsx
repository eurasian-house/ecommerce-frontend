
const steps = [
    {
        number: "01",
        icon: "bi-chat-square-heart",
        title: "Share Your Vision",
        description:
            "Tell us your idea, intended space, preferences or occasion. Reference photos are welcome.",
    },
    {
        number: "02",
        icon: "bi-pencil-square",
        title: "Plan the Details",
        description:
            "Discuss suitable materials, colors, patterns, dimensions and weaving options with our team.",
    },
    {
        number: "03",
        icon: "bi-brush",
        title: "Craft Your Rug",
        description:
            "Once the specifications and order details are agreed, the rug moves into production.",
    },
    {
        number: "04",
        icon: "bi-box-seam",
        title: "Prepare for Delivery",
        description:
            "Your completed rug is prepared for dispatch according to the agreed delivery arrangements.",
    },
];

export default function OurProcess() {
    return (
        <section className="custom-process section-padding">
            <div className="container">
                <div className="custom-rugs-section-heading">
                    <span className="custom-rugs-section-eyebrow">
                        FROM IDEA TO FINISHED RUG
                    </span>

                    <h2>
                        A clear path to
                        <br />
                        <span>something personal.</span>
                    </h2>

                    <p>
                        We'll guide you through the important decisions
                        so you can move forward with confidence.
                    </p>
                </div>

                <div className="custom-process__grid">
                    {steps.map((step, index) => (
                        <article
                            className="custom-process__step"
                            key={step.number}
                            style={{ "--step-index": index }}
                        >
                            <div className="custom-process__top">
                                <span className="custom-process__number">
                                    {step.number}
                                </span>

                                <span className="custom-process__icon">
                                    <i className={`bi ${step.icon}`} />
                                </span>
                            </div>

                            <h3>{step.title}</h3>
                            <p>{step.description}</p>

                            {index < steps.length - 1 && (
                                <i
                                    className="bi bi-arrow-right custom-process__connector"
                                    aria-hidden="true"
                                />
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
