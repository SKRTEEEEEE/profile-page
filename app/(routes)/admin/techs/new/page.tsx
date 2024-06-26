
import TechFormulario from "@/components/routes/tech-form";
import {  fetchAdmins, fetchLenguajes } from "@/data/fetch";
import { IFrameworkDispo, ILenguajeDispo } from "@/types";
import { flattenAdmin } from "@/utils/auth";
// import { createListOfIcons } from "@/utils/scripts/createListOfIcons";





const NewTechAdminPage: React.FC = async() => {

    // const techBadges = createListOfIcons()

    const lenguajes = await fetchLenguajes()
    const admins = await fetchAdmins();
    //Pasamos un array con los lenguajes que ya han sido publicados(dispo) y los frameworks (para el orden)
    const dispoLeng = lenguajes.map((lenguaje: ILenguajeDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: IFrameworkDispo) => ({ name: fw.name }));
        }
        return [];
      });
    
    const allAdmins = flattenAdmin(admins)
    
    return (
        <div className="py-14 my-28 h-dvh flex flex-col align-center items-center justify-center">
            <TechFormulario dispoLeng={dispoLeng} dispoFw={dispoFw} admins={allAdmins} />
            
        </div>
    )

}
export default NewTechAdminPage;