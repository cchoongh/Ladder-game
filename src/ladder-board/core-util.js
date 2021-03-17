export function calculateLength(position1, position2) {
  return Math.sqrt((position2.top - position1.top) ** 2 + (position2.left - position1.left) ** 2);
}
