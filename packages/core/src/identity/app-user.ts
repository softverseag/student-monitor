import type { UserRole } from './role.js';

/**
 * What the API publishes about a user — the shape of the backend's AppUserDTO.
 *
 * `onboardedAt` is an ISO string, not a Date: this crosses the wire as JSON, and
 * a Date here would be a lie on the client side.
 */
export interface AppUser {
  id: string;
  email: string | null;
  displayName: string | null;
  role: UserRole | null;
  onboardedAt: string | null;
}
