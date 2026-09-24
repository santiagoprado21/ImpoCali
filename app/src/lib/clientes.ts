/** Directorio de socios comerciales para la demo admin. */
export interface ClienteDemo {
  nombre: string;
  ciudad: string;
  nit: string;
  telefono: string;
  contacto: string;
  segmento: string;
}

export const CLIENTES_DEMO: ClienteDemo[] = [
  {
    nombre: "Taller Mecánico Andrade",
    ciudad: "Cali",
    nit: "900.214.558-3",
    telefono: "(602) 445 2180",
    contacto: "Luis Andrade",
    segmento: "Taller independiente",
  },
  {
    nombre: "Serviteca El Progreso",
    ciudad: "Palmira",
    nit: "800.451.902-1",
    telefono: "(602) 275 3310",
    contacto: "María Londoño",
    segmento: "Serviteca",
  },
  {
    nombre: "Almacén Repuestos La 14",
    ciudad: "Cali",
    nit: "890.312.447-8",
    telefono: "(602) 668 0912",
    contacto: "Jorge Pérez",
    segmento: "Almacén multimarca",
  },
  {
    nombre: "Autoservicio Jiménez",
    ciudad: "Buga",
    nit: "901.088.210-4",
    telefono: "(602) 228 4415",
    contacto: "Diana Jiménez",
    segmento: "Autoservicio",
  },
  {
    nombre: "Multifrenos del Valle",
    ciudad: "Yumbo",
    nit: "900.667.133-2",
    telefono: "(602) 419 7750",
    contacto: "Héctor Rivas",
    segmento: "Especialista frenos",
  },
  {
    nombre: "Taller Hermanos Rojas",
    ciudad: "Tuluá",
    nit: "800.991.004-6",
    telefono: "(602) 224 8801",
    contacto: "Camilo Rojas",
    segmento: "Taller independiente",
  },
  {
    nombre: "Lubricantes y Filtros SAS",
    ciudad: "Cali",
    nit: "901.455.778-9",
    telefono: "(602) 514 2200",
    contacto: "Andrea Soto",
    segmento: "Distribuidor",
  },
  {
    nombre: "Motorepuestos Central",
    ciudad: "Pereira",
    nit: "890.220.115-7",
    telefono: "(606) 335 1190",
    contacto: "Felipe Mejía",
    segmento: "Almacén moto/auto",
  },
  {
    nombre: "Diésel Técnica del Pacífico",
    ciudad: "Buenaventura",
    nit: "900.033.881-5",
    telefono: "(602) 242 6608",
    contacto: "Óscar Valencia",
    segmento: "Diésel / carga",
  },
  {
    nombre: "Taller Automotriz Quintero",
    ciudad: "Popayán",
    nit: "901.712.340-1",
    telefono: "(602) 823 4412",
    contacto: "Natalia Quintero",
    segmento: "Taller independiente",
  },
];

export function datosCliente(nombre: string): ClienteDemo | undefined {
  return CLIENTES_DEMO.find((c) => c.nombre === nombre);
}
