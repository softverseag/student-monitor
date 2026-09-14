import { z } from 'zod';

import { USER_ROLES } from './role.js';

/** Long enough for a real Turkish name, short enough to render in a list. */
export const DISPLAY_NAME_MIN = 2;
export const DISPLAY_NAME_MAX = 80;

/**
 * What a user submits to finish onboarding (FR-01.9).
 *
 * Carries no `message:` options on purpose. The schema is shape; the Turkish
 * copy for a failure belongs to whichever app reports it (ADR-0011, ADR-0015),
 * and callers key off `issue.path` to choose their own wording.
 */
export const onboardingSchema = z.object({
  role: z.enum(USER_ROLES),
  displayName: z.string().trim().min(DISPLAY_NAME_MIN).max(DISPLAY_NAME_MAX),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
