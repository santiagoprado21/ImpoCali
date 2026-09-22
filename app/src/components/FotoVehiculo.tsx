"use client";

import Image from "next/image";
import { useState } from "react";
import { imagenDeModelo } from "@/lib/catalogo";
import type { TipoVehiculo } from "@/lib/types";
import { SiluetaVehiculo } from "./SiluetaVehiculo";

/**
 * Foto de referencia del vehículo seleccionado. Comparte imagen entre líneas de
 * la misma carrocería; la silueta queda como respaldo.
 */
export function FotoVehiculo({
  tipo,
  marca,
  linea,
  className = "",
}: {
  tipo: TipoVehiculo;
  marca: string;
  linea: string;
  className?: string;
}) {
  const [sinFoto, setSinFoto] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-md bg-white ${className}`}>
      {sinFoto ? (
        <div className="grid h-full w-full place-items-center">
          <SiluetaVehiculo tipo={tipo} className="h-3/4 w-3/4 text-marca-700" />
        </div>
      ) : (
        <Image
          src={imagenDeModelo(marca, linea)}
          alt={`${marca} ${linea}`}
          fill
          priority
          sizes="400px"
          className="object-contain"
          onError={() => setSinFoto(true)}
        />
      )}
    </div>
  );
}
