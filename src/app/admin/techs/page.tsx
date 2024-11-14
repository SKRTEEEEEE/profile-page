import { getCookies } from "@/actions/auth"
import AdminTechTable from "@/components/admin/admin-tech-table"
import AdminTechTableMock from "@/components/admin/admin-tech-table-2"
import { Providers } from "@/components/oth/providers"
// import { JWTContext } from "@/core/application/services/auth"
import { fetchLenguajes } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // const session = await getCookies()
    const session = await getCookies()
    const allLeng = flattenTechs(lenguajes)
    const isAdmin = session ? session.ctx.role === "ADMIN" : false;
    console.log("isAdmin admin/techs: ", isAdmin)

 
    return (
        <Providers>
        <section className="h-dvh flex flex-col justify-center items-center">
            
        {/* <AdminTechTable lenguajes={allLeng} session={session}/> */}
        <AdminTechTableMock lenguajes={allLeng} isAdmin={isAdmin}/>
        </section>
        </Providers>
    )
}

export default TechsAdminPage


