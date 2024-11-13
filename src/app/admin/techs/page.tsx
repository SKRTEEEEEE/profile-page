import { getCookies } from "@/actions/auth"
import AdminTechTable from "@/components/admin/admin-tech-table"
import { Providers } from "@/components/oth/providers"
import { fetchLenguajes } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // const session = await getCookies()
    const session = await getCookies()
    const allLeng = flattenTechs(lenguajes)

 
    return (
        <Providers>
        <section className="h-dvh flex flex-col justify-center items-center">
            
        <AdminTechTable lenguajes={allLeng} session={session}/>
        </section>
        </Providers>
    )
}

export default TechsAdminPage


