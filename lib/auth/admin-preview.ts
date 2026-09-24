import type { UserRole } from "@/types";

function hasFirebaseAdminEnv(): boolean {
  return Boolean(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );
}

/** Si todavía no hay Firebase, /admin se abre sin login (local y Vercel). */
export function isAdminUiPreview(): boolean {
  return !hasFirebaseAdminEnv();
}

export const PREVIEW_ADMIN_USER = {
  id: "preview-admin",
  email: "Vista previa (sin Firebase)",
  name: "Vista previa",
  role: "admin" as UserRole,
};
