export default function Colors({ colorFilter, setColorFilter }) {
  const COLORS = ["Red","Blue","Green","Black","White","Brown"];

  return (
    <div className="mb-4">
      <div className="d-flex gap-2 flex-wrap">
        {COLORS.map((c) => (
          <button
            key={c}
            className={`btn btn-sm ${
              colorFilter === c ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setColorFilter(c)}
          >
            {c}
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