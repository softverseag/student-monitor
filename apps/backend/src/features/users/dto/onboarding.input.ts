import { BadRequestException } from '@nestjs/common';
import {
  DISPLAY_NAME_MAX,
  DISPLAY_NAME_MIN,
  onboardingSchema,
  type OnboardingInput,
} from '@sm/core';

export type { OnboardingInput };

/**
 * Turkish copy per failing field.
 *
 * The schema in `@sm/core` deliberately carries no messages — it is shared with
 * clients that word things differently, and user-facing copy does not belong in
 * a domain package (ADR-0011, ADR-0015). Mapping by `issue.path` is how the
 * backend supplies its own.
 */
const MESSAGE_BY_FIELD: Record<string, string> = {
  role: 'Geçerli bir rol seçin.',
  displayName: `Ad soyad ${DISPLAY_NAME_MIN} ile ${DISPLAY_NAME_MAX} karakter arasında olmalı.`,
};

export function parseOnboardingInput(raw: unknown): OnboardingInput {
  const result = onboardingSchema.safeParse(raw);
  if (result.success) return result.data;

  const field = result.error.issues[0]?.path[0];
  throw new BadRequestException(
    (typeof field === 'string' ? MESSAGE_BY_FIELD[field] : undefined) ?? 'Geçersiz istek.',
  );
}
