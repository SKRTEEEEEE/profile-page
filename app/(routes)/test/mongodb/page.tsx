
import PublicarProyectoButton from "@/components/publicar-proyecto-button";
import { fetchLenguajes } from "@/data/fetch"
import { LenguajesModel } from "@/models/lenguajes-schema";


const TestMongoPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    LenguajesModel.find({})
    .then((projects) => {
        console.log('Proyectos encontrados:', projects);
    })
    .catch((error) => {
        console.error('Error al buscar proyectos:', error);
    });

    return (
        <>
        <p className="mt-36">Hola mundo!</p>
        {lenguajes.map(article => (
            <>
            <p>{article.name}</p>
            <p>{article.afinidad}</p>
            
            
            </>
        ))}
        <PublicarProyectoButton/>
        </>
    )
}

export default TestMongoPage