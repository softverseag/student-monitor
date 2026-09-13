import { DISPLAY_NAME_MAX, DISPLAY_NAME_MIN, onboardingSchema } from './onboarding.js';

describe('onboardingSchema', () => {
  it('accepts a role and a name', () => {
    const result = onboardingSchema.safeParse({ role: 'STUDENT', displayName: 'Ada Yılmaz' });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({ role: 'STUDENT', displayName: 'Ada Yılmaz' });
  });

  it('trims the name before validating it', () => {
    const result = onboardingSchema.safeParse({ role: 'COACH', displayName: '  Ada Yılmaz  ' });

    expect(result.data?.displayName).toBe('Ada Yılmaz');
  });

  it('rejects a name that is only whitespace', () => {
    // Trim-then-validate, not validate-then-trim: "   " must fail the minimum.
    expect(onboardingSchema.safeParse({ role: 'PARENT', displayName: '   ' }).success).toBe(false);
  });

  it('rejects a role outside the enum', () => {
    const result = onboardingSchema.safeParse({ role: 'ADMIN', displayName: 'Ada' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['role']);
  });

  it('reports which field failed, so callers can pick their own copy', () => {
    // The backend maps this path onto its Turkish messages; the schema itself
    // carries none (ADR-0011, ADR-0015).
    const result = onboardingSchema.safeParse({ role: 'STUDENT', displayName: '' });

    expect(result.error?.issues[0]?.path).toEqual(['displayName']);
  });

  it('rejects a name longer than the maximum', () => {
    const tooLong = 'a'.repeat(DISPLAY_NAME_MAX + 1);

    expect(onboardingSchema.safeParse({ role: 'STUDENT', displayName: tooLong }).success).toBe(
      false,
    );
  });

  it('accepts a name exactly at each bound', () => {
    const shortest = 'a'.repeat(DISPLAY_NAME_MIN);
    const longest = 'a'.repeat(DISPLAY_NAME_MAX);

    expect(onboardingSchema.safeParse({ role: 'STUDENT', displayName: shortest }).success).toBe(
      true,
    );
    expect(onboardingSchema.safeParse({ role: 'STUDENT', displayName: longest }).success).toBe(
      true,
    );
  });

  it('rejects a body that is not an object', () => {
    expect(onboardingSchema.safeParse(null).success).toBe(false);
    expect(onboardingSchema.safeParse('STUDENT').success).toBe(false);
  });
});
