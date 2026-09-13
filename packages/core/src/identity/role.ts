/**
 * The three product roles (FR-02). One per account, fixed at onboarding
 * (ADR-0014) — this array is the single definition every app reads.
 */
export const USER_ROLES = ['COACH', 'STUDENT', 'PARENT'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (USER_ROLES as readonly string[]).includes(value);
}
