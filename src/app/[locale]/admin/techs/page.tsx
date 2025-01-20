import AdminTechTable from "@/components/admin/tech-table"
import { readRoleUC } from "@/core/application/usecases/entities/role"
import { getCookiesUC } from "@/core/application/usecases/services/auth"
import { readAllFlattenTechsC } from "@/core/interface-adapters/controllers/tech/read.controller"
// import { JWTContext } from "@/core/application/services/auth"


const TechsAdminPage = async( ) =>{
    // const lenguajes = await readAllTechsUC()
    const {techs: allLeng, dispoLeng, dispoFw} = await readAllFlattenTechsC()
    const session = await getCookiesUC()
    const roles = await readRoleUC()
    const admins = roles?.filter(role => role.permissions === "ADMIN")
    const cleanAdmins = admins?.map(admin => ({
        ...JSON.parse(JSON.stringify(admin))
        }));
    if(allLeng.length === 0)return(
      <section className="h-dvh flex flex-col justify-center items-center">
        <h2>Parte en costrucao 🏗️🚧</h2>
      </section>
    )
    // const allLeng = flattenTechs(lenguajes)
    const isAdmin = session ? session.ctx.role === "ADMIN" : false;
  //   const dispoLeng = lenguajes?.map((lenguaje: {nameId:string}) => ({ name: lenguaje.nameId }));
  // const dispoFw = lenguajes?.flatMap((lenguaje) => {
  //     if (Array.isArray(lenguaje.frameworks) && lenguaje.frameworks.length > 0) {
  //       return lenguaje.frameworks.map((fw: {nameId:string}) => ({ name: fw.nameId }));
  //     }
  //     return [];
  //   });

 
    return (
        <>
        <section className=" my-auto h-full flex flex-col justify-center items-center">
            
        {/* <AdminTechTable lenguajes={allLeng} session={session}/> */}
        <AdminTechTable lenguajes={allLeng} isAdmin={isAdmin} dispo={{dispoLeng,dispoFw}} admins={cleanAdmins||[]}/>
        </section>
        </>
        
    )
}

export default TechsAdminPage


