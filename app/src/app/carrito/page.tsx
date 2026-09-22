"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FotoPieza } from "@/components/FotoPieza";
import { piezaPorId } from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import { CLIENTE_ACTUAL, IVA, useTienda } from "@/lib/tienda";

export default function Carrito() {
  const router = useRouter();
  const { carrito, montado, ajustarCantidad, quitar, vaciar, crearPedido, totalCarrito } =
    useTienda();
  const [confirmando, setConfirmando] = useState(false);

  if (!montado) {
    return <p className="text-sm text-carbon-500">Cargando el carrito…</p>;
  }

  if (carrito.length === 0) {
    return (
      <div className="rounded-md border border-marca-100 bg-white p-10 text-center shadow-sm">
        <p className="text-3xl">🧰</p>
        <h1 className="mt-3 text-lg font-semibold text-carbon-900">
          El carrito está vacío
        </h1>
        <p className="mt-1 text-sm text-carbon-500">
          Arme un pedido con varias referencias y despáchelas en un solo envío.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-md bg-marca-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marca-600"
        >
          Buscar repuestos
        </Link>
      </div>
    );
  }

  const iva = totalCarrito * IVA;
  const ahorro = carrito.reduce((t, l) => {
    const pieza = piezaPorId(l.piezaId);
    if (!pieza) return t;
    return t + (pieza.precioLista - pieza.precioSocio) * l.cantidad;
  }, 0);
  const bodegas = new Set(carrito.map((l) => l.bodega));

  function confirmar() {
    setConfirmando(true);
    window.setTimeout(() => {
      const numero = crearPedido("descripcion");
      router.push(`/pedido/${numero}`);
    }, 900);
  }

  return (
    <div>
      <Link href="/" className="text-xs font-medium text-marca-600 hover:text-marca-700">
        ← Seguir buscando repuestos
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-semibold text-carbon-900">
              Pedido en preparación
            </h1>
            <button
              type="button"
              onClick={vaciar}
              className="text-xs font-medium text-carbon-500 underline decoration-dotted underline-offset-4 hover:text-red-700"
            >
              Vaciar carrito
            </button>
          </div>
          <p className="mt-1 text-sm text-carbon-500">
            {carrito.length} referencia{carrito.length === 1 ? "" : "s"} · despacho
            desde {bodegas.size} bodega{bodegas.size === 1 ? "" : "s"}
          </p>

          <ul className="mt-5 divide-y divide-marca-100">
            {carrito.map((linea) => {
              const pieza = piezaPorId(linea.piezaId);
              if (!pieza) return null;
              const existencia = pieza.existencias.find(
                (e) => e.bodega === linea.bodega,
              );
              return (
                <li key={linea.piezaId} className="flex gap-4 py-4">
                  <FotoPieza
                    pieza={pieza}
                    ancho={80}
                    className="h-20 w-20 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/pieza/${pieza.id}`}
                      className="text-sm font-semibold text-carbon-900 hover:text-marca-700"
                    >
                      {pieza.nombre}
                    </Link>
                    <p className="text-xs text-carbon-500">
                      {pieza.marca} · Ref. {pieza.referencia}
                    </p>
                    <p className="mt-0.5 text-xs text-carbon-500">
                      Desde {linea.bodega} · {existencia?.entrega ?? "24 horas"}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          ajustarCantidad(linea.piezaId, -pieza.unidadEmpaque)
                        }
                        className="h-8 w-8 rounded-lg border border-marca-100 text-marca-700 transition hover:bg-marca-50"
                      >
                        −
                      </button>
                      <span className="w-12 text-center text-sm font-medium">
                        {linea.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          ajustarCantidad(linea.piezaId, pieza.unidadEmpaque)
                        }
                        className="h-8 w-8 rounded-lg border border-marca-100 text-marca-700 transition hover:bg-marca-50"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => quitar(linea.piezaId)}
                        className="ml-2 text-xs text-carbon-500 underline decoration-dotted underline-offset-4 hover:text-red-700"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-carbon-900">
                      {formatoCOP(linea.precioUnitario * linea.cantidad)}
                    </p>
                    <p className="text-xs text-carbon-500">
                      {formatoCOP(linea.precioUnitario)} c/u
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border border-marca-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-700">
              Resumen
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-carbon-500">Subtotal</dt>
                <dd className="font-medium text-carbon-900">
                  {formatoCOP(totalCarrito)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-carbon-500">IVA (19%)</dt>
                <dd className="font-medium text-carbon-900">{formatoCOP(iva)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-carbon-500">Ahorro socio comercial</dt>
                <dd className="font-medium text-lima-600">{formatoCOP(ahorro)}</dd>
              </div>
              <div className="flex justify-between border-t border-marca-100 pt-2">
                <dt className="font-semibold text-carbon-900">Total</dt>
                <dd className="text-lg font-semibold text-marca-700">
                  {formatoCOP(totalCarrito + iva)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-md bg-marca-50 px-3 py-2.5 text-xs text-carbon-700">
              Facturar a <strong>{CLIENTE_ACTUAL.nombre}</strong> · Entrega en{" "}
              {CLIENTE_ACTUAL.ciudad}. Cupo de crédito aprobado.
            </div>

            <button
              type="button"
              onClick={confirmar}
              disabled={confirmando}
              className="mt-4 w-full rounded-md bg-marca-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-marca-800 disabled:opacity-70"
            >
              {confirmando ? "Confirmando el pedido…" : "Confirmar pedido"}
            </button>
            <p className="mt-2 text-center text-xs text-carbon-500">
              Se despacha con una sola guía y un solo seguimiento.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
