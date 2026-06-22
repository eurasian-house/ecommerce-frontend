import React from "react";
import { useNavigate } from "react-router-dom";

const priceUnderStyles = {
    overlay: {
        background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
    },
    textShadow: {
        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
    },
};

const PriceUnder = () => {



    const navigate = useNavigate();

    // ✅ FIXED IMAGE PATHS (NO process.env)
    const images = {
        leftLarge: "/priceunder/left.jpg",
        topRightAdventure: "/priceunder/tr.jpg",
        orangeWhatsNew: "/priceunder/tc.jpg",
        middleRightPlant: "/priceunder/bc.jpg",
        bottomRightRoom: "/priceunder/br.jpg",
    };

    return (
        <div className="container py-5">
            <div className="row g-3">

                {/* LEFT */}
                <div className="col-lg-6">
                    <div
                        className="card border-0 position-relative h-100 overflow-hidden"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            navigate("/products", {
                                state: {
                                    autoSort: "new"
                                }
                            })
                        }
                    >
                        <img
                            src={images.leftLarge}
                            className="card-img h-100"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                            alt="What's new!"
                        />
                        <div
                            className="card-img-overlay d-flex flex-column justify-content-end text-white p-4"
                            style={priceUnderStyles.overlay}
                        >
                            <div style={priceUnderStyles.textShadow}>
                                <span className="badge bg-danger mb-2">New</span>
                                <h3 className="fw-bold">
                                    What's new!
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-lg-6">
                    <div className="row g-3 h-100">

                        {/* TOP MIDDLE */}
                        <div className="col-6">
                            <div
                                className="card border-0 position-relative h-100 overflow-hidden"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate("/products", {
                                        state: {
                                            autoBudget: "1"
                                        }
                                    })
                                }
                            >
                                <img
                                    src={images.orangeWhatsNew}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                    alt="Under Price $299"
                                />

                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Under $299
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* TOP RIGHT */}
                        <div className="col-6">
                            <div
                                className="card border-0 position-relative h-100 overflow-hidden"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate("/products", {
                                        state: {
                                            autoShapes: ["Round", "Oval"]
                                        }
                                    })
                                }
                            >
                                <img
                                    src={images.topRightAdventure}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt="Round and Oval Rugs"
                                    loading="lazy"
                                />

                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Round and Oval Rugs
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE */}
                        <div className="col-6">
                            <div
                                className="card border-0 position-relative h-100 overflow-hidden"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate("/products", {
                                        state: {
                                            autoShapes: ["Irregular"]
                                        }
                                    })
                                }
                            >
                                <img
                                    src={images.middleRightPlant}
                                    loading="lazy"
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt="Irregular Shape Rugs"
                                />

                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Irregular Shape
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="col-6">
                            <div
                                className="card border-0 position-relative h-100 overflow-hidden"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate("/products", {
                                        state: {
                                            autoQuality: "Premium"
                                        }
                                    })
                                }
                            >
                                <img
                                    src={images.bottomRightRoom}
                                    loading="lazy"
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt="Only Premium Carpets/Rugs"
                                />

                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Only Premium Carpets
                                    </h6>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PriceUnder;