export default function Colors({ colorFilter, setColorFilter }) {
  const COLORS = ["Red", "Blue", "Green", "Black", "White", "Brown", "Gold", "Multi"];

  return (
    <div className="mb-4">
      <div className="text-center mb-3">
        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-2 fw-bold text-uppercase tracking-wider">
          Choose by Colours
        </span>
      </div>
      <div className="d-flex gap-2 flex-wrap">
        {COLORS.map((c) => (
          <button
            key={c}
            className="btn btn-sm border"
            style={{
              background:
                c === "Red" ? "red" :
                  c === "Blue" ? "blue" :
                    c === "Green" ? "green" :
                      c === "Black" ? "black" :
                        c === "White" ? "white" :
                          c === "Brown" ? "brown" :
                            c === "Gold" ? "gold" :
                              "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",

              color:
                c === "White" || c === "Gold"
                  ? "black"
                  : "white",

              border:
                c === "White"
                  ? "1px solid #ccc"
                  : "none",

              fontWeight: "600",

              opacity: colorFilter && colorFilter !== c ? 0.6 : 1
            }}
            onClick={() => setColorFilter(c)}
          >
            {c === "Multi" ? "Multicolor" : c}
          </button>
        ))}

        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setColorFilter("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}