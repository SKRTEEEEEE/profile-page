
import DeleteTechButton from "@/components/routes/delete-tech-button"
import { fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"
import Link from "next/link"
// import { LenguajesModel } from "@/models/lenguajes-schema";


const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // LenguajesModel.find({})
    // .then((projects) => {
    //     console.log('Proyectos encontrados:', projects);
    // })
    // .catch((error) => {
    //     console.error('Error al buscar proyectos:', error);
    // });
    const allLeng = flattenProyectos(lenguajes)
    // console.log(allLeng);
    

    return (
        <>
        <p className="mt-36">Hola mundo!</p>
        {allLeng.map(article => {
            
            
            return(
            <p className="flex w-10/12 bg-secondary gap-8 pl-24">
            <span className="w-4/12">{article.name}</span>
            <span>{article.afinidad}</span>
            <Link href={`techs/${article.name}`}>Editar</Link>
            <DeleteTechButton name={article.name} />
            
            
            </p>
        )})}
        
        </>
    )
}

export default TechsAdminPage