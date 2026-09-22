import type { TipoVehiculo } from "@/lib/types";

/** Siluetas que reemplazan la foto de catálogo del vehículo en el mockup. */
const TRAZOS: Record<TipoVehiculo, React.ReactNode> = {
  Motos: (
    <>
      <circle cx="48" cy="104" r="26" />
      <circle cx="48" cy="104" r="6" />
      <circle cx="196" cy="104" r="26" />
      <circle cx="196" cy="104" r="6" />
      <path d="M48 104 l34-44 h44" />
      <path d="M196 104 l-30-34 h-38" />
      <path d="M96 70 h58 l14-18" />
      <path d="M116 52 h40" />
      <path d="M82 60 l-12-22 h-22" />
      <path d="M126 70 l16 34 h44" />
      <path d="M150 52 l22-6" />
      <path d="M100 104 h68" />
    </>
  ),
  Autos: (
    <>
      <path d="M22 100 h206" />
      <path d="M34 100 v-18 l24-34 h120 l30 34 v18" />
      <path d="M74 48 v34 M140 48 v34" />
      <path d="M34 82 h174" />
      <circle cx="74" cy="104" r="18" />
      <circle cx="74" cy="104" r="6" />
      <circle cx="180" cy="104" r="18" />
      <circle cx="180" cy="104" r="6" />
    </>
  ),
  "Carga y pasajeros": (
    <>
      <path d="M18 104 h216" />
      <path d="M24 104 V44 h72 v60" />
      <path d="M96 104 V62 h44 l26 30 v12" />
      <path d="M104 68 h30 l18 22 h-48 z" />
      <path d="M166 104 h34" />
      <circle cx="60" cy="106" r="18" />
      <circle cx="60" cy="106" r="6" />
      <circle cx="152" cy="106" r="18" />
      <circle cx="152" cy="106" r="6" />
      <path d="M34 56 h48 M34 72 h48" strokeDasharray="4 6" />
    </>
  ),
};

export function SiluetaVehiculo({
  tipo,
  className = "",
}: {
  tipo: TipoVehiculo;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 250 140"
      role="img"
      aria-label={`Silueta de ${tipo}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {TRAZOS[tipo]}
    </svg>
  );
}
