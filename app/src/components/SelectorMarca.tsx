"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FotoMarca } from "@/components/FotoMarca";

/**
 * Dropdown de marca con logo: mismo patrón que un <select>, pero cada
 * opción muestra el emblema de la marca.
 */
export function SelectorMarca({
  marcas,
  valor,
  onChange,
  placeholder = "Seleccione una marca…",
}: {
  marcas: string[];
  valor: string;
  onChange: (marca: string) => void;
  placeholder?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const listaId = useId();

  useEffect(() => {
    function alClic(e: MouseEvent) {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false);
    }
    function alTecla(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", alClic);
    document.addEventListener("keydown", alTecla);
    return () => {
      document.removeEventListener("mousedown", alClic);
      document.removeEventListener("keydown", alTecla);
    };
  }, []);

  // Al cambiar el listado (p. ej. Motos → Autos), cierra el menú.
  useEffect(() => {
    setAbierto(false);
  }, [marcas]);

  return (
    <div ref={raiz} className="relative bg-white">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={listaId}
        aria-label="Marca"
        onClick={() => setAbierto((v) => !v)}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm font-medium text-carbon-900 outline-none focus:ring-2 focus:ring-marca-100"
      >
        {valor ? (
          <>
            <FotoMarca marca={valor} className="h-9 w-14 shrink-0 border border-[#e8ecf1]" />
            <span className="min-w-0 flex-1 truncate">{valor}</span>
          </>
        ) : (
          <span className="min-w-0 flex-1 truncate text-carbon-500">
            {placeholder}
          </span>
        )}
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className={`h-4 w-4 shrink-0 text-carbon-500 transition ${
            abierto ? "rotate-180" : ""
          }`}
        >
          <path
            fill="currentColor"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
          />
        </svg>
      </button>

      {abierto && (
        <ul
          id={listaId}
          role="listbox"
          aria-label="Marcas"
          className="absolute left-0 right-0 z-20 mt-0.5 max-h-64 overflow-auto border border-marca-100 bg-white shadow-lg"
        >
          {marcas.map((m) => {
            const activa = valor === m;
            return (
              <li key={m} role="option" aria-selected={activa}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(m);
                    setAbierto(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition ${
                    activa
                      ? "bg-marca-50 font-semibold text-marca-700"
                      : "text-carbon-900 hover:bg-marca-50"
                  }`}
                >
                  <FotoMarca
                    marca={m}
                    className="h-9 w-14 shrink-0 border border-[#e8ecf1]"
                  />
                  <span>{m}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
