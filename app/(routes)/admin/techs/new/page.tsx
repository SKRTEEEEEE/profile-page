
import FormularioCreateTechs from "@/components/routes/formulario-techs-create";
import {  fetchLenguajes } from "@/data/fetch";
// import { createListOfIcons } from "@/utils/scripts/createListOfIcons";

export interface ILenguajeDispo {
    name: string;
}
export interface IFrameworkDispo {
    name: string;
}



const NewTechAdminPage: React.FC = async() => {

    // const techBadges = createListOfIcons()

    const lenguajes = await fetchLenguajes()
    const dispoLeng = lenguajes.map((lenguaje: ILenguajeDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: IFrameworkDispo) => ({ name: fw.name }));
        }
        return [];
      });
    // console.log(techBadges);
    
    return (
        <div className="py-14 my-28 h-dvh flex flex-col align-center items-center justify-center">
            <FormularioCreateTechs dispoLeng={dispoLeng} dispoFw={dispoFw} />
            
        </div>
    )

}
export default NewTechAdminPage;