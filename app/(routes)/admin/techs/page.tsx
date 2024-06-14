import { revalidateLenguajes } from "@/actions/badges"
import AdminTechTable from "@/components/routes/admin-tech-table"
import { fetchLenguajes } from "@/data/fetch"
import { flattenProyectos } from "@/utils/badges"

const TechsAdminPage = async( ) =>{
    const lenguajes = await fetchLenguajes()

    const allLeng = flattenProyectos(lenguajes)
 
    return (
        <section className="h-dvh flex flex-col justify-center items-center">
            <form
        action={revalidateLenguajes}
        className='flex items-center justify-between'
      >
        <h3 className='font-serif text-xl'>Todos</h3>
        <button type="submit">Revalidate lenguajes</button>
      </form>
        <AdminTechTable lenguajes={allLeng} />
        </section>
    )
}

export default TechsAdminPage


