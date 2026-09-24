"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BarrasDiarias,
  BarrasHorizontales,
  Rosquilla,
  TarjetaKPI,
} from "@/components/admin/Graficas";
import { EtiquetaEstado } from "@/components/admin/EstadoPedido";
import {
  ETIQUETA_CANAL,
  porCanal,
  porCategoria,
  rankingAsesores,
  resumen,
  serieDiaria,
  variacion,
} from "@/lib/metricas";
import { formatoCOP } from "@/lib/pedidos";
import { descripcionPedido, totalPedido, useTienda } from "@/lib/tienda";

const PERIODOS = [
  { dias: 7, etiqueta: "7 días" },
  { dias: 14, etiqueta: "14 días" },
  { dias: 30, etiqueta: "30 días" },
];

export default function Tablero() {
  const { pedidos, montado } = useTienda();
  const [dias, setDias] = useState(30);

  const datos = useMemo(() => {
    const ahora = new Date();
    const delPeriodo = pedidos.filter(
      (p) => ahora.getTime() - new Date(p.creado).getTime() <= dias * 86_400_000,
    );
    return {
      r: resumen(pedidos, dias, ahora),
      varPedidos: variacion(pedidos, dias, ahora, (x) => x.pedidos),
      varIngresos: variacion(pedidos, dias, ahora, (x) => x.ingresos),
      varTiempo: variacion(pedidos, dias, ahora, (x) => x.tiempoMedioMin),
      serie: serieDiaria(pedidos, Math.min(dias, 14), ahora),
      categorias: porCategoria(delPeriodo),
      canales: porCanal(delPeriodo),
      asesores: rankingAsesores(delPeriodo),
      recientes: delPeriodo.slice(0, 6),
    };
  }, [pedidos, dias]);

  if (!montado) {
    return <p className="text-sm text-carbon-500">Cargando el tablero…</p>;
  }

  const { r } = datos;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-carbon-900">
            Tablero de operación
          </h1>
          <p className="mt-1 text-sm text-carbon-500">
            Desempeño del buscador y de la mesa de pedidos en los últimos {dias}{" "}
            días.
          </p>
        </div>
        <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-marca-100">
          {PERIODOS.map((p) => (
            <button
              key={p.dias}
              type="button"
              onClick={() => setDias(p.dias)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                dias === p.dias
                  ? "bg-marca-700 text-white"
                  : "text-carbon-500 hover:bg-marca-50"
              }`}
            >
              {p.etiqueta}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaKPI
          titulo="Pedidos"
          valor={String(r.pedidos)}
          variacion={datos.varPedidos}
          nota="vs. periodo anterior"
        />
        <TarjetaKPI
          titulo="Ingresos antes de IVA"
          valor={formatoCOP(r.ingresos)}
          variacion={datos.varIngresos}
          nota={`ticket ${formatoCOP(r.ticketPromedio)}`}
        />
        <TarjetaKPI
          titulo="Tiempo medio de respuesta"
          valor={`${r.tiempoMedioMin} min`}
          variacion={datos.varTiempo}
          meta="Meta del proyecto: bajar de 15 min"
        />
        <TarjetaKPI
          titulo="Precisión del buscador"
          valor={`${r.precisionBuscador}%`}
          nota="referencias aceptadas sin corrección"
          meta={`${r.escalamientos} casos escalados al canal en vivo`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          titulo="Pedidos por día"
          nota={`Últimos ${datos.serie.length} días`}
          className="lg:col-span-2"
        >
          <BarrasDiarias serie={datos.serie} />
        </Panel>

        <Panel titulo="Cómo se identificó la pieza">
          <Rosquilla
            segmentos={datos.canales.map((c) => ({
              etiqueta: ETIQUETA_CANAL[c.canal],
              valor: c.cantidad,
              porcentaje: c.porcentaje,
            }))}
          />
          <p className="mt-4 rounded-lg bg-marca-50 px-3 py-2 text-[11px] text-marca-700">
            {r.pctAutoservicio}% de los pedidos se resolvieron en autoservicio,
            sin que interviniera un asesor.
          </p>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel titulo="Categorías más vendidas" nota="Por ingresos del periodo">
          <BarrasHorizontales
            filas={datos.categorias.slice(0, 6).map((c) => ({
              etiqueta: c.categoria,
              valor: c.ingresos,
              detalle: `${formatoCOP(c.ingresos)} · ${c.unidades} und`,
            }))}
          />
        </Panel>

        <Panel
          titulo="Desempeño de asesores"
          nota="Ranking de la Fase 1"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-carbon-500">
                <tr className="border-b border-marca-100">
                  <th className="pb-2 font-medium">Asesor</th>
                  <th className="pb-2 text-right font-medium">Casos</th>
                  <th className="pb-2 text-right font-medium">Tiempo</th>
                  <th className="pb-2 text-right font-medium">Precisión</th>
                </tr>
              </thead>
              <tbody>
                {datos.asesores.map((a, i) => (
                  <tr
                    key={a.asesor}
                    className="border-b border-marca-100/60 last:border-0"
                  >
                    <td className="py-2.5 font-medium text-carbon-900">
                      <span className="mr-2 text-carbon-500">{i + 1}.</span>
                      {a.asesor}
                    </td>
                    <td className="py-2.5 text-right">{a.casos}</td>
                    <td className="py-2.5 text-right">{a.tiempoMedioMin} min</td>
                    <td className="py-2.5 text-right font-semibold text-lima-600">
                      {a.precision}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Panel
        titulo="Pedidos recientes"
        accion={
          <Link
            href="/admin/pedidos"
            className="text-xs font-medium text-marca-600 hover:text-marca-700"
          >
            Ver todos →
          </Link>
        }
      >
        <ul className="divide-y divide-marca-100">
          {datos.recientes.map((p) => (
            <li key={p.numero}>
              <Link
                href={`/admin/pedidos/${p.numero}`}
                className="flex flex-wrap items-center gap-3 py-3 transition hover:bg-marca-50/50"
              >
                <span className="w-20 shrink-0 text-xs font-semibold text-marca-700">
                  {p.numero}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="inline-flex max-w-full items-center gap-1.5 rounded-sm bg-lima-400/25 px-2 py-0.5">
                    <span className="truncate text-sm font-bold text-carbon-900">
                      {p.cliente}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-carbon-500">
                    {descripcionPedido(p)}
                  </span>
                </span>
                <EtiquetaEstado estado={p.estado} />
                <span className="w-24 shrink-0 text-right text-sm font-semibold text-carbon-900">
                  {formatoCOP(totalPedido(p))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function Panel({
  titulo,
  nota,
  accion,
  className = "",
  children,
}: {
  titulo: string;
  nota?: string;
  accion?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-md border border-marca-100 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-700">
          {titulo}
        </h2>
        {accion ?? (nota && <span className="text-xs text-carbon-500">{nota}</span>)}
      </div>
      {children}
    </section>
  );
}
