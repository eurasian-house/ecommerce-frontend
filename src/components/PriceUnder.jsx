import React from "react";

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
    // ✅ FIXED IMAGE PATHS (NO process.env)
    const images = {
        leftLarge: "/priceunder/left_large_easter.jpg",
        topRightAdventure: "/priceunder/adventure_bag.jpg",
        orangeWhatsNew: "/priceunder/orange_whats_new.jpg",
        middleRightPlant: "/priceunder/plant_window.jpg",
        bottomRightRoom: "/priceunder/kids_room.jpg",
    };

    return (
        <div className="container py-5">
            <div className="row g-3">

                {/* LEFT */}
                <div className="col-lg-6">
                    <div className="card border-0 position-relative h-100 overflow-hidden">
                        <img
                            src={images.leftLarge}
                            className="card-img h-100"
                            style={{ objectFit: "cover" }}
                            alt=""
                        />
                        <div
                            className="card-img-overlay d-flex flex-column justify-content-end text-white p-4"
                            style={priceUnderStyles.overlay}
                        >
                            <div style={priceUnderStyles.textShadow}>
                                <span className="badge bg-danger mb-2">New</span>
                                <h3 className="fw-bold">
                                    SMÖRFISK – a festive Easter collection
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
                            <div className="card border-0 position-relative h-100 overflow-hidden">
                                <img
                                    src={images.orangeWhatsNew}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                />
                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        What's new
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* TOP RIGHT */}
                        <div className="col-6">
                            <div className="card border-0 position-relative h-100 overflow-hidden">
                                <img
                                    src={images.topRightAdventure}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                />
                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Adventure collection
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE */}
                        <div className="col-6">
                            <div className="card border-0 position-relative h-100 overflow-hidden">
                                <img
                                    src={images.middleRightPlant}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                />
                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Plants & flowers
                                    </h6>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="col-6">
                            <div className="card border-0 position-relative h-100 overflow-hidden">
                                <img
                                    src={images.bottomRightRoom}
                                    className="card-img h-100"
                                    style={{ objectFit: "cover" }}
                                    alt=""
                                />
                                <div
                                    className="card-img-overlay d-flex align-items-end text-white p-3"
                                    style={priceUnderStyles.overlay}
                                >
                                    <h6 style={priceUnderStyles.textShadow}>
                                        Kids room
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