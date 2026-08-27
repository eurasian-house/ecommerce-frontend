import { useNavigate } from "react-router-dom";
import "../styles/components/IdeasSection.css";


export default function IdeasSection() {
  const navigate = useNavigate();

  const ideas = [
    {
      id: 1,
      title: "Beyond Flat Floors: Why 3D Textured Rugs are Dominating 2026 Interior Design",
      desc: "Tactile luxury trends, high-low carving depths.",
      img: "/ideas/idea1.jpg",
    },
    {
      id: 2,
      title: "From Bhadohi with Love: Why Smart Homeowners are Choosing Artisanal Rugs Over Factory Mass-Production",
      desc: "Heritage storytelling, sustainable luxury vs synthetic.",
      img: "/ideas/idea2.jpg",
    },
    {
      id: 3,
      title: "The New Neutral: How Earthy 3D Rugs Can Instantly Warm Up a Cold, Minimalist Room",
      desc: "Room-warming styling tips, earthy palettes.",
      img: "/ideas/idea3.jpg",
    },
  ];

  return (
    <section className="ideas-section">

      <div className="container">

        <div className="text-center mb-5">
            <div className="discount-ornament">

              <span className="ornament-line"></span>

              <span className="ornament-text">
                Inspired Living
              </span>

              <span className="ornament-line"></span>

            </div>

          <h2 className="mt-3 fw-semibold for-user-heading">
            Ideas & Inspiration for Your Space
          </h2>

          <p className="pt-4 mx-auto">
            Discover home decor on Eurasian House Blogs and create the space of your dreams. Find inspiration by room and trend, or shop for that perfect item to complete the vibe.
          </p>

        </div>

        <div className="ideas-slider">

          {ideas.map((item) => (

            <div
              key={item.id}
              className="idea-item"
              onClick={() => navigate(`/blogs/${item.id}`)}
            >

              <div className="idea-card">

                <div className="idea-image-wrapper">

                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="idea-image"
                  />

                </div>

                <div className="idea-body">

                  <h5 className="idea-title">
                    {item.title}
                  </h5>

                  <p className="idea-desc">
                    {item.desc}
                  </p>

                  <div className="idea-footer">

                    <span className="idea-read">
                      Read Article
                    </span>

                    <div className="idea-arrow">
                      <i className="bi bi-arrow-right"></i>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}