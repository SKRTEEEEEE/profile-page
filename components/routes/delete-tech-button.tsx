"use client"

import { deleteTech } from "@/actions/badges";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";

interface DeleteTechButtonProps {
    name: string;
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ name }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            {isLoading ? <Spinner size="lg" /> : <LuDelete size={"45px"} onClick={async () => {
                setIsLoading(true);
                try {
                    const res = await deleteTech(name);
                    console.log("Deleted:", res);
                } catch (error) {
                    console.error("Error deleting tech:", error.message);
                    console.error("Detalles del error:", error);
                    alert("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
                } finally {
                    setIsLoading(false);
                    window.location.reload();
                }
            }} />}
        </>
    );
}

export default DeleteTechButton;
