import "../styles/components/WhyChooseUs.css";

const features = [
  {
    icon: "bi-person-workspace",
    title: "Made by Skilled Artisans",
    text: "Having extensive experience of 25+ years in this field, our artisans bring a level of skill and artistry that is unmatched.",
  },
  {
    icon: "bi-gem",
    title: "Fair & Honest Pricing",
    text: "We believe exceptional craftsmanship should come with transparent pricing without middlemen and provide genuine value.",
  },
  {
    icon: "bi-patch-check",
    title: "Carefully Quality Checked",
    text: "Each rug is individually inspected before dispatch to ensure it meets our quality standards.",
  },
  {
    icon: "bi-globe2",
    title: "Delivered Worldwide",
    text: "Wherever you call home, we package every order with care for safe delivery to your doorstep. Shipping is totally free, you just pay for the rugs, we handle the shipping.",
  },
  {
    icon: "bi-headset",
    title: "Personal Customer Support",
    text: "From choosing the right rug to after-sales assistance, we're here whenever you need us. Use WhatsApp for instant support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">

      <div className="container">

        <div className="text-center mb-5">

          <div className="discount-ornament mt-4">

            <span className="ornament-line"></span>

            <span className="ornament-text">
              WHY CHOOSE US
            </span>

            <span className="ornament-line"></span>

          </div>

          <h2 className="mt-3 fw-semibold for-user-heading">
            Why Choose Eurasian House
          </h2>

          <p className="for-user-subheading mx-auto pt-3">
            We offer exceptional quality at lower prices than standard online stores. Buying directly from us eliminates middlemen commisions.
          </p>

        </div>

        <div className="row justify-content-center g-5">

          {features.map((item, index) => (

            <div
              key={index}
              className={`col-lg-${index < 3 ? "4" : "5"} col-md-6`}
            >

              <div className="why-card h-100">

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