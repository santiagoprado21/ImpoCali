import type { Categoria } from "@/lib/types";

/**
 * Ilustraciones vectoriales por segmento. Ocupan el lugar de las imágenes
 * que el proveedor entregaría en el segmento de multimedia de PIES.
 */
const TRAZOS: Record<Categoria, React.ReactNode> = {
  Motor: (
    <>
      <path d="M30 52 h34 l12-14 h20 v18 h14 v28 h-14 v18 H76 l-12-14 H30 z" />
      <path d="M42 52 v-14 h22 v14" />
      <path d="M100 66 h16 M100 78 h16" />
      <circle cx="47" cy="74" r="9" />
    </>
  ),
  Filtración: (
    <>
      <ellipse cx="60" cy="26" rx="30" ry="10" />
      <path d="M30 26 v68 c0 6 13 10 30 10 s30-4 30-10 V26" />
      <path d="M42 36 v58 M54 34 v62 M66 34 v62 M78 36 v58" strokeDasharray="3 5" />
    </>
  ),
  Lubricantes: (
    <>
      <path d="M44 34 h32 v12 h10 a6 6 0 0 1 6 6 v48 a6 6 0 0 1 -6 6 H34 a6 6 0 0 1 -6 -6 V52 a6 6 0 0 1 6 -6 h10 z" />
      <path d="M40 62 h40 v22 h-40 z" strokeDasharray="3 4" />
      <path d="M52 34 v-10 h16 v10" />
    </>
  ),
  "Químicos y aditivos": (
    <>
      <path d="M46 40 h28 v56 a10 10 0 0 1 -10 10 H56 a10 10 0 0 1 -10 -10 z" />
      <path d="M52 40 v-12 h16 v12" />
      <path d="M58 20 h20 l8-8" />
      <path d="M46 62 h28" strokeDasharray="3 4" />
      <path d="M96 30 l6 6 M104 24 l4 4 M98 44 l5 5" />
    </>
  ),
  Rodamientos: (
    <>
      <circle cx="60" cy="60" r="42" />
      <circle cx="60" cy="60" r="20" />
      <circle cx="60" cy="29" r="7" />
      <circle cx="60" cy="91" r="7" />
      <circle cx="29" cy="60" r="7" />
      <circle cx="91" cy="60" r="7" />
      <circle cx="38" cy="38" r="7" />
      <circle cx="82" cy="82" r="7" />
      <circle cx="82" cy="38" r="7" />
      <circle cx="38" cy="82" r="7" />
    </>
  ),
  Frenos: (
    <>
      <circle cx="60" cy="60" r="38" />
      <circle cx="60" cy="60" r="14" />
      <circle cx="60" cy="60" r="26" strokeDasharray="4 6" />
      <path d="M92 34 h22 a6 6 0 0 1 6 6 v40 a6 6 0 0 1 -6 6 h-22 z" />
      <path d="M98 40 v40" strokeDasharray="3 4" />
    </>
  ),
  Embragues: (
    <>
      <circle cx="60" cy="60" r="42" />
      <circle cx="60" cy="60" r="12" />
      <path d="M60 18 v14 M60 88 v14 M18 60 h14 M88 60 h14" />
      <path d="M31 31 l10 10 M89 31 l-10 10 M31 89 l10-10 M89 89 l-10-10" />
    </>
  ),
  "Suspensión y dirección": (
    <>
      <path d="M60 14 v20" />
      <circle cx="60" cy="10" r="6" />
      <path d="M46 34 h28 v18 h-28 z" />
      <path d="M52 52 c0 8 16 8 16 16 s-16 8-16 16 s16 8 16 16" />
      <path d="M46 104 h28 v12 h-28 z" />
    </>
  ),
  "Sistema de transmisión": (
    <>
      <circle cx="40" cy="70" r="24" />
      <circle cx="40" cy="70" r="9" />
      <circle cx="98" cy="70" r="13" />
      <circle cx="98" cy="70" r="5" />
      <path d="M40 46 h58 M40 94 h58" />
      <path d="M28 54 l6 6 M52 54 l-6 6 M28 86 l6-6 M52 86 l-6-6" />
    </>
  ),
  "Partes eléctricas": (
    <>
      <path d="M56 12 h14 v26 h-14 z" />
      <path d="M52 38 h22 v14 h-22 z" />
      <path d="M56 52 v20 h14 v-20" />
      <path d="M60 72 v18 M66 72 v18" />
      <path d="M52 90 h22 l-11 18 z" />
      <path d="M96 40 l-12 22 h12 l-12 22" />
    </>
  ),
  "Cables de acero": (
    <>
      <path d="M20 44 h16 v14 h-16 z" />
      <path d="M36 51 c22 0 22 34 44 34 s22-34 32-34" />
      <path d="M104 44 h14 v14 h-14 z" />
      <circle cx="26" cy="86" r="8" />
      <path d="M34 86 h56" strokeDasharray="4 5" />
    </>
  ),
  Refrigeración: (
    <>
      <circle cx="52" cy="60" r="28" />
      <path d="M52 32 c10 8 10 20 0 28 M52 88 c-10-8-10-20 0-28 M24 60 c8-10 20-10 28 0 M80 60 c-8 10-20 10-28 0" />
      <path d="M80 44 h24 v32 h-24 z" />
      <path d="M104 52 h10 M104 68 h10" />
    </>
  ),
  Iluminación: (
    <>
      <path d="M22 40 h58 c18 0 30 9 30 20 s-12 20-30 20 H22 z" />
      <path d="M40 52 h30 M40 68 h30" strokeDasharray="3 5" />
      <path d="M110 50 l14-8 M110 60 h16 M110 70 l14 8" />
    </>
  ),
  Accesorios: (
    <>
      <circle cx="44" cy="46" r="20" />
      <path d="M44 66 v34" />
      <path d="M30 100 h28" />
      <path d="M78 34 h34 v52 h-34 z" />
      <path d="M86 46 h18 M86 60 h18 M86 74 h10" strokeDasharray="3 4" />
    </>
  ),
};

export function IlustracionPieza({
  categoria,
  className = "",
}: {
  categoria: Categoria;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 132 120"
      role="img"
      aria-label={`Ilustración de ${categoria}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {TRAZOS[categoria]}
    </svg>
  );
}
