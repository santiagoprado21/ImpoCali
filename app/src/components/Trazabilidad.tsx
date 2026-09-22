"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FotoPieza } from "@/components/FotoPieza";
import { LineaTiempo } from "@/components/LineaTiempo";
import { piezaPorId } from "@/lib/catalogo";
import { HITOS, formatoCOP, horaDeHito } from "@/lib/pedidos";
import { IVA, bodegaPrincipal, totalConIva, totalPedido, useTienda } from "@/lib/tienda";
import { ESTADOS } from "@/components/admin/EstadoPedido";
import type { Pedido } from "@/lib/types";

/** Segundos de demo que representan cada etapa real del despacho. */
const SEGUNDOS_POR_ETAPA = 7;

export function Trazabilidad({ pedido }: { pedido: Pedido }) {
  const { avanzarEstado } = useTienda();
  const [etapa, setEtapa] = useState(Math.max(0, ESTADOS.indexOf(pedido.estado)));
  const [corriendo, setCorriendo] = useState(true);
  const base = useRef(new Date(pedido.creado));

  // Al avanzar se actualiza el pedido en la tienda, para que el CRM vea lo mismo.
  useEffect(() => {
    if (!corriendo || etapa >= HITOS.length - 1) return;
    const id = window.setTimeout(() => {
      const siguiente = etapa + 1;
      setEtapa(siguiente);
      avanzarEstado(pedido.numero, ESTADOS[siguiente]);
    }, SEGUNDOS_POR_ETAPA * 1000);
    return () => window.clearTimeout(id);
  }, [etapa, corriendo, avanzarEstado, pedido.numero]);

  const completado = etapa >= HITOS.length - 1;
  const bodega = bodegaPrincipal(pedido);
  const primeraPieza = piezaPorId(pedido.lineas[0]?.piezaId ?? "");
  const entrega =
    primeraPieza?.existencias.find((e) => e.bodega === bodega)?.entrega ??
    "24 horas";

  return (
    <div>
      <Link href="/" className="text-xs font-medium text-marca-600 hover:text-marca-700">
        ← Volver al buscador
      </Link>

      <div className="mt-4 rounded-md border border-lima-400/40 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-lima-500/15 px-3 py-1 text-xs font-semibold text-lima-600">
              ✓ Pedido generado
            </span>
            <h1 className="mt-3 text-2xl font-semibold text-carbon-900">
              Pedido {pedido.numero}
            </h1>
            <p className="mt-1 text-sm text-carbon-500">
              Creado el{" "}
              {base.current.toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              a las {horaDeHito(0, base.current)} · {pedido.cliente}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-carbon-500">
              Entrega estimada
            </p>
            <p className="text-lg font-semibold text-marca-700">{entrega}</p>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {pedido.lineas.map((linea) => {
            const pieza = piezaPorId(linea.piezaId);
            if (!pieza) return null;
            return (
              <li
                key={linea.piezaId}
                className="flex flex-wrap items-center gap-4 rounded-md bg-marca-50/60 p-4"
              >
                <FotoPieza pieza={pieza} ancho={56} className="h-14 w-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-carbon-900">
                    {pieza.nombre}
                  </p>
                  <p className="text-xs text-carbon-500">
                    {pieza.marca} · Ref. {pieza.referencia} · Despacha desde{" "}
                    {linea.bodega}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-carbon-900">
                    {formatoCOP(linea.precioUnitario * linea.cantidad)}
                  </p>
                  <p className="text-xs text-carbon-500">
                    {linea.cantidad}{" "}
                    {linea.cantidad === 1 ? "unidad" : "unidades"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <dl className="mt-4 ml-auto w-full max-w-[280px] space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-carbon-500">Subtotal</dt>
            <dd className="text-carbon-900">{formatoCOP(totalPedido(pedido))}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-carbon-500">IVA ({IVA * 100}%)</dt>
            <dd className="text-carbon-900">
              {formatoCOP(totalConIva(pedido) - totalPedido(pedido))}
            </dd>
          </div>
          <div className="flex justify-between border-t border-marca-100 pt-1">
            <dt className="font-semibold text-carbon-900">Total del pedido</dt>
            <dd className="font-semibold text-marca-700">
              {formatoCOP(totalConIva(pedido))}
            </dd>
          </div>
        </dl>
      </div>

      <section className="mt-5 rounded-md border border-marca-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-700">
            Trazabilidad del pedido
          </h2>
          <div className="flex items-center gap-2">
            {!completado && (
              <button
                type="button"
                onClick={() => setCorriendo((c) => !c)}
                className="rounded-full border border-marca-100 px-3 py-1.5 text-xs font-medium text-marca-700 transition hover:bg-marca-50"
              >
                {corriendo ? "Pausar la demo" : "Reanudar"}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setEtapa(0);
                setCorriendo(true);
                base.current = new Date();
              }}
              className="rounded-full border border-marca-100 px-3 py-1.5 text-xs font-medium text-carbon-500 transition hover:bg-marca-50"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <LineaTiempo etapa={etapa} base={base.current} completado={completado} />

        {completado && (
          <div className="entrar mt-6 rounded-md bg-lima-500/10 px-4 py-3 text-xs text-lima-600">
            Pedido cerrado. El historial queda en el CRM como dato propio: qué se
            pidió, cuánto tardó y si la referencia sugerida fue la correcta.
          </div>
        )}
      </section>
    </div>
  );
}
