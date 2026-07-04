import "./WhyChooseUs.css";

const features = [
  {
    icon: "bi-person-workspace",
    title: "Made by Skilled Artisans",
    text: "Every rug is handcrafted by experienced artisans, preserving generations of craftsmanship in every detail.",
  },
  {
    icon: "bi-gem",
    title: "Fair & Honest Pricing",
    text: "We believe exceptional craftsmanship should come with transparent pricing and genuine value.",
  },
  {
    icon: "bi-patch-check",
    title: "Carefully Quality Checked",
    text: "Every rug is individually inspected before dispatch to ensure it meets our quality standards.",
  },
  {
    icon: "bi-globe2",
    title: "Delivered Worldwide",
    text: "Wherever you call home, we package every order with care for safe delivery to your doorstep.",
  },
  {
    icon: "bi-headset",
    title: "Personal Customer Support",
    text: "From choosing the right rug to after-sales assistance, we're here whenever you need us.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us py-5">
      <div className="container">

        <div className="text-center mb-5">
          <span className="why-label">WHY EURASIAN HOUSE</span>

          <h2 className="why-title mt-3">
            Why Choose Eurasian House
          </h2>

          <p className="why-subtitle mx-auto">
            Beautiful homes deserve thoughtful craftsmanship. Every rug is
            carefully selected, fairly priced, and delivered with the attention
            your home deserves.
          </p>
        </div>

        <div className="row justify-content-center g-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`col-lg-${index < 3 ? "4" : "5"} col-md-6`}
            >
              <div className="why-card h-100 text-center">

                <div className="icon-circle">
                  <i className={`bi ${item.icon}`}></i>
                </div>

                <h5>{item.title}</h5>

                <p>{item.text}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}