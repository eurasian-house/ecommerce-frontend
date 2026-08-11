import { COLORS } from "../data/productOptions";
import "../styles/components/Colors.css";


const COLOR_MAP = {
  Maroon: "#7A1F3D",
  Gold: "#D4AF37",
  Navy: "#1E3A8A",
  Blue: "#2563EB",
  "Sky Blue": "#38BDF8",
  Green: "#2E8B57",
  Olive: "#6B8E23",
  Beige: "#DCC9A3",
  Cream: "#FFFDD0",
  Ivory: "#FFFFF0",
  Brown: "#7B4A2F",
  Grey: "#8B8B8B",
  Silver: "#C0C0C0",
  White: "#FFFFFF",
  Black: "#1F1F1F",
  Teal: "#0F766E",
  Pink: "#EC4899",
  Purple: "#7C3AED",
  Orange: "#EA580C",
  Red: "#DC2626",
  Rust: "#B7410E",
  Mustard: "#D4A017",
  Tan: "#D2B48C",
  Yellow: "#FACC15",
};

const MULTICOLOR =
  "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)";

export default function Colors({ colorFilter, setColorFilter }) {
  return (
    <section className="colors-section section-spacing">

      <div className="section-header text-center">


        <div className="discount-ornament">

          <span className="ornament-line"></span>

          <span className="ornament-text">
            Color Collection
          </span>

          <span className="ornament-line"></span>

        </div>

        <h2 className="discount-title my-2">
          Find Your Perfect Palette
        </h2>

        <p className="section-description mb-4">
          Browse rugs by color and find the perfect match for your décor,
          furniture, and personal taste.
        </p>

      </div>

      <div className="colors-grid mb-4">

        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={color}
            onClick={() => setColorFilter(color)}
            className={`color-swatch ${colorFilter === color ? "active" : ""}`}
            style={{
              background:
                COLOR_MAP[color] ||
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 40%), conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)",

              border:
                color === "White"
                  ? "1px solid var(--border-color)"
                  : undefined,
            }}
          >
            <span className="color-name">{color}</span>
          </button>
        ))}

        <button
          type="button"
          className="color-clear"
          title="Clear filter"
          aria-label="Clear color filter"
          onClick={() => setColorFilter("")}
        >
          <i className="bi bi-x-lg"></i>
        </button>

      </div>

    </section>
  );
}