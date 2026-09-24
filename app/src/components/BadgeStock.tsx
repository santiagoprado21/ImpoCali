/** Badge de unidades disponibles — destaca stock para impulsar la compra. */
export function BadgeStock({
  unidades,
  className = "",
  compacto = false,
}: {
  unidades: number;
  className?: string;
  compacto?: boolean;
}) {
  const alto = unidades > 40;
  const medio = unidades > 15;
  const tono = alto
    ? "border-lima-500 bg-lima-500 text-white"
    : medio
      ? "border-lima-600 bg-lima-400 text-marca-900"
      : "border-amber-600 bg-amber-100 text-amber-950";

  const mensaje = alto
    ? "Listo para despacho"
    : medio
      ? "Quedan pocas unidades"
      : "¡Últimas unidades!";

  if (compacto) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[11px] font-bold ${tono} ${className}`}
      >
        {unidades} und.
      </span>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-start gap-0.5 rounded-sm border-2 px-3 py-2 ${tono} ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">
        Disponibles
      </span>
      <span className="text-xl font-bold leading-none tabular-nums">
        {unidades}{" "}
        <span className="text-sm font-semibold">und.</span>
      </span>
      <span className="text-[10px] font-medium opacity-95">{mensaje}</span>
    </div>
  );
}
