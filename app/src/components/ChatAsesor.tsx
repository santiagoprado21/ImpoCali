"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { buscarPorDescripcion } from "@/lib/buscador";
import { stockTotal } from "@/lib/catalogo";
import { formatoCOP } from "@/lib/pedidos";
import type { Pieza } from "@/lib/types";

const AVATAR = "/marca/asesor-virtual.jpg";

type ArchivoCotizacion = {
  nombre: string;
  tamano: string;
};

type Mensaje = {
  id: string;
  rol: "asesor" | "usuario";
  texto?: string;
  archivo?: ArchivoCotizacion;
};

/**
 * Demo tipo chat: conversación corta (~5 mensajes) y cotización como archivo.
 */
export function ChatAsesor({ onCerrar }: { onCerrar: () => void }) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      rol: "asesor",
      texto: "¡Hola! Soy el asesor virtual de Autofix. ¿Qué repuesto necesitas?",
    },
  ]);
  const [fase, setFase] = useState<"pedir" | "cotizar" | "fin">("pedir");
  const [escribiendo, setEscribiendo] = useState(false);
  const listaRef = useRef<HTMLDivElement>(null);

  const pieza = buscarPorDescripcion(
    "pastillas de freno delanteras para un Spark GT 2016",
  )[0]?.pieza;

  useEffect(() => {
    const el = listaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes, escribiendo]);

  function agregar(msg: Omit<Mensaje, "id">) {
    setMensajes((prev) => [
      ...prev,
      { ...msg, id: `${Date.now()}-${msg.rol}` },
    ]);
  }

  function asesorResponde(msg: Omit<Mensaje, "id" | "rol">, luego?: () => void) {
    setEscribiendo(true);
    window.setTimeout(() => {
      setEscribiendo(false);
      agregar({ rol: "asesor", ...msg });
      luego?.();
    }, 650);
  }

  function alBuscar() {
    agregar({ rol: "usuario", texto: "Pastillas de freno · Spark GT 2016" });
    setFase("cotizar");
    asesorResponde({
      texto: pieza
        ? `Encontré este repuesto:\n\n${pieza.nombre}\nRef. ${pieza.referencia}\n${formatoCOP(pieza.precioSocio)} · ${stockTotal(pieza)} und. disponibles\n\n¿Te envío la cotización?`
        : "Encontré pastillas compatibles con stock. ¿Te envío la cotización?",
    });
  }

  function alCotizar() {
    agregar({ rol: "usuario", texto: "Sí, envíame la cotización" });
    setFase("fin");
    asesorResponde(
      { texto: "Aquí tienes tu cotización:" },
      () => {
        window.setTimeout(() => {
          agregar({
            rol: "asesor",
            archivo: {
              nombre: "Cotizacion_Autofix_SparkGT.pdf",
              tamano: "48 KB",
            },
          });
        }, 400);
      },
    );
  }

  function descargarCotizacion() {
    if (!pieza) return;
    const blob = crearPdfCotizacion(pieza);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Cotizacion_Autofix_SparkGT.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      role="dialog"
      aria-label="Chat asesor virtual"
      className="entrar fixed bottom-24 left-5 z-50 flex h-[min(28rem,65vh)] w-[min(20rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-marca-100"
    >
      <header className="flex items-center gap-3 bg-marca-500 px-4 py-3 text-white">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-lima-400 bg-white">
          <Image
            src={AVATAR}
            alt="Asesor virtual"
            fill
            sizes="40px"
            className="object-cover object-top"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">Asesor virtual</p>
          <p className="flex items-center gap-1.5 text-[11px] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-lima-400" />
            En línea
          </p>
        </div>
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar chat"
          className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
        >
          ×
        </button>
      </header>

      <div
        ref={listaRef}
        className="flex-1 space-y-2 overflow-y-auto bg-[#ece5dd] px-3 py-3"
      >
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.rol === "usuario" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-snug shadow-sm ${
                m.rol === "usuario"
                  ? "rounded-br-none bg-marca-500 text-white"
                  : "rounded-bl-none bg-white text-carbon-900"
              }`}
            >
              {m.texto && <p className="whitespace-pre-line">{m.texto}</p>}
              {m.archivo && (
                <button
                  type="button"
                  onClick={descargarCotizacion}
                  className="mt-0.5 flex w-full items-center gap-2.5 rounded-md border border-marca-100 bg-[#f8fafc] px-2.5 py-2 text-left transition hover:bg-marca-50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-red-600 text-[10px] font-bold text-white">
                    PDF
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-carbon-900">
                      {m.archivo.nombre}
                    </span>
                    <span className="block text-[10px] text-carbon-500">
                      {m.archivo.tamano} · Tocar para descargar
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
        {escribiendo && (
          <div className="flex justify-start">
            <div className="rounded-lg rounded-bl-none bg-white px-3 py-2 text-xs text-carbon-500 shadow-sm">
              escribiendo…
            </div>
          </div>
        )}
      </div>

      {!escribiendo && fase !== "fin" && (
        <div className="border-t border-marca-100 bg-white px-3 py-2.5">
          {fase === "pedir" && (
            <button
              type="button"
              onClick={alBuscar}
              className="w-full rounded-full bg-marca-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-marca-600"
            >
              Pastillas de freno · Spark GT 2016
            </button>
          )}
          {fase === "cotizar" && (
            <button
              type="button"
              onClick={alCotizar}
              className="w-full rounded-full bg-marca-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-marca-600"
            >
              Sí, envíame la cotización
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/** PDF mínimo válido con el texto de la cotización (demo). */
function crearPdfCotizacion(pieza: Pieza): Blob {
  const lineas = [
    "AUTOFIX - IMPOCALI",
    "Cotizacion de repuesto",
    "",
    `Pieza: ${pieza.nombre}`,
    `Marca: ${pieza.marca}`,
    `Referencia: ${pieza.referencia}`,
    `Precio: ${formatoCOP(pieza.precioSocio)}`,
    `Stock: ${stockTotal(pieza)} unidades`,
    `Vehiculo: Chevrolet Spark GT 2016`,
    "",
    "Documento generado por el asesor virtual.",
  ];

  // Escapa para literales PDF (paréntesis y backslash).
  const escapar = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  const contentStream = [
    "BT",
    "/F1 11 Tf",
    "50 750 Td",
    "14 TL",
    ...lineas.map((l, i) => (i === 0 ? `(${escapar(l)}) Tj` : `T* (${escapar(l)}) Tj`)),
    "ET",
  ].join("\n");

  const objects: string[] = [];
  objects.push("1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n");
  objects.push("2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n");
  objects.push(
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n",
  );
  objects.push(
    `4 0 obj<< /Length ${contentStream.length} >>stream\n${contentStream}\nendstream\nendobj\n`,
  );
  objects.push("5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\n");

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdf += `startxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}
