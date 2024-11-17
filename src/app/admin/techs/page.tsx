import AdminTechTable from "@/components/admin/tech-table"
import { readAllTechsUC } from "@/core/application/usecases/entities/tech"
import { getCookiesUC } from "@/core/application/usecases/services/auth"
// import { JWTContext } from "@/core/application/services/auth"
import { fetchAdmins } from "@/lib/fetch"
import { flattenTechs } from "@/lib/techs"
import { FrameworksDispo, LenguajesDispo } from "@/lib/types"

const TechsAdminPage = async( ) =>{
    const lenguajes = await readAllTechsUC()
    const session = await getCookiesUC()
    const admins = await fetchAdmins();
    const cleanAdmins = admins?.map(admin => ({
        ...JSON.parse(JSON.stringify(admin))
        }));
    if(!lenguajes)return(
      <section className="h-dvh flex flex-col justify-center items-center">
        <h2>Parte en costrucao 🏗️🚧</h2>
      </section>
    )
    const allLeng = flattenTechs(lenguajes)
    const isAdmin = session ? session.ctx.role === "ADMIN" : false;
    const dispoLeng = lenguajes?.map((lenguaje: LenguajesDispo) => ({ name: lenguaje.name }));
  const dispoFw = lenguajes?.flatMap((lenguaje) => {
      if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
        return lenguaje.frameworks.map((fw: FrameworksDispo) => ({ name: fw.name }));
      }
      return [];
    });

 
    return (
        
        <section className="h-dvh flex flex-col justify-center items-center">
            
        {/* <AdminTechTable lenguajes={allLeng} session={session}/> */}
        <AdminTechTable lenguajes={allLeng} isAdmin={isAdmin} dispo={{dispoLeng,dispoFw}} admins={cleanAdmins||[]}/>
        </section>
        
    )
}

export default TechsAdminPage


