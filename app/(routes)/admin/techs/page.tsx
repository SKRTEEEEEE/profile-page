import AdminTechTable from "@/components/routes/admin-tech-table"
import { fetchAdmins, fetchLenguajes } from "@/data/fetch"
import { flattenAdmin } from "@/utils/auth"
import { flattenProyectos } from "@/utils/badges"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    const admins = await fetchAdmins();

    const allLeng = flattenProyectos(lenguajes)
    const allAdmins = flattenAdmin(admins)

    // console.log("admins techsadmins page: ",admins)
 
    return (
        <section className="h-dvh flex flex-col justify-center items-center">
            
        <AdminTechTable lenguajes={allLeng} admins={allAdmins}/>
        </section>
    )
}

export default TechsAdminPage


