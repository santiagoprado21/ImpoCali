"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BotonMenu,
  MenuLateral,
  type EnlaceMenu,
} from "@/components/MenuLateral";
import { useSesion } from "@/lib/sesion";
import { CLIENTE_ACTUAL } from "@/lib/tienda";

export function Encabezado() {
  const ruta = usePathname();
  const router = useRouter();
  const { usuario, salir, montado } = useSesion();
  const esAdmin = ruta.startsWith("/admin");
  const enLogin = ruta === "/ingresar";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = useCallback(() => setMenuAbierto(false), []);

  const cerrarSesion = useCallback(() => {
    salir();
    router.push("/");
  }, [salir, router]);

  const { enlaces, pie } = useMemo(() => {
    if (esAdmin && usuario) {
      return {
        enlaces: [
          { href: "/admin", etiqueta: "Tablero", icono: "tablero" as const },
          {
            href: "/admin/pedidos",
            etiqueta: "Pedidos",
            icono: "pedidos" as const,
          },
        ] satisfies EnlaceMenu[],
        pie: [
          {
            href: "/",
            etiqueta: "Ir a la tienda",
            icono: "tienda" as const,
          },
          {
            etiqueta: "Cerrar sesión",
            icono: "salir" as const,
            onClick: cerrarSesion,
          },
        ] satisfies EnlaceMenu[],
      };
    }

    if (enLogin) {
      return {
        enlaces: [
          { href: "/", etiqueta: "Ir a la tienda", icono: "tienda" as const },
          {
            href: "/catalogo",
            etiqueta: "Catálogo por vehículo",
            icono: "catalogo" as const,
          },
        ] satisfies EnlaceMenu[],
        pie: [
          {
            href: "/ingresar",
            etiqueta: "Ingreso",
            icono: "ingreso" as const,
          },
        ] satisfies EnlaceMenu[],
      };
    }

    // Vista cliente
    return {
      enlaces: [
        { href: "/", etiqueta: "Inicio", icono: "buscador" as const },
        {
          href: "/catalogo",
          etiqueta: "Catálogo por vehículo",
          icono: "catalogo" as const,
        },
        { href: "/carrito", etiqueta: "Carrito", icono: "carrito" as const },
      ] satisfies EnlaceMenu[],
      pie: [
        {
          href: "/ingresar",
          etiqueta: "Ingreso",
          icono: "ingreso" as const,
        },
      ] satisfies EnlaceMenu[],
    };
  }, [esAdmin, enLogin, usuario, cerrarSesion]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b-2 border-marca-700 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-2.5">
          <div className="flex items-center gap-2.5">
            <BotonMenu
              abierto={menuAbierto}
              onClick={() => setMenuAbierto((a) => !a)}
            />
            <Link
              href={esAdmin && usuario ? "/admin" : "/"}
              className="flex shrink-0 items-center"
            >
              <Image
                src="/marca/logo-color.png"
                alt="Autofix · Tienda de repuestos multimarca"
                width={200}
                height={56}
                priority
                className="h-10 w-auto sm:h-11"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {enLogin ? (
              <Link
                href="/"
                className="rounded-sm border border-marca-100 px-3 py-1.5 text-xs font-semibold text-marca-700 transition hover:bg-marca-50"
              >
                Ir a la tienda
              </Link>
            ) : esAdmin ? (
              <MenuUsuario onSalir={cerrarSesion} />
            ) : (
              <AccionesCliente />
            )}
          </div>
        </div>
      </header>

      {montado && (
        <MenuLateral
          abierto={menuAbierto}
          onCerrar={cerrarMenu}
          enlaces={enlaces}
          pie={pie}
          titulo={esAdmin && usuario ? "Consola" : "Menú"}
        />
      )}
    </>
  );
}

function AccionesCliente() {
  return (
    <div className="hidden items-center gap-2 md:flex">
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
  );
}

function MenuUsuario({ onSalir }: { onSalir: () => void }) {
  const { usuario, montado } = useSesion();
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

  if (!montado || !usuario) return null;

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
          <Link
            href="/"
            onClick={() => setAbierto(false)}
            className="block w-full px-4 py-2.5 text-left text-xs font-medium text-marca-700 transition hover:bg-marca-50"
          >
            Ir a la tienda
          </Link>
          <button
            type="button"
            onClick={() => {
              setAbierto(false);
              onSalir();
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
