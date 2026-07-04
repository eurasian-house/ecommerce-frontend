export function getAvatar(user) {
  return (
    user?.reviewer_avatar ||
    user?.avatar_url ||
    "/avatars/avatar-01.webp"
  );
}