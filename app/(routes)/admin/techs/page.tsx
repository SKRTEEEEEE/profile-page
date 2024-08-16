import { getCookies } from "@/actions/auth"
import AdminTechTable from "@/components/routes/admin-tech-table"
import { fetchLenguajes } from "@/data/fetch"
import { flattenTechs } from "@/utils/techs"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    const session = await getCookies()
    const allLeng = flattenTechs(lenguajes)

 
    return (
        <section className="h-dvh flex flex-col justify-center items-center">
            
        <AdminTechTable lenguajes={allLeng} session={session}/>
        </section>
    )
}

export default TechsAdminPage


