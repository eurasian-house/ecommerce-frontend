import { Link } from "react-router-dom";
import "./WholesaleHeroCTA.css";

const features = [
    "Factory-Direct Manufacturing",
    "Custom Designs & Private Label",
    "Scalable Production Capacity",
    "Worldwide Export & Logistics",
    "Dedicated Export Support",
    "Strict Quality Control",
];

export default function WholesaleHeroCTA() {
    return (
        <section className="wholesale-section"
            style={{ "paddingTop": "0px" }}
        >
            <div className="container">

                <div className="wholesale-wrapper">

                    {/* Decorative Elements */}
                    <span className="shape shape-1"></span>
                    <span className="shape shape-2"></span>

                    <div className="row align-items-center g-5">

                        {/* LEFT */}
                        <div className="col-lg-6">

                            <div className="retail-content">

                                <span className="section-tag">
                                    Luxury Handmade Rugs
                                </span>

                                <h2>
                                    Crafted in India's
                                    <span> Carpet City.</span>
                                </h2>

                                <p>
                                    Discover heirloom-quality handmade rugs woven by
                                    master artisans in Bhadohi. Every piece blends
                                    timeless craftsmanship, premium natural materials,
                                    and refined design for homes, hospitality, and
                                    commercial interiors around the world.
                                </p>

                                <div className="retail-actions">

                                    <Link
                                        to="/products"
                                        className="btn btn-dark btn-lg explore-btn"
                                    >
                                        Explore Collection
                                    </Link>

                                    <div className="retail-note">
                                        Premium Handmade Rugs
                                        <span>•</span>
                                        Worldwide Delivery
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="col-lg-6">

                            <div className="wholesale-card">

                                <div className="card-top">

                                    <div className="card-badge">
                                        <i className="bi bi-buildings"></i>

                                        <span>
                                            Manufacturer • Wholesale • Export
                                        </span>
                                    </div>

                                    <h3>
                                        Source Directly from the Manufacturer
                                    </h3>

                                    <p className="card-description">
                                        Eurasian House manufactures handcrafted rugs
                                        for importers, retailers, hospitality groups,
                                        interior designers and private-label brands
                                        seeking dependable production, exceptional
                                        quality and worldwide export support.
                                    </p>

                                </div>

                                <div className="stats-row">

                                    <div>
                                        <h4>25+</h4>
                                        <span>Years</span>
                                    </div>

                                    <div>
                                        <h4>1000+</h4>
                                        <span>Designs</span>
                                    </div>

                                    <div>
                                        <h4>Global</h4>
                                        <span>Export</span>
                                    </div>

                                </div>

                                <div className="feature-grid">

                                    {features.map((item) => (

                                        <div
                                            key={item}
                                            className="feature-item"
                                        >
                                            <i className="bi bi-check2-circle"></i>

                                            <span>{item}</span>

                                        </div>

                                    ))}

                                </div>

                                <Link
                                    to="/wholesale"
                                    className="btn wholesale-btn"
                                >
                                    Request Wholesale Catalogue
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </Link>

                                <p className="small-note">
                                    Download our latest catalogue or discuss your
                                    sourcing requirements with our export specialists.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}