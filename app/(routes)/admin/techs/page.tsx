
import AdminTechTable from "@/components/routes/admin-tech-table"
// import DeleteTechButton from "@/components/routes/delete-tech-button"
import { fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"
// import Link from "next/link"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()

    const allLeng = flattenProyectos(lenguajes)
 
    return (
        // <>
        // <p className="mt-36">Hola mundo!</p><section><h1>Techs page</h1><Link href={`techs/new`}>Añadir nuevo proyecto</Link></section>
        // {allLeng.map(article => {
            
            
        //     return(
        //     <p className="flex w-10/12 bg-secondary gap-8 pl-24">
        //     <span className="w-4/12">{article.name}</span>
        //     <span>{article.afinidad}</span>
        //     <Link href={`techs/${article.name}`}>Editar</Link>
        //     <DeleteTechButton name={article.name} />
            
            
        //     </p>
        // )})}
        // </>
        <section className="h-dvh flex justify-center items-center">
        <AdminTechTable lenguajes={allLeng} /></section>
    )
}

export default TechsAdminPage


