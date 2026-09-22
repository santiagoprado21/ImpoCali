"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { piezaPorId } from "./catalogo";
import { generarHistorial } from "./semilla";
import type {
  Bodega,
  CanalBusqueda,
  EstadoPedido,
  LineaPedido,
  Pedido,
} from "./types";

const CLAVE_CARRITO = "autofix.carrito";
const CLAVE_PEDIDOS = "autofix.pedidos";

export const IVA = 0.19;

export const CLIENTE_ACTUAL = {
  nombre: "Taller Mecánico Andrade",
  ciudad: "Cali",
  iniciales: "TM",
};

interface Tienda {
  /** Falso durante el primer render, antes de leer localStorage. */
  montado: boolean;
  carrito: LineaPedido[];
  pedidos: Pedido[];
  unidadesEnCarrito: number;
  totalCarrito: number;
  agregar: (linea: LineaPedido) => void;
  /** Suma o resta unidades sobre el valor vigente, sin perder clics seguidos. */
  ajustarCantidad: (piezaId: string, delta: number) => void;
  quitar: (piezaId: string) => void;
  /** Avanza el estado de un pedido propio a medida que corre la trazabilidad. */
  avanzarEstado: (numero: string, estado: EstadoPedido) => void;
  vaciar: () => void;
  /** Sin líneas explícitas toma el carrito; con ellas genera un pedido directo. */
  crearPedido: (canal: CanalBusqueda, lineas?: LineaPedido[]) => string;
  pedidoPorNumero: (numero: string) => Pedido | undefined;
}

const Contexto = createContext<Tienda | null>(null);

export function ProveedorTienda({ children }: { children: React.ReactNode }) {
  const [montado, setMontado] = useState(false);
  const [carrito, setCarrito] = useState<LineaPedido[]>([]);
  const [propios, setPropios] = useState<Pedido[]>([]);
  const [historial, setHistorial] = useState<Pedido[]>([]);

  // El historial y lo guardado se cargan tras montar para no romper la hidratación.
  useEffect(() => {
    setHistorial(generarHistorial(new Date()));
    try {
      const c = window.localStorage.getItem(CLAVE_CARRITO);
      if (c) setCarrito(JSON.parse(c));
      const p = window.localStorage.getItem(CLAVE_PEDIDOS);
      if (p) setPropios(JSON.parse(p));
    } catch {
      // Un almacenamiento no disponible no debe tumbar la demo.
    }
    setMontado(true);
  }, []);

  useEffect(() => {
    if (!montado) return;
    window.localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito, montado]);

  useEffect(() => {
    if (!montado) return;
    window.localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(propios));
  }, [propios, montado]);

  const agregar = useCallback((linea: LineaPedido) => {
    setCarrito((actual) => {
      const existente = actual.find((l) => l.piezaId === linea.piezaId);
      if (!existente) return [...actual, linea];
      return actual.map((l) =>
        l.piezaId === linea.piezaId
          ? { ...l, cantidad: l.cantidad + linea.cantidad, bodega: linea.bodega }
          : l,
      );
    });
  }, []);

  const ajustarCantidad = useCallback((piezaId: string, delta: number) => {
    setCarrito((actual) =>
      actual.map((l) =>
        l.piezaId === piezaId
          ? { ...l, cantidad: Math.max(1, l.cantidad + delta) }
          : l,
      ),
    );
  }, []);

  const avanzarEstado = useCallback((numero: string, estado: EstadoPedido) => {
    setPropios((actual) =>
      actual.map((p) => (p.numero === numero ? { ...p, estado } : p)),
    );
  }, []);

  const quitar = useCallback((piezaId: string) => {
    setCarrito((actual) => actual.filter((l) => l.piezaId !== piezaId));
  }, []);

  const vaciar = useCallback(() => setCarrito([]), []);

  const crearPedido = useCallback(
    (canal: CanalBusqueda, lineas?: LineaPedido[]) => {
      const contenido = lineas ?? carrito;
      const numero = `AF-${11000 + propios.length + 1}`;
      const nuevo: Pedido = {
        numero,
        cliente: CLIENTE_ACTUAL.nombre,
        ciudad: CLIENTE_ACTUAL.ciudad,
        asesor: "—",
        creado: new Date().toISOString(),
        lineas: contenido,
        estado: "confirmado",
        canal,
        autoservicio: true,
        tiempoRespuestaMin: 2,
        confianza: 92,
        corregido: false,
        escalado: false,
      };
      setPropios((actual) => [nuevo, ...actual]);
      if (!lineas) setCarrito([]);
      return numero;
    },
    [carrito, propios.length],
  );

  const pedidos = useMemo(
    () => [...propios, ...historial],
    [propios, historial],
  );

  const valor = useMemo<Tienda>(() => {
    const unidades = carrito.reduce((t, l) => t + l.cantidad, 0);
    const total = carrito.reduce((t, l) => t + l.cantidad * l.precioUnitario, 0);
    return {
      montado,
      carrito,
      pedidos,
      unidadesEnCarrito: unidades,
      totalCarrito: total,
      agregar,
      ajustarCantidad,
      quitar,
      avanzarEstado,
      vaciar,
      crearPedido,
      pedidoPorNumero: (numero) => pedidos.find((p) => p.numero === numero),
    };
  }, [
    montado,
    carrito,
    pedidos,
    agregar,
    ajustarCantidad,
    quitar,
    avanzarEstado,
    vaciar,
    crearPedido,
  ]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useTienda(): Tienda {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useTienda debe usarse dentro de ProveedorTienda");
  return ctx;
}

/** Subtotal antes de IVA, que es la cifra con la que se miden los ingresos. */
export function totalPedido(pedido: Pedido): number {
  return pedido.lineas.reduce((t, l) => t + l.cantidad * l.precioUnitario, 0);
}

export function totalConIva(pedido: Pedido): number {
  return Math.round(totalPedido(pedido) * (1 + IVA));
}

export function descripcionPedido(pedido: Pedido): string {
  const nombres = pedido.lineas
    .map((l) => piezaPorId(l.piezaId)?.nombre)
    .filter(Boolean);
  if (nombres.length === 0) return "Pedido sin líneas";
  if (nombres.length === 1) return nombres[0]!;
  return `${nombres[0]} +${nombres.length - 1} más`;
}

export function bodegaPrincipal(pedido: Pedido): Bodega {
  return pedido.lineas[0]?.bodega ?? "Yumbo";
}
