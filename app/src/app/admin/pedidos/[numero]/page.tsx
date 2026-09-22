"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ESTADOS, EtiquetaEstado } from "@/components/admin/EstadoPedido";
import { FotoPieza } from "@/components/FotoPieza";
import { LineaTiempo } from "@/components/LineaTiempo";
import { piezaPorId } from "@/lib/catalogo";
import { ETIQUETA_CANAL } from "@/lib/metricas";
import { formatoCOP } from "@/lib/pedidos";
import { descripcionPedido, totalConIva, totalPedido, useTienda } from "@/lib/tienda";

export default function DetallePedido() {
  const { numero } = useParams<{ numero: string }>();
  const { pedidoPorNumero, montado } = useTienda();

  if (!montado) {
    return <p className="text-sm text-carbon-500">Cargando el pedido…</p>;
  }

  const pedido = pedidoPorNumero(numero);
  if (!pedido) {
    return (
      <div className="rounded-md border border-marca-100 bg-white p-10 text-center shadow-sm">
        <h1 className="text-lg font-semibold text-carbon-900">
          No encontramos el pedido {numero}
        </h1>
        <Link
          href="/admin/pedidos"
          className="mt-5 inline-block rounded-md bg-marca-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marca-600"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  const etapa = ESTADOS.indexOf(pedido.estado);
  const creado = new Date(pedido.creado);

  return (
    <div>
      <Link
        href="/admin/pedidos"
        className="text-xs font-medium text-marca-600 hover:text-marca-700"
      >
        ← Volver al listado de pedidos
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold text-carbon-900">
                    {pedido.numero}
                  </h1>
                  <EtiquetaEstado estado={pedido.estado} />
                </div>
                <p className="mt-1 text-sm text-carbon-500">
                  {pedido.cliente} · {pedido.ciudad} ·{" "}
                  {creado.toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-carbon-500">
                  Total con IVA
                </p>
                <p className="text-xl font-semibold text-marca-700">
                  {formatoCOP(totalConIva(pedido))}
                </p>
                <p className="text-xs text-carbon-500">
                  subtotal {formatoCOP(totalPedido(pedido))}
                </p>
              </div>
            </div>

            <ul className="mt-5 divide-y divide-marca-100">
              {pedido.lineas.map((linea) => {
                const pieza = piezaPorId(linea.piezaId);
                if (!pieza) return null;
                return (
                  <li key={linea.piezaId} className="flex items-center gap-4 py-3">
                    <FotoPieza
                      pieza={pieza}
                      ancho={56}
                      className="h-14 w-14 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/pieza/${pieza.id}`}
                        className="text-sm font-medium text-carbon-900 hover:text-marca-700"
                      >
                        {pieza.nombre}
                      </Link>
                      <p className="text-xs text-carbon-500">
                        {pieza.marca} · Ref. {pieza.referencia} · Bodega{" "}
                        {linea.bodega}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-carbon-900">
                        {formatoCOP(linea.precioUnitario * linea.cantidad)}
                      </p>
                      <p className="text-xs text-carbon-500">
                        {linea.cantidad} × {formatoCOP(linea.precioUnitario)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-carbon-700">
              Seguimiento
            </h2>
            <LineaTiempo
              etapa={etapa}
              base={creado}
              completado={pedido.estado === "entregado"}
            />
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-md border border-marca-100 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-700">
              Datos del caso
            </h2>
            <dl className="mt-4 space-y-3 text-xs">
              <Dato clave="Contenido" valor={descripcionPedido(pedido)} />
              <Dato clave="Origen de la búsqueda" valor={ETIQUETA_CANAL[pedido.canal]} />
              <Dato
                clave="Atendido por"
                valor={pedido.autoservicio ? "Autoservicio del cliente" : pedido.asesor}
              />
              <Dato
                clave="Tiempo de respuesta"
                valor={`${pedido.tiempoRespuestaMin} min`}
              />
              <Dato
                clave="Confianza del buscador"
                valor={pedido.confianza > 0 ? `${pedido.confianza}%` : "No aplica"}
              />
              <Dato
                clave="Referencia corregida"
                valor={pedido.corregido ? "Sí, el cliente la ajustó" : "No"}
              />
              <Dato
                clave="Escalado al canal en vivo"
                valor={pedido.escalado ? "Sí" : "No"}
              />
            </dl>
          </section>

          {(pedido.corregido || pedido.escalado) && (
            <section className="rounded-md border border-amber-200 bg-amber-50 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                Caso para reentrenamiento
              </h2>
              <p className="mt-2 text-xs text-amber-900">
                {pedido.escalado
                  ? "El buscador no resolvió la solicitud y hubo que escalar. La transcripción alimenta el modelo."
                  : "El cliente corrigió la referencia sugerida. La corrección se usa como dato de entrenamiento."}
              </p>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Dato({ clave, valor }: { clave: string; valor: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-marca-100 pb-2 last:border-0">
      <dt className="text-carbon-500">{clave}</dt>
      <dd className="text-right font-medium text-carbon-900">{valor}</dd>
    </div>
  );
}
