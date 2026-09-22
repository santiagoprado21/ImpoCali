"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { USUARIOS, useSesion } from "@/lib/sesion";

export default function Ingresar() {
  const router = useRouter();
  const { ingresar, usuario, montado } = useSesion();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verClave, setVerClave] = useState(false);
  const [entrando, setEntrando] = useState(false);

  useEffect(() => {
    if (montado && usuario) router.replace("/admin");
  }, [montado, usuario, router]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEntrando(true);
    // Retardo corto para que la demo se sienta como una validación real.
    window.setTimeout(() => {
      const r = ingresar(correo, clave);
      if (r.ok) {
        router.push("/admin");
      } else {
        setError(r.error ?? "No fue posible ingresar.");
        setEntrando(false);
      }
    }, 600);
  }

  function usarCuenta(correoDemo: string) {
    setCorreo(correoDemo);
    setClave("impocali2026");
    setError(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
      <section className="panel">
        <h1 className="panel-cabecera">Consola interna · Ingreso de personal</h1>
        <div className="p-8">
          <p className="text-sm text-carbon-500">
            Acceso restringido al equipo de Impocali. Los socios comerciales usan
            el{" "}
            <Link href="/" className="font-medium text-marca-600 hover:underline">
              buscador público
            </Link>
            .
          </p>

          <form onSubmit={enviar} className="mt-6 max-w-md space-y-4">
            <div>
              <label
                htmlFor="correo"
                className="block text-xs font-semibold uppercase tracking-wide text-carbon-500"
              >
                Correo corporativo
              </label>
              <input
                id="correo"
                type="email"
                autoComplete="username"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="nombre.apellido@impocali.com"
                className="mt-1.5 w-full rounded-md border border-marca-100 px-3 py-2.5 text-sm outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="clave"
                className="block text-xs font-semibold uppercase tracking-wide text-carbon-500"
              >
                Contraseña
              </label>
              <div className="relative mt-1.5">
                <input
                  id="clave"
                  type={verClave ? "text" : "password"}
                  autoComplete="current-password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  className="w-full rounded-md border border-marca-100 px-3 py-2.5 pr-20 text-sm outline-none transition focus:border-marca-500 focus:ring-2 focus:ring-marca-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setVerClave((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-medium text-marca-600 hover:bg-marca-50"
                >
                  {verClave ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="entrar rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={entrando}
              className="w-full rounded-md bg-marca-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-marca-800 disabled:opacity-70"
            >
              {entrando ? "Validando…" : "Ingresar"}
            </button>

            <p className="text-center text-xs text-carbon-500">
              ¿Olvidó su contraseña? Escriba a soporte.ti@impocali.com
            </p>
          </form>
        </div>
      </section>

      <aside className="panel">
        <h2 className="panel-cabecera">Cuentas de demostración</h2>
        <div className="p-4">
          <p className="mb-3 text-xs text-carbon-500">
            Toque una cuenta para llenar el formulario. Todas usan la contraseña{" "}
            <code className="rounded bg-marca-50 px-1.5 py-0.5 font-mono text-[11px] text-marca-700">
              impocali2026
            </code>
            .
          </p>
          <ul className="space-y-2">
            {USUARIOS.map((u) => (
              <li key={u.correo}>
                <button
                  type="button"
                  onClick={() => usarCuenta(u.correo)}
                  className="flex w-full items-center gap-3 rounded-md border border-marca-100 p-3 text-left transition hover:border-marca-500 hover:bg-marca-50"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-marca-700 text-xs font-bold text-white">
                    {u.iniciales}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-carbon-900">
                      {u.nombre}
                    </span>
                    <span className="block truncate text-xs text-marca-600">
                      {u.rol}
                    </span>
                    <span className="block truncate text-[11px] text-carbon-500">
                      {u.correo}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
