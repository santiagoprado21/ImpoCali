"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { imagenDeMarca } from "@/lib/catalogo";

/**
 * Logo de marca del vehículo. Si la imagen falta, muestra las iniciales.
 */
export function FotoMarca({
  marca,
  className = "",
}: {
  marca: string;
  className?: string;
}) {
  const [sinFoto, setSinFoto] = useState(false);
  const iniciales = marca.slice(0, 3).toUpperCase();

  useEffect(() => {
    setSinFoto(false);
  }, [marca]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-sm bg-white ${className}`}
    >
      {sinFoto ? (
        <span className="px-1 text-[10px] font-bold tracking-wide text-marca-700">
          {iniciales}
        </span>
      ) : (
        <Image
          key={marca}
          src={imagenDeMarca(marca)}
          alt={`Logo ${marca}`}
          fill
          sizes="80px"
          className="object-contain"
          onError={() => setSinFoto(true)}
        />
      )}
    </div>
  );
}
