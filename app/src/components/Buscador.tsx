"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  buscarPorCodigo,
  buscarPorDescripcion,
  buscarPorImagen,
} from "@/lib/buscador";
import { stockTotal } from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import type { Candidato } from "@/lib/types";
import { BarraConfianza, ChipConfianza } from "./Confianza";
import { FotoPieza } from "./FotoPieza";

type Modo = "descripcion" | "codigo" | "imagen";

const MODOS: { id: Modo; etiqueta: string; ayuda: string; ejemplo: string }[] = [
  {
    id: "descripcion",
    etiqueta: "Lenguaje natural",
    ayuda:
      "La IA interpreta jerga de taller (“corchos”, “balatas”) y la traduce a la referencia del catálogo.",
    ejemplo: "pastillas de freno delanteras para un Spark GT 2016",
  },
  {
    id: "codigo",
    etiqueta: "Código o fragmento",
    ayuda:
      "El modelo completa equivalencias incompletas y cruza referencias Impocali, OEM y aftermarket.",
    ejemplo: "GDB4412",
  },
  {
    id: "imagen",
    etiqueta: "Visión por computadora",
    ayuda:
      "La IA reconoce el componente en la foto y lo compara con el catálogo visual.",
    ejemplo: "",
  },
];

const PASOS_IA: Record<Modo, string[]> = {
  descripcion: [
    "Extrayendo intención y entidades (pieza, marca, modelo, año)…",
    "Buscando coincidencias semánticas en el catálogo ACES/PIES…",
    "Cruzando equivalencias y calculando confianza del modelo…",
  ],
  codigo: [
    "Normalizando el código y detectando fragmentos…",
    "Expandiendo equivalencias certificadas y alternativas…",
    "Ordenando resultados por similitud del modelo…",
  ],
  imagen: [
    "Analizando la imagen con visión artificial…",
    "Identificando geometría y tipo de componente…",
    "Emparejando con el catálogo visual y puntuando confianza…",
  ],
};

function IconoIA({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Buscador() {
  const [modo, setModo] = useState<Modo>("descripcion");
  const [consulta, setConsulta] = useState("");
  const [analizando, setAnalizando] = useState(false);
  const [pasoIa, setPasoIa] = useState(0);
  const [resultados, setResultados] = useState<Candidato[] | null>(null);
  const [deteccion, setDeteccion] = useState<string | null>(null);
  const [consultaHecha, setConsultaHecha] = useState<string | null>(null);
  const [, iniciar] = useTransition();

  useEffect(() => {
    if (!analizando) return;
    setPasoIa(0);
    const id = window.setInterval(() => {
      setPasoIa((p) => Math.min(p + 1, PASOS_IA[modo].length - 1));
    }, 550);
    return () => window.clearInterval(id);
  }, [analizando, modo]);

  function limpiar() {
    setResultados(null);
    setDeteccion(null);
    setConsultaHecha(null);
  }

  function ejecutar(texto: string, modoActual: Modo) {
    setAnalizando(true);
    limpiar();
    const demora = modoActual === "imagen" ? 2100 : 1700;
    window.setTimeout(() => {
      iniciar(() => {
        if (modoActual === "imagen") {
          const { deteccion: detectado, candidatos } = buscarPorImagen();
          setDeteccion(detectado);
          setResultados(candidatos);
          setConsultaHecha("análisis de imagen");
        } else {
          setResultados(
            modoActual === "codigo"
              ? buscarPorCodigo(texto)
              : buscarPorDescripcion(texto),
          );
          setConsultaHecha(texto.trim());
        }
        setAnalizando(false);
      });
    }, demora);
  }

  const modoActivo = MODOS.find((m) => m.id === modo)!;
  const pasos = PASOS_IA[modo];

  return (
    <section id="buscador">
      <div className="overflow-hidden border border-marca-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-marca-100 bg-gradient-to-r from-marca-50 via-white to-marca-50 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-marca-500 text-white shadow-sm">
              <IconoIA className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-marca-800">
                Buscador inteligente Autofix
              </p>
              <p className="text-[11px] text-carbon-500">
                Motor semántico · NLP + visión · catálogo unificado
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-marca-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lima-400" />
            </span>
            Potenciado con IA
          </span>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-carbon-900 sm:text-2xl">
            ¿Qué repuesto necesita hoy?
          </h2>
          <p className="mt-1 text-sm text-carbon-500">
            Describa la pieza como en el mostrador: la IA identifica la
            referencia, el stock por bodega y el precio de socio comercial.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {MODOS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setModo(m.id);
                  setConsulta("");
                  limpiar();
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  modo === m.id
                    ? "bg-marca-700 text-white"
                    : "bg-marca-50 text-marca-700 hover:bg-marca-100"
                }`}
              >
                {m.etiqueta}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs text-carbon-500">{modoActivo.ayuda}</p>

          {modo === "imagen" ? (
            <button
              type="button"
              onClick={() => ejecutar("", "imagen")}
              disabled={analizando}
              className="mt-4 flex w-full flex-col items-center gap-2 border-2 border-dashed border-marca-300 bg-marca-50/50 px-6 py-10 text-center transition hover:bg-marca-50 disabled:opacity-60"
            >
              <IconoIA className="h-8 w-8 text-marca-600" />
              <span className="text-sm font-medium text-marca-700">
                Analizar foto con visión artificial
              </span>
              <span className="text-xs text-carbon-500">
                JPG o PNG · en la demo se usa una imagen de ejemplo
              </span>
            </button>
          ) : (
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (consulta.trim()) ejecutar(consulta, modo);
              }}
            >
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-marca-500">
                  <IconoIA className="h-4 w-4" />
                </span>
                <input
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  placeholder={modoActivo.ejemplo}
                  disabled={analizando}
                  className="w-full border border-marca-100 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100 disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={!consulta.trim() || analizando}
                className="inline-flex items-center justify-center gap-2 bg-marca-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-marca-600 disabled:cursor-not-allowed disabled:bg-carbon-500/30"
              >
                <IconoIA className="h-4 w-4" />
                {analizando ? "Analizando…" : "Buscar con IA"}
              </button>
            </form>
          )}

          {modo !== "imagen" && !analizando && (
            <button
              type="button"
              onClick={() => {
                setConsulta(modoActivo.ejemplo);
                ejecutar(modoActivo.ejemplo, modo);
              }}
              className="mt-3 text-xs font-medium text-marca-600 underline decoration-dotted underline-offset-4 hover:text-marca-700"
            >
              Probar con IA: “{modoActivo.ejemplo}”
            </button>
          )}
        </div>
      </div>

      {analizando && (
        <div
          className="entrar mt-5 border border-marca-200 bg-white px-5 py-5 shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-marca-500 text-white">
              <IconoIA className="h-5 w-5" />
              <span className="absolute inset-0 animate-ping rounded-full bg-marca-500/30" />
            </span>
            <div>
              <p className="text-sm font-semibold text-marca-800">
                Motor de IA en ejecución
              </p>
              <p className="text-xs text-carbon-500">
                Autofix · modelo semántico de repuestos
              </p>
            </div>
          </div>
          <ol className="mt-4 space-y-2.5">
            {pasos.map((paso, i) => {
              const activo = i === pasoIa;
              const hecho = i < pasoIa;
              return (
                <li
                  key={paso}
                  className={`flex items-start gap-2.5 text-sm ${
                    activo
                      ? "font-medium text-marca-700"
                      : hecho
                        ? "text-carbon-500"
                        : "text-carbon-500/50"
                  }`}
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      activo
                        ? "pulso bg-marca-500"
                        : hecho
                          ? "bg-lima-500"
                          : "bg-carbon-500/25"
                    }`}
                  />
                  {paso}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {resultados && !analizando && (
        <div className="entrar mt-6">
          {deteccion && (
            <div className="mb-4 flex items-start gap-3 bg-marca-700 px-4 py-3 text-sm text-white">
              <IconoIA className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                Visión artificial detectó:{" "}
                <strong className="font-semibold">{deteccion}</strong>
              </p>
            </div>
          )}

          {resultados.length === 0 ? (
            <div className="border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="text-sm font-medium text-amber-900">
                El modelo no encontró una referencia con suficiente confianza.
              </p>
              <p className="mt-1 text-xs text-amber-800">
                El caso se escala a un asesor humano y queda registrado para
                reentrenar el motor.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-500">
                    {resultados.length} sugerencia
                    {resultados.length === 1 ? "" : "s"} de la IA
                  </h2>
                  {consultaHecha && (
                    <p className="mt-0.5 text-xs text-carbon-500">
                      Consulta interpretada:{" "}
                      <span className="font-medium text-marca-700">
                        “{consultaHecha}”
                      </span>
                    </p>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-marca-700">
                  <IconoIA className="h-3.5 w-3.5" />
                  Ordenadas por confianza del modelo
                </span>
              </div>
              <ul className="space-y-3">
                {resultados.map(({ pieza, confianza, razon }) => (
                  <li key={pieza.id}>
                    <Link
                      href={`/pieza/${pieza.id}`}
                      className="block border border-marca-100 bg-white p-5 shadow-sm transition hover:border-marca-500 hover:shadow-md"
                    >
                      <div className="flex gap-5">
                        <FotoPieza
                          pieza={pieza}
                          ancho={96}
                          className="h-24 w-24 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <ChipConfianza valor={confianza} />
                            <span className="text-xs text-carbon-500">
                              {pieza.categoria}
                            </span>
                            <span className="rounded-full bg-marca-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-marca-700">
                              Match IA
                            </span>
                          </div>
                          <h3 className="mt-2 font-semibold text-carbon-900">
                            {pieza.nombre}
                          </h3>
                          <p className="text-xs text-carbon-500">
                            {pieza.marca} · Ref. {pieza.referencia}
                          </p>
                          <p className="mt-2 text-xs text-carbon-500">
                            <span className="font-medium text-marca-700">
                              Razonamiento del modelo:
                            </span>{" "}
                            {razon}.
                          </p>
                          <div className="mt-3">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-carbon-500">
                              Confianza del modelo
                            </p>
                            <BarraConfianza valor={confianza} />
                          </div>
                        </div>
                        <div className="hidden shrink-0 text-right sm:block">
                          <p className="text-lg font-semibold text-marca-700">
                            {formatoCOP(pieza.precioSocio)}
                          </p>
                          <p className="text-xs text-carbon-500">precio socio</p>
                          <p
                            className={`mt-3 text-xs font-medium ${
                              stockTotal(pieza) > 20
                                ? "text-lima-600"
                                : "text-amber-700"
                            }`}
                          >
                            {stockTotal(pieza)} unidades
                          </p>
                          <p className="text-xs text-carbon-500">
                            en {pieza.existencias.length} bodega
                            {pieza.existencias.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}
