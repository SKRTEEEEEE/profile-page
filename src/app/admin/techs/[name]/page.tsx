
import { fetchAdmins, fetchLenguajes } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"
// import { flattenAdmin } from "@/utils/auth"
import { FrameworksDispo, LenguajesDispo } from "@/lib/types"
import TechFormulario from "@/components/admin/tech-form"

export default async function TechsDynAdminPage ({params}:{params: {name:string}}){
    const lenguajes = await fetchLenguajes()
    const admins = await fetchAdmins()
    // const allAdmins = flattenAdmin(admins)
    const allLeng = flattenTechs(lenguajes)
    const tech = allLeng.find(l => l.name === params.name) 
    const dispoLeng = lenguajes.map((lenguaje: LenguajesDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: FrameworksDispo) => ({ name: fw.name }));
        }
        return [];
      });
    return tech&&<TechFormulario dispoLeng={dispoLeng} dispoFw={dispoFw} tech={tech} admins={admins}/>
}