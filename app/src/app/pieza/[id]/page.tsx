import Link from "next/link";
import { notFound } from "next/navigation";
import { FotoPieza } from "@/components/FotoPieza";
import { PanelPedido } from "@/components/PanelPedido";
import { CATALOGO, piezaPorId, stockTotal } from "@/lib/catalogo";

export function generateStaticParams() {
  return CATALOGO.map((p) => ({ id: p.id }));
}

export default async function FichaPieza({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pieza = piezaPorId(id);
  if (!pieza) notFound();

  return (
    <div>
      <nav aria-label="Ruta de navegación" className="text-xs text-carbon-500">
        <Link href="/" className="font-medium text-marca-600 hover:text-marca-700">
          Inicio
        </Link>
        <span className="px-1.5">·</span>
        <Link
          href="/catalogo"
          className="font-medium text-marca-600 hover:text-marca-700"
        >
          Catálogo por vehículo
        </Link>
        <span className="px-1.5">/</span>
        <span>{pieza.categoria}</span>
      </nav>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <div className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row">
              <FotoPieza
                pieza={pieza}
                ancho={220}
                className="aspect-square w-full max-w-[220px]"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium uppercase tracking-wide text-lima-600">
                  {pieza.categoria}
                </span>
                <h1 className="mt-1 text-2xl font-semibold text-carbon-900">
                  {pieza.nombre}
                </h1>
                <p className="mt-1 text-sm text-carbon-500">
                  {pieza.marca} · Referencia Impocali{" "}
                  <strong className="font-semibold text-carbon-900">
                    {pieza.referencia}
                  </strong>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Etiqueta texto={`${stockTotal(pieza)} unidades disponibles`} tono="lima" />
                  <Etiqueta texto="Imagen y ficha del proveedor (PIES)" tono="marca" />
                  <Etiqueta texto="Aplicación certificada (ACES)" tono="marca" />
                </div>
              </div>
            </div>
          </div>

          <Tarjeta titulo="Especificaciones técnicas">
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {Object.entries(pieza.atributos).map(([clave, valor]) => (
                <div
                  key={clave}
                  className="flex justify-between gap-4 border-b border-dashed border-marca-100 pb-2"
                >
                  <dt className="text-xs text-carbon-500">{clave}</dt>
                  <dd className="text-xs font-medium text-carbon-900">{valor}</dd>
                </div>
              ))}
            </dl>
          </Tarjeta>

          <Tarjeta
            titulo="Vehículos compatibles"
            nota="Rangos de aplicación tomados del estándar ACES"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-carbon-500">
                  <tr className="border-b border-marca-100">
                    <th className="pb-2 font-medium">Marca</th>
                    <th className="pb-2 font-medium">Línea</th>
                    <th className="pb-2 font-medium">Años</th>
                    <th className="pb-2 font-medium">Motor</th>
                    <th className="pb-2 font-medium">Posición</th>
                  </tr>
                </thead>
                <tbody>
                  {pieza.aplicaciones.map((a) => (
                    <tr
                      key={`${a.marca}-${a.linea}-${a.desde}`}
                      className="border-b border-marca-100/60 last:border-0"
                    >
                      <td className="py-2 font-medium text-carbon-900">{a.marca}</td>
                      <td className="py-2">{a.linea}</td>
                      <td className="py-2">
                        {a.desde}–{a.hasta}
                      </td>
                      <td className="py-2">{a.motor}</td>
                      <td className="py-2">{a.posicion ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tarjeta>

          <Tarjeta titulo="Referencias equivalentes">
            <ul className="space-y-2">
              {pieza.equivalencias.map((e) => (
                <li
                  key={e.referencia}
                  className="flex items-center justify-between rounded-lg bg-marca-50/60 px-3 py-2"
                >
                  <span className="text-xs">
                    <strong className="font-semibold text-carbon-900">
                      {e.marca}
                    </strong>{" "}
                    <span className="text-carbon-500">{e.referencia}</span>
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      e.certificada
                        ? "bg-lima-500/15 text-lima-600"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {e.certificada ? "Certificada" : "Por validar"}
                  </span>
                </li>
              ))}
            </ul>
          </Tarjeta>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <PanelPedido pieza={pieza} />
        </div>
      </div>
    </div>
  );
}

function Tarjeta({
  titulo,
  nota,
  children,
}: {
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-md border border-marca-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-carbon-700">
          {titulo}
        </h2>
        {nota && <span className="text-xs text-carbon-500">{nota}</span>}
      </div>
      {children}
    </section>
  );
}

function Etiqueta({ texto, tono }: { texto: string; tono: "lima" | "marca" }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        tono === "lima"
          ? "bg-lima-500/15 text-lima-600"
          : "bg-marca-50 text-marca-700"
      }`}
    >
      {texto}
    </span>
  );
}
