import type { AppUser } from '@sm/core';

import type { AppUser as AppUserRow } from '../../../generated/prisma/client.js';

/**
 * What the clients see. Explicitly mapped rather than returning the row, so a
 * column added later is not published by accident — the same discipline that
 * keeps money off student-facing responses (BR-022).
 *
 * The shape itself lives in @sm/core so web and mobile read the same type, and
 * this mapper is the single point where a database row becomes it.
 */
export type AppUserDTO = AppUser;

export function toAppUserDTO(user: AppUserRow): AppUserDTO {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    onboardedAt: user.onboardedAt?.toISOString() ?? null,
  };
}
