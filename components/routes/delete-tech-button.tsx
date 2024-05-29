import { deleteTech } from "@/actions/badges";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";

interface DeleteTechButtonProps {
    name: string;
}

const DeleteTechButton:React.FC<DeleteTechButtonProps> = ({name}) =>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const deleted = await deleteTech(name);
            if (deleted) {
                console.log(`${name} eliminado correctamente`);
            } else {
                setError(`No se pudo eliminar ${name}`);
            }
        } catch (error) {
            console.error("Error eliminando tech:", error);
            setError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? <Spinner size="lg"/> : <LuDelete size={"45px"} onClick={handleDelete}/>}
            {error && <div>Error: {error}</div>}
        </>
    );
}

export default DeleteTechButton;
