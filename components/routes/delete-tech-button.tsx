"use client"

import { deleteTech } from "@/actions/badges";
import { useState } from "react";

interface DeleteTechButtonProps {
    name: string;
    
}

const DeleteTechButton:React.FC<DeleteTechButtonProps> = ({name}) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <>
        {isLoading ? <p>Loading...</p> : <button onClick={async ()=>{
            setIsLoading(true);
            try {
                const res = await deleteTech(name);
                console.log("Deleted:", res);
                
            } catch (error) {
                console.error("Error deleting tech:", error);
                alert("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
            } finally {
                setIsLoading(false);window.location.reload();
            }
            
        }}>Delete {name}</button>}
        </>
        
    )
}

export default DeleteTechButton;