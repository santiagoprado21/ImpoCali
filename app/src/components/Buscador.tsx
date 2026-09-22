"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
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
    etiqueta: "Describir la pieza",
    ayuda: "Escriba la solicitud tal como la dice el cliente, sin códigos.",
    ejemplo: "pastillas de freno delanteras para un Spark GT 2016",
  },
  {
    id: "codigo",
    etiqueta: "Código o fragmento",
    ayuda: "Acepta la referencia Impocali, la del proveedor o una equivalencia incompleta.",
    ejemplo: "GDB4412",
  },
  {
    id: "imagen",
    etiqueta: "Foto de la pieza",
    ayuda: "El cliente envía la foto por WhatsApp y el motor reconoce el componente.",
    ejemplo: "",
  },
];

export function Buscador() {
  const [modo, setModo] = useState<Modo>("descripcion");
  const [consulta, setConsulta] = useState("");
  const [analizando, setAnalizando] = useState(false);
  const [resultados, setResultados] = useState<Candidato[] | null>(null);
  const [deteccion, setDeteccion] = useState<string | null>(null);
  const [, iniciar] = useTransition();

  function limpiar() {
    setResultados(null);
    setDeteccion(null);
  }

  function ejecutar(texto: string, modoActual: Modo) {
    setAnalizando(true);
    limpiar();
    // La espera simula la latencia del motor semántico contra el catálogo.
    window.setTimeout(() => {
      iniciar(() => {
        if (modoActual === "imagen") {
          const { deteccion: detectado, candidatos } = buscarPorImagen();
          setDeteccion(detectado);
          setResultados(candidatos);
        } else {
          setResultados(
            modoActual === "codigo"
              ? buscarPorCodigo(texto)
              : buscarPorDescripcion(texto),
          );
        }
        setAnalizando(false);
      });
    }, modoActual === "imagen" ? 1500 : 850);
  }

  const modoActivo = MODOS.find((m) => m.id === modo)!;

  return (
    <section>
      <div className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-carbon-900">
          ¿Qué repuesto necesita hoy?
        </h1>
        <p className="mt-1 text-sm text-carbon-500">
          Un solo buscador sobre el catálogo unificado de Impocali. Devuelve la
          referencia, el stock real por bodega y el precio de socio comercial.
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
            className="mt-4 flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed border-marca-300 bg-marca-50/50 px-6 py-10 text-center transition hover:bg-marca-50"
          >
            <span className="text-3xl">📷</span>
            <span className="text-sm font-medium text-marca-700">
              Cargar la foto que envió el cliente
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
            <input
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder={modoActivo.ejemplo}
              className="flex-1 rounded-md border border-marca-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
            />
            <button
              type="submit"
              disabled={!consulta.trim()}
              className="rounded-md bg-marca-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-marca-600 disabled:cursor-not-allowed disabled:bg-carbon-500/30"
            >
              Buscar
            </button>
          </form>
        )}

        {modo !== "imagen" && (
          <button
            type="button"
            onClick={() => {
              setConsulta(modoActivo.ejemplo);
              ejecutar(modoActivo.ejemplo, modo);
            }}
            className="mt-3 text-xs font-medium text-marca-600 underline decoration-dotted underline-offset-4 hover:text-marca-700"
          >
            Usar el ejemplo: “{modoActivo.ejemplo}”
          </button>
        )}
      </div>

      {analizando && (
        <div className="entrar mt-5 flex items-center gap-3 rounded-md border border-marca-100 bg-white px-6 py-5 text-sm text-carbon-700 shadow-sm">
          <span className="pulso h-2.5 w-2.5 rounded-full bg-marca-500" />
          {modo === "imagen"
            ? "Analizando la imagen y comparando geometría contra el catálogo…"
            : "Interpretando la solicitud y cruzándola con el catálogo y las equivalencias…"}
        </div>
      )}

      {resultados && !analizando && (
        <div className="entrar mt-6">
          {deteccion && (
            <div className="mb-4 rounded-md bg-marca-700 px-4 py-3 text-sm text-white">
              Componente detectado en la imagen:{" "}
              <strong className="font-semibold">{deteccion}</strong>
            </div>
          )}

          {resultados.length === 0 ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-6 py-5">
              <p className="text-sm font-medium text-amber-900">
                No se encontró una referencia con esa información.
              </p>
              <p className="mt-1 text-xs text-amber-800">
                El caso se escala al canal en vivo con un experto y queda
                registrado para reentrenar el motor.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-500">
                  {resultados.length} referencia
                  {resultados.length === 1 ? "" : "s"} sugerida
                  {resultados.length === 1 ? "" : "s"}
                </h2>
                <span className="text-xs text-carbon-500">
                  Ordenadas por nivel de confianza
                </span>
              </div>
              <ul className="space-y-3">
                {resultados.map(({ pieza, confianza, razon }) => (
                  <li key={pieza.id}>
                    <Link
                      href={`/pieza/${pieza.id}`}
                      className="block rounded-md border border-marca-100 bg-white p-5 shadow-sm transition hover:border-marca-500 hover:shadow-md"
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
                          </div>
                          <h3 className="mt-2 font-semibold text-carbon-900">
                            {pieza.nombre}
                          </h3>
                          <p className="text-xs text-carbon-500">
                            {pieza.marca} · Ref. {pieza.referencia}
                          </p>
                          <p className="mt-2 text-xs italic text-carbon-500">
                            Por qué: {razon}.
                          </p>
                          <div className="mt-3">
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

      {!resultados && !analizando && <SugerenciasIniciales />}
    </section>
  );
}

function SugerenciasIniciales() {
  const bloques = [
    {
      titulo: "Identifica la pieza",
      texto:
        "Interpreta lenguaje de mostrador (“corchos de clutch”, “balineras”) y lo traduce a la referencia del catálogo.",
    },
    {
      titulo: "Muestra stock y precio",
      texto:
        "Consulta inventario y tiempos de entrega del proveedor por API, sin llamadas ni esperas.",
    },
    {
      titulo: "Permite pedir de inmediato",
      texto:
        "El pedido se genera desde la misma ficha, ya con referencia validada y trazabilidad.",
    },
  ];
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {bloques.map((b) => (
        <div
          key={b.titulo}
          className="rounded-md border border-marca-100 bg-white p-5 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-marca-700">{b.titulo}</h3>
          <p className="mt-2 text-xs leading-relaxed text-carbon-500">{b.texto}</p>
        </div>
      ))}
    </div>
  );
}
