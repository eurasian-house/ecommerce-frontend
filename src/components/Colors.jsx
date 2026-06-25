export default function Colors({ colorFilter, setColorFilter }) {
  const COLORS = ["Maroon", "Royal Blue", "Emerald Green", "Beige", "Grey", "White", "Teal", "Rose Pink", "Orange", "Multi"];

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
                  c === "Royal Blue" ? "#1F4E9E" :
                    c === "Emerald Green" ? "#0F8A5F" :
                      c === "Beige" ? "#D8C3A5" :
                        c === "Grey" ? "#8A8A8A" :
                          c === "White" ? "#ffffff" :
                            c === "Teal" ? "#0F766E" :
                              c === "Rose Pink" ? "#D88C9A" :
                                c === "Orange" ? "#D97706" :
                                  "linear-gradient(90deg, #7A1F3D, #1F4E9E, #0F8A5F, #D8C3A5, #8A8A8A)",

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