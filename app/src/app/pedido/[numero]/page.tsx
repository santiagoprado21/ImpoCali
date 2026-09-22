"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Trazabilidad } from "@/components/Trazabilidad";
import { useTienda } from "@/lib/tienda";

export default function PedidoPage() {
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
        <p className="mt-1 text-sm text-carbon-500">
          Es posible que se haya limpiado el almacenamiento del navegador.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-md bg-marca-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marca-600"
        >
          Volver al buscador
        </Link>
      </div>
    );
  }

  return <Trazabilidad pedido={pedido} />;
}
