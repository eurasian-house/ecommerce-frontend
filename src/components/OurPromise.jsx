import "../styles/components/OurPromise.css";

const promises = [
    {
        icon: "bi-hand-index",
        title: "Made by Hand",
        text: "Traditional craftsmanship in every detail.",
    },
    {
        icon: "bi-patch-check",
        title: "Quality First",
        text: "Carefully finished and inspected rugs.",
    },
    {
        icon: "bi-shield-check",
        title: "Packed with Care",
        text: "Protected for the journey to your home.",
    },
];

export default function OurPromise() {
    return (
        <section className="our-promise">
            <div className="container">
                <div className="promise-box">
                    <div className="promise-decoration" aria-hidden="true">
                        <i className="bi bi-flower1" />
                    </div>

                    <div className="promise-content">
                        <div className="discount-ornament mt-4">
                            <span className="ornament-line"></span>
                            <span className="ornament-text">
                                OUR PROMISE
                            </span>
                            <span className="ornament-line"></span>
                        </div>

                        <h2 className="recent-added-title">
                            Crafted with Care. <br /><em>Delivered with Confidence.</em>
                        </h2>

                        <p>
                            Every rug we create reflects patience, passion, and generations
                            of artistry. We take the time to refine every detail and carefully
                            prepare each piece for its journey to you.
                            <strong>
                                {" "}From our hands to your home, your rug deserves care at
                                every step.
                            </strong>
                        </p>

                        <div className="promise-divider">
                            <span />
                            <i className="bi bi-flower3" />
                            <span />
                        </div>

                        <div className="promise-features">
                            {promises.map((promise) => (
                                <div className="promise-feature" key={promise.title}>
                                    <div className="promise-feature-icon">
                                        <i className={`bi ${promise.icon}`} />
                                    </div>

                                    <div>
                                        <h3>{promise.title}</h3>
                                        <p>{promise.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="promise-signature">
                            <span>With care,</span>
                            <strong>Eurasian House</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}