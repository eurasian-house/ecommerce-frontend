import "../styles/components/LoomToLiving.css";


const steps = [
  {
    icon: "bi-person-workspace",
    title: "Skilled Artisans",
    text: "At Eurasian House, each rug begins in the hands of experienced artisans, preserving generations of craftsmanship in every knot.",
  },
  {
    icon: "bi-scissors",
    title: "Careful Finishing",
    text: "Every edge, texture, and detail is refined to achieve a beautiful finished piece.",
  },
  {
    icon: "bi-patch-check",
    title: "Quality Inspection",
    text: "Throughout the process, each rug is individually inspected to ensure it meets our standards before dispatch.",
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
          <div className="discount-ornament">

            <span className="ornament-line"></span>

            <span className="ornament-text">
              FROM LOOM TO LIVING ROOM
            </span>

            <span className="ornament-line"></span>

          </div>

          <h2 className="mt-3 fw-semibold for-user-heading">
            Every Rug Has a Journey
          </h2>

          <p className="mx-auto pt-4">
            The Eurasian House handcrafted rug follows a thoughtful journey before becoming
            part of your home.
          </p>

        </div>

        <div className="loom-grid">

          {steps.map((step, index) => (

            <div
              key={index}
              className="loom-card"
            >

              <div className="loom-card-content">

                <div className="loom-step-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="loom-icon">
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