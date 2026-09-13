import { USER_ROLES, isUserRole } from './role.js';

describe('USER_ROLES', () => {
  it('is the three product roles', () => {
    expect(USER_ROLES).toEqual(['COACH', 'STUDENT', 'PARENT']);
  });
});

describe('isUserRole', () => {
  it('accepts each role', () => {
    for (const role of USER_ROLES) {
      expect(isUserRole(role)).toBe(true);
    }
  });

  it('rejects anything else', () => {
    // ADMIN is the tempting one: Q-18 leaves an operator role open, and it must
    // not slip in through a type guard before anybody decides it exists.
    expect(isUserRole('ADMIN')).toBe(false);
    expect(isUserRole('coach')).toBe(false);
    expect(isUserRole(null)).toBe(false);
    expect(isUserRole(undefined)).toBe(false);
    expect(isUserRole(1)).toBe(false);
  });
});
