"use client"

import { deleteTech } from "@/actions/badges";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";
import { LuDelete } from "react-icons/lu";

// const mockDeleteTech = (name:string) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // Simula el comportamiento de éxito o fallo
//         if (Math.random() > 0.5) {
//           resolve(true); // Simula una eliminación exitosa
//         } else {
//           reject(new Error(`Error al eliminar ${name}`)); // Simula un error
//         }
//       }, 1000); // Simula un retraso de 1 segundo
//     });
//   };

interface DeleteTechButtonProps {
    name: string;
    onError: (error: string) => void; // Función de callback para pasar el error
}

const DeleteTechButton: React.FC<DeleteTechButtonProps> = ({ name, onError }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            {isLoading ? <Spinner size="lg" /> : <LuDelete size={"45px"} onClick={
                async () => {
                    setIsLoading(true);
                    try {
                        // const res = await mockDeleteTech(name)
                        const res = await deleteTech(name);
                        console.log("Deleted:", res);
                        
                            //       console.log(`${name} eliminado correctamente`);
                            //       // Update the state to remove the deleted item
                            //       setError(`Eliminación de ${name} completada.`);
                            //     } else {
                            //       setError(`No se pudo eliminar ${name}`);
                            //     }
                        if(res){
                            onError(`Eliminación de ${name} completada.`)
                        } else {
                            onError(`No se pudo eliminar ${name}`)
                        }
                    } catch (error) {
                        if (error instanceof Error) {
                            console.error('Error al eliminar tech', error.message);
                            onError(error.message); // Llamar a la función de callback con el mensaje de error
                        } else {
                            console.error('Error al eliminar tech', error);
                            onError("Error al eliminar la tecnología. Por favor, inténtelo de nuevo.");
                        }
                    } finally {
                        setIsLoading(false);
                        // window.location.reload();
                    }
                }
            } 
            />}
        </>
    );
}
export default DeleteTechButton