import { getCookies } from "@/actions/auth"
import AdminTechTable from "@/components/admin/admin-tech-table"
import { Providers } from "@/components/oth/providers"
// import { JWTContext } from "@/core/application/services/auth"
import { fetchLenguajes } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"
import { FrameworksDispo, LenguajesDispo } from "@/lib/types"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()
    // const session = await getCookies()
    const session = await getCookies()
    const allLeng = flattenTechs(lenguajes)
    const isAdmin = session ? session.ctx.role === "ADMIN" : false;
    console.log("isAdmin admin/techs: ", isAdmin)
    const dispoLeng = lenguajes.map((lenguaje: LenguajesDispo) => ({ name: lenguaje.name }));
  const dispoFw = lenguajes.flatMap((lenguaje) => {
      if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
        return lenguaje.frameworks.map((fw: FrameworksDispo) => ({ name: fw.name }));
      }
      return [];
    });

 
    return (
        <Providers>
        <section className="h-dvh flex flex-col justify-center items-center">
            
        {/* <AdminTechTable lenguajes={allLeng} session={session}/> */}
        <AdminTechTable lenguajes={allLeng} isAdmin={isAdmin} dispo={{dispoLeng,dispoFw}}/>
        </section>
        </Providers>
    )
}

export default TechsAdminPage


