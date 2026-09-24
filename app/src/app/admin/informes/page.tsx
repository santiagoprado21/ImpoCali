"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeStock } from "@/components/BadgeStock";
import { FotoPieza } from "@/components/FotoPieza";
import { CATALOGO, stockTotal } from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import { SEGMENTOS, type Bodega, type Categoria } from "@/lib/types";

const BODEGAS: Bodega[] = ["Yumbo", "Cali", "Bogotá", "Medellín", "Barranquilla"];
const MARCAS = [...new Set(CATALOGO.map((p) => p.marca))].sort((a, b) =>
  a.localeCompare(b, "es"),
);

/**
 * Informes de catálogo / inventario con filtros para la consola interna.
 */
export default function Informes() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "todas">("todas");
  const [marca, setMarca] = useState<string>("todas");
  const [bodega, setBodega] = useState<Bodega | "todas">("todas");
  const [stock, setStock] = useState<"todos" | "alto" | "bajo" | "agotado">(
    "todos",
  );

  const filas = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return CATALOGO.filter((p) => {
      if (categoria !== "todas" && p.categoria !== categoria) return false;
      if (marca !== "todas" && p.marca !== marca) return false;
      const total = stockTotal(p);
      const enBodega =
        bodega === "todas"
          ? total
          : (p.existencias.find((e) => e.bodega === bodega)?.unidades ?? 0);
      if (bodega !== "todas" && enBodega === 0 && stock !== "agotado") {
        // still show if filtering other stock modes only when units match
      }
      const unidades = bodega === "todas" ? total : enBodega;
      if (stock === "alto" && unidades <= 40) return false;
      if (stock === "bajo" && (unidades > 40 || unidades === 0)) return false;
      if (stock === "agotado" && unidades !== 0) return false;
      if (!q) return true;
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.referencia.toLowerCase().includes(q) ||
        p.marca.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q)
      );
    }).map((p) => ({
      pieza: p,
      unidades:
        bodega === "todas"
          ? stockTotal(p)
          : (p.existencias.find((e) => e.bodega === bodega)?.unidades ?? 0),
    }));
  }, [texto, categoria, marca, bodega, stock]);

  const resumen = useMemo(() => {
    const totalSku = filas.length;
    const valorInventario = filas.reduce(
      (acc, f) => acc + f.unidades * f.pieza.precioSocio,
      0,
    );
    const bajo = filas.filter((f) => f.unidades > 0 && f.unidades <= 40).length;
    const agotado = filas.filter((f) => f.unidades === 0).length;
    return { totalSku, valorInventario, bajo, agotado };
  }, [filas]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-carbon-900">Informes</h1>
      <p className="mt-1 text-sm text-carbon-500">
        Inventario y catálogo de repuestos con filtros por segmento, marca,
        bodega y nivel de stock.
      </p>

      <div className="mt-5 grid gap-3 rounded-md border border-marca-100 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
        <label className="block text-xs font-semibold text-carbon-500 sm:col-span-2 lg:col-span-1">
          Buscar
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Nombre, ref. o marca"
            className="mt-1 w-full rounded-sm border border-marca-100 px-3 py-2 text-sm outline-none focus:border-marca-500"
          />
        </label>
        <label className="block text-xs font-semibold text-carbon-500">
          Segmento
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value as Categoria | "todas")
            }
            className="mt-1 w-full rounded-sm border border-marca-100 bg-white px-3 py-2 text-sm outline-none focus:border-marca-500"
          >
            <option value="todas">Todos</option>
            {SEGMENTOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-carbon-500">
          Marca
          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="mt-1 w-full rounded-sm border border-marca-100 bg-white px-3 py-2 text-sm outline-none focus:border-marca-500"
          >
            <option value="todas">Todas</option>
            {MARCAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-carbon-500">
          Bodega
          <select
            value={bodega}
            onChange={(e) => setBodega(e.target.value as Bodega | "todas")}
            className="mt-1 w-full rounded-sm border border-marca-100 bg-white px-3 py-2 text-sm outline-none focus:border-marca-500"
          >
            <option value="todas">Todas</option>
            {BODEGAS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-carbon-500">
          Nivel de stock
          <select
            value={stock}
            onChange={(e) =>
              setStock(e.target.value as typeof stock)
            }
            className="mt-1 w-full rounded-sm border border-marca-100 bg-white px-3 py-2 text-sm outline-none focus:border-marca-500"
          >
            <option value="todos">Todos</option>
            <option value="alto">Alto (&gt; 40)</option>
            <option value="bajo">Bajo (1–40)</option>
            <option value="agotado">Agotado</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi etiqueta="SKUs filtrados" valor={String(resumen.totalSku)} />
        <Kpi
          etiqueta="Valor inventario (socio)"
          valor={formatoCOP(resumen.valorInventario)}
        />
        <Kpi etiqueta="Stock bajo" valor={String(resumen.bajo)} acento="lima" />
        <Kpi
          etiqueta="Agotados"
          valor={String(resumen.agotado)}
          acento="amber"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-marca-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-lima-500/15 text-xs uppercase tracking-wide text-carbon-700">
              <tr>
                <th className="px-4 py-3 font-medium">Repuesto</th>
                <th className="px-4 py-3 font-medium">Segmento</th>
                <th className="px-4 py-3 font-medium">Marca</th>
                <th className="px-4 py-3 font-medium">Unidades</th>
                <th className="px-4 py-3 text-right font-medium">Precio socio</th>
              </tr>
            </thead>
            <tbody>
              {filas.map(({ pieza, unidades }) => (
                <tr
                  key={pieza.id}
                  className="border-t border-marca-100/70 hover:bg-marca-50/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/pieza/${pieza.id}`}
                      className="flex items-center gap-3"
                    >
                      <FotoPieza
                        pieza={pieza}
                        ancho={40}
                        className="h-10 w-10 shrink-0"
                      />
                      <span>
                        <span className="block text-xs font-semibold text-carbon-900">
                          {pieza.nombre}
                        </span>
                        <span className="block text-[11px] text-carbon-500">
                          {pieza.referencia}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-carbon-700">
                    {pieza.categoria}
                  </td>
                  <td className="px-4 py-3 text-xs text-carbon-700">
                    {pieza.marca}
                  </td>
                  <td className="px-4 py-3">
                    <BadgeStock unidades={unidades} compacto />
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-carbon-900">
                    {formatoCOP(pieza.precioSocio)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filas.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-carbon-500">
            Ningún repuesto coincide con los filtros.
          </p>
        )}
      </div>
    </div>
  );
}

function Kpi({
  etiqueta,
  valor,
  acento,
}: {
  etiqueta: string;
  valor: string;
  acento?: "lima" | "amber";
}) {
  return (
    <div
      className={`rounded-md border bg-white p-4 shadow-sm ${
        acento === "lima"
          ? "border-lima-500"
          : acento === "amber"
            ? "border-amber-400"
            : "border-marca-100"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wide text-carbon-500">
        {etiqueta}
      </p>
      <p className="mt-1 text-xl font-bold text-carbon-900">{valor}</p>
    </div>
  );
}
