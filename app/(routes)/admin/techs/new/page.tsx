
import TechFormulario from "@/components/routes/tech-formulario";
import {  fetchAdmins, fetchLenguajes } from "@/data/fetch";
import { flattenAdmin } from "@/utils/auth";
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
    const admins = await fetchAdmins();
    const dispoLeng = lenguajes.map((lenguaje: ILenguajeDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: IFrameworkDispo) => ({ name: fw.name }));
        }
        return [];
      });
    // console.log(techBadges);
    
    const allAdmins = flattenAdmin(admins)
    
    return (
        <div className="py-14 my-28 h-dvh flex flex-col align-center items-center justify-center">
            <TechFormulario dispoLeng={dispoLeng} dispoFw={dispoFw} admins={allAdmins} />
            
        </div>
    )

}
export default NewTechAdminPage;