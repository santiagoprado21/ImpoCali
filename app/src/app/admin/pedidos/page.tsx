"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ESTADOS, EtiquetaEstado, textoEstado } from "@/components/admin/EstadoPedido";
import { ETIQUETA_CANAL } from "@/lib/metricas";
import { formatoCOP } from "@/lib/pedidos";
import { descripcionPedido, totalConIva, useTienda } from "@/lib/tienda";
import type { EstadoPedido } from "@/lib/types";

export default function ListadoPedidos() {
  const { pedidos, montado } = useTienda();
  const [filtro, setFiltro] = useState<EstadoPedido | "todos">("todos");
  const [texto, setTexto] = useState("");

  const visibles = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return pedidos.filter((p) => {
      if (filtro !== "todos" && p.estado !== filtro) return false;
      if (!q) return true;
      return (
        p.numero.toLowerCase().includes(q) ||
        p.cliente.toLowerCase().includes(q) ||
        p.ciudad.toLowerCase().includes(q) ||
        descripcionPedido(p).toLowerCase().includes(q)
      );
    });
  }, [pedidos, filtro, texto]);

  if (!montado) {
    return <p className="text-sm text-carbon-500">Cargando los pedidos…</p>;
  }

  const conteos = ESTADOS.map((e) => ({
    estado: e,
    cantidad: pedidos.filter((p) => p.estado === e).length,
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-carbon-900">Pedidos</h1>
      <p className="mt-1 text-sm text-carbon-500">
        Mostrando {visibles.length} de {pedidos.length} pedidos. Haga clic en uno
        para ver su seguimiento completo.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-marca-100">
          <BotonFiltro
            activo={filtro === "todos"}
            onClick={() => setFiltro("todos")}
            etiqueta={`Todos (${pedidos.length})`}
          />
          {conteos.map((c) => (
            <BotonFiltro
              key={c.estado}
              activo={filtro === c.estado}
              onClick={() => setFiltro(c.estado)}
              etiqueta={`${textoEstado(c.estado)} (${c.cantidad})`}
            />
          ))}
        </div>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar por número, cliente, ciudad o pieza"
          className="min-w-[240px] flex-1 rounded-full border border-marca-100 bg-white px-4 py-2 text-sm outline-none transition focus:border-marca-500"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-marca-100 bg-white shadow-sm">
        {/* En celular la tabla de 7 columnas no cabe: se muestra como lista. */}
        <ul className="divide-y divide-marca-100/70 md:hidden">
          {visibles.map((p) => (
            <li key={p.numero}>
              <Link
                href={`/admin/pedidos/${p.numero}`}
                className="block p-4 transition hover:bg-marca-50/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-marca-600">
                    {p.numero}
                  </span>
                  <EtiquetaEstado estado={p.estado} />
                </div>
                <p className="mt-1.5 text-sm font-medium text-carbon-900">
                  {p.cliente}
                </p>
                <p className="text-xs text-carbon-500">{p.ciudad}</p>
                <p className="mt-1 line-clamp-2 text-xs text-carbon-700">
                  {descripcionPedido(p)}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-xs text-carbon-500">
                    {new Date(p.creado).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                    })}{" "}
                    · {ETIQUETA_CANAL[p.canal]}
                  </span>
                  <span className="text-sm font-semibold text-carbon-900">
                    {formatoCOP(totalConIva(p))}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-marca-50/70 text-xs uppercase tracking-wide text-carbon-500">
              <tr>
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Contenido</th>
                <th className="px-4 py-3 font-medium">Origen</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr
                  key={p.numero}
                  className="border-t border-marca-100/70 transition hover:bg-marca-50/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/pedidos/${p.numero}`}
                      className="text-xs font-semibold text-marca-600 hover:text-marca-700"
                    >
                      {p.numero}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-xs font-medium text-carbon-900">
                      {p.cliente}
                    </span>
                    <span className="block text-xs text-carbon-500">
                      {p.ciudad}
                    </span>
                  </td>
                  <td className="max-w-[220px] px-4 py-3">
                    <span className="block truncate text-xs text-carbon-700">
                      {descripcionPedido(p)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-xs text-carbon-700">
                      {ETIQUETA_CANAL[p.canal]}
                    </span>
                    <span className="block text-xs text-carbon-500">
                      {p.autoservicio ? "Autoservicio" : p.asesor}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-carbon-500">
                    {new Date(p.creado).toLocaleDateString("es-CO", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <EtiquetaEstado estado={p.estado} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold text-carbon-900">
                    {formatoCOP(totalConIva(p))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visibles.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-carbon-500">
            Ningún pedido coincide con el filtro.
          </p>
        )}
      </div>
    </div>
  );
}

function BotonFiltro({
  activo,
  onClick,
  etiqueta,
}: {
  activo: boolean;
  onClick: () => void;
  etiqueta: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
        activo ? "bg-marca-700 text-white" : "text-carbon-500 hover:bg-marca-50"
      }`}
    >
      {etiqueta}
    </button>
  );
}
