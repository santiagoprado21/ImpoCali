import type { Pieza, TipoVehiculo } from "./types";

/**
 * Catálogo de demostración. Reproduce la estructura que tendría el catálogo
 * unificado una vez los proveedores migren a ACES/PIES (Fase 1 del proyecto).
 */
export const CATALOGO: Pieza[] = [
  {
    id: "brk-001",
    referencia: "IMP-BP-4412",
    nombre: "Pastillas de freno delanteras",
    categoria: "Frenos",
    marca: "Ferodo",
    atributos: {
      Material: "Cerámico semi-metálico",
      Ancho: "131,8 mm",
      Alto: "45,2 mm",
      Espesor: "17,5 mm",
      Piezas: "4 por juego",
      Sensor: "Sin sensor de desgaste",
    },
    equivalencias: [
      { marca: "TRW", referencia: "GDB4412", certificada: true },
      { marca: "Bosch", referencia: "0986AB1234", certificada: true },
      { marca: "Brembo", referencia: "P59041", certificada: false },
    ],
    aplicaciones: [
      { marca: "Chevrolet", linea: "Spark GT", desde: 2011, hasta: 2018, motor: "1.2L B12D1", posicion: "Delantera" },
      { marca: "Chevrolet", linea: "Beat", desde: 2018, hasta: 2023, motor: "1.2L LMU", posicion: "Delantera" },
      { marca: "Chevrolet", linea: "Sail", desde: 2013, hasta: 2019, motor: "1.4L L2B", posicion: "Delantera" },
      { marca: "Chevrolet", linea: "Onix", desde: 2020, hasta: 2024, motor: "1.0L Turbo", posicion: "Delantera" },
    ],
    precioLista: 112000,
    precioSocio: 84500,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 148, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 62, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 31, entrega: "24 horas" },
    ],
    sinonimos: ["pastillas", "balatas", "bandas de freno", "freno delantero", "spark gt"],
  },
  {
    id: "brk-002",
    referencia: "IMP-DF-3390",
    nombre: "Disco de freno delantero ventilado",
    categoria: "Frenos",
    marca: "Brembo",
    atributos: {
      Diámetro: "256 mm",
      Espesor: "24 mm",
      Tipo: "Ventilado",
      Perforaciones: "4 x 100 mm",
      Altura: "41,5 mm",
    },
    equivalencias: [
      { marca: "TRW", referencia: "DF4123", certificada: true },
      { marca: "Bosch", referencia: "0986479R12", certificada: true },
    ],
    aplicaciones: [
      { marca: "Renault", linea: "Logan", desde: 2014, hasta: 2018, motor: "1.6L K4M", posicion: "Delantera" },
      { marca: "Renault", linea: "Sandero", desde: 2015, hasta: 2019, motor: "1.6L K4M", posicion: "Delantera" },
      { marca: "Renault", linea: "Stepway", desde: 2016, hasta: 2022, motor: "1.6L K4M", posicion: "Delantera" },
      { marca: "Renault", linea: "Duster", desde: 2016, hasta: 2021, motor: "1.6L H4M", posicion: "Delantera" },
      { marca: "Renault", linea: "Symbol", desde: 2014, hasta: 2019, motor: "1.6L K4M", posicion: "Delantera" },
    ],
    precioLista: 198000,
    precioSocio: 154000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 44, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 18, entrega: "24 horas" },
    ],
    sinonimos: ["disco", "rotor", "disco ventilado", "logan", "sandero"],
  },
  {
    id: "sus-001",
    referencia: "IMP-AM-7712",
    nombre: "Amortiguador delantero a gas",
    categoria: "Suspensión y dirección",
    marca: "Monroe",
    atributos: {
      Tipo: "Bitubo a gas",
      Longitud: "512 mm extendido",
      Montaje: "Superior espiga / inferior horquilla",
      Carrera: "168 mm",
    },
    equivalencias: [
      { marca: "Gabriel", referencia: "G54231", certificada: true },
      { marca: "Sachs", referencia: "314872", certificada: true },
    ],
    aplicaciones: [
      { marca: "Mazda", linea: "Mazda 3", desde: 2014, hasta: 2019, motor: "2.0L Skyactiv", posicion: "Delantera izq/der" },
      { marca: "Mazda", linea: "Mazda 2", desde: 2015, hasta: 2022, motor: "1.5L Skyactiv", posicion: "Delantera izq/der" },
      { marca: "Mazda", linea: "CX-3", desde: 2016, hasta: 2020, motor: "2.0L Skyactiv", posicion: "Delantera izq/der" },
      { marca: "Mazda", linea: "CX-30", desde: 2020, hasta: 2024, motor: "2.0L Skyactiv-G", posicion: "Delantera izq/der" },
    ],
    precioLista: 342000,
    precioSocio: 268000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 27, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 12, entrega: "24 horas" },
    ],
    sinonimos: ["amortiguador", "amortiguadores", "suspensión delantera", "mazda 3"],
  },
  {
    id: "sus-002",
    referencia: "IMP-TR-2208",
    nombre: "Terminal de dirección exterior",
    categoria: "Suspensión y dirección",
    marca: "TRW",
    atributos: {
      Rosca: "M14 x 1,5 derecha",
      Cono: "16,3 mm",
      Longitud: "128 mm",
      Lado: "Ambos",
    },
    equivalencias: [
      { marca: "Moog", referencia: "ES800612", certificada: true },
      { marca: "Febi", referencia: "42151", certificada: false },
    ],
    aplicaciones: [
      { marca: "Toyota", linea: "Hilux", desde: 2012, hasta: 2020, motor: "2.4L 2GD-FTV" },
      { marca: "Toyota", linea: "Fortuner", desde: 2016, hasta: 2021, motor: "2.7L 2TR-FE" },
      { marca: "Toyota", linea: "Prado", desde: 2013, hasta: 2020, motor: "3.0L 1KD-FTV" },
      { marca: "Isuzu", linea: "NPR", desde: 2015, hasta: 2023, motor: "4HK1 5.2L" },
      { marca: "Hino", linea: "Serie 300", desde: 2016, hasta: 2022, motor: "N04C 4.0L" },
    ],
    precioLista: 96000,
    precioSocio: 71500,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 85, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 40, entrega: "Mismo día" },
      { bodega: "Barranquilla", unidades: 9, entrega: "48 horas" },
    ],
    sinonimos: ["terminal", "rótula de dirección", "terminales", "hilux"],
  },
  {
    id: "sus-003",
    referencia: "IMP-RD-5540",
    nombre: "Rodamiento de rueda delantera",
    categoria: "Rodamientos",
    marca: "SKF",
    atributos: {
      "Diámetro interior": "38 mm",
      "Diámetro exterior": "72 mm",
      Ancho: "37 mm",
      Kit: "Incluye tuerca y anillo",
    },
    equivalencias: [
      { marca: "NTN", referencia: "AU0514", certificada: true },
      { marca: "Timken", referencia: "510072", certificada: true },
    ],
    aplicaciones: [
      { marca: "Kia", linea: "Picanto", desde: 2012, hasta: 2021, motor: "1.2L Kappa" },
      { marca: "Kia", linea: "Rio", desde: 2012, hasta: 2020, motor: "1.4L Gamma" },
      { marca: "Hyundai", linea: "i10", desde: 2014, hasta: 2020, motor: "1.2L Kappa" },
      { marca: "Hyundai", linea: "Accent", desde: 2012, hasta: 2021, motor: "1.4L Gamma" },
    ],
    precioLista: 148000,
    precioSocio: 112000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 53, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 21, entrega: "24 horas" },
    ],
    sinonimos: ["rodamiento", "balinera", "ruliman", "picanto"],
  },
  {
    id: "fil-001",
    referencia: "IMP-FA-1120",
    nombre: "Filtro de aceite roscado",
    categoria: "Filtración",
    marca: "Mann-Filter",
    atributos: {
      Rosca: "3/4-16 UNF",
      Altura: "85 mm",
      "Diámetro exterior": "76 mm",
      "Válvula antirretorno": "Sí",
    },
    equivalencias: [
      { marca: "Fram", referencia: "PH6607", certificada: true },
      { marca: "Wix", referencia: "51334", certificada: true },
      { marca: "Bosch", referencia: "0451103318", certificada: true },
    ],
    aplicaciones: [
      { marca: "Chevrolet", linea: "Spark GT", desde: 2011, hasta: 2015, motor: "1.2L B12D1" },
      { marca: "Chevrolet", linea: "Beat", desde: 2018, hasta: 2023, motor: "1.2L LMU" },
      { marca: "Chevrolet", linea: "Sail", desde: 2013, hasta: 2019, motor: "1.4L L2B" },
      { marca: "Chevrolet", linea: "N300", desde: 2013, hasta: 2023, motor: "1.2L B12D1" },
      { marca: "Nissan", linea: "March", desde: 2013, hasta: 2020, motor: "1.6L HR16DE" },
      { marca: "Nissan", linea: "Versa", desde: 2015, hasta: 2023, motor: "1.6L HR16DE" },
    ],
    precioLista: 28000,
    precioSocio: 19800,
    unidadEmpaque: 12,
    existencias: [
      { bodega: "Yumbo", unidades: 640, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 288, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 156, entrega: "24 horas" },
      { bodega: "Medellín", unidades: 96, entrega: "24 horas" },
    ],
    sinonimos: ["filtro de aceite", "filtro aceite", "purificador", "cambio de aceite"],
  },
  {
    id: "fil-002",
    referencia: "IMP-FC-4408",
    nombre: "Filtro de combustible diésel con separador de agua",
    categoria: "Filtración",
    marca: "Bosch",
    atributos: {
      Tipo: "En línea con vaso decantador",
      Micraje: "10 micras",
      Altura: "142 mm",
      Conexión: "M16 x 1,5",
    },
    equivalencias: [
      { marca: "Mann-Filter", referencia: "WK8158", certificada: true },
      { marca: "Donaldson", referencia: "P551422", certificada: false },
    ],
    aplicaciones: [
      { marca: "Isuzu", linea: "NPR", desde: 2015, hasta: 2023, motor: "4HK1 5.2L" },
      { marca: "Isuzu", linea: "NQR", desde: 2016, hasta: 2023, motor: "4HK1 5.2L" },
      { marca: "Hino", linea: "Serie 300", desde: 2016, hasta: 2022, motor: "N04C 4.0L" },
      { marca: "JAC", linea: "1035", desde: 2017, hasta: 2023, motor: "HFC4DA1 2.8L" },
      { marca: "Foton", linea: "Aumark 1049", desde: 2016, hasta: 2023, motor: "ISF 2.8L" },
    ],
    precioLista: 86000,
    precioSocio: 64000,
    unidadEmpaque: 6,
    existencias: [
      { bodega: "Yumbo", unidades: 210, entrega: "Mismo día" },
      { bodega: "Barranquilla", unidades: 48, entrega: "48 horas" },
    ],
    sinonimos: ["filtro de combustible", "filtro diésel", "trampa de agua", "npr"],
  },
  {
    id: "fil-003",
    referencia: "IMP-FAI-9902",
    nombre: "Filtro de aire panel",
    categoria: "Filtración",
    marca: "Wix",
    atributos: {
      Tipo: "Panel rectangular",
      Largo: "246 mm",
      Ancho: "190 mm",
      Alto: "41 mm",
      Medio: "Celulosa plisada",
    },
    equivalencias: [
      { marca: "Fram", referencia: "CA10467", certificada: true },
      { marca: "Mann-Filter", referencia: "C24013", certificada: true },
    ],
    aplicaciones: [
      { marca: "Renault", linea: "Logan", desde: 2014, hasta: 2022, motor: "1.6L K4M" },
      { marca: "Renault", linea: "Sandero", desde: 2015, hasta: 2022, motor: "1.6L K4M" },
      { marca: "Renault", linea: "Stepway", desde: 2016, hasta: 2022, motor: "1.6L K4M" },
      { marca: "Renault", linea: "Duster", desde: 2016, hasta: 2021, motor: "1.6L H4M" },
      { marca: "Renault", linea: "Kwid", desde: 2018, hasta: 2024, motor: "1.0L SCe" },
    ],
    precioLista: 42000,
    precioSocio: 31500,
    unidadEmpaque: 10,
    existencias: [
      { bodega: "Yumbo", unidades: 320, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 140, entrega: "Mismo día" },
    ],
    sinonimos: ["filtro de aire", "filtro aire", "panel de aire"],
  },
  {
    id: "emb-001",
    referencia: "IMP-KE-6601",
    nombre: "Kit de embrague completo",
    categoria: "Embragues",
    marca: "LUK",
    atributos: {
      Diámetro: "200 mm",
      Estrías: "20 dientes",
      Contenido: "Disco, prensa y balinera",
      Accionamiento: "Hidráulico",
    },
    equivalencias: [
      { marca: "Sachs", referencia: "3000951001", certificada: true },
      { marca: "Valeo", referencia: "826704", certificada: true },
    ],
    aplicaciones: [
      { marca: "Chevrolet", linea: "Aveo", desde: 2008, hasta: 2018, motor: "1.6L F16D3" },
      { marca: "Chevrolet", linea: "Optra", desde: 2006, hasta: 2015, motor: "1.6L F16D3" },
      { marca: "Chevrolet", linea: "Sail", desde: 2013, hasta: 2019, motor: "1.4L L2B" },
    ],
    precioLista: 685000,
    precioSocio: 528000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 16, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 7, entrega: "24 horas" },
    ],
    sinonimos: ["kit de clutch", "embrague", "croche", "clutch", "aveo"],
  },
  {
    id: "emb-002",
    referencia: "IMP-DC-3310",
    nombre: "Disco de embrague de moto (juego de fricciones)",
    categoria: "Embragues",
    marca: "Newfren",
    atributos: {
      Piezas: "4 fricciones",
      "Diámetro exterior": "108 mm",
      Espesor: "2,9 mm",
      Dientes: "16",
    },
    equivalencias: [
      { marca: "Barnett", referencia: "301-35-10016", certificada: false },
      { marca: "Original", referencia: "22201-KRM-840", certificada: true },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2023, motor: "100cc 4T" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "Yamaha", linea: "YBR 125", desde: 2013, hasta: 2023, motor: "125cc" },
      { marca: "Honda", linea: "CB 110", desde: 2014, hasta: 2024, motor: "110cc" },
    ],
    precioLista: 58000,
    precioSocio: 41000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 190, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 88, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 54, entrega: "24 horas" },
    ],
    sinonimos: ["fricciones", "corchos de clutch", "embrague moto", "boxer", "ct100"],
  },
  {
    id: "ref-001",
    referencia: "IMP-BA-7788",
    nombre: "Bomba de agua con polea",
    categoria: "Refrigeración",
    marca: "Gates",
    atributos: {
      Accionamiento: "Correa dentada",
      "Diámetro polea": "62 mm",
      Empaque: "Incluido",
      Material: "Aluminio fundido",
    },
    equivalencias: [
      { marca: "SKF", referencia: "VKPC81412", certificada: true },
      { marca: "Aisin", referencia: "WPT-050", certificada: true },
    ],
    aplicaciones: [
      { marca: "Toyota", linea: "Corolla", desde: 2014, hasta: 2019, motor: "1.8L 2ZR-FE" },
      { marca: "Toyota", linea: "Yaris", desde: 2018, hasta: 2023, motor: "1.5L 2NR-FE" },
      { marca: "Toyota", linea: "Rav4", desde: 2013, hasta: 2018, motor: "2.0L 3ZR-FE" },
    ],
    precioLista: 265000,
    precioSocio: 204000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 22, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 9, entrega: "Mismo día" },
    ],
    sinonimos: ["bomba de agua", "bomba de refrigerante", "water pump"],
  },
  {
    id: "ref-002",
    referencia: "IMP-TM-1145",
    nombre: "Termostato con carcasa",
    categoria: "Refrigeración",
    marca: "Wahler",
    atributos: {
      "Temperatura de apertura": "87 °C",
      Diámetro: "54 mm",
      Empaque: "Integrado",
      Sensor: "Con conector de 2 vías",
    },
    equivalencias: [
      { marca: "Gates", referencia: "TH31687G1", certificada: true },
      { marca: "Mahle", referencia: "TI2587D", certificada: false },
    ],
    aplicaciones: [
      { marca: "Volkswagen", linea: "Gol", desde: 2013, hasta: 2020, motor: "1.6L MSI" },
      { marca: "Volkswagen", linea: "Voyage", desde: 2014, hasta: 2019, motor: "1.6L MSI" },
      { marca: "Volkswagen", linea: "Polo", desde: 2018, hasta: 2023, motor: "1.6L MSI" },
    ],
    precioLista: 138000,
    precioSocio: 98000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 34, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 15, entrega: "24 horas" },
    ],
    sinonimos: ["termostato", "toma de agua", "thermostat"],
  },
  {
    id: "ilu-001",
    referencia: "IMP-FH-2255",
    nombre: "Farola halógena delantera derecha",
    categoria: "Iluminación",
    marca: "Depo",
    atributos: {
      Lado: "Derecho (copiloto)",
      Bombillo: "H4 no incluido",
      "Ajuste": "Eléctrico",
      Homologación: "ECE R112",
    },
    equivalencias: [
      { marca: "TYC", referencia: "20-12471-05", certificada: true },
      { marca: "Original", referencia: "92102-M6000", certificada: true },
    ],
    aplicaciones: [
      { marca: "Kia", linea: "Picanto", desde: 2018, hasta: 2023, motor: "1.2L", posicion: "Derecha" },
    ],
    precioLista: 392000,
    precioSocio: 298000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 11, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 4, entrega: "48 horas" },
    ],
    sinonimos: ["farola", "faro", "óptico", "luz delantera"],
  },
  {
    id: "ilu-002",
    referencia: "IMP-BL-9080",
    nombre: "Bombillo halógeno H4 12V 60/55W",
    categoria: "Iluminación",
    marca: "Osram",
    atributos: {
      Casquillo: "P43t",
      Voltaje: "12 V",
      Potencia: "60/55 W",
      "Temperatura de color": "3200 K",
      Presentación: "Blíster x 1",
    },
    equivalencias: [
      { marca: "Philips", referencia: "12342PRC1", certificada: true },
      { marca: "Bosch", referencia: "1987302041", certificada: true },
    ],
    aplicaciones: [
      { marca: "Universal", linea: "Aplicación múltiple", desde: 1995, hasta: 2024, motor: "No aplica" },
    ],
    universal: ["Autos", "Carga y pasajeros", "Motos"],
    precioLista: 24000,
    precioSocio: 15900,
    unidadEmpaque: 10,
    existencias: [
      { bodega: "Yumbo", unidades: 880, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 420, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 300, entrega: "24 horas" },
    ],
    sinonimos: ["bombillo", "bombilla", "h4", "luz"],
  },
  {
    id: "lub-001",
    referencia: "IMP-BO-6612",
    nombre: "Bomba de aceite del motor",
    categoria: "Motor",
    marca: "Mahle",
    atributos: {
      Tipo: "Engranajes internos",
      Presión: "3,5 bar a 3000 rpm",
      Accionamiento: "Cadena",
      Empaques: "Incluidos",
    },
    equivalencias: [
      { marca: "Pierburg", referencia: "70325280", certificada: true },
      { marca: "Febi", referencia: "101234", certificada: false },
    ],
    aplicaciones: [
      { marca: "Chevrolet", linea: "Spark GT", desde: 2011, hasta: 2018, motor: "1.2L B12D1" },
      { marca: "Chevrolet", linea: "Beat", desde: 2018, hasta: 2022, motor: "1.2L" },
    ],
    precioLista: 418000,
    precioSocio: 322000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 8, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 3, entrega: "24 horas" },
    ],
    sinonimos: ["bomba de aceite", "oil pump", "bomba aceite motor"],
  },
  {
    id: "mot-002",
    referencia: "IMP-KC-1001",
    nombre: "Kit de cilindro y pistón 100cc",
    categoria: "Motor",
    marca: "NPR",
    atributos: {
      Cilindraje: "100 cc",
      "Diámetro del pistón": "50 mm",
      Contenido: "Cilindro, pistón, anillos, pasador y empaques",
      Sobremedida: "Estándar",
    },
    equivalencias: [
      { marca: "Original Bajaj", referencia: "JA05010", certificada: true },
      { marca: "Tekno", referencia: "TK-CIL100", certificada: false },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2023, motor: "100cc 4T" },
    ],
    precioLista: 225000,
    precioSocio: 168000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 74, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 38, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 20, entrega: "24 horas" },
    ],
    sinonimos: ["cilindro", "kit de cilindro", "pistón", "rectificada", "boxer"],
  },
  {
    id: "trn-001",
    referencia: "IMP-KA-4420",
    nombre: "Kit de arrastre: cadena, piñón y sprocket",
    categoria: "Sistema de transmisión",
    marca: "DID",
    atributos: {
      Cadena: "428H x 118 eslabones",
      Piñón: "14 dientes",
      Sprocket: "43 dientes",
      Tratamiento: "Templado y endurecido",
    },
    equivalencias: [
      { marca: "Original Bajaj", referencia: "JB14443", certificada: true },
      { marca: "KMC", referencia: "428H-118", certificada: true },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2023, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Discover 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc" },
    ],
    precioLista: 148000,
    precioSocio: 109000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 132, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 66, entrega: "Mismo día" },
    ],
    sinonimos: ["kit de arrastre", "cadena", "piñón", "sprocket", "transmisión moto"],
  },
  {
    id: "ele-001",
    referencia: "IMP-BJ-7001",
    nombre: "Bujía de encendido para moto",
    categoria: "Partes eléctricas",
    marca: "NGK",
    atributos: {
      Código: "CR7HSA",
      Rosca: "10 mm x 12,7 mm",
      Electrodo: "Níquel",
      "Apertura": "0,7 mm",
    },
    equivalencias: [
      { marca: "Bosch", referencia: "UR4AC", certificada: true },
      { marca: "Denso", referencia: "U22FSR-U", certificada: true },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2023, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Discover 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "AKT", linea: "AK 110 S", desde: 2017, hasta: 2024, motor: "110cc" },
      { marca: "AKT", linea: "Dynamic 125", desde: 2016, hasta: 2023, motor: "125cc" },
      { marca: "Yamaha", linea: "YBR 125", desde: 2013, hasta: 2023, motor: "125cc" },
      { marca: "Yamaha", linea: "Crypton 110", desde: 2014, hasta: 2022, motor: "110cc" },
      { marca: "Honda", linea: "CB 110", desde: 2014, hasta: 2024, motor: "110cc" },
      { marca: "Honda", linea: "Wave 110", desde: 2015, hasta: 2023, motor: "110cc" },
      { marca: "Suzuki", linea: "GN 125", desde: 2012, hasta: 2022, motor: "125cc" },
      { marca: "Hero", linea: "Eco Deluxe 100", desde: 2015, hasta: 2023, motor: "100cc" },
      { marca: "TVS", linea: "Sport 100", desde: 2016, hasta: 2024, motor: "100cc" },
    ],
    precioLista: 19000,
    precioSocio: 11800,
    unidadEmpaque: 10,
    existencias: [
      { bodega: "Yumbo", unidades: 1240, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 580, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 410, entrega: "24 horas" },
    ],
    sinonimos: ["bujía", "bujia", "chispa", "encendido"],
  },
  {
    id: "ele-002",
    referencia: "IMP-BT-3312",
    nombre: "Batería sellada 12V 5Ah",
    categoria: "Partes eléctricas",
    marca: "Willard",
    atributos: {
      Voltaje: "12 V",
      Capacidad: "5 Ah",
      Tipo: "AGM sellada libre de mantenimiento",
      Medidas: "113 x 70 x 105 mm",
      Bornes: "Positivo a la derecha",
    },
    equivalencias: [
      { marca: "Yuasa", referencia: "YTX5L-BS", certificada: true },
      { marca: "MAC", referencia: "MTX5L", certificada: true },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Discover 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "AKT", linea: "Dynamic 125", desde: 2016, hasta: 2023, motor: "125cc" },
      { marca: "AKT", linea: "AK 110 S", desde: 2017, hasta: 2024, motor: "110cc" },
      { marca: "Yamaha", linea: "YBR 125", desde: 2013, hasta: 2023, motor: "125cc" },
      { marca: "Honda", linea: "CB 110", desde: 2014, hasta: 2024, motor: "110cc" },
    ],
    precioLista: 148000,
    precioSocio: 104000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 96, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 32, entrega: "24 horas" },
    ],
    sinonimos: ["batería", "bateria", "pila", "acumulador"],
  },
  {
    id: "frn-003",
    referencia: "IMP-PM-2240",
    nombre: "Pastillas de freno delanteras de moto",
    categoria: "Frenos",
    marca: "Newfren",
    atributos: {
      Material: "Sinterizado",
      Largo: "77 mm",
      Alto: "42 mm",
      Espesor: "8 mm",
      Piezas: "2 por juego",
    },
    equivalencias: [
      { marca: "Brembo", referencia: "07HO3608", certificada: true },
      { marca: "Original", referencia: "JB45120", certificada: false },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Pulsar NS 160", desde: 2017, hasta: 2024, motor: "160cc", posicion: "Delantera" },
      { marca: "Bajaj", linea: "Pulsar NS 125", desde: 2021, hasta: 2024, motor: "125cc", posicion: "Delantera" },
      { marca: "Bajaj", linea: "Discover 125", desde: 2015, hasta: 2023, motor: "125cc", posicion: "Delantera" },
      { marca: "AKT", linea: "TT 125", desde: 2016, hasta: 2023, motor: "125cc", posicion: "Delantera" },
      { marca: "Yamaha", linea: "YBR 125", desde: 2013, hasta: 2023, motor: "125cc", posicion: "Delantera" },
      { marca: "Yamaha", linea: "FZ 2.0", desde: 2015, hasta: 2023, motor: "150cc", posicion: "Delantera" },
      { marca: "Honda", linea: "CB 125F", desde: 2018, hasta: 2024, motor: "125cc", posicion: "Delantera" },
      { marca: "TVS", linea: "Apache RTR 160", desde: 2016, hasta: 2024, motor: "160cc", posicion: "Delantera" },
    ],
    precioLista: 62000,
    precioSocio: 44000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 210, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 94, entrega: "Mismo día" },
    ],
    sinonimos: ["pastillas moto", "balatas moto", "freno de disco", "pulsar"],
  },
  {
    id: "sus-004",
    referencia: "IMP-AT-8890",
    nombre: "Amortiguadores traseros (par)",
    categoria: "Suspensión y dirección",
    marca: "Gabriel",
    atributos: {
      Longitud: "340 mm entre centros",
      Resorte: "Precarga de 5 posiciones",
      Ojos: "Superior 10 mm / inferior 10 mm",
      Presentación: "Par",
    },
    equivalencias: [
      { marca: "Original Bajaj", referencia: "JC20340", certificada: true },
      { marca: "YSS", referencia: "MZ302-340", certificada: false },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2018, motor: "100cc 4T", posicion: "Trasera" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2019, motor: "100cc 4T", posicion: "Trasera" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2023, motor: "100cc 4T", posicion: "Trasera" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc", posicion: "Trasera" },
      { marca: "Hero", linea: "Eco Deluxe 100", desde: 2015, hasta: 2023, motor: "100cc", posicion: "Trasera" },
    ],
    precioLista: 168000,
    precioSocio: 122000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 58, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 24, entrega: "Mismo día" },
    ],
    sinonimos: ["amortiguadores traseros", "suspensión trasera", "mono", "par de amortiguadores"],
  },
  {
    id: "rod-002",
    referencia: "IMP-RD-1180",
    nombre: "Kit de rodamientos de dirección",
    categoria: "Rodamientos",
    marca: "NTN",
    atributos: {
      Tipo: "Balines cónicos",
      Contenido: "2 rodamientos, 2 pistas y retenedores",
      "Diámetro interior": "26 mm",
      "Diámetro exterior": "48 mm",
    },
    equivalencias: [
      { marca: "Koyo", referencia: "STD-2648", certificada: true },
      { marca: "All Balls", referencia: "22-1004", certificada: false },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2024, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2024, motor: "100cc 4T" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "Yamaha", linea: "YBR 125", desde: 2013, hasta: 2023, motor: "125cc" },
      { marca: "Honda", linea: "CB 110", desde: 2014, hasta: 2024, motor: "110cc" },
    ],
    precioLista: 58000,
    precioSocio: 39500,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 142, entrega: "Mismo día" },
      { bodega: "Barranquilla", unidades: 30, entrega: "48 horas" },
    ],
    sinonimos: ["balineras de dirección", "rodamientos de tijera", "kit de dirección"],
  },
  {
    id: "cab-001",
    referencia: "IMP-GA-5520",
    nombre: "Guaya de acelerador",
    categoria: "Cables de acero",
    marca: "Tekno",
    atributos: {
      Longitud: "980 mm",
      Funda: "PVC con alma de acero",
      Terminales: "Bola 5 mm / barril 7 mm",
      Ajuste: "Tornillo tensor en el mando",
    },
    equivalencias: [
      { marca: "Original Bajaj", referencia: "JD98010", certificada: true },
      { marca: "Cables Colombia", referencia: "CC-ACE-980", certificada: false },
    ],
    aplicaciones: [
      { marca: "Bajaj", linea: "Boxer CT 100", desde: 2012, hasta: 2019, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Boxer BM 100", desde: 2014, hasta: 2019, motor: "100cc 4T" },
      { marca: "Bajaj", linea: "Platina 100", desde: 2013, hasta: 2018, motor: "100cc 4T" },
      { marca: "AKT", linea: "NKD 125", desde: 2015, hasta: 2023, motor: "125cc" },
      { marca: "Hero", linea: "Eco Deluxe 100", desde: 2015, hasta: 2023, motor: "100cc" },
    ],
    precioLista: 28000,
    precioSocio: 17500,
    unidadEmpaque: 5,
    existencias: [
      { bodega: "Yumbo", unidades: 385, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 160, entrega: "Mismo día" },
    ],
    sinonimos: ["guaya", "cable de acelerador", "guaya de gas", "chicote"],
  },
  {
    id: "lub-002",
    referencia: "IMP-AC-2050",
    nombre: "Aceite de motor 4T 20W-50 mineral",
    categoria: "Lubricantes",
    marca: "Terpel",
    atributos: {
      Viscosidad: "20W-50",
      Norma: "API SL / JASO MA2",
      Presentación: "Cuarto de galón (0,946 L)",
      Base: "Mineral",
    },
    equivalencias: [
      { marca: "Mobil", referencia: "Super Moto 20W50", certificada: true },
      { marca: "Castrol", referencia: "Actevo 20W50", certificada: true },
    ],
    aplicaciones: [
      { marca: "Universal", linea: "Motos 4 tiempos", desde: 2000, hasta: 2024, motor: "100cc a 250cc" },
    ],
    universal: ["Motos"],
    precioLista: 32000,
    precioSocio: 21500,
    unidadEmpaque: 12,
    existencias: [
      { bodega: "Yumbo", unidades: 960, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 480, entrega: "Mismo día" },
      { bodega: "Bogotá", unidades: 360, entrega: "24 horas" },
    ],
    sinonimos: ["aceite", "aceite de moto", "20w50", "cambio de aceite", "lubricante"],
  },
  {
    id: "qui-001",
    referencia: "IMP-LC-9040",
    nombre: "Limpiador de carburador en aerosol",
    categoria: "Químicos y aditivos",
    marca: "Wurth",
    atributos: {
      Contenido: "400 ml",
      Uso: "Carburadores y cuerpos de aceleración",
      Aplicador: "Cánula direccional",
      Secado: "Rápido, sin residuo",
    },
    equivalencias: [
      { marca: "STP", referencia: "ST-CARB400", certificada: false },
      { marca: "Bardahl", referencia: "BD-CC400", certificada: true },
    ],
    aplicaciones: [
      { marca: "Universal", linea: "Aplicación múltiple", desde: 1995, hasta: 2024, motor: "No aplica" },
    ],
    universal: ["Motos", "Autos"],
    precioLista: 34000,
    precioSocio: 22800,
    unidadEmpaque: 12,
    existencias: [
      { bodega: "Yumbo", unidades: 540, entrega: "Mismo día" },
      { bodega: "Medellín", unidades: 180, entrega: "24 horas" },
    ],
    sinonimos: ["limpiador de carburador", "limpia carburador", "aerosol", "químico"],
  },
  {
    id: "acc-001",
    referencia: "IMP-ES-6610",
    nombre: "Espejo retrovisor universal (par)",
    categoria: "Accesorios",
    marca: "Vega",
    atributos: {
      Rosca: "10 mm derecha",
      Espejo: "Convexo antirreflejo",
      Cuerpo: "ABS negro",
      Presentación: "Par izquierdo y derecho",
    },
    equivalencias: [
      { marca: "Genérico", referencia: "ESP-U10", certificada: false },
    ],
    aplicaciones: [
      { marca: "Universal", linea: "Motos con rosca de 10 mm", desde: 2005, hasta: 2024, motor: "No aplica" },
    ],
    universal: ["Motos"],
    precioLista: 48000,
    precioSocio: 31000,
    unidadEmpaque: 1,
    existencias: [
      { bodega: "Yumbo", unidades: 220, entrega: "Mismo día" },
      { bodega: "Cali", unidades: 110, entrega: "Mismo día" },
    ],
    sinonimos: ["espejos", "retrovisor", "espejo de moto"],
  },
];

/** Cada marca pertenece a una de las tres divisiones comerciales de Impocali. */
const TIPO_POR_MARCA: Record<string, TipoVehiculo> = {
  Bajaj: "Motos",
  AKT: "Motos",
  Yamaha: "Motos",
  Honda: "Motos",
  Suzuki: "Motos",
  Hero: "Motos",
  TVS: "Motos",
  Isuzu: "Carga y pasajeros",
  Hino: "Carga y pasajeros",
  JAC: "Carga y pasajeros",
  Foton: "Carga y pasajeros",
};

export function tipoDeMarca(marca: string): TipoVehiculo {
  return TIPO_POR_MARCA[marca] ?? "Autos";
}

export interface Modelo {
  marca: string;
  linea: string;
  desde: number;
  hasta: number;
  motores: string[];
}

/** Marcas con repuestos disponibles para una división, ordenadas alfabéticamente. */
export function marcasDeTipo(tipo: TipoVehiculo): string[] {
  const marcas = new Set<string>();
  for (const pieza of CATALOGO) {
    for (const a of pieza.aplicaciones) {
      if (a.marca === "Universal") continue;
      if (tipoDeMarca(a.marca) === tipo) marcas.add(a.marca);
    }
  }
  return [...marcas].sort((a, b) => a.localeCompare(b, "es"));
}

export function modelosDeMarca(marca: string): Modelo[] {
  type Acumulado = Omit<Modelo, "motores"> & { motores: Set<string> };
  const mapa = new Map<string, Acumulado>();
  for (const pieza of CATALOGO) {
    for (const a of pieza.aplicaciones) {
      if (a.marca !== marca) continue;
      const existente = mapa.get(a.linea);
      if (existente) {
        existente.desde = Math.min(existente.desde, a.desde);
        existente.hasta = Math.max(existente.hasta, a.hasta);
        existente.motores.add(a.motor);
      } else {
        mapa.set(a.linea, {
          marca: a.marca,
          linea: a.linea,
          desde: a.desde,
          hasta: a.hasta,
          motores: new Set([a.motor]),
        });
      }
    }
  }
  return [...mapa.values()]
    .map(({ motores, ...resto }) => ({
      ...resto,
      motores: [...motores].sort((a, b) => a.localeCompare(b, "es")),
    }))
    .sort((a, b) => a.linea.localeCompare(b.linea, "es"));
}

export function modeloExacto(
  marca: string,
  linea: string,
): Modelo | undefined {
  return modelosDeMarca(marca).find((m) => m.linea === linea);
}

/** Años de modelo disponibles, del más reciente al más antiguo. */
export function aniosDeModelo(marca: string, linea: string): number[] {
  const modelo = modeloExacto(marca, linea);
  if (!modelo) return [];
  const anios: number[] = [];
  for (let a = modelo.hasta; a >= modelo.desde; a--) anios.push(a);
  return anios;
}

/**
 * Repuestos aplicables a un modelo. El año es opcional: cuando se indica,
 * se valida contra el rango de aplicación que define ACES.
 */
export function piezasDeModelo(
  marca: string,
  linea: string,
  anio?: number | null,
): Pieza[] {
  const tipo = tipoDeMarca(marca);
  return CATALOGO.filter((pieza) => {
    if (pieza.universal?.includes(tipo)) return true;
    return pieza.aplicaciones.some((a) => {
      if (a.marca !== marca || a.linea !== linea) return false;
      if (anio == null) return true;
      return anio >= a.desde && anio <= a.hasta;
    });
  });
}

/** Distingue una aplicación certificada de una pieza de uso universal. */
export function esUniversal(pieza: Pieza, marca: string): boolean {
  const tipo = tipoDeMarca(marca);
  return (
    pieza.universal?.includes(tipo) === true &&
    !pieza.aplicaciones.some((a) => a.marca === marca)
  );
}

export function piezaPorId(id: string): Pieza | undefined {
  return CATALOGO.find((p) => p.id === id);
}

/** Foto de catálogo del repuesto. El archivo se nombra con el id de la pieza. */
export function imagenDePieza(pieza: Pieza): string {
  return `/piezas/${pieza.id}.jpg`;
}

/**
 * Las fotos de vehículo se agrupan por carrocería: una misma imagen sirve para
 * todas las líneas que comparten silueta, que es lo que el mostrador necesita
 * para confirmar que eligió bien el vehículo.
 */
type Carroceria =
  | "moto-calle"
  | "moto-naked"
  | "moto-underbone"
  | "moto-enduro"
  | "auto-hatchback"
  | "auto-sedan"
  | "auto-suv"
  | "pickup"
  | "van"
  | "camion";

const CARROCERIA_POR_LINEA: Record<string, Carroceria> = {
  // Motos
  "Bajaj|Boxer CT 100": "moto-calle",
  "Bajaj|Boxer BM 100": "moto-calle",
  "Bajaj|Platina 100": "moto-calle",
  "Bajaj|Discover 125": "moto-calle",
  "Bajaj|Pulsar NS 160": "moto-naked",
  "Bajaj|Pulsar NS 125": "moto-naked",
  "AKT|NKD 125": "moto-naked",
  "AKT|TT 125": "moto-enduro",
  "AKT|AK 110 S": "moto-calle",
  "AKT|Dynamic 125": "moto-calle",
  "Yamaha|YBR 125": "moto-calle",
  "Yamaha|Crypton 110": "moto-underbone",
  "Yamaha|FZ 2.0": "moto-naked",
  "Honda|CB 110": "moto-calle",
  "Honda|Wave 110": "moto-underbone",
  "Honda|CB 125F": "moto-naked",
  "Suzuki|GN 125": "moto-calle",
  "Hero|Eco Deluxe 100": "moto-calle",
  "TVS|Sport 100": "moto-calle",
  "TVS|Apache RTR 160": "moto-naked",
  // Autos
  "Chevrolet|Spark GT": "auto-hatchback",
  "Chevrolet|Beat": "auto-hatchback",
  "Chevrolet|Sail": "auto-sedan",
  "Chevrolet|Onix": "auto-sedan",
  "Chevrolet|Aveo": "auto-sedan",
  "Chevrolet|Optra": "auto-sedan",
  "Chevrolet|N300": "van",
  "Renault|Logan": "auto-sedan",
  "Renault|Symbol": "auto-sedan",
  "Renault|Sandero": "auto-hatchback",
  "Renault|Kwid": "auto-hatchback",
  "Renault|Stepway": "auto-suv",
  "Renault|Duster": "auto-suv",
  "Mazda|Mazda 3": "auto-sedan",
  "Mazda|Mazda 2": "auto-hatchback",
  "Mazda|CX-3": "auto-suv",
  "Mazda|CX-30": "auto-suv",
  "Toyota|Hilux": "pickup",
  "Toyota|Fortuner": "auto-suv",
  "Toyota|Prado": "auto-suv",
  "Toyota|Rav4": "auto-suv",
  "Toyota|Corolla": "auto-sedan",
  "Toyota|Yaris": "auto-sedan",
  "Kia|Picanto": "auto-hatchback",
  "Kia|Rio": "auto-sedan",
  "Hyundai|i10": "auto-hatchback",
  "Hyundai|Accent": "auto-sedan",
  "Nissan|March": "auto-hatchback",
  "Nissan|Versa": "auto-sedan",
  "Volkswagen|Gol": "auto-hatchback",
  "Volkswagen|Polo": "auto-hatchback",
  "Volkswagen|Voyage": "auto-sedan",
  // Carga y pasajeros
  "Isuzu|NPR": "camion",
  "Isuzu|NQR": "camion",
  "Hino|Serie 300": "camion",
  "JAC|1035": "camion",
  "Foton|Aumark 1049": "camion",
};

const CARROCERIA_POR_TIPO: Record<TipoVehiculo, Carroceria> = {
  Motos: "moto-calle",
  Autos: "auto-sedan",
  "Carga y pasajeros": "camion",
};

export function imagenDeModelo(marca: string, linea: string): string {
  const carroceria =
    CARROCERIA_POR_LINEA[`${marca}|${linea}`] ??
    CARROCERIA_POR_TIPO[tipoDeMarca(marca)];
  return `/vehiculos/${carroceria}.jpg`;
}

/** Logo de la marca del vehículo en el selector del catálogo. */
export function imagenDeMarca(marca: string): string {
  const slug = marca
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, "-");
  return `/marcas/${slug}.png`;
}

export function stockTotal(pieza: Pieza): number {
  return pieza.existencias.reduce((total, e) => total + e.unidades, 0);
}
