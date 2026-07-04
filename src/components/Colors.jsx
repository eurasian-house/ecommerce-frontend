export default function Colors({ colorFilter, setColorFilter }) {
  const COLORS = ["Maroon", "Gold", "Navy Blue", "Green", "Beige", "Brown", "Grey", "White", "Black", "Teal", "Pink", "Orange", "Multi"];

  return (
    <div className="mb-4">
      <div className="text-center mb-3">
        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary section-title">
          Choose by Colours
        </span>
      </div>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        {COLORS.map((c) => (
          <div
            key={c}
            className={`color-swatch ${colorFilter === c ? "active" : ""}`}
            title={c}
            onClick={() => setColorFilter(c)}
            style={{
              background:
                c === "Maroon" ? "#7A1F3D" :
                  c === "Gold" ? "#D4AF37" :
                    c === "Navy Blue" ? "#1E3A8A" :
                      c === "Green" ? "#2E8B57" :
                        c === "Beige" ? "#DCC9A3" :
                          c === "Brown" ? "#7B4A2F" :
                            c === "Grey" ? "#8B8B8B" :
                              c === "White" ? "#FFFFFF" :
                                c === "Black" ? "#1F1F1F" :
                                  c === "Teal" ? "#0F766E" :
                                    c === "Pink" ? "#EC4899" :
                                      c === "Orange" ? "#EA580C" :
                                        "linear-gradient(135deg, #ff8707, #ff0000, #1E3A8A, #008138, #ffaa00, #eb5200, #ff00e6)",

              border:
                c === "White"
                  ? "1px solid #dcdcdc"
                  : undefined
            }}
          />
        ))}

        <button
          className="color-clear"
          onClick={() => setColorFilter("")}
          title="Clear filter"
        >
          ✕
        </button>
      </div>
    </div>
  );
}