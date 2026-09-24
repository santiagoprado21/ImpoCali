import Image from "next/image";
import Link from "next/link";

/**
 * Hero de ambientación: marca primero, imagen a sangre y un CTA al buscador.
 */
export function HeroInicio() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 -mt-7 mb-8 min-h-[min(72vh,560px)] overflow-hidden bg-marca-900 text-white">
      <Image
        src="/vehiculos/auto-sedan.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-marca-900 via-marca-900/85 to-marca-700/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-marca-900/90 via-transparent to-marca-900/30"
      />

      <div className="relative mx-auto flex min-h-[min(72vh,560px)] max-w-6xl flex-col justify-end px-5 pb-12 pt-20 sm:justify-center sm:pb-16 sm:pt-16">
        <p className="entrar text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
          Impocali · Autofix
        </p>
        <h1 className="titulo-marca entrar mt-2 max-w-xl text-5xl leading-none text-white sm:text-7xl [animation-delay:80ms]">
          Repuestos multimarca, al instante
        </h1>
        <p className="entrar mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base [animation-delay:140ms]">
          Buscador con IA: interpreta lenguaje de taller, encuentra la
          referencia, el stock y el precio de socio en segundos.
        </p>
        <div className="entrar mt-7 flex flex-wrap gap-3 [animation-delay:200ms]">
          <a
            href="#buscador"
            className="inline-flex items-center bg-white px-5 py-3 text-sm font-semibold text-marca-700 transition hover:bg-marca-50"
          >
            Buscar repuesto
          </a>
          <Link
            href="/catalogo"
            className="inline-flex items-center border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Catálogo por vehículo
          </Link>
        </div>
      </div>
    </section>
  );
}
