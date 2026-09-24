"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type IconoMenuTipo =
  | "buscador"
  | "catalogo"
  | "carrito"
  | "tablero"
  | "pedidos"
  | "ingreso"
  | "tienda"
  | "salir";

export type EnlaceMenu = {
  href?: string;
  etiqueta: string;
  icono?: IconoMenuTipo;
  /** Acción en lugar de navegación (p. ej. cerrar sesión). */
  onClick?: () => void;
};

function IconoMenu({
  tipo,
  activo,
}: {
  tipo: IconoMenuTipo;
  activo?: boolean;
}) {
  const color = activo ? "text-marca-700" : "text-white";
  const props = {
    viewBox: "0 0 24 24",
    className: `h-5 w-5 shrink-0 ${color}`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (tipo) {
    case "buscador":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16.5 16.5 21 21" />
        </svg>
      );
    case "catalogo":
      return (
        <svg {...props}>
          <path d="M4 6.5h16M4 12h16M4 17.5h10" />
          <circle cx="18.5" cy="17.5" r="2" />
        </svg>
      );
    case "carrito":
      return (
        <svg {...props}>
          <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
          <path d="M3 4h2l1.4 8.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L19.5 7H6" />
        </svg>
      );
    case "tablero":
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
        </svg>
      );
    case "pedidos":
      return (
        <svg {...props}>
          <path d="M8 4h8a2 2 0 0 1 2 2v14l-3-1.5L12 20l-3-1.5L6 20V6a2 2 0 0 1 2-2z" />
          <path d="M9 9h6M9 13h6" />
        </svg>
      );
    case "ingreso":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 19c1.2-3.5 3.8-5 7-5s5.8 1.5 7 5" />
        </svg>
      );
    case "tienda":
      return (
        <svg {...props}>
          <path d="M4 10h16l-1.5 10H5.5L4 10z" />
          <path d="M4 10 6 5h12l2 5" />
          <path d="M10 14v3M14 14v3" />
        </svg>
      );
    case "salir":
      return (
        <svg {...props}>
          <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
          <path d="M15 16 20 12 15 8M20 12H9" />
        </svg>
      );
  }
}

/**
 * Menú lateral azul Impocali: se desliza desde la izquierda y se cierra
 * con el botón, el fondo o Escape.
 */
export function MenuLateral({
  abierto,
  onCerrar,
  enlaces,
  pie = [],
  titulo = "Menú",
}: {
  abierto: boolean;
  onCerrar: () => void;
  enlaces: EnlaceMenu[];
  /** Acciones fijas abajo (ingreso, salir, volver a tienda). */
  pie?: EnlaceMenu[];
  titulo?: string;
}) {
  const ruta = usePathname();

  useEffect(() => {
    onCerrar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruta]);

  useEffect(() => {
    if (!abierto) return;
    function alTecla(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", alTecla);
    return () => {
      document.body.style.overflow = previo;
      document.removeEventListener("keydown", alTecla);
    };
  }, [abierto, onCerrar]);

  function claseItem(activo: boolean) {
    return `flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left text-sm font-medium transition ${
      activo ? "bg-white text-marca-700" : "text-white/95 hover:bg-white/15"
    }`;
  }

  function fila(e: EnlaceMenu) {
    const activo = e.href
      ? e.href === "/" || e.href === "/admin"
        ? ruta === e.href
        : ruta.startsWith(e.href)
      : false;

    const contenido = (
      <>
        {e.icono && <IconoMenu tipo={e.icono} activo={activo} />}
        <span>{e.etiqueta}</span>
      </>
    );

    if (e.onClick) {
      return (
        <button
          type="button"
          onClick={() => {
            e.onClick?.();
            onCerrar();
          }}
          className={claseItem(false)}
        >
          {contenido}
        </button>
      );
    }

    return (
      <Link
        href={e.href ?? "/"}
        onClick={onCerrar}
        aria-current={activo ? "page" : undefined}
        className={claseItem(activo)}
      >
        {contenido}
      </Link>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${abierto ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!abierto}
    >
      <button
        type="button"
        aria-label="Cerrar menú"
        tabIndex={abierto ? 0 : -1}
        onClick={onCerrar}
        className={`absolute inset-0 bg-marca-900/50 transition-opacity duration-300 ${
          abierto ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={`absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col bg-marca-500 text-white shadow-2xl transition-transform duration-300 ease-out ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
          <Link href="/" onClick={onCerrar} className="block">
            <Image
              src="/marca/logo-color.png"
              alt="Autofix"
              width={160}
              height={48}
              className="h-9 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú"
            className="grid h-9 w-9 place-items-center rounded-sm bg-marca-500 text-lg text-white transition hover:bg-marca-600"
          >
            ×
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
            {titulo}
          </p>
          <ul className="space-y-1">
            {enlaces.map((e) => (
              <li key={e.etiqueta + (e.href ?? "")}>{fila(e)}</li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/15 bg-marca-700">
          {pie.length > 0 && (
            <ul className="space-y-1 px-3 pt-3">
              {pie.map((e) => (
                <li key={e.etiqueta + (e.href ?? "accion")}>{fila(e)}</li>
              ))}
            </ul>
          )}
          <div className="px-4 py-4 text-[11px] leading-relaxed text-white/85">
            <p className="font-semibold text-white">Impocali · Autofix</p>
            <p className="mt-1">Línea 01 8000 513236</p>
            <p>WhatsApp (+57) 316 5252247</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/** Botón hamburguesa para abrir el menú lateral. */
export function BotonMenu({
  abierto,
  onClick,
}: {
  abierto: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={abierto}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-lima-500 text-marca-900 transition hover:bg-lima-400"
    >
      <span className="sr-only">{abierto ? "Cerrar menú" : "Abrir menú"}</span>
      <span className="flex w-4 flex-col gap-1" aria-hidden>
        <span
          className={`h-0.5 w-full rounded-full bg-marca-900 transition ${
            abierto ? "translate-y-1.5 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-marca-900 transition ${
            abierto ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full bg-marca-900 transition ${
            abierto ? "-translate-y-1.5 -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}
