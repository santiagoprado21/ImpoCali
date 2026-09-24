import { datosCliente } from "@/lib/clientes";

/** Tarjeta destacada del socio que realizó el pedido. */
export function TarjetaCliente({
  nombre,
  ciudad,
}: {
  nombre: string;
  ciudad: string;
}) {
  const datos = datosCliente(nombre);
  const iniciales = nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-md border-2 border-lima-500 bg-lima-400/20 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-lima-700">
        Cliente del pedido
      </p>
      <div className="mt-2 flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lima-500 text-sm font-bold text-white">
          {iniciales}
        </span>
        <div className="min-w-0">
          <p className="text-base font-bold text-carbon-900">{nombre}</p>
          <p className="text-xs text-carbon-700">
            {datos?.segmento ?? "Socio comercial"} · {ciudad}
          </p>
          {datos && (
            <dl className="mt-2 space-y-1 text-xs text-carbon-700">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 font-semibold text-carbon-500">
                  NIT
                </dt>
                <dd>{datos.nit}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 font-semibold text-carbon-500">
                  Teléfono
                </dt>
                <dd>{datos.telefono}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 font-semibold text-carbon-500">
                  Contacto
                </dt>
                <dd>{datos.contacto}</dd>
              </div>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
