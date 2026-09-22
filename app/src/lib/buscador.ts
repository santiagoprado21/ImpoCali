import { CATALOGO } from "./catalogo";
import type { Candidato, Pieza } from "./types";

const IRRELEVANTES = new Set([
  "de","del","la","el","los","las","un","una","para","por","con","y","o","mi",
  "necesito","quiero","busco","tiene","tienen","hay","es","en","al","que","me",
  "sirve","toca","pieza","repuesto","carro","moto","vehiculo",
]);

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(texto: string): string[] {
  return normalizar(texto)
    .split(" ")
    .filter((t) => t.length > 1 && !IRRELEVANTES.has(t));
}

/** Texto plano sobre el que se compara la consulta, equivalente al índice del catálogo unificado. */
function indice(pieza: Pieza): string {
  const aplicaciones = pieza.aplicaciones
    .map((a) => `${a.marca} ${a.linea} ${a.motor} ${a.desde} ${a.hasta} ${a.posicion ?? ""}`)
    .join(" ");
  return normalizar(
    [
      pieza.nombre,
      pieza.categoria,
      pieza.marca,
      pieza.referencia,
      pieza.sinonimos.join(" "),
      aplicaciones,
      Object.values(pieza.atributos).join(" "),
      pieza.equivalencias.map((e) => `${e.marca} ${e.referencia}`).join(" "),
    ].join(" "),
  );
}

/** Detecta un año de modelo en la consulta para validar el rango de aplicación ACES. */
function anioEnConsulta(consulta: string): number | null {
  const match = normalizar(consulta).match(/\b(19[89]\d|20[0-2]\d)\b/);
  return match ? Number(match[1]) : null;
}

/**
 * Búsqueda por descripción libre. Puntúa coincidencias de términos y de
 * aplicación vehicular para devolver un nivel de confianza explicable.
 */
export function buscarPorDescripcion(consulta: string): Candidato[] {
  const terminos = tokens(consulta);
  if (terminos.length === 0) return [];
  const anio = anioEnConsulta(consulta);

  const candidatos = CATALOGO.map((pieza) => {
    const texto = indice(pieza);
    const aciertos = terminos.filter((t) => texto.includes(t));
    if (aciertos.length === 0) return null;

    let puntaje = (aciertos.length / terminos.length) * 78;
    const razones: string[] = [];

    if (aciertos.length === terminos.length) {
      razones.push("todos los términos de la solicitud coinciden");
    } else {
      razones.push(`coinciden ${aciertos.length} de ${terminos.length} términos`);
    }

    const marcaCoincide = pieza.aplicaciones.find((a) =>
      terminos.includes(normalizar(a.marca)),
    );
    const lineaCoincide = pieza.aplicaciones.find((a) =>
      tokens(a.linea).some((t) => terminos.includes(t)),
    );
    if (marcaCoincide) {
      puntaje += 8;
      razones.push(`la marca ${marcaCoincide.marca} está en el catálogo de aplicaciones`);
    }
    if (lineaCoincide) {
      puntaje += 8;
      razones.push(
        `aplica al ${lineaCoincide.marca} ${lineaCoincide.linea} ${lineaCoincide.desde}–${lineaCoincide.hasta}`,
      );
    }

    if (anio !== null) {
      const enRango = pieza.aplicaciones.some((a) => anio >= a.desde && anio <= a.hasta);
      if (enRango) {
        puntaje += 6;
        razones.push(`el modelo ${anio} está dentro del rango de aplicación`);
      } else {
        puntaje -= 22;
        razones.push(`el modelo ${anio} queda fuera del rango de aplicación`);
      }
    }

    if (terminos.some((t) => normalizar(pieza.categoria).includes(t))) {
      puntaje += 4;
    }

    return {
      pieza,
      confianza: Math.max(12, Math.min(97, Math.round(puntaje))),
      razon: razones.join("; "),
    } satisfies Candidato;
  }).filter((c): c is Candidato => c !== null);

  return candidatos.sort((a, b) => b.confianza - a.confianza).slice(0, 6);
}

/** Búsqueda por código propio, de proveedor o equivalencia, aceptando fragmentos. */
export function buscarPorCodigo(codigo: string): Candidato[] {
  const limpio = normalizar(codigo).replace(/[\s-]/g, "");
  if (limpio.length < 3) return [];

  const candidatos = CATALOGO.flatMap((pieza) => {
    const propia = normalizar(pieza.referencia).replace(/[\s-]/g, "");
    if (propia === limpio) {
      return [{ pieza, confianza: 99, razon: "coincidencia exacta con la referencia Impocali" }];
    }
    if (propia.includes(limpio)) {
      const cobertura = limpio.length / propia.length;
      return [
        {
          pieza,
          confianza: Math.round(62 + cobertura * 32),
          razon: `el fragmento "${codigo.trim()}" está contenido en la referencia ${pieza.referencia}`,
        },
      ];
    }
    const equivalencia = pieza.equivalencias.find((e) =>
      normalizar(e.referencia).replace(/[\s-]/g, "").includes(limpio),
    );
    if (equivalencia) {
      return [
        {
          pieza,
          confianza: equivalencia.certificada ? 92 : 68,
          razon: equivalencia.certificada
            ? `equivalencia certificada con ${equivalencia.marca} ${equivalencia.referencia}`
            : `equivalencia sugerida con ${equivalencia.marca} ${equivalencia.referencia}, sin certificar`,
        },
      ];
    }
    return [];
  });

  return candidatos.sort((a, b) => b.confianza - a.confianza).slice(0, 6);
}

/**
 * Reconocimiento por imagen. En el mockup el resultado es fijo: simula el
 * motor de visión devolviendo la categoría detectada y sus candidatos.
 */
export function buscarPorImagen(): { deteccion: string; candidatos: Candidato[] } {
  const ids = ["brk-001", "brk-002", "sus-001"];
  const candidatos = ids
    .map((id, i) => {
      const pieza = CATALOGO.find((p) => p.id === id)!;
      return {
        pieza,
        confianza: [88, 64, 37][i],
        razon: [
          "la geometría y el material coinciden con esta referencia",
          "forma compatible pero medidas distintas; confirmar con el cliente",
          "misma familia de producto, aplicación diferente",
        ][i],
      } satisfies Candidato;
    });
  return { deteccion: "Componente de frenos · pastilla delantera", candidatos };
}

export function nivelConfianza(valor: number): "alta" | "media" | "baja" {
  if (valor >= 80) return "alta";
  if (valor >= 55) return "media";
  return "baja";
}
