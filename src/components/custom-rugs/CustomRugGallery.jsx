
const galleryItems = [
    {
        type: "image",
        title: "Material & Texture",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_1 || "",
        icon: "bi-layers",
    },
    {
        type: "video",
        title: "The Weaving Process",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_2 || "",
        icon: "bi-camera-reels",
    },
    {
        type: "image",
        title: "Patterns & Design",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_3 || "",
        icon: "bi-palette",
    },
    {
        type: "image",
        title: "Finished Creations",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_4 || "",
        icon: "bi-stars",
    },
    {
        type: "video",
        title: "Craftsmanship in Motion",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_5 || "",
        icon: "bi-play-circle",
    },
    {
        type: "image",
        title: "Personal Details",
        url: import.meta.env.VITE_CUSTOM_RUG_GALLERY_6 || "",
        icon: "bi-heart",
    },
];

export default function CustomRugGallery() {
    const items = galleryItems.filter((item) => item.url);

    return (
        <section className="custom-gallery section-padding">
            <div className="container">
                <div className="custom-rugs-section-heading">
                    <span className="custom-rugs-section-eyebrow">
                        IDEAS MADE REAL
                    </span>

                    <h2>
                        Explore the
                        <br />
                        <span>details that inspire.</span>
                    </h2>

                    <p>
                        Explore textures, designs and craftsmanship.
                        Let these details inspire your own custom rug.
                    </p>
                </div>

                {items.length > 0 ? (
                    <div className="custom-gallery__grid">
                        {items.map((item, index) => (
                            <article
                                className="custom-gallery__item"
                                key={item.title}
                                style={{ "--gallery-index": index }}
                            >
                                {item.type === "video" ? (
                                    <video
                                        controls
                                        playsInline
                                        preload="metadata"
                                        aria-label={item.title}
                                    >
                                        <source
                                            src={item.url}
                                            type="video/mp4"
                                        />
                                    </video>
                                ) : (
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                )}

                                <div className="custom-gallery__caption">
                                    <i className={`bi ${item.icon}`} />
                                    <span>{item.title}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="custom-gallery__empty">
                        <i className="bi bi-images" />
                        <h3>Your craftsmanship gallery</h3>
                        <p>
                            Add your Cloudinary image and video URLs to
                            display your own rug collection here.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
