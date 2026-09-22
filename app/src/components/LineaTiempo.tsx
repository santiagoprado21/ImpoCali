"use client";

import { HITOS, horaDeHito } from "@/lib/pedidos";

export function LineaTiempo({
  etapa,
  base,
  completado,
}: {
  etapa: number;
  base: Date;
  completado: boolean;
}) {
  return (
    <ol className="relative space-y-6 border-l-2 border-marca-100 pl-8">
      {HITOS.map((hito, i) => {
        const cumplido = i <= etapa;
        const actual = i === etapa && !completado;
        return (
          <li key={hito.estado} className="relative">
            <span
              className={`absolute -left-[41px] grid h-6 w-6 place-items-center rounded-full border-2 text-[11px] font-bold transition-colors duration-500 ${
                cumplido
                  ? "border-lima-600 bg-lima-600 text-white"
                  : "border-marca-100 bg-white text-carbon-500"
              }`}
            >
              {cumplido ? "✓" : i + 1}
            </span>
            {actual && (
              <span className="pulso absolute -left-[45px] top-[2px] h-8 w-8 rounded-full bg-lima-500/25" />
            )}
            <div
              className={`transition-opacity duration-500 ${
                cumplido ? "opacity-100" : "opacity-45"
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-sm font-semibold text-carbon-900">
                  {hito.titulo}
                </h3>
                <span className="text-xs font-medium text-marca-600">
                  {cumplido
                    ? horaDeHito(hito.offsetMin, base)
                    : `estimado ${horaDeHito(hito.offsetMin, base)}`}
                </span>
                {actual && (
                  <span className="rounded-full bg-marca-700 px-2 py-0.5 text-[11px] font-medium text-white">
                    En curso
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-carbon-500">{hito.detalle}</p>
              <p className="mt-0.5 text-xs font-medium text-carbon-700">
                {hito.ubicacion}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
