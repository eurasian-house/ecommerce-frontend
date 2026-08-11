import { useState } from "react";

export default function UserAvatar({
  src,
  size = 40,
  className = "",
  alt = "User",
}) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <i
        className={`bi bi-person-circle ${className}`}
        role="img"
        aria-label={alt}
        style={{
          width: size,
          height: size,
          fontSize: size,
          lineHeight: 1,
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-circle ${className}`}
      style={{
        width: size,
        height: size,
        objectFit: "cover",
        flexShrink: 0,
        // subtle ring/border to make avatar stand out across themes
        border: "2px solid var(--border)",
        padding: "2px",
        boxSizing: "border-box",
      }}
      onError={() => setFailedSrc(src)}
    />
  );
}
