import "./BrandStory.css";

export default function BrandStory() {
    return (
        <section className="brand-story">

            <div className="container">

                <div className="row align-items-center g-5">

                    <div className="col-lg-6">

                        <span className="story-label">
                            THE STORY BEHIND EVERY RUG
                        </span>

                        <h2>
                            Crafted by Tradition. Chosen for Modern Homes.
                        </h2>

                        <p>
                            Every handcrafted rug tells a story long before it
                            reaches your home. Behind every knot is the skill of
                            experienced artisans who have spent years perfecting
                            their craft.
                        </p>

                        <p>
                            At Eurasian House, we believe a rug should be more
                            than a decorative piece. It should bring warmth,
                            character, and timeless craftsmanship into the spaces
                            where life happens every day.
                        </p>

                        <p>
                            Our commitment is simple — preserve authentic
                            craftsmanship while making it accessible to homes
                            around the world.
                        </p>

                    </div>

                    <div className="col-lg-6">

                        <div className="story-image">

                            <img
                                src="/us.jpg"
                                alt="Artisan weaving a handmade rug"
                                className="img-fluid rounded-4"
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}