"use client"

import { publicarProyecto } from "@/actions";

const PublicarProyectoButton = () => {
    const handleClick = async () => {
        await publicarProyecto();
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