"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTienda } from "@/lib/tienda";

/**
 * Icono de carrito flotante (esquina inferior derecha), con contador de piezas.
 */
export function BotonCarrito() {
  const ruta = usePathname();
  const { unidadesEnCarrito, montado } = useTienda();

  // Solo en la vista de socios comerciales.
  if (ruta.startsWith("/admin") || ruta === "/ingresar") return null;

  return (
    <Link
      href="/carrito"
      aria-label={
        montado && unidadesEnCarrito > 0
          ? `Carrito, ${unidadesEnCarrito} unidades`
          : "Carrito"
      }
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-marca-500 text-white shadow-lg transition hover:bg-marca-600"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
        <path d="M3 4h2l1.6 9.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L21 7H6.2" />
      </svg>
      {montado && unidadesEnCarrito > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-lima-500 px-1 text-[11px] font-bold text-marca-900">
          {unidadesEnCarrito}
        </span>
      )}
    </Link>
  );
}
