"use client"

// import {createListOfIcons} from "@/utils/scripts/createListOfIcons"

import { actualizarJsonServerTest, actualizarMdServerTest, testPeticionRepos } from "@/actions";

// import { publicarLibAFw } from "@/actions";

// import { publicarFwATech } from "@/actions";

// import { publicarProyecto } from "@/actions";

const PublicarProyectoButton = () => {
    const handleClick = async () => {
        // await testPeticionRepos();
        // createListOfIcons();
        await actualizarJsonServerTest();
        // await actualizarMdServerTest();
        alert("Petición realizada correctamente");
        // Lógica adicional después de llamar al Server Action
      };
    return (
        <form onSubmit={handleClick}>
            <button type="submit">Publicar Proyecto</button>
        </form>
    )
}

export default PublicarProyectoButton;