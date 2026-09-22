import { piezaPorId } from "./catalogo";
import { totalPedido } from "./tienda";
import type { CanalBusqueda, Categoria, Pedido } from "./types";

export const ETIQUETA_CANAL: Record<CanalBusqueda, string> = {
  descripcion: "Descripción libre",
  codigo: "Código o fragmento",
  imagen: "Foto de la pieza",
  manual: "Búsqueda manual del asesor",
};

function enUltimosDias(pedido: Pedido, dias: number, ahora: Date): boolean {
  return (
    ahora.getTime() - new Date(pedido.creado).getTime() <= dias * 86_400_000
  );
}

export interface Resumen {
  pedidos: number;
  ingresos: number;
  ticketPromedio: number;
  tiempoMedioMin: number;
  pctAutoservicio: number;
  precisionBuscador: number;
  escalamientos: number;
  lineasPorPedido: number;
}

export function resumen(pedidos: Pedido[], dias: number, ahora: Date): Resumen {
  const periodo = pedidos.filter((p) => enUltimosDias(p, dias, ahora));
  if (periodo.length === 0) {
    return {
      pedidos: 0,
      ingresos: 0,
      ticketPromedio: 0,
      tiempoMedioMin: 0,
      pctAutoservicio: 0,
      precisionBuscador: 0,
      escalamientos: 0,
      lineasPorPedido: 0,
    };
  }

  const ingresos = periodo.reduce((t, p) => t + totalPedido(p), 0);
  const asistidos = periodo.filter((p) => p.confianza > 0);
  const acertados = asistidos.filter((p) => !p.corregido);

  return {
    pedidos: periodo.length,
    ingresos,
    ticketPromedio: Math.round(ingresos / periodo.length),
    tiempoMedioMin:
      Math.round(
        (periodo.reduce((t, p) => t + p.tiempoRespuestaMin, 0) / periodo.length) *
          10,
      ) / 10,
    pctAutoservicio: Math.round(
      (periodo.filter((p) => p.autoservicio).length / periodo.length) * 100,
    ),
    precisionBuscador:
      asistidos.length === 0
        ? 0
        : Math.round((acertados.length / asistidos.length) * 100),
    escalamientos: periodo.filter((p) => p.escalado).length,
    lineasPorPedido:
      Math.round(
        (periodo.reduce((t, p) => t + p.lineas.length, 0) / periodo.length) * 10,
      ) / 10,
  };
}

/** Variación porcentual contra el periodo inmediatamente anterior. */
export function variacion(
  pedidos: Pedido[],
  dias: number,
  ahora: Date,
  metrica: (r: Resumen) => number,
): number {
  const actual = resumen(pedidos, dias, ahora);
  const anteriorInicio = new Date(ahora.getTime() - dias * 86_400_000);
  const previos = pedidos.filter(
    (p) =>
      new Date(p.creado) <= anteriorInicio &&
      new Date(p.creado) > new Date(ahora.getTime() - 2 * dias * 86_400_000),
  );
  const anterior = resumen(previos, dias * 2, anteriorInicio);
  const base = metrica(anterior);
  if (base === 0) return 0;
  return Math.round(((metrica(actual) - base) / base) * 100);
}

export interface PuntoSerie {
  etiqueta: string;
  pedidos: number;
  ingresos: number;
}

export function serieDiaria(
  pedidos: Pedido[],
  dias: number,
  ahora: Date,
): PuntoSerie[] {
  const serie: PuntoSerie[] = [];
  for (let i = dias - 1; i >= 0; i--) {
    const dia = new Date(ahora.getTime() - i * 86_400_000);
    const delDia = pedidos.filter((p) => {
      const f = new Date(p.creado);
      return (
        f.getDate() === dia.getDate() &&
        f.getMonth() === dia.getMonth() &&
        f.getFullYear() === dia.getFullYear()
      );
    });
    serie.push({
      etiqueta: dia.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
      }),
      pedidos: delDia.length,
      ingresos: delDia.reduce((t, p) => t + totalPedido(p), 0),
    });
  }
  return serie;
}

export function porCategoria(
  pedidos: Pedido[],
): { categoria: Categoria; unidades: number; ingresos: number }[] {
  const mapa = new Map<Categoria, { unidades: number; ingresos: number }>();
  for (const pedido of pedidos) {
    for (const linea of pedido.lineas) {
      const pieza = piezaPorId(linea.piezaId);
      if (!pieza) continue;
      const actual = mapa.get(pieza.categoria) ?? { unidades: 0, ingresos: 0 };
      actual.unidades += linea.cantidad;
      actual.ingresos += linea.cantidad * linea.precioUnitario;
      mapa.set(pieza.categoria, actual);
    }
  }
  return [...mapa.entries()]
    .map(([categoria, v]) => ({ categoria, ...v }))
    .sort((a, b) => b.ingresos - a.ingresos);
}

export function porCanal(
  pedidos: Pedido[],
): { canal: CanalBusqueda; cantidad: number; porcentaje: number }[] {
  const mapa = new Map<CanalBusqueda, number>();
  for (const p of pedidos) mapa.set(p.canal, (mapa.get(p.canal) ?? 0) + 1);
  const total = pedidos.length || 1;
  return [...mapa.entries()]
    .map(([canal, cantidad]) => ({
      canal,
      cantidad,
      porcentaje: Math.round((cantidad / total) * 100),
    }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

export interface FilaAsesor {
  asesor: string;
  casos: number;
  tiempoMedioMin: number;
  precision: number;
  ingresos: number;
}

/** Ranking de desempeño, la gamificación prevista en la Fase 1 del blueprint. */
export function rankingAsesores(pedidos: Pedido[]): FilaAsesor[] {
  const mapa = new Map<
    string,
    { casos: number; minutos: number; aciertos: number; asistidos: number; ingresos: number }
  >();

  for (const p of pedidos) {
    if (p.asesor === "—") continue;
    const actual =
      mapa.get(p.asesor) ??
      { casos: 0, minutos: 0, aciertos: 0, asistidos: 0, ingresos: 0 };
    actual.casos += 1;
    actual.minutos += p.tiempoRespuestaMin;
    actual.ingresos += totalPedido(p);
    if (p.confianza > 0) {
      actual.asistidos += 1;
      if (!p.corregido) actual.aciertos += 1;
    }
    mapa.set(p.asesor, actual);
  }

  return [...mapa.entries()]
    .map(([asesor, v]) => ({
      asesor,
      casos: v.casos,
      tiempoMedioMin: Math.round((v.minutos / v.casos) * 10) / 10,
      precision:
        v.asistidos === 0 ? 0 : Math.round((v.aciertos / v.asistidos) * 100),
      ingresos: v.ingresos,
    }))
    .sort((a, b) => b.casos - a.casos);
}
