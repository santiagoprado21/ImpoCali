"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CLAVE_SESION = "autofix.sesion";

export type Rol =
  | "Administrador"
  | "Coordinadora de servicio"
  | "Asesor comercial"
  | "Analista de datos";

export interface Usuario {
  correo: string;
  clave: string;
  nombre: string;
  rol: Rol;
  area: string;
  iniciales: string;
}

/** Usuarios de demostración. En producción esto lo resuelve el directorio de Impocali. */
export const USUARIOS: Usuario[] = [
  {
    correo: "andres.gil@impocali.com",
    clave: "impocali2026",
    nombre: "Andrés Gil",
    rol: "Administrador",
    area: "Gerencia comercial",
    iniciales: "AG",
  },
  {
    correo: "erika.vargas@impocali.com",
    clave: "impocali2026",
    nombre: "Erika Vargas",
    rol: "Coordinadora de servicio",
    area: "Servicio al cliente",
    iniciales: "EV",
  },
  {
    correo: "camilo.restrepo@impocali.com",
    clave: "impocali2026",
    nombre: "Camilo Restrepo",
    rol: "Asesor comercial",
    area: "Mostrador Yumbo",
    iniciales: "CR",
  },
  {
    correo: "daniela.ossa@impocali.com",
    clave: "impocali2026",
    nombre: "Daniela Ossa",
    rol: "Analista de datos",
    area: "Inteligencia de negocio",
    iniciales: "DO",
  },
];

type UsuarioSesion = Omit<Usuario, "clave">;

interface Sesion {
  montado: boolean;
  usuario: UsuarioSesion | null;
  ingresar: (correo: string, clave: string) => { ok: boolean; error?: string };
  salir: () => void;
}

const Contexto = createContext<Sesion | null>(null);

export function ProveedorSesion({ children }: { children: React.ReactNode }) {
  const [montado, setMontado] = useState(false);
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(CLAVE_SESION);
      if (guardado) setUsuario(JSON.parse(guardado));
    } catch {
      // Si el almacenamiento falla, simplemente se pide ingresar de nuevo.
    }
    setMontado(true);
  }, []);

  const ingresar = useCallback((correo: string, clave: string) => {
    const encontrado = USUARIOS.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase(),
    );
    if (!encontrado) {
      return { ok: false, error: "No existe una cuenta con ese correo." };
    }
    if (encontrado.clave !== clave) {
      return { ok: false, error: "La contraseña no es correcta." };
    }
    const sinClave: UsuarioSesion = {
      correo: encontrado.correo,
      nombre: encontrado.nombre,
      rol: encontrado.rol,
      area: encontrado.area,
      iniciales: encontrado.iniciales,
    };
    setUsuario(sinClave);
    window.localStorage.setItem(CLAVE_SESION, JSON.stringify(sinClave));
    return { ok: true };
  }, []);

  const salir = useCallback(() => {
    setUsuario(null);
    window.localStorage.removeItem(CLAVE_SESION);
  }, []);

  const valor = useMemo<Sesion>(
    () => ({ montado, usuario, ingresar, salir }),
    [montado, usuario, ingresar, salir],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useSesion(): Sesion {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useSesion debe usarse dentro de ProveedorSesion");
  return ctx;
}
