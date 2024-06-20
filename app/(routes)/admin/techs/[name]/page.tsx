
import TechFormulario from "@/components/routes/tech-formulario"
import { fetchAdmins, fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"
import { flattenAdmin } from "@/utils/auth"
import { IFrameworkDispo, ILenguajeDispo } from "@/types"

export default async function TechsDynAdminPage ({params}:{params: {name:string}}){
    const lenguajes = await fetchLenguajes()
    const admins = await fetchAdmins()
    const allAdmins = flattenAdmin(admins)
    const allLeng = flattenProyectos(lenguajes)
    const tech = allLeng.find(l => l.name === params.name) 
    const dispoLeng = lenguajes.map((lenguaje: ILenguajeDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: IFrameworkDispo) => ({ name: fw.name }));
        }
        return [];
      });
    return tech&&<TechFormulario dispoLeng={dispoLeng} dispoFw={dispoFw} tech={tech} admins={allAdmins}/>
}