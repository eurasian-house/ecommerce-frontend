import "../styles/components/LoomToLiving.css";

const steps = [
  {
    icon: "bi-person-workspace",
    title: "Skilled Artisans",
    text: "Every rug begins in the hands of experienced artisans, preserving generations of craftsmanship in every knot.",
    image: "/loomtoroom/1.png",
  },
  {
    icon: "bi-scissors",
    title: "Careful Finishing",
    text: "Every edge, texture, and detail is refined to create a beautiful, carefully finished piece.",
    image: "/loomtoroom/2.png",
  },
  {
    icon: "bi-patch-check",
    title: "Quality Inspection",
    text: "Each rug is individually inspected to ensure it meets our quality standards before dispatch.",
    image: "/loomtoroom/3.png",
  },
  {
    icon: "bi-box-seam",
    title: "Secure Packaging",
    text: "Professionally packed with care to help protect your rug throughout its journey.",
    image: "/loomtoroom/4.png",
  },
  {
    icon: "bi-truck",
    title: "Worldwide Delivery",
    text: "Your rug travels to homes around the world through trusted logistics partners.",
    image: "/loomtoroom/5.png",
  },
  {
    icon: "bi-house-heart",
    title: "A Place in Your Home",
    text: "Where generations of craftsmanship become part of everyday living and lasting memories.",
    image: "/loomtoroom/6.png",
  },
];

export default function LoomToLiving() {
  return (
    <section className="loom-section">
      <div className="container">
        <header className="loom-heading text-center">
          <div className="loom-eyebrow">
            <span />
            FROM LOOM TO LIVING ROOM
            <span />
          </div>

          <h2>
            Every Rug Has <em>a Journey</em>
          </h2>

          <p>
            Thoughtfully crafted, carefully finished, and made to feel at
            home. Discover the journey behind every Eurasian House rug.
          </p>

          <div className="loom-handwritten">
            Crafted by people, not machines.
          </div>
        </header>

        <div className="loom-grid">
          {steps.map((step, index) => (
            <article className="loom-card" key={step.title}>
              <div className="loom-card-image">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                />
                <span className="loom-image-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="loom-card-content">
                <div className="loom-icon" aria-hidden="true">
                  <i className={`bi ${step.icon}`} />
                </div>

                <div className="loom-card-copy">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>

                {/* <span className="loom-card-arrow" aria-hidden="true">
                  <i className="bi bi-arrow-up-right" />
                </span> */}
              </div>
            </article>
          ))}
        </div>

        <div className="loom-bottom-note">
          <span />
          <p>Made with care. Chosen for life.</p>
          <span />
        </div>
      </div>
    </section>
  );
}