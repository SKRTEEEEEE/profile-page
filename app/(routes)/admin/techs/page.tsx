
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
            <>
            <p>{article.name}</p>
            <p>{article.afinidad}</p>
            <Link href={`techs/${article.name}`}>Editar</Link>
            
            
            </>
        )})}
        
        </>
    )
}

export default TechsAdminPage