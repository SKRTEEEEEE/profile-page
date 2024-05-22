import { IFrameworkDispo, ILenguajeDispo } from "@/app/(routes)/test/form/page"
import FormularioCreateTechs from "@/components/routes/formulario-techs-create"
// import FormularioUpdateTechs from "@/components/routes/formulario-techs-update"
import { fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"

export default async function TechsDynAdminPage ({params}:{params: {name:string}}){
    const lenguajes = await fetchLenguajes()
    const allLeng = flattenProyectos(lenguajes)
    const tech = allLeng.find(l => l.name === params.name) 
    const dispoLeng = lenguajes.map((lenguaje: ILenguajeDispo) => ({ name: lenguaje.name }));
    const dispoFw = lenguajes.flatMap((lenguaje) => {
        if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
          return lenguaje.frameworks.map((fw: IFrameworkDispo) => ({ name: fw.name }));
        }
        return [];
      });
    return(
        <>
        {tech&&<FormularioCreateTechs dispoLeng={dispoLeng} dispoFw={dispoFw} tech={tech}/>}
        
        {/* <h1>{tech.name}</h1> */}
        </>
    )
}