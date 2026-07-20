export default function UserAvatar({
  src,
  size = 40,
  className = "",
  alt = "User",
}) {
  return (
    <img
      src={src || "/avatars/avatar-01.webp"}
      alt={alt}
      className={`rounded-circle ${className}`}
      style={{
        width: size,
        height: size,
        objectFit: "cover",
        flexShrink: 0,
      }}
      onError={(e) => {
        e.currentTarget.src = "/avatars/avatar-01.webp";
      }}
    />
  );
}
