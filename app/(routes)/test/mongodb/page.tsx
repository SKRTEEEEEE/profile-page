// import { publicarProyecto } from "@/actions";
import PublicarProyectoButton from "@/components/publicar-proyecto-button";
import { fetchLenguajes } from "@/data/fetch"
import { LenguajesModel } from "@/models/lenguajes-schema";

// async function publicarProyecto() {
//     const nuevoProyecto = new LenguajesModel({  
//         name: 'Typescript',
//         afinidad: 4,
//       });

//     try {
//         const proyectoGuardado = await nuevoProyecto.save();
//         console.log("Proyecto guardado correctamente:", proyectoGuardado);
//     } catch (error) {
//         console.error("Error al guardar el proyecto:", error);
//     }
// }

// Llama a la función para guardar un nuevo proyecto


const TestMongoPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // publicarProyecto();
    LenguajesModel.find({})
    .then((projects) => {
        console.log('Proyectos encontrados:', projects);
    })
    .catch((error) => {
        console.error('Error al buscar proyectos:', error);
    });

    return (
        <>
        <p>Hola mundo!</p>
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