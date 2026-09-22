"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSesion } from "@/lib/sesion";
import { CLIENTE_ACTUAL, useTienda } from "@/lib/tienda";

const NAV_CLIENTE = [
  { href: "/", etiqueta: "Buscador" },
  { href: "/catalogo", etiqueta: "Catálogo por vehículo" },
];

const NAV_ADMIN = [
  { href: "/admin", etiqueta: "Tablero" },
  { href: "/admin/pedidos", etiqueta: "Pedidos" },
];

export function Encabezado() {
  const ruta = usePathname();
  const esAdmin = ruta.startsWith("/admin");
  const enLogin = ruta === "/ingresar";
  // La pantalla de ingreso es contexto interno: sin menú público ni carrito.
  const interno = esAdmin || enLogin;
  const enlaces = enLogin ? [] : esAdmin ? NAV_ADMIN : NAV_CLIENTE;

  return (
    <header className="sticky top-0 z-30 shadow-sm">
      <div className="bg-marca-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-1.5 text-[11px]">
          <p className="opacity-90">
            Línea de atención 01 8000 513236 · WhatsApp (+57) 316 5252247 ·
            Parque Logístico Yumbo, Valle
          </p>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`rounded-sm px-2 py-0.5 transition ${
                esAdmin || enLogin
                  ? "opacity-75 hover:bg-white/10 hover:opacity-100"
                  : "bg-white/15 font-semibold"
              }`}
            >
              Socios comerciales
            </Link>
            <Link
              href="/admin"
              className={`rounded-sm px-2 py-0.5 transition ${
                esAdmin || enLogin
                  ? "bg-white/15 font-semibold"
                  : "opacity-75 hover:bg-white/10 hover:opacity-100"
              }`}
            >
              Consola interna
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-marca-700 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-2.5">
          <Link
            href={interno ? "/admin" : "/"}
            className="flex items-center gap-3"
          >
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-marca-700 text-sm font-bold text-white">
              AF
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-marca-700">
                Autofix
              </span>
              <span className="block text-[10px] uppercase tracking-[0.12em] text-carbon-500">
                {interno ? "Impocali · Consola interna" : "Impocali · Repuestos"}
              </span>
            </span>
          </Link>

          <nav className="order-last flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto">
            {enlaces.map((e) => {
              const activo =
                e.href === "/" || e.href === "/admin"
                  ? ruta === e.href
                  : ruta.startsWith(e.href);
              return (
                <Link
                  key={e.href}
                  href={e.href}
                  aria-current={activo ? "page" : undefined}
                  className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${
                    activo
                      ? "border-lima-500 text-marca-700"
                      : "border-transparent text-carbon-700 hover:border-marca-300 hover:text-marca-700"
                  }`}
                >
                  {e.etiqueta}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {enLogin ? (
              <span className="text-xs font-medium text-carbon-500">
                Personal de Impocali
              </span>
            ) : esAdmin ? (
              <MenuUsuario />
            ) : (
              <AccionesCliente />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function AccionesCliente() {
  const { unidadesEnCarrito, montado } = useTienda();
  return (
    <>
      <Link
        href="/carrito"
        className="relative flex items-center gap-2 rounded-sm bg-marca-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-marca-800"
      >
        Carrito
        {montado && unidadesEnCarrito > 0 && (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lima-500 px-1 text-[11px] font-bold text-marca-900">
            {unidadesEnCarrito}
          </span>
        )}
      </Link>
      <div className="hidden items-center gap-2 border-l border-marca-100 pl-3 md:flex">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-marca-50 text-xs font-semibold text-marca-700">
          {CLIENTE_ACTUAL.iniciales}
        </span>
        <span className="leading-tight">
          <span className="block text-xs font-semibold text-carbon-900">
            {CLIENTE_ACTUAL.nombre}
          </span>
          <span className="block text-[10px] text-carbon-500">
            Socio comercial · {CLIENTE_ACTUAL.ciudad}
          </span>
        </span>
      </div>
    </>
  );
}

function MenuUsuario() {
  const router = useRouter();
  const { usuario, salir, montado } = useSesion();
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    function alClic(e: MouseEvent) {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    }
    document.addEventListener("mousedown", alClic);
    return () => document.removeEventListener("mousedown", alClic);
  }, [abierto]);

  if (!montado) return null;

  if (!usuario) {
    return (
      <Link
        href="/ingresar"
        className="rounded-sm bg-marca-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-marca-800"
      >
        Ingresar
      </Link>
    );
  }

  return (
    <div className="relative" ref={contenedor}>
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        className="flex items-center gap-2 rounded-sm border border-marca-100 py-1.5 pl-1.5 pr-3 transition hover:border-marca-500"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-marca-700 text-xs font-bold text-white">
          {usuario.iniciales}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs font-semibold text-carbon-900">
            {usuario.nombre}
          </span>
          <span className="block text-[10px] text-carbon-500">{usuario.rol}</span>
        </span>
        <span className="text-[10px] text-carbon-500">▾</span>
      </button>

      {abierto && (
        <div className="entrar absolute right-0 top-full z-40 mt-1 w-60 border border-marca-100 bg-white shadow-lg">
          <div className="border-b border-marca-100 bg-marca-50 px-4 py-3">
            <p className="text-sm font-semibold text-carbon-900">
              {usuario.nombre}
            </p>
            <p className="text-xs text-marca-700">{usuario.rol}</p>
            <p className="mt-0.5 text-[11px] text-carbon-500">{usuario.area}</p>
            <p className="text-[11px] text-carbon-500">{usuario.correo}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              salir();
              setAbierto(false);
              router.push("/ingresar");
            }}
            className="w-full px-4 py-2.5 text-left text-xs font-medium text-red-700 transition hover:bg-red-50"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
