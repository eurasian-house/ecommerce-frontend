import "./LoomToLiving.css";

const steps = [
    {
        icon: "bi-person-workspace",
        title: "Skilled Artisans",
        text: "Every rug begins in the hands of experienced artisans, preserving generations of craftsmanship in every knot.",
    },
    {
        icon: "bi-scissors",
        title: "Careful Finishing",
        text: "Every edge, texture, and detail is refined to achieve a beautiful finished piece.",
    },
    {
        icon: "bi-patch-check",
        title: "Quality Inspection",
        text: "Each rug is individually inspected to ensure it meets our standards before dispatch.",
    },
    {
        icon: "bi-box-seam",
        title: "Secure Packaging",
        text: "Professionally packed to help protect your rug throughout its journey.",
    },
    {
        icon: "bi-truck",
        title: "Worldwide Delivery",
        text: "Safely delivered to homes around the world through trusted logistics partners.",
    },
    {
        icon: "bi-house-heart",
        title: "A Place in Your Home",
        text: "Where craftsmanship becomes part of everyday living and lasting memories.",
    },
];

export default function LoomToLiving() {
    return (
        <section className="loom-section">

            <div className="container">

                <div className="text-center mb-5">
                    <span className="loom-label">
                        FROM LOOM TO LIVING ROOM
                    </span>

                    <h2 className="loom-title">
                        Every Rug Has a Journey
                    </h2>

                    <p className="loom-subtitle">
                        Every handcrafted rug follows a thoughtful journey before becoming
                        part of your home.
                    </p>
                </div>

                <div className="loom-timeline">

                    {steps.map((step, index) => (

                        <div
                            key={index}
                            className={`timeline-item ${index % 2 === 0 ? "left" : "right"
                                }`}
                        >

                            <div className="timeline-content">

                                <div className="timeline-icon">
                                    <i className={`bi ${step.icon}`}></i>
                                </div>

                                <h4>{step.title}</h4>

                                <p>{step.text}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}