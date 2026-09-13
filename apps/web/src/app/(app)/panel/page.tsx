import type { UserRole } from '@sm/core';

import { fetchCurrentUser } from '@/features/identity';

// Record<UserRole, string>: adding a fourth role becomes a compile error here
// rather than an undefined label at runtime.
const ROLE_LABELS: Record<UserRole, string> = {
  COACH: 'Koç',
  STUDENT: 'Öğrenci',
  PARENT: 'Veli',
};

export default async function PanelPage() {
  // The layout has already guaranteed this user exists and is onboarded.
  const user = await fetchCurrentUser();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">
        Hoş geldin{user?.displayName ? `, ${user.displayName}` : ''}
      </h1>
      <p className="text-sm text-black/60 dark:text-white/60">
        {user?.role ? `${ROLE_LABELS[user.role]} olarak giriş yaptın.` : 'Giriş yaptın.'} Panel
        içeriği sonraki adımda gelecek.
      </p>
    </div>
  );
}
