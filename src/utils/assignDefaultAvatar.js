export function assignDefaultAvatar() {
  const total = 5;
  const number = Math.floor(Math.random() * total) + 1;

  return `/avatars/avatar-${String(number).padStart(2, "0")}.webp`;
}