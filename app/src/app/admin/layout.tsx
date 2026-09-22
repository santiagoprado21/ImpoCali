"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSesion } from "@/lib/sesion";

/** La consola interna solo se ve con sesión activa. */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { usuario, montado } = useSesion();

  useEffect(() => {
    if (montado && !usuario) router.replace("/ingresar");
  }, [montado, usuario, router]);

  if (!montado) {
    return <p className="text-sm text-carbon-500">Verificando la sesión…</p>;
  }

  if (!usuario) {
    return (
      <p className="text-sm text-carbon-500">
        Se requiere iniciar sesión. Redirigiendo al ingreso…
      </p>
    );
  }

  return <>{children}</>;
}
