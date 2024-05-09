// import { fetchArticles } from "@/data/fetch"

import { fetchArticles } from "@/data/fetch"
// import { Web3ProjectModel } from "@/models/web3_project-schema";

const TestMongoPage = async( ) =>{
    const articles = await fetchArticles()
    // Web3ProjectModel.find({})
    // .then((projects) => {
    //     console.log('Proyectos encontrados:', projects);
    // })
    // .catch((error) => {
    //     console.error('Error al buscar proyectos:', error);
    // });
    return (
        <>
        <p>Hola mundo!</p>
        {articles.map(article => (
            <p>{article.title}</p>
        ))}
        
        </>
    )
}

export default TestMongoPage