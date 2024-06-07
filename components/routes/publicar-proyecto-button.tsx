"use client"

// import {createListOfIcons} from "@/utils/scripts/createListOfIcons"

import { actualizarJsonServerTest, actualizarMdServerTest } from "@/actions/badges";

// import { publicarLibAFw } from "@/actions";

// import { publicarFwATech } from "@/actions";

// import { publicarProyecto } from "@/actions";

const PublicarProyectoButton = () => {
    const handleClick = async () => {
        try {
            // Verifica si estas funciones son realmente necesarias
            // await testPeticionRepos();
            // createListOfIcons();
    
            // await actualizarJsonServerTest();
            // console.log("actualizarJsonServerTest completed");
    
            await actualizarMdServerTest();
            console.log("actualizarMdServerTest completed");
    
            alert("Petición realizada correctamente");
            // Lógica adicional después de llamar al Server Action
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Ocurrió un error durante la petición");
        }
      };
    return (
        <form onSubmit={handleClick}>
            <button type="submit">Publicar Proyecto</button>
        </form>
    )
}

export default PublicarProyectoButton;