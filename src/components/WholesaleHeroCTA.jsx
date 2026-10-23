
import { useEffect, useRef, useState } from "react";
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
    { icon: "bi-award", value: "25+", label: "Years" },
    { icon: "bi-flower1", value: "1000+", label: "Designs" },
    { icon: "bi-globe2", value: "Global", label: "Export" },
];

function TajMahalArtwork() {
    const artworkRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = artworkRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    const pathRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;

        const length = path.getTotalLength();

        path.style.setProperty("--taj-path-length", length);
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    }, []);

    return (
        <div
            ref={artworkRef}
            className={`taj-artwork ${visible ? "taj-artwork--visible" : ""}`}
            aria-label="Decorative animated Taj Mahal illustration"
            role="img"
        >
            <div className="taj-artwork__glow" />

            <svg
                className="taj-artwork__svg"
                viewBox="0 0 562 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient
                        id="taj-rainbow-gradient"
                        x1="0"
                        y1="0"
                        x2="562"
                        y2="300"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#ff9933" />
                        <stop offset="28%" stopColor="#ffd166" />
                        <stop offset="52%" stopColor="#ffffff" />
                        <stop offset="72%" stopColor="#70d6a0" />
                        <stop offset="100%" stopColor="#5bbcff" />
                    </linearGradient>
                </defs>

                <path
                    ref={pathRef}
                    className="taj-artwork__path"
                    d="M147.5 267.559H125C124.333 257.393 123 236.16 123 232.56C129.8 228.16 125.833 225.726 123 225.06C122.667 215.226 122 194.96 122 192.56C128.8 188.96 124.5 186.06 121.5 185.06C121.167 174.393 120.5 152.26 120.5 149.06C126.1 146.26 122.833 143.893 120.5 143.06V135.56C127 132.06 120 133.56 120 131.56C122 125.56 117.5 123.06 115 122.56L113.5 115.06C113.333 116.726 112.8 120.56 112 122.56C105.5 125.56 108 126.56 106.5 131.56C100.5 132.36 104 134.56 106.5 135.56V143.06C100.5 144.26 104 147.56 106.5 149.06C106 159.06 105 180.26 105 185.06C97.8 187.06 102 190.56 105 192.06C104.5 201.06 103.5 220.26 103.5 225.06C95.5 225.86 100.167 231.06 103.5 233.56L102 267.559H69.5C68.8333 253.893 67.5 225.06 67.5 219.06C76.3 212.66 71.1667 209.726 67.5 209.06C67 196.56 66 170.16 66 164.56C73.6 158.56 69.1667 156.06 66 155.56C65.3333 140.893 64 110.46 64 106.06C70 101.66 66.5 98.2262 64 97.0596V85.5596C69.5 83.0596 68.5 84.0596 64 81.0596C64 72.5596 59.6667 69.0596 56.5 67.5596L55 59.0596C54.5 60.5596 53.5 64.3596 53.5 67.5596C43 73.0596 47.5 73.0596 44.5 81.0596C36.5 82.6596 41.1667 84.7262 44.5 85.5596V97.0596C38.5 98.2596 42 103.56 44.5 106.06C43.8333 119.56 42.5 148.36 42.5 155.56C33.3 157.56 38.6667 162.393 42.5 164.56L41 209.06C39 209.393 35.1 210.66 35.5 213.06C35.9 215.46 38.6667 218.06 40 219.06C39.3333 237.226 38 272.36 38 267.559C34.8 267.159 33.3333 270.059 33 271.559V298.559L0 298.56H528M147.5 267.559V149.06C147.333 147.06 147.6 143.06 150 143.06C152.4 143.06 153.333 147.06 153.5 149.06V164.06C153.5 166.226 157 168.96 171 162.56H186V144.176M147.5 267.559H153.5C150.5 194.059 156.5 192.56 156.5 190.06C155.5 187.56 159 179.56 163 179.56C170.6 182.76 173.167 192.56 173.5 197.06C172.667 217.06 171.5 258.26 173.5 263.06C176 269.06 175.5 271.559 177.5 265.56C179.5 241.56 177 239.06 177.5 228.56C178 218.06 183.5 219.06 188.5 217.06C188.5 196.06 188.5 198.56 190.5 190.06C192.5 181.56 197.5 182.06 201 179.56C211 183.56 215.167 189.893 216 192.56V219.06C226 212.26 227.5 204.893 227 202.06V149.06C227 143.86 231.667 141.226 234 140.56C264.667 140.726 326.4 140.96 328 140.56C330 140.06 330.5 143.06 334 139.06C334.073 138.546 334.15 138.045 334.23 137.556M186 144.176V143.06C197.167 142.393 219.6 141.46 220 143.06C220.5 145.06 229.5 150.56 216 162.56C210 162.56 189.5 167.06 188.5 162.56C187.7 158.96 188.167 149.06 188.5 144.56C187.857 144.506 186.966 144.384 186 144.176ZM186 144.176C183.961 143.737 181.586 142.917 180.5 141.56C178.9 139.56 183.5 138.726 186 138.56C184.667 133.226 185.8 121.06 201 115.06C203.794 112.731 205.287 113.005 205.883 104.571M205.883 104.571C205.927 103.95 205.966 103.28 206 102.56C205.943 103.249 205.902 103.919 205.883 104.571ZM205.883 104.571C205.761 108.653 206.482 112.042 209.5 115.06C213 118.56 224 117.06 224.5 138.56M224.5 138.56H188.5M224.5 138.56H227C227.833 137.56 229.6 134.66 230 131.06C230.5 126.56 279 118.56 328 128.56C329.592 127.101 332.59 122.898 335.027 116.846M335.027 116.846C341.778 100.085 344.217 69.1428 300.5 43.0596C290 36.0596 279.5 26.5596 282 22.0596C284.5 17.5596 284 17.5596 282 12.5596C280.4 8.55957 280.333 2.55957 280.5 0.0595703L279 12.5596C277.167 14.2262 274.6 18.4596 279 22.0596C279 30.0596 271.5 35.0596 260.5 43.0596C249.5 51.0596 207.5 78.0596 224.5 115.06C240.248 113.091 293.776 102.404 335.027 116.846ZM335.027 116.846C335.688 117.077 336.346 117.315 337 117.56C338.2 119.16 339.167 120.56 339.5 121.06C337.667 123.226 334 129.56 334 137.56C334.067 137.56 334.144 137.558 334.23 137.556M334.23 137.556C338.003 137.45 359.847 135.115 375 137.56C374 132.56 374 120.06 359 114.56C357.075 112.153 354.687 111.137 354.51 103.04M334.23 137.556C337.978 114.683 349.052 117.497 351.5 114.56C353.754 111.855 354.472 106.304 354.51 103.04M354.51 103.04C354.504 102.724 354.5 102.397 354.5 102.06C354.511 102.355 354.515 102.684 354.51 103.04ZM180.5 267.559H186C184.667 255.726 185.8 231.36 201 228.56C213 241.06 216 234.559 216 267.559H248.5M248.5 267.559V205.56C250.667 197.226 260 179.46 280 175.06C288.5 179.56 292 175.06 310 197.06C313.2 222.26 313.333 251.56 313 263.06C320 263.893 334 262.36 334 249.56V152.56C333.5 149.893 334.4 144.26 342 143.06C350.103 141.78 366.574 143.411 375.897 142.367M412.5 267.559H406.5C408.167 239.726 408.6 183.16 397 179.56C392.5 185.06 384 199.06 389 253.56C389 257.96 386.667 264.726 385.5 267.559H372C373.333 257.726 372.6 236.16 359 228.56C351.5 233.56 342 230.059 342 267.559H248.5M375.897 142.367C376.969 142.246 377.947 142.091 378.806 141.891M375.897 142.367C376.709 140.773 377.913 141.42 378.806 141.891M375.897 142.367C379.235 141.792 379.633 141.682 380 141.56C380 142.513 379.495 142.254 378.806 141.891ZM367.077 162.56H342C338.667 160.06 333 153.86 337 149.06C337 156.258 329.41 158.577 367.077 162.56ZM367.077 162.56C371.55 163.032 376.662 163.529 382.5 164.06C396.5 164.56 392 160.06 406.5 167.56C406.5 159.56 404.5 147.56 409.5 143.06C412.5 152.56 412 139.06 412.5 164.56C412.9 184.96 412.667 241.726 412.5 267.559M412.5 267.559H435L437.5 233.06C434 230.393 429.1 225.06 437.5 225.06V193.06C435 191.56 431.5 187.66 437.5 184.06C438.7 179.26 440.333 158.726 441 149.06C438.333 147.56 434.6 144.26 441 143.06V137.56C437.833 135.226 433.4 130.76 441 131.56C441 128.56 438 125.56 443 124.56C448 123.56 446.5 117.56 447 114.56C447 122.56 449.333 124.226 450.5 124.06C452 124.393 454.8 126.36 454 131.56C454.5 132.56 460.5 133.56 454 135.56V149.06C454 151.86 455 174.56 455.5 185.56V193.06C455.5 196.66 456.167 215.893 456.5 225.06C460 225.56 464.9 227.86 456.5 233.06C456.9 235.86 458 257.226 458.5 267.559H490.5L493 219.06C488.833 216.893 483 211.86 493 209.06C493 204.26 494 177.393 494.5 164.56C491 162.56 486.1 157.96 494.5 155.56C494.5 150.36 496.167 119.726 497 105.06C494.167 103.393 490.2 99.3596 497 96.5596V86.5596C493.167 85.2262 487.8 82.2596 497 81.0596C497 78.0596 496.5 72.0596 503.5 69.0596C505 66.5596 506 59.0596 506 58.5596C506 58.0596 506.5 68.0596 508.5 68.5596C510.5 69.0596 515.5 72.5596 516 81.0596C516 82.5596 524.5 83.0596 516 85.5596V97.5596C518.833 97.7262 522.8 99.4596 516 105.06C516 107.86 517 139.893 517.5 155.56C521.333 156.226 526.7 158.96 517.5 164.56C517.5 166.96 518.833 195.226 519.5 209.06C523.333 210.393 528.7 214.26 519.5 219.06C519.5 222.66 520.833 252.893 521.5 267.559C523.667 267.559 528 268.46 528 272.06V298.56M385.5 267.559C383.5 259.893 380.1 240.66 382.5 225.06C382.5 219.06 377 219.06 372 219.06M372 219.06H342C340.667 207.393 342.2 183.16 359 179.56C366 185.06 376.5 192.56 372 214.56V219.06ZM528 298.56H562"
                />
            </svg>
        </div>
    );
}

export default function WholesaleHeroCTA() {
    return (
        <section className="wholesale-section">
            <div className="container-fluid px-0">
                <div className="wholesale-wrapper px-2">
                    <span className="shape shape-1"></span>
                    <span className="shape shape-2"></span>

                    <div className="row align-items-start g-5 card1">
                        {/* LEFT */}
                        <div className="col-lg-6">
                            <div className="retail-content">
                                <div className="hero-crown">
                                    <i className="bi bi-award-fill"></i>
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
                                    <Link to="/products" className="btn-primary btn-lg">
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

                                <TajMahalArtwork />
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="col-lg-6 px-4 px-lg-2">
                            <div className="wholesale-card">
                                <div className="card-container">
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
                                </div>

                                <div className="stats-row">
                                    {stats.map((item) => (
                                        <div key={item.label} className="stat-item">
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
                                        <div key={feature} className="feature-item">
                                            <i className="bi bi-check2-circle"></i>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/wholesale" className="btn-secondary w-100">
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
