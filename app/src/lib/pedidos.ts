import type { HitoPedido, Pieza } from "./types";

export const MARCA = "Autofix";

export function formatoCOP(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

/** Número de pedido estable a partir de la referencia, para que la demo sea reproducible. */
export function numeroPedido(pieza: Pieza): string {
  const semilla = pieza.referencia
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `AF-${(10400 + (semilla % 600)).toString()}`;
}

export const HITOS: HitoPedido[] = [
  {
    estado: "confirmado",
    titulo: "Pedido confirmado",
    detalle: "La referencia quedó reservada en inventario y el pedido entró al CRM.",
    ubicacion: "Plataforma Autofix",
    offsetMin: 0,
  },
  {
    estado: "alistamiento",
    titulo: "Alistamiento en bodega",
    detalle: "Un auxiliar recoge la pieza en el estante y verifica la referencia.",
    ubicacion: "Bodega 2A · Parque Logístico Yumbo",
    offsetMin: 25,
  },
  {
    estado: "despacho",
    titulo: "Empacado y facturado",
    detalle: "Se genera la factura electrónica y la guía de transporte.",
    ubicacion: "Zona de despacho · Yumbo",
    offsetMin: 70,
  },
  {
    estado: "ruta",
    titulo: "En ruta hacia el taller",
    detalle: "El transportador lleva el pedido con seguimiento por guía.",
    ubicacion: "Ruta Yumbo – Cali",
    offsetMin: 145,
  },
  {
    estado: "entregado",
    titulo: "Entregado",
    detalle: "Recibido y firmado en el punto de entrega del cliente.",
    ubicacion: "Taller del cliente",
    offsetMin: 220,
  },
];

export function horaDeHito(offsetMin: number, base: Date): string {
  const fecha = new Date(base.getTime() + offsetMin * 60_000);
  return fecha.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
}
