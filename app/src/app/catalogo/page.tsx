"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeStock } from "@/components/BadgeStock";
import { FotoPieza } from "@/components/FotoPieza";
import { FotoVehiculo } from "@/components/FotoVehiculo";
import { SelectorMarca } from "@/components/SelectorMarca";
import {
  aniosDeModelo,
  esUniversal,
  marcasDeTipo,
  modeloExacto,
  modelosDeMarca,
  piezasDeModelo,
  stockTotal,
} from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import { SEGMENTOS } from "@/lib/types";
import type { Categoria, TipoVehiculo } from "@/lib/types";

const TIPOS: TipoVehiculo[] = ["Autos", "Carga y pasajeros"];

export default function Catalogo() {
  const [tipo, setTipo] = useState<TipoVehiculo>("Autos");
  const [marca, setMarca] = useState("");
  const [linea, setLinea] = useState("");
  const [anio, setAnio] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState<Categoria | null>(null);

  const marcas = useMemo(() => marcasDeTipo(tipo), [tipo]);
  const modelos = useMemo(() => (marca ? modelosDeMarca(marca) : []), [marca]);
  const anios = useMemo(
    () => (marca && linea ? aniosDeModelo(marca, linea) : []),
    [marca, linea],
  );
  const modelo = useMemo(
    () => (marca && linea ? modeloExacto(marca, linea) : undefined),
    [marca, linea],
  );

  const piezas = useMemo(
    () =>
      marca && linea
        ? piezasDeModelo(marca, linea, anio ? Number(anio) : null)
        : [],
    [marca, linea, anio],
  );

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return piezas;
    return piezas.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.referencia.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.sinonimos.some((s) => s.includes(q)),
    );
  }, [piezas, busqueda]);

  const segmentosConPiezas = useMemo(
    () =>
      SEGMENTOS.map((s) => ({
        segmento: s,
        piezas: filtradas.filter((p) => p.categoria === s),
      })).filter((s) => s.piezas.length > 0),
    [filtradas],
  );

  const listo = Boolean(marca && linea);

  function cambiarTipo(nuevo: TipoVehiculo) {
    setTipo(nuevo);
    setMarca("");
    setLinea("");
    setAnio("");
    setBusqueda("");
    setAbierto(null);
  }

  function cambiarMarca(nueva: string) {
    setMarca(nueva);
    setLinea("");
    setAnio("");
    setBusqueda("");
    setAbierto(null);
  }

  function cambiarLinea(nueva: string) {
    setLinea(nueva);
    setAnio("");
    setBusqueda("");
    setAbierto(null);
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-carbon-900">
          Catálogo por vehículo
        </h1>
        <p className="text-sm text-carbon-500">
          Elija marca, modelo y año para ver únicamente los repuestos que aplican,
          con stock y precio de socio comercial.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-1 border-b border-marca-100">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => cambiarTipo(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${
              tipo === t
                ? "border-marca-700 text-marca-700"
                : "border-transparent text-carbon-500 hover:text-marca-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Paso
          numero={1}
          titulo="Marca del vehículo"
        >
          <SelectorMarca
            marcas={marcas}
            valor={marca}
            onChange={cambiarMarca}
          />
        </Paso>

        <Paso numero={2} titulo="Modelo o línea" deshabilitado={!marca}>
          <select
            aria-label="Modelo"
            value={linea}
            disabled={!marca}
            onChange={(e) => cambiarLinea(e.target.value)}
            className="w-full appearance-none bg-white px-3 py-2.5 text-sm font-medium text-carbon-900 outline-none focus:ring-2 focus:ring-marca-100 disabled:bg-[#f5f7fa] disabled:text-carbon-500"
          >
            <option value="">
              {marca ? "Seleccione un modelo…" : "Elija primero la marca"}
            </option>
            {modelos.map((m) => (
              <option key={m.linea} value={m.linea}>
                {m.linea} ({m.desde}–{m.hasta})
              </option>
            ))}
          </select>
        </Paso>

        <Paso numero={3} titulo="Año del modelo" deshabilitado={!linea} opcional>
          <select
            aria-label="Año del modelo"
            value={anio}
            disabled={!linea}
            onChange={(e) => setAnio(e.target.value)}
            className="w-full appearance-none bg-white px-3 py-2.5 text-sm font-medium text-carbon-900 outline-none focus:ring-2 focus:ring-marca-100 disabled:bg-[#f5f7fa] disabled:text-carbon-500"
          >
            <option value="">
              {linea ? "Todos los años" : "Elija primero el modelo"}
            </option>
            {anios.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Paso>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,400px)_1fr]">
        <section className="panel self-start">
          <h2 className="panel-cabecera">Imagen catálogo</h2>
          <div className="p-6">
            {listo ? (
              <div className="text-center">
                <FotoVehiculo
                  tipo={tipo}
                  marca={marca}
                  linea={linea}
                  className="mx-auto aspect-[3/2] w-full"
                />
                <p className="mt-4 text-base font-bold uppercase tracking-wide text-carbon-900">
                  {marca} {linea}
                </p>
                <p className="text-xs text-carbon-500">
                  {anio ? `Modelo ${anio}` : `Años ${modelo?.desde}–${modelo?.hasta}`}
                  {modelo?.motores.length
                    ? ` · ${modelo.motores.join(" / ")}`
                    : ""}
                </p>

                <dl className="mt-5 space-y-2 border-t border-marca-100 pt-4 text-left text-xs">
                  <div className="flex justify-between">
                    <dt className="text-carbon-500">Referencias que aplican</dt>
                    <dd className="font-semibold text-carbon-900">
                      {piezas.length}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-carbon-500">Segmentos con cobertura</dt>
                    <dd className="font-semibold text-carbon-900">
                      {
                        SEGMENTOS.filter((s) =>
                          piezas.some((p) => p.categoria === s),
                        ).length
                      }{" "}
                      de {SEGMENTOS.length}
                    </dd>
                  </div>
                  {busqueda.trim() && (
                    <div className="flex justify-between text-marca-600">
                      <dt>Coinciden con “{busqueda.trim()}”</dt>
                      <dd className="font-semibold">{filtradas.length}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ) : (
              <div className="grid min-h-[220px] place-items-center">
                <p className="max-w-[240px] text-center text-xs text-carbon-500">
                  La ficha del vehículo aparece cuando elija marca y modelo en los
                  selectores de arriba.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-cabecera">Segmentos</h2>
          <div className="p-3">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-carbon-500">
                ⌕
              </span>
              <input
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setAbierto(null);
                }}
                placeholder="Buscar repuesto"
                disabled={!listo}
                className="w-full rounded-md border border-marca-100 py-2.5 pl-8 pr-3 text-sm outline-none transition focus:border-marca-500 disabled:bg-[#f5f7fa] disabled:text-carbon-500"
              />
            </div>

            {!listo ? (
              <ul className="mt-3 space-y-1.5">
                {SEGMENTOS.map((s) => (
                  <li key={s}>
                    <div className="fila-segmento opacity-60">
                      <span>{s}</span>
                      <span className="text-base leading-none">⊕</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : segmentosConPiezas.length === 0 ? (
              <p className="mt-4 px-1 py-6 text-center text-xs text-carbon-500">
                {busqueda.trim()
                  ? `Ningún repuesto coincide con “${busqueda.trim()}” para este vehículo.`
                  : "Este modelo aún no tiene referencias cargadas. El caso se escala al canal en vivo."}
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {segmentosConPiezas.map(({ segmento, piezas: delSegmento }) => {
                  const expandido = abierto === segmento;
                  return (
                    <li key={segmento}>
                      <button
                        type="button"
                        data-abierto={expandido}
                        onClick={() => setAbierto(expandido ? null : segmento)}
                        className="fila-segmento"
                      >
                        <span>{segmento}</span>
                        <span className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              expandido
                                ? "bg-white/20 text-white"
                                : "bg-marca-100 text-marca-700"
                            }`}
                          >
                            {delSegmento.length}
                          </span>
                          <span className="text-base leading-none">
                            {expandido ? "⊖" : "⊕"}
                          </span>
                        </span>
                      </button>

                      {expandido && (
                        <ul className="entrar divide-y divide-marca-100 border border-t-0 border-[#e8ecf1]">
                          {delSegmento.map((pieza) => (
                            <li key={pieza.id}>
                              <Link
                                href={`/pieza/${pieza.id}`}
                                className="flex items-center gap-3 p-3 transition hover:bg-marca-50"
                              >
                                <FotoPieza
                                  pieza={pieza}
                                  ancho={56}
                                  className="h-14 w-14 shrink-0"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm font-medium text-carbon-900">
                                    {pieza.nombre}
                                  </span>
                                  <span className="block truncate text-xs text-carbon-500">
                                    {pieza.marca} · Ref. {pieza.referencia}
                                  </span>
                                  <span
                                    className={`mt-1 inline-block rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                                      esUniversal(pieza, marca)
                                        ? "bg-marca-50 text-marca-700"
                                        : "bg-lima-500/15 text-lima-600"
                                    }`}
                                  >
                                    {esUniversal(pieza, marca)
                                      ? "Aplicación universal"
                                      : "Aplicación certificada"}
                                  </span>
                                </span>
                                <span className="shrink-0 text-right">
                                  <span className="block text-sm font-semibold text-marca-700">
                                    {formatoCOP(pieza.precioSocio)}
                                  </span>
                                  <span className="mt-1 inline-flex justify-end">
                                    <BadgeStock
                                      unidades={stockTotal(pieza)}
                                      compacto
                                    />
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Paso({
  numero,
  titulo,
  deshabilitado,
  opcional,
  children,
}: {
  numero: number;
  titulo: string;
  deshabilitado?: boolean;
  opcional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={deshabilitado ? "opacity-70" : undefined}>
      <p className="flex items-center justify-between gap-2 bg-marca-500 px-3 py-1.5 text-xs font-semibold text-white">
        <span>
          {numero}. {titulo}
        </span>
        {opcional && (
          <span className="text-[10px] font-normal opacity-80">opcional</span>
        )}
      </p>
      <div className="border border-t-0 border-marca-100">{children}</div>
    </div>
  );
}
