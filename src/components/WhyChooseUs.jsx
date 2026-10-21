import "../styles/components/WhyChooseUs.css";

const features = [
  {
    number: "01",
    icon: "bi-person-workspace",
    title: "Made by Skilled Artisans",
    text: "With over 25 years of experience of exceptional rugs, our artisans bring exceptional skill and artistry to every rug.",
  },
  {
    number: "02",
    icon: "bi-currency-dollar",
    title: "Fair & Honest Pricing",
    text: "Buy directly from us and enjoy authentic craftsmanship without unnecessary middlemen or inflated prices.",
  },
  {
    number: "03",
    icon: "bi-patch-check",
    title: "Carefully Quality Checked",
    text: "Every rug is individually inspected before dispatch to meet our quality standards.",
  },
  {
    number: "04",
    icon: "bi-globe2",
    title: "Delivered Worldwide",
    text: "Carefully package your order and offer free worldwide shipping. You pay for the rug; we handle the shipping.",
  },
  {
    number: "05",
    icon: "bi-headset",
    title: "Personal Customer Support",
    text: "From choosing your rug to after-sales assistance, our team is here to help whenever you need us.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us">
      <div className="container">
        {/* ========== WHY CHOOSE US HEADER: START ========== */}
        <div className="why-choose-header">
          <div className="discount-ornament">

            <span className="ornament-line"></span>

            <span className="ornament-text">
              Just Arrived
            </span>

            <span className="ornament-line"></span>

          </div>

          <h2>
            More Than a Rug.
            <br />
            <span>A Part of Your Story.</span>
          </h2>

          <p>
            Thoughtfully crafted rugs, honest pricing, and personal service.
            Discover what makes Eurasian House different.
          </p>
        </div>
        {/* ========== WHY CHOOSE US HEADER: END ========== */}

        {/* ========== BRAND STORY: START ========== */}
        <div className="why-story">
          <div className="why-story-image">
            <img
              src="/whyus.jpg"
              alt="Handcrafted rug styled in a warm, elegant living room"
              loading="lazy"
            />
          </div>

          <div className="why-story-content">
            <span className="why-overline">THE EURASIAN DIFFERENCE</span>

            <h3>
              Exceptional craftsmanship.
              <br />
              <em>Without the extra cost.</em>
            </h3>

            <p className="why-story-description">
              We believe beautiful rugs should be accessible without middlemen and
              compromising on craftsmanship. By working directly with skilled
              artisans, we bring you thoughtfully made rugs at honest prices.
            </p>

            <div className="why-promise-list">
              <div className="why-promise">
                <span className="why-promise-icon">
                  <i className="bi bi-hand-thumbs-up" />
                </span>
                <div>
                  <h4>Direct from Artisans</h4>
                  <p>No middlemen, better value.</p>
                </div>
              </div>

              <div className="why-promise">
                <span className="why-promise-icon">
                  <i className="bi bi-shield-check" />
                </span>
                <div>
                  <h4>Quality You Can Trust</h4>
                  <p>Every rug checked before dispatch.</p>
                </div>
              </div>

              <div className="why-promise">
                <span className="why-promise-icon">
                  <i className="bi bi-truck" />
                </span>
                <div>
                  <h4>Worldwide Free Delivery</h4>
                  <p>Carefully packed for its journey to you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ========== BRAND STORY: END ========== */}

        {/* ========== FEATURE CARDS: START ========== */}
        <div className="why-features-grid">
          {features.map((item) => (
            <article className="why-feature-card" key={item.number}>
              <div className="why-feature-top">
                <span className="why-feature-icon">
                  <i className={`bi ${item.icon}`} />
                </span>

                <span className="why-feature-number">{item.number}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <div className="why-feature-footer">
                <span />
                <i className="bi bi-triangle" />
              </div>
            </article>
          ))}
        </div>
        {/* ========== FEATURE CARDS: END ========== */}
      </div>
    </section>
  );
}