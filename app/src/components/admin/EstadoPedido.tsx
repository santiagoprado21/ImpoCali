import type { EstadoPedido } from "@/lib/types";

const ESTILOS: Record<EstadoPedido, { texto: string; clase: string }> = {
  confirmado: { texto: "Confirmado", clase: "bg-marca-50 text-marca-700" },
  alistamiento: { texto: "Alistamiento", clase: "bg-amber-100 text-amber-900" },
  despacho: { texto: "Despacho", clase: "bg-purple-100 text-purple-800" },
  ruta: { texto: "En ruta", clase: "bg-marca-100 text-marca-700" },
  entregado: { texto: "Entregado", clase: "bg-lima-500/15 text-lima-600" },
};

export const ESTADOS: EstadoPedido[] = [
  "confirmado",
  "alistamiento",
  "despacho",
  "ruta",
  "entregado",
];

export function EtiquetaEstado({ estado }: { estado: EstadoPedido }) {
  const estilo = ESTILOS[estado];
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${estilo.clase}`}
    >
      {estilo.texto}
    </span>
  );
}

export function textoEstado(estado: EstadoPedido): string {
  return ESTILOS[estado].texto;
}
