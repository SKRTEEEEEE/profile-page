
import TechFormulario from "@/components/routes/tech-form"
import { fetchAdmins, fetchLenguajes } from "@/data/fetch"
import { flattenTechs } from "@/utils/techs"
import { flattenAdmin } from "@/utils/auth"
import { FrameworksDispo, LenguajesDispo } from "@/types/ui"

export default async function TechsDynAdminPage ({params}:{params: {name:string}}){
    const lenguajes = await fetchLenguajes()
    const admins = await fetchAdmins()
    const allAdmins = flattenAdmin(admins)
    const allLeng = flattenTechs(lenguajes)
    const tech = allLeng.find(l => l.name === params.name) 
    const dispoLeng = lenguajes.map((lenguaje: LenguajesDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: FrameworksDispo) => ({ name: fw.name }));
        }
        return [];
      });
    return tech&&<TechFormulario dispoLeng={dispoLeng} dispoFw={dispoFw} tech={tech} admins={allAdmins}/>
}