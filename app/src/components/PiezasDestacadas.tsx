import Link from "next/link";
import { CATALOGO, stockTotal } from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import { FotoPieza } from "@/components/FotoPieza";

/** IDs de piezas frecuentes en el mostrador / demo. */
const IDS_DESTACADAS = [
  "brk-001",
  "fil-001",
  "emb-001",
  "lub-001",
  "sus-001",
  "ele-001",
  "mot-002",
  "ilu-001",
];

/**
 * Catálogo corto de piezas relevantes debajo del buscador.
 */
export function PiezasDestacadas() {
  const piezas = IDS_DESTACADAS.map((id) =>
    CATALOGO.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="mt-12" aria-labelledby="destacadas-titulo">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="destacadas-titulo"
            className="titulo-marca text-3xl text-marca-700 sm:text-4xl"
          >
            Piezas más relevantes
          </h2>
          <p className="mt-1 max-w-xl text-sm text-carbon-500">
            Referencias de alta rotación con stock en bodega y precio de socio.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="text-sm font-semibold text-marca-700 transition hover:text-marca-500"
        >
          Ver catálogo completo →
        </Link>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {piezas.map((pieza) => {
          const stock = stockTotal(pieza);
          return (
            <li key={pieza.id}>
              <Link
                href={`/pieza/${pieza.id}`}
                className="group flex h-full flex-col border border-marca-100 bg-white transition hover:border-marca-500"
              >
                <div className="relative aspect-[4/3] bg-[#f4f6f9]">
                  <FotoPieza
                    pieza={pieza}
                    ancho={320}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-carbon-500">
                    {pieza.categoria}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug text-carbon-900 group-hover:text-marca-700">
                    {pieza.nombre}
                  </h3>
                  <p className="mt-0.5 text-xs text-carbon-500">
                    {pieza.marca} · {pieza.referencia}
                  </p>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    <p className="text-base font-semibold text-marca-700">
                      {formatoCOP(pieza.precioSocio)}
                    </p>
                    <p
                      className={`text-[11px] font-medium ${
                        stock > 20 ? "text-lima-600" : "text-amber-700"
                      }`}
                    >
                      {stock} und.
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
