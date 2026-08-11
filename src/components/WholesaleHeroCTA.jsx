import { Link } from "react-router-dom";
import "../styles/components/WholesaleHeroCTA.css";

const features = [
    "Factory-Direct Manufacturing",
    "Custom Designs & Private Label",
    "Scalable Production Capacity",
    "Worldwide Export & Logistics",
    "Dedicated Export Support",
    "Strict Quality Control",
];

const stats = [
    {
        icon: "bi-award",
        value: "25+",
        label: "Years",
    },
    {
        icon: "bi-flower1",
        value: "1000+",
        label: "Designs",
    },
    {
        icon: "bi-globe2",
        value: "Global",
        label: "Export",
    },
];

export default function WholesaleHeroCTA() {
    return (
        <section className="wholesale-section">

            <div className="container-fluid px-2">

                <div className="wholesale-wrapper">

                    <span className="shape shape-1"></span>
                    <span className="shape shape-2"></span>

                    <div className="row align-items-start g-5">

                        {/* LEFT */}

                        <div className="col-lg-6">

                            <div className="retail-content">

                                <div className="hero-crown">
                                    <i className="bi bi-stars"></i>
                                </div>

                                <span className="section-tag">
                                    Luxury Handmade Rugs
                                </span>

                                <h2 className="retail-title">
                                    Crafted in India's
                                    <br />
                                    <span>Carpet City.</span>
                                </h2>

                                <div className="title-divider">
                                    <span></span>
                                    <i className="bi bi-diamond-fill"></i>
                                    <span></span>
                                </div>

                                <p className="retail-description">
                                    Discover heirloom-quality handmade rugs woven by master
                                    artisans in Bhadohi. Every piece blends timeless
                                    craftsmanship, premium natural materials and refined design
                                    for homes, hospitality and commercial interiors around the
                                    world.
                                </p>

                                <div className="retail-actions">

                                    <Link
                                        to="/products"
                                        className="explore-btn"
                                    >
                                        Explore Collection
                                        <i className="bi bi-arrow-right"></i>
                                    </Link>

                                    <div className="retail-note">

                                        <div className="note-item">
                                            <i className="bi bi-patch-check"></i>
                                            <span>Premium Handmade Rugs</span>
                                        </div>

                                        <div className="note-divider"></div>

                                        <div className="note-item">
                                            <i className="bi bi-globe2"></i>
                                            <span>Worldwide Delivery</span>
                                        </div>

                                    </div>

                                </div>

                                {/* It was here */}

                            </div>

                        </div>

                        {/* CENTER DIVIDER */}

                        {/* <div className="col-lg-1 d-none d-lg-flex justify-content-center">
                            <div className="section-divider">

                                <span></span>

                                <div className="divider-icon">
                                    <i className="bi bi-diamond"></i>
                                </div>

                                <span></span>

                            </div>
                        </div> */}

                        {/* RIGHT */}

                        <div className="col-lg-6 px-4 px-lg-2">

                            <div className="wholesale-card">

                                <div className="card-badge">
                                    <i className="bi bi-buildings"></i>

                                    <span>
                                        Manufacturer • Wholesale • Export
                                    </span>

                                </div>

                                <h3 className="card-title">
                                    Source Directly from the Manufacturer
                                </h3>

                                <p className="card-description">
                                    Eurasian House manufactures handcrafted rugs for
                                    importers, retailers, hospitality groups, interior
                                    designers and private-label brands seeking dependable
                                    production, exceptional quality and worldwide export
                                    support.
                                </p>

                                <div className="stats-row">

                                    {stats.map((item) => (

                                        <div
                                            key={item.label}
                                            className="stat-item"
                                        >

                                            <i className={`bi ${item.icon}`}></i>

                                            <div>

                                                <h4>{item.value}</h4>

                                                <span>{item.label}</span>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="feature-grid">

                                    {features.map((feature) => (

                                        <div
                                            key={feature}
                                            className="feature-item"
                                        >

                                            <i className="bi bi-check2-circle"></i>

                                            <span>{feature}</span>

                                        </div>

                                    ))}

                                </div>

                                <Link
                                    to="/wholesale"
                                    className="wholesale-btn"
                                >
                                    Request Wholesale Catalogue

                                    <i className="bi bi-arrow-right"></i>

                                </Link>

                                <p className="small-note">
                                    Download our latest catalogue or discuss your sourcing
                                    requirements with our export specialists.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}