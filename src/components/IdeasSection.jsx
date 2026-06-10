import { useNavigate } from "react-router-dom";

export default function IdeasSection() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 576;

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
      img: "/ideas/idea3.png",
    },
  ];

  return (
    <div className="mb-5">
      <div className="text-center mb-3">
        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-2 fw-bold text-uppercase tracking-wider">
          Ideas for your home
        </span>
      </div>

      <div className="d-flex overflow-auto gap-3 pb-2">
        {ideas.map((item, i) => (
          <div
            key={i}
            style={{
              width: isMobile ? "260px" : "420px",
              flex: "0 0 auto",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/blogs/${item.id}`)}
          >
            <div className="card bg-light h-100">

              <img
                src={item.img}
                className="card-img-top"
                style={{
                  height: isMobile ? "240px" : "420px",
                  objectFit: "cover"
                }}
              />

              <div className="card-body">
                <h5
                  className="fw-bold"
                  style={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
                >
                  {item.title}
                </h5>
                <p className="text-muted small">{item.desc}</p>

                <div className={isMobile ? "mt-3 mb-3" : "mt-5 mb-5"}>
                  <span className="border border-1.5 border-black rounded-circle px-3 py-3">
                    →
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}