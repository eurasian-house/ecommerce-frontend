export default function StarRating({
  rating = 0,
  reviewCount = 0,
  showNumber = true,
  showCount = true,
}) {
  const value = Number(rating);

  return (
    <>
      <style>{`
    .star-rating-stars i {
      font-size: 1rem;
    }

    @media (max-width: 400px) {
      .star-rating-stars i {
        font-size: 0.8rem;
      }
    }
  `}
      </style>
      <div className="d-flex align-items-center gap-1">

        <span className="text-warning star-rating-stars">
          {[1, 2, 3, 4, 5].map((star) => {
            if (value >= star) {
              return (
                <i
                  key={star}
                  className="bi bi-star-fill"
                ></i>
              );
            }

            if (value >= star - 0.5) {
              return (
                <i
                  key={star}
                  className="bi bi-star-half"
                ></i>
              );
            }

            return (
              <i
                key={star}
                className="bi bi-star"
              ></i>
            );
          })}
        </span>

        {showNumber && (
          <span
            className="fw-semibold"
            style={{ fontSize: ".82rem" }}
          >
            {value.toFixed(1)}
          </span>
        )}

        {showCount && (
          <span
            className="text-muted"
            style={{ fontSize: ".82rem" }}
          >
            ({reviewCount})
          </span>
        )}

      </div>
    </>
  );
}