import AdminTechTable from "@/components/routes/admin-tech-table"
import { fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()

    const allLeng = flattenProyectos(lenguajes)
 
    return (
        <section className="h-dvh flex justify-center items-center">
        <AdminTechTable lenguajes={allLeng} />
        </section>
    )
}

export default TechsAdminPage


