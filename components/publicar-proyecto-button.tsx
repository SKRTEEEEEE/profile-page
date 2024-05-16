"use client"

// import { publicarLibAFw } from "@/actions";

import { publicarFwATech } from "@/actions";

// import { publicarProyecto } from "@/actions";

const PublicarProyectoButton = () => {
    const handleClick = async () => {
        // await publicarProyecto();
        await publicarFwATech();
        // await publicarLibAFw()
        alert("Proyecto publicado correctamente");
        // Lógica adicional después de llamar al Server Action
      };
    return (
        <form onSubmit={handleClick}>
            <button type="submit">Publicar Proyecto</button>
        </form>
    )
}

export default PublicarProyectoButton;