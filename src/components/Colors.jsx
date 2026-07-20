import { COLORS } from "../data/productOptions";

export default function Colors({ colorFilter, setColorFilter }) {

  return (
    <div className="mb-4">
      <div className="text-center mb-5">
        <span
          className="badge rounded-pill section-title"
          style={{
            backgroundColor: "#F3E8C8",
            color: "#8B6B2E",
          }}
        >
          Color Collection
        </span>

        <h2 className="mt-3 fw-semibold display-6">
          Find Your Perfect Palette
        </h2>

        <p
          className="mx-auto mt-3"
          style={{
            maxWidth: 620,
            color: "#777",
            lineHeight: 1.8,
          }}
        >
          Browse rugs by color and find the perfect match for your decor, furniture, and personal taste.
        </p>
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
                    c === "Navy" ? "#1E3A8A" :
                      c === "Blue" ? "#2563EB" :
                        c === "Sky Blue" ? "#38BDF8" :
                          c === "Green" ? "#2E8B57" :
                            c === "Olive" ? "#6B8E23" :
                              c === "Beige" ? "#DCC9A3" :
                                c === "Cream" ? "#FFFDD0" :
                                  c === "Ivory" ? "#FFFFF0" :
                                    c === "Brown" ? "#7B4A2F" :
                                      c === "Grey" ? "#8B8B8B" :
                                        c === "Silver" ? "#C0C0C0" :
                                          c === "White" ? "#FFFFFF" :
                                            c === "Black" ? "#1F1F1F" :
                                              c === "Teal" ? "#0F766E" :
                                                c === "Pink" ? "#EC4899" :
                                                  c === "Purple" ? "#7C3AED" :
                                                    c === "Orange" ? "#EA580C" :
                                                      c === "Red" ? "#DC2626" :
                                                        c === "Rust" ? "#B7410E" :
                                                          c === "Mustard" ? "#D4A017" :
                                                            c === "Tan" ? "#D2B48C" :
                                                              c === "Yellow" ? "#FACC15" :
                                                                "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",

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