// Utilidad de apoyo: imprime el padrón de marcas y modelos que cubre el catálogo,
// con el número de referencias por modelo. Sirve para preparar la demo.
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/lib/catalogo.ts", import.meta.url), "utf8");
const apps = [
  ...src.matchAll(/\{ marca: "([^"]+)", linea: "([^"]+)", desde: (\d+), hasta: (\d+)/g),
];

const MOTOS = new Set(["Bajaj", "AKT", "Yamaha", "Honda", "Suzuki", "Hero", "TVS"]);
const CARGA = new Set(["Isuzu", "Hino", "JAC", "Foton"]);

const arbol = {};
for (const [, marca, linea, desde, hasta] of apps) {
  if (marca === "Universal") continue;
  let tipo = "Autos";
  if (MOTOS.has(marca)) tipo = "Motos";
  else if (CARGA.has(marca)) tipo = "Carga y pasajeros";
  arbol[tipo] ??= {};
  arbol[tipo][marca] ??= new Map();
  const previo = arbol[tipo][marca].get(linea);
  arbol[tipo][marca].set(
    linea,
    previo
      ? [Math.min(previo[0], +desde), Math.max(previo[1], +hasta), previo[2] + 1]
      : [+desde, +hasta, 1],
  );
}

for (const tipo of ["Motos", "Autos", "Carga y pasajeros"]) {
  if (!arbol[tipo]) continue;
  console.log(`\n### ${tipo}`);
  for (const marca of Object.keys(arbol[tipo]).sort()) {
    const lineas = [...arbol[tipo][marca].entries()].sort();
    const texto = lineas
      .map(([linea, [d, h, n]]) => `${linea} ${d}-${h} [${n} ref]`)
      .join(" | ");
    console.log(`  ${marca}: ${texto}`);
  }
}
