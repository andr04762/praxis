export function levelFromXp(xp: number) {
  return Math.floor(Math.sqrt(xp / 100));
}
