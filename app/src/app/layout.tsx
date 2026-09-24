import type { Metadata } from "next";
import { Bebas_Neue, Raleway } from "next/font/google";
import { BotonAsesor } from "@/components/BotonAsesor";
import { BotonCarrito } from "@/components/BotonCarrito";
import { Encabezado } from "@/components/Encabezado";
import { ProveedorSesion } from "@/lib/sesion";
import { ProveedorTienda } from "@/lib/tienda";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Autofix · Tienda de repuestos multimarca | Impocali",
  description:
    "Buscador inteligente de repuestos Autofix para Impocali: catálogo por vehículo, identificación de la pieza, stock y precio en línea, carrito y consola de administración.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${raleway.variable} ${bebas.variable}`}>
      <body className="font-sans">
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
            <BotonAsesor />
            <BotonCarrito />
          </ProveedorTienda>
        </ProveedorSesion>
      </body>
    </html>
  );
}
