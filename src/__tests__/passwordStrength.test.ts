import { getPasswordStrength } from '../utils/passwordStrength';
import { expect, it } from 'vitest';

it('returns correct password strength', () => {
  expect(getPasswordStrength('')).toBe(0);
  expect(getPasswordStrength('abc')).toBe(1);
  expect(getPasswordStrength('abcD1!')).toBe(4);
});
