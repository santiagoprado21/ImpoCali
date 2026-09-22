"use client";

import Image from "next/image";
import { useState } from "react";
import { imagenDePieza } from "@/lib/catalogo";
import type { Pieza } from "@/lib/types";
import { IlustracionPieza } from "./IlustracionPieza";

/**
 * Foto de catálogo del repuesto. Si el proveedor todavía no entregó la imagen,
 * cae a la ilustración del segmento para no dejar el espacio vacío.
 */
export function FotoPieza({
  pieza,
  ancho,
  className = "",
}: {
  pieza: Pieza;
  /** Ancho aproximado al que se muestra, para que Next sirva el tamaño justo. */
  ancho: number;
  className?: string;
}) {
  const [sinFoto, setSinFoto] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-marca-100 bg-white ${className}`}
    >
      {sinFoto ? (
        <div className="grid h-full w-full place-items-center bg-marca-50 text-marca-600">
          <IlustracionPieza categoria={pieza.categoria} className="h-1/2 w-1/2" />
        </div>
      ) : (
        <Image
          src={imagenDePieza(pieza)}
          alt={pieza.nombre}
          fill
          sizes={`${ancho}px`}
          className="object-contain"
          onError={() => setSinFoto(true)}
        />
      )}
    </div>
  );
}
