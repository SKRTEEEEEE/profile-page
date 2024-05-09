

// import { fetchArticles } from "@/data/fetch"

import { fetchWeb3Projects } from "@/data/fetch"
import  {Web3ProjectModel}  from "@/models/web3_project-schema";
async function publicarProyecto() {
    const nuevoProyecto = new Web3ProjectModel({
    
        name: 'Safe Storage',
        path: "/counter",
        contractUrl: "https://github.com/SKRTEEEEEE/trySolidity24/blob/main/markdown/contratos_desplegados.md",
        active: true,
        title: "Almacén",
        description: "Programa de almacenamiento seguro, utilizando una blockchain existente e su inmutabilidad para almacenar datos",
        usos: [
          "Maxima seguridad en el almacenamiento de datos", "Acceso a los datos a traves de tecnología web","Ventajas asociadas a la seguridad blockchain" 
        ],
        instrucciones:[
          "Conectar una billetera", "Introducir un numero a guardar", "Clickar en el boton de guardar", "Aceptar la interacción con el contrato", "Comprobar en la pagina como se ha modificado el numero"
        ]
  
      });

    try {
        const proyectoGuardado = await nuevoProyecto.save();
        console.log("Proyecto guardado correctamente:", proyectoGuardado);
    } catch (error) {
        console.error("Error al guardar el proyecto:", error);
    }
}

// Llama a la función para guardar un nuevo proyecto


const TestMongoPage = async( ) =>{
    const articles = await fetchWeb3Projects()
    // publicarProyecto();
    Web3ProjectModel.find({})
    .then((projects) => {
        console.log('Proyectos encontrados:', projects);
    })
    .catch((error) => {
        console.error('Error al buscar proyectos:', error);
    });
    return (
        <>
        <p>Hola mundo!</p>
        {articles.map(article => (
            <>
            <p>{article.title}</p>
            <p>{article.path}</p>
            <p>{article.description}</p>
            <p>{article.contractUrl}</p>
            <p>{article.name}</p>
            <p>{article.id}</p>
            <p>{article.usos}</p>
            </>
        ))}
        
        </>
    )
}

export default TestMongoPage