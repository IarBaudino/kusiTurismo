import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/components/login-form";
import { isAdminUiPreview } from "@/lib/auth/admin-preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  if (isAdminUiPreview()) {
    redirect("/admin");
  }

  return (
    <Suspense fallback={<div className="text-brand-muted">Cargando…</div>}>
      <LoginForm />
    </Suspense>
  );
}
