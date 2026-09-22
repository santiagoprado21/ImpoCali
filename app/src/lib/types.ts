/** Segmentos del catálogo, con los mismos nombres que usa Impocali hoy. */
export type Categoria =
  | "Motor"
  | "Filtración"
  | "Lubricantes"
  | "Químicos y aditivos"
  | "Rodamientos"
  | "Frenos"
  | "Embragues"
  | "Suspensión y dirección"
  | "Sistema de transmisión"
  | "Partes eléctricas"
  | "Cables de acero"
  | "Refrigeración"
  | "Iluminación"
  | "Accesorios";

export const SEGMENTOS: Categoria[] = [
  "Motor",
  "Filtración",
  "Lubricantes",
  "Químicos y aditivos",
  "Rodamientos",
  "Frenos",
  "Embragues",
  "Suspensión y dirección",
  "Sistema de transmisión",
  "Partes eléctricas",
  "Cables de acero",
  "Refrigeración",
  "Iluminación",
  "Accesorios",
];

export type TipoVehiculo = "Motos" | "Autos" | "Carga y pasajeros";

export type Bodega = "Yumbo" | "Cali" | "Bogotá" | "Medellín" | "Barranquilla";

export interface Existencia {
  bodega: Bodega;
  unidades: number;
  entrega: string;
}

/** Aplicación vehicular en el formato que define el estándar ACES. */
export interface Aplicacion {
  marca: string;
  linea: string;
  desde: number;
  hasta: number;
  motor: string;
  posicion?: string;
}

export interface Pieza {
  id: string;
  /** Referencia propia del proveedor. */
  referencia: string;
  nombre: string;
  categoria: Categoria;
  marca: string;
  /** Atributos descriptivos, equivalentes a los segmentos de PIES. */
  atributos: Record<string, string>;
  equivalencias: { marca: string; referencia: string; certificada: boolean }[];
  aplicaciones: Aplicacion[];
  /** Divisiones donde la pieza sirve para cualquier vehículo (aceites, químicos, bombillos). */
  universal?: TipoVehiculo[];
  precioLista: number;
  precioSocio: number;
  unidadEmpaque: number;
  existencias: Existencia[];
  /** Términos con los que un asesor o un taller suele pedir la pieza. */
  sinonimos: string[];
}

export interface Candidato {
  pieza: Pieza;
  confianza: number;
  razon: string;
}

export interface LineaPedido {
  piezaId: string;
  cantidad: number;
  /** Precio unitario congelado al momento de agregar la línea. */
  precioUnitario: number;
  bodega: Bodega;
}

/** Cómo se identificó la pieza, para medir el aporte del buscador. */
export type CanalBusqueda = "descripcion" | "codigo" | "imagen" | "manual";

export interface Pedido {
  numero: string;
  cliente: string;
  ciudad: string;
  asesor: string;
  /** Fecha ISO de creación. */
  creado: string;
  lineas: LineaPedido[];
  estado: EstadoPedido;
  canal: CanalBusqueda;
  /** Verdadero cuando el taller resolvió solo, sin intervención de un asesor. */
  autoservicio: boolean;
  /** Minutos entre la solicitud y la confirmación de la referencia. */
  tiempoRespuestaMin: number;
  /** Confianza que reportó el buscador para la referencia principal. */
  confianza: number;
  /** El cliente tuvo que corregir la referencia sugerida. */
  corregido: boolean;
  escalado: boolean;
}

export type EstadoPedido =
  | "confirmado"
  | "alistamiento"
  | "despacho"
  | "ruta"
  | "entregado";

export interface HitoPedido {
  estado: EstadoPedido;
  titulo: string;
  detalle: string;
  ubicacion: string;
  /** Minutos transcurridos desde la confirmación del pedido. */
  offsetMin: number;
}
