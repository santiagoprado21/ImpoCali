import { CATALOGO } from "./catalogo";
import type { Bodega, CanalBusqueda, EstadoPedido, Pedido } from "./types";

const CLIENTES: { nombre: string; ciudad: string }[] = [
  { nombre: "Taller Mecánico Andrade", ciudad: "Cali" },
  { nombre: "Serviteca El Progreso", ciudad: "Palmira" },
  { nombre: "Almacén Repuestos La 14", ciudad: "Cali" },
  { nombre: "Autoservicio Jiménez", ciudad: "Buga" },
  { nombre: "Multifrenos del Valle", ciudad: "Yumbo" },
  { nombre: "Taller Hermanos Rojas", ciudad: "Tuluá" },
  { nombre: "Lubricantes y Filtros SAS", ciudad: "Cali" },
  { nombre: "Motorepuestos Central", ciudad: "Pereira" },
  { nombre: "Diésel Técnica del Pacífico", ciudad: "Buenaventura" },
  { nombre: "Taller Automotriz Quintero", ciudad: "Popayán" },
];

export const ASESORES = [
  "Erika Vargas",
  "Camilo Restrepo",
  "Daniela Ossa",
  "Jhon Mosquera",
];

const ESTADOS_HISTORICOS: EstadoPedido[] = [
  "entregado",
  "entregado",
  "entregado",
  "entregado",
  "ruta",
  "despacho",
  "alistamiento",
  "confirmado",
];

const CANALES: CanalBusqueda[] = [
  "descripcion",
  "descripcion",
  "descripcion",
  "codigo",
  "codigo",
  "imagen",
  "manual",
];

/** Generador determinista: la demo muestra siempre las mismas cifras. */
function aleatorio(semilla: number) {
  let estado = semilla;
  return () => {
    estado |= 0;
    estado = (estado + 0x6d2b79f5) | 0;
    let t = Math.imul(estado ^ (estado >>> 15), 1 | estado);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Historial de pedidos de los últimos 30 días. Se calcula contra la fecha real
 * para que el tablero siempre se vea vigente en la presentación.
 */
export function generarHistorial(ahora: Date): Pedido[] {
  const rnd = aleatorio(20260921);
  const pedidos: Pedido[] = [];

  for (let i = 0; i < 46; i++) {
    const diasAtras = Math.floor(rnd() * 30);
    const creado = new Date(ahora.getTime() - diasAtras * 86_400_000);
    creado.setHours(7 + Math.floor(rnd() * 11), Math.floor(rnd() * 60), 0, 0);

    const cliente = CLIENTES[Math.floor(rnd() * CLIENTES.length)];
    const canal = CANALES[Math.floor(rnd() * CANALES.length)];
    const autoservicio = canal !== "manual" && rnd() > 0.55;

    const cantidadLineas = rnd() > 0.72 ? 2 : 1;
    const lineas = Array.from({ length: cantidadLineas }, () => {
      const pieza = CATALOGO[Math.floor(rnd() * CATALOGO.length)];
      const existencia = pieza.existencias[0];
      return {
        piezaId: pieza.id,
        cantidad: pieza.unidadEmpaque * (1 + Math.floor(rnd() * 3)),
        precioUnitario: pieza.precioSocio,
        bodega: existencia.bodega as Bodega,
      };
    });

    // Los pedidos recientes todavía están en tránsito; los viejos ya se entregaron.
    const estado: EstadoPedido =
      diasAtras > 3
        ? "entregado"
        : ESTADOS_HISTORICOS[Math.floor(rnd() * ESTADOS_HISTORICOS.length)];

    const confianza =
      canal === "manual" ? 0 : 58 + Math.floor(rnd() * 41);
    const corregido = confianza > 0 && confianza < 78 && rnd() > 0.55;

    pedidos.push({
      numero: `AF-${10500 + i}`,
      cliente: cliente.nombre,
      ciudad: cliente.ciudad,
      asesor: autoservicio
        ? "—"
        : ASESORES[Math.floor(rnd() * ASESORES.length)],
      creado: creado.toISOString(),
      lineas,
      estado,
      canal,
      autoservicio,
      tiempoRespuestaMin: autoservicio
        ? 1 + Math.floor(rnd() * 3)
        : 4 + Math.floor(rnd() * 22),
      confianza,
      corregido,
      escalado: canal === "manual" || (confianza > 0 && confianza < 55),
    });
  }

  return pedidos.sort(
    (a, b) => new Date(b.creado).getTime() - new Date(a.creado).getTime(),
  );
}
