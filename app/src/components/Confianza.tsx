import { nivelConfianza } from "@/lib/buscador";

const ESTILOS = {
  alta: { chip: "bg-lima-500/15 text-lima-600", barra: "bg-lima-500", texto: "Confianza alta" },
  media: { chip: "bg-amber-100 text-amber-900", barra: "bg-amber-500", texto: "Confianza media" },
  baja: { chip: "bg-red-100 text-red-700", barra: "bg-red-500", texto: "Confianza baja" },
} as const;

export function ChipConfianza({ valor }: { valor: number }) {
  const estilo = ESTILOS[nivelConfianza(valor)];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${estilo.chip}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {estilo.texto} · {valor}%
    </span>
  );
}

export function BarraConfianza({ valor }: { valor: number }) {
  const estilo = ESTILOS[nivelConfianza(valor)];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-carbon-500/15">
      <div
        className={`h-full rounded-full transition-all duration-700 ${estilo.barra}`}
        style={{ width: `${valor}%` }}
      />
    </div>
  );
}

export function AvisoConfianza({ valor }: { valor: number }) {
  const nivel = nivelConfianza(valor);
  if (nivel === "alta") return null;
  return (
    <p
      className={`rounded-lg px-3 py-2 text-xs ${
        nivel === "media"
          ? "bg-amber-50 text-amber-800"
          : "bg-red-50 text-red-700"
      }`}
    >
      {nivel === "media"
        ? "Confirme con el cliente antes de facturar: la referencia es probable pero no exacta."
        : "Escale al canal en vivo con un experto antes de pedir esta referencia."}
    </p>
  );
}
