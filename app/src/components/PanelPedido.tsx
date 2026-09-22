"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatoCOP } from "@/lib/pedidos";
import { useTienda } from "@/lib/tienda";
import type { Pieza } from "@/lib/types";

export function PanelPedido({ pieza }: { pieza: Pieza }) {
  const router = useRouter();
  const { agregar, crearPedido } = useTienda();
  const [bodega, setBodega] = useState(pieza.existencias[0].bodega);
  const [cantidad, setCantidad] = useState(pieza.unidadEmpaque);
  const [enviando, setEnviando] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const seleccionada = pieza.existencias.find((e) => e.bodega === bodega)!;
  const total = pieza.precioSocio * cantidad;
  const ahorro = (pieza.precioLista - pieza.precioSocio) * cantidad;
  const excedeStock = cantidad > seleccionada.unidades;

  const linea = {
    piezaId: pieza.id,
    cantidad,
    precioUnitario: pieza.precioSocio,
    bodega,
  };

  function pedir() {
    setEnviando(true);
    window.setTimeout(() => {
      const numero = crearPedido("descripcion", [linea]);
      router.push(`/pedido/${numero}`);
    }, 700);
  }

  function alCarrito() {
    agregar(linea);
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 6000);
  }

  return (
    <div className="rounded-md border border-marca-100 bg-white p-5 shadow-sm">
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-marca-700">
          {formatoCOP(pieza.precioSocio)}
        </p>
        <p className="text-sm text-carbon-500 line-through">
          {formatoCOP(pieza.precioLista)}
        </p>
      </div>
      <p className="text-xs text-carbon-500">
        Precio socio comercial, por unidad, antes de IVA. Empaque de{" "}
        {pieza.unidadEmpaque} unidad{pieza.unidadEmpaque === 1 ? "" : "es"}.
      </p>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-carbon-500">
        Despachar desde
      </label>
      <div className="mt-2 space-y-2">
        {pieza.existencias.map((e) => (
          <button
            key={e.bodega}
            type="button"
            onClick={() => setBodega(e.bodega)}
            className={`flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-left transition ${
              bodega === e.bodega
                ? "border-marca-500 bg-marca-50"
                : "border-marca-100 hover:border-marca-300"
            }`}
          >
            <span>
              <span className="block text-sm font-medium text-carbon-900">
                {e.bodega}
              </span>
              <span className="block text-xs text-carbon-500">{e.entrega}</span>
            </span>
            <span
              className={`text-sm font-semibold ${
                e.unidades > 20 ? "text-lima-600" : "text-amber-700"
              }`}
            >
              {e.unidades} und
            </span>
          </button>
        ))}
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-carbon-500">
        Cantidad
      </label>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCantidad((c) => Math.max(1, c - pieza.unidadEmpaque))}
          className="h-10 w-10 rounded-md border border-marca-100 text-lg font-medium text-marca-700 transition hover:bg-marca-50"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
          className="h-10 w-20 rounded-md border border-marca-100 text-center text-sm outline-none focus:border-marca-500"
        />
        <button
          type="button"
          onClick={() => setCantidad((c) => c + pieza.unidadEmpaque)}
          className="h-10 w-10 rounded-md border border-marca-100 text-lg font-medium text-marca-700 transition hover:bg-marca-50"
        >
          +
        </button>
      </div>

      <dl className="mt-5 space-y-1.5 border-t border-marca-100 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-carbon-500">Subtotal</dt>
          <dd className="font-semibold text-carbon-900">{formatoCOP(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-carbon-500">Ahorro frente a lista</dt>
          <dd className="font-medium text-lima-600">{formatoCOP(ahorro)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-carbon-500">Entrega estimada</dt>
          <dd className="font-medium text-carbon-900">{seleccionada.entrega}</dd>
        </div>
      </dl>

      {excedeStock && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
          La cantidad supera el stock de {bodega}. El pedido se completa con otra
          bodega y la entrega puede tardar 24 horas más.
        </p>
      )}

      <button
        type="button"
        onClick={pedir}
        disabled={enviando}
        className="mt-5 w-full rounded-md bg-marca-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-marca-800 disabled:opacity-70"
      >
        {enviando ? "Generando el pedido…" : "Pedir ahora"}
      </button>
      <button
        type="button"
        onClick={alCarrito}
        className="mt-2 w-full rounded-md border border-marca-500 px-5 py-3 text-sm font-semibold text-marca-700 transition hover:bg-marca-50"
      >
        Agregar al carrito
      </button>

      {agregado ? (
        <p className="entrar mt-3 rounded-lg bg-lima-500/10 px-3 py-2 text-center text-xs text-lima-600">
          Agregado al carrito.{" "}
          <Link href="/carrito" className="font-semibold underline">
            Ver carrito
          </Link>
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-carbon-500">
          Sin cotización previa: la referencia ya está validada.
        </p>
      )}
    </div>
  );
}
