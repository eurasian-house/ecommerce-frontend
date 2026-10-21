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
  Terracotta: "#E2725B",
  Yellow: "#FACC15",
  
};

const MULTICOLOR =
  "conic-gradient(red, orange, yellow, green, cyan, blue, violet, red)";

export default function Colors({ colorFilter, setColorFilter }) {
  return (
    <section className="colors-section section-spacing">
      <div className="colors-header text-center">
        <div className="discount-ornament">
          <span className="ornament-line" />
          <span className="ornament-text">THE ART OF COLOUR</span>
          <span className="ornament-line" />
        </div>

        <h2 className="discount-title my-2">
          Find Your Perfect Palette
        </h2>

        <p className="section-description colors-description">
          Explore rugs by colour and discover the perfect shade for your space.
        </p>
      </div>

      <div className="colors-picker">
        {/* Scrollable colour swatches */}
        <div
          className="colors-scroll"
          role="region"
          aria-label="Browse rug colours"
          tabIndex={0}
        >
          <div className="colors-scroll__inner">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`Filter rugs by ${color}`}
                aria-pressed={colorFilter === color}
                onClick={() =>
                  setColorFilter(colorFilter === color ? "" : color)
                }
                className={`color-swatch ${
                  colorFilter === color ? "active" : ""
                }`}
              >
                <span
                  className="color-swatch__circle"
                  style={{
                    background: COLOR_MAP[color] || MULTICOLOR,
                    border: ["White", "Ivory", "Cream"].includes(color)
                      ? "1px solid var(--border-color, #d8d4ce)"
                      : undefined,
                  }}
                />

                <span className="color-name">{color}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fixed clear button — never scrolls */}
        <button
          type="button"
          className={`color-swatch color-swatch--clear ${
            !colorFilter ? "color-swatch--clear-active" : ""
          }`}
          title="Clear colour filter"
          aria-label="Clear colour filter"
          aria-pressed={!colorFilter}
          onClick={() => setColorFilter("")}
        >
          <span className="color-swatch__circle color-swatch__circle--clear">
            <i className="bi bi-arrow-counterclockwise" />
          </span>

          <span className="color-name">All Colours</span>
        </button>
      </div>
    </section>
  );
}