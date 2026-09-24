import { Buscador } from "@/components/Buscador";
import { HeroInicio } from "@/components/HeroInicio";
import { PiezasDestacadas } from "@/components/PiezasDestacadas";

export default function Inicio() {
  return (
    <>
      <HeroInicio />
      <Buscador />
      <PiezasDestacadas />
    </>
  );
}
