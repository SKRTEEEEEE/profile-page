import { getCookies } from "@/actions/auth"
import AdminTechTable from "@/components/admin/tech-table"
// import { JWTContext } from "@/core/application/services/auth"
import { fetchAdmins, fetchLenguajes } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"
import { FrameworksDispo, LenguajesDispo } from "@/lib/types"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // const session = await getCookies()
    const session = await getCookies()
    const admins = await fetchAdmins();
    const cleanAdmins = admins.map(admin => ({
        ...JSON.parse(JSON.stringify(admin))
        }));

    const allLeng = flattenTechs(lenguajes)
    const isAdmin = session ? session.ctx.role === "ADMIN" : false;
    const dispoLeng = lenguajes.map((lenguaje: LenguajesDispo) => ({ name: lenguaje.name }));
  const dispoFw = lenguajes.flatMap((lenguaje) => {
      if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
        return lenguaje.frameworks.map((fw: FrameworksDispo) => ({ name: fw.name }));
      }
      return [];
    });

 
    return (
        
        <section className="h-dvh flex flex-col justify-center items-center">
            
        {/* <AdminTechTable lenguajes={allLeng} session={session}/> */}
        <AdminTechTable lenguajes={allLeng} isAdmin={isAdmin} dispo={{dispoLeng,dispoFw}} admins={cleanAdmins}/>
        </section>
        
    )
}

export default TechsAdminPage


