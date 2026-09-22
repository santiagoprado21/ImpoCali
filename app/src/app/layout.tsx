import type { Metadata } from "next";
import { BotonWhatsApp } from "@/components/BotonWhatsApp";
import { Encabezado } from "@/components/Encabezado";
import { ProveedorSesion } from "@/lib/sesion";
import { ProveedorTienda } from "@/lib/tienda";
import "./globals.css";

export const metadata: Metadata = {
  title: "Autofix · Buscador inteligente de repuestos | Impocali",
  description:
    "Mockup del buscador inteligente de repuestos para Impocali: catálogo por vehículo, identificación de la pieza, stock y precio en línea, carrito, pedido inmediato y consola de administración.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body>
        <ProveedorSesion>
          <ProveedorTienda>
            <Encabezado />
            <main className="mx-auto max-w-6xl px-5 py-7">{children}</main>
            <footer className="mt-6 border-t border-marca-100 bg-white">
              <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-carbon-500">
                Mockup académico construido sobre el blueprint de servicio de
                Impocali · Catálogo y pedidos simulados con estructura ACES/PIES.
              </div>
            </footer>
            <BotonWhatsApp />
          </ProveedorTienda>
        </ProveedorSesion>
      </body>
    </html>
  );
}
