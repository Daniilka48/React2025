export function getPasswordStrength(password: string): number {
  let score = 0;
  if (!password) return score;
  if (/[0-9]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  return score;
}
