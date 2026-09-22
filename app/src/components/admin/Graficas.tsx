"use client";

import { formatoCOP } from "@/lib/pedidos";
import type { PuntoSerie } from "@/lib/metricas";

export function TarjetaKPI({
  titulo,
  valor,
  nota,
  variacion,
  meta,
}: {
  titulo: string;
  valor: string;
  nota?: string;
  variacion?: number;
  meta?: string;
}) {
  return (
    <div className="rounded-md border border-marca-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-carbon-500">
        {titulo}
      </p>
      <p className="mt-2 text-2xl font-semibold text-carbon-900">{valor}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        {variacion !== undefined && variacion !== 0 && (
          <span
            className={`text-xs font-semibold ${
              variacion > 0 ? "text-lima-600" : "text-red-700"
            }`}
          >
            {variacion > 0 ? "▲" : "▼"} {Math.abs(variacion)}%
          </span>
        )}
        {nota && <span className="text-xs text-carbon-500">{nota}</span>}
      </div>
      {meta && (
        <p className="mt-2 rounded-md bg-marca-50 px-2 py-1 text-[11px] text-marca-700">
          {meta}
        </p>
      )}
    </div>
  );
}

export function BarrasDiarias({ serie }: { serie: PuntoSerie[] }) {
  const maximo = Math.max(...serie.map((p) => p.pedidos), 1);
  return (
    <div>
      <div className="flex h-44 items-stretch gap-1.5">
        {serie.map((punto) => (
          <div
            key={punto.etiqueta}
            className="group relative flex h-full flex-1 flex-col justify-end"
          >
            {punto.pedidos > 0 ? (
              <div
                className="w-full rounded-t-md bg-marca-500 transition-colors hover:bg-marca-700"
                style={{ height: `${(punto.pedidos / maximo) * 100}%` }}
              />
            ) : (
              <div className="h-[3px] w-full rounded-full bg-carbon-500/25" />
            )}
            <span className="pointer-events-none absolute -top-2 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-carbon-900 px-2 py-1 text-[11px] text-white group-hover:block">
              {punto.pedidos} pedido{punto.pedidos === 1 ? "" : "s"} ·{" "}
              {formatoCOP(punto.ingresos)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5">
        {serie.map((punto, i) => (
          <span
            key={punto.etiqueta}
            className="flex-1 text-center text-[10px] text-carbon-500"
          >
            {i % 2 === 0 ? punto.etiqueta.replace(".", "") : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarrasHorizontales({
  filas,
}: {
  filas: { etiqueta: string; valor: number; detalle: string }[];
}) {
  const maximo = Math.max(...filas.map((f) => f.valor), 1);
  return (
    <ul className="space-y-3">
      {filas.map((fila) => (
        <li key={fila.etiqueta}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-medium text-carbon-900">
              {fila.etiqueta}
            </span>
            <span className="text-xs text-carbon-500">{fila.detalle}</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-marca-50">
            <div
              className="h-full rounded-full bg-marca-500"
              style={{ width: `${(fila.valor / maximo) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

const COLORES_CANAL = ["#0485c4", "#22509d", "#93c01f", "#f0a202"];

export function Rosquilla({
  segmentos,
}: {
  segmentos: { etiqueta: string; valor: number; porcentaje: number }[];
}) {
  const total = segmentos.reduce((t, s) => t + s.valor, 0) || 1;
  const radio = 52;
  const circunferencia = 2 * Math.PI * radio;
  let acumulado = 0;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 140 140" className="h-36 w-36 -rotate-90">
        {segmentos.map((s, i) => {
          const fraccion = s.valor / total;
          const trazo = fraccion * circunferencia;
          const elemento = (
            <circle
              key={s.etiqueta}
              cx="70"
              cy="70"
              r={radio}
              fill="none"
              stroke={COLORES_CANAL[i % COLORES_CANAL.length]}
              strokeWidth="22"
              strokeDasharray={`${trazo} ${circunferencia - trazo}`}
              strokeDashoffset={-acumulado}
            />
          );
          acumulado += trazo;
          return elemento;
        })}
      </svg>
      <ul className="flex-1 space-y-2">
        {segmentos.map((s, i) => (
          <li key={s.etiqueta} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: COLORES_CANAL[i % COLORES_CANAL.length] }}
            />
            <span className="flex-1 text-carbon-700">{s.etiqueta}</span>
            <span className="font-semibold text-carbon-900">
              {s.porcentaje}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
