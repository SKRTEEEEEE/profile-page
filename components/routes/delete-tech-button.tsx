"use client"

import { deleteTech } from "@/actions/badges";

interface DeleteTechButtonProps {
    name: string;
    
}

const DeleteTechButton:React.FC<DeleteTechButtonProps> = ({name}) =>{
    return (
        <button onClick={async ()=>{
            try {
                const res = await deleteTech(name);
                console.log("Deleted:", res);
                // onDelete();
                window.location.reload();  // Refresca la página después de una eliminación exitosa
            } catch (error) {
                console.error("Error deleting tech:", error);
                alert("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
            }
            
        }}>Delete {name}</button>
    )
}

export default DeleteTechButton;