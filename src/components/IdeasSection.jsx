import { useNavigate } from "react-router-dom";

export default function IdeasSection() {
  const navigate = useNavigate();

  const ideas = [
    {
      title: "Plan your perfect home",
      desc: "Turn your house into a home with personalized ideas.",
      img: "/ideas/idea1.jpg",
    },
    {
      title: "10 kitchen tools you didn’t know you needed",
      desc: "Make cooking easier with smart tools.",
      img: "/ideas/idea2.jpg",
    },
    {
      title: "6 ways to organise your gaming setup",
      desc: "Upgrade your setup for better gameplay.",
      img: "/ideas/idea3.jpg",
    },
  ];

  return (
    <div className="mb-5">
      <h4 className="fw-bold mb-3">Ideas for your home</h4>

      <div className="d-flex overflow-auto gap-3 pb-2">
        {ideas.map((item, i) => (
          <div
            key={i}
            style={{ width: "420px", flex: "0 0 auto", cursor: "pointer" }}
            onClick={() => navigate("/blogs")}
          >
            <div className="card bg-light h-100">

              <img
                src={item.img}
                className="card-img-top"
                style={{ height: "420px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small">{item.desc}</p>

                <div className="mt-5 mb-5">
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